import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory = [] } = await req.json()
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is not configured')
    }

    // Build conversation context with enhanced system prompt
    const messages = [
      {
        role: 'system',
        content: `Ești AI Assistant, un asistent virtual inteligent și util, ca ChatGPT, specializat în a rezolva orice tip de problemă:

🧠 REZOLVAREA PROBLEMELOR:
- Analizez situații complexe și ofer soluții practice
- Descompun probleme mari în pași realizabili
- Găsesc alternative creative și inovatoare
- Ofer perspective multiple asupra unei situații

💡 CONSULTANȚĂ GENERALĂ:
- Business și antreprenoriat
- Tehnologie și programare
- Educație și învățare
- Productivitate și organizare
- Dezvoltare personală

🎯 PLANIFICARE ȘI STRATEGIE:
- Planuri de acțiune pas cu pas
- Analiza riscurilor și oportunităților
- Optimizarea proceselor
- Setarea obiectivelor SMART

🔍 ANALIZĂ ȘI CERCETARE:
- Analizez date și informații
- Cercetez subiecte complexe
- Compar opțiuni și alternative
- Ofer recomandări bazate pe evidențe

Răspunde în română, fii practic și direct. Oferă soluții concrete și actionabile. Explică concepte complexe în mod simplu. Folosește emoji-uri pentru claritate și să fii prietenos, dar păstrează un ton profesional și de încredere.`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        max_completion_tokens: 1000,
        top_p: 0.9,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`)
    }

    const data = await response.json()
    const aiReply = data.choices[0].message.content

    // Generate intelligent follow-up questions based on the topic
    const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'Generează exact 3 întrebări de urmărire scurte și relevante bazate pe răspunsul dat. Fiecare întrebare să fie sub 50 de caractere și să încurajeze continuarea conversației. Returnează doar întrebările, fără numerotare.'
          },
          {
            role: 'user',
            content: `Răspuns: ${aiReply}\n\nGenerează 3 întrebări de urmărire relevante:`
          }
        ],
        max_completion_tokens: 150,
      }),
    })

    let followUpQuestions = []
    if (followUpResponse.ok) {
      const followUpData = await followUpResponse.json()
      const followUpText = followUpData.choices[0].message.content
      followUpQuestions = followUpText
        .split('\n')
        .filter((q: string) => q.trim() && q.length > 5)
        .map((q: string) => q.replace(/^\d+\.\s*/, '').replace(/^-\s*/, '').trim())
        .slice(0, 3)
    }

    // Default follow-ups if AI generation fails
    if (followUpQuestions.length === 0) {
      followUpQuestions = [
        "Ce alte aspecte vrei să explorăm?",
        "Ai nevoie de detalii suplimentare?",
        "Cum pot să te ajut mai departe?"
      ]
    }

    return new Response(
      JSON.stringify({
        reply: aiReply,
        followUp: followUpQuestions
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('AI Chat error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        reply: 'Îmi pare rău, am întâmpinat o problemă tehnică. Vă rog să încercați din nou sau să contactați suportul.',
        followUp: []
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
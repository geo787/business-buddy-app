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
    const { idea_description, target_market, unique_value } = await req.json()

    const prompt = `
    Analizează următoarea idee de afacere și oferă o evaluare detaliată în română:

    Descrierea ideii: ${idea_description}
    Piața țintă: ${target_market}
    Propunerea de valoare unică: ${unique_value}

    Te rog să îmi oferi:
    1. Un scor de la 1 la 10 pentru potențialul ideii
    2. Lista punctelor forte (minim 3)
    3. Lista punctelor slabe (minim 3)
    4. Sugestii concrete de îmbunătățire (minim 3)
    5. O analiză a potențialului pieței în 2-3 propoziții

    Răspunde în format JSON cu următoarea structură:
    {
      "score": numărul,
      "strengths": ["punct1", "punct2", "punct3"],
      "weaknesses": ["punct1", "punct2", "punct3"],
      "suggestions": ["sugestie1", "sugestie2", "sugestie3"],
      "market_potential": "analiza pieței"
    }
    `

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    })

    const data = await openAIResponse.json()
    const responseText = data.choices[0].message.content
    
    // Parse JSON response
    const result = JSON.parse(responseText)

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
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
    const { business_idea, target_customers } = await req.json()

    const prompt = `
    Creează un Lean Canvas complet pentru următoarea idee de afacere în română:

    Ideea de afacere: ${business_idea}
    Clienții țintă: ${target_customers}

    Te rog să completezi toate secțiunile Lean Canvas cu informații specifice și detaliate:

    Răspunde în format JSON cu următoarea structură:
    {
      "problem": ["problema1", "problema2", "problema3"],
      "solution": ["solutia1", "solutia2", "solutia3"],
      "keyMetrics": ["metrica1", "metrica2", "metrica3"],
      "uniqueValueProposition": "propunerea de valoare principală",
      "unfairAdvantage": "avantajul competitiv",
      "channels": ["canal1", "canal2", "canal3"],
      "customerSegments": ["segment1", "segment2"],
      "costStructure": ["cost1", "cost2", "cost3"],
      "revenueStreams": ["venit1", "venit2", "venit3"]
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
        max_tokens: 1200,
        temperature: 0.4,
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
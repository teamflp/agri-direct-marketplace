
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    console.log("Received request body:", body)
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured')
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Handle both new format { message, conversation_history } and old format { messages }
    let messages = []
    let userMessage = ''
    
    if (body.message && body.conversation_history !== undefined) {
      // New format
      userMessage = body.message
      messages = [
        ...body.conversation_history,
        { role: 'user', content: userMessage }
      ]
    } else if (body.messages) {
      // Old format (backward compatibility)
      messages = body.messages
      userMessage = messages[messages.length - 1]?.content || ''
    } else {
      console.error('Invalid request format:', body)
      return new Response(
        JSON.stringify({ error: 'Invalid request format. Expected { message, conversation_history } or { messages }' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const systemPrompt = `Tu es un assistant spécialisé dans l'agriculture locale et les marchés fermiers. Tu aides les utilisateurs d'AgriMarket, une plateforme qui connecte les consommateurs avec les producteurs locaux.

Tes domaines d'expertise incluent :
- Agriculture biologique et durable
- Produits de saison et calendrier agricole
- Conseils de conservation des aliments
- Recettes avec des produits locaux
- Pratiques agricoles respectueuses de l'environnement
- Circuits courts et commerce local

Réponds de manière concise, pratique et bienveillante. Encourage toujours l'achat local et les pratiques durables.`

    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ]

    console.log("Sending to OpenAI:", { messageCount: fullMessages.length, userMessage })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: fullMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenAI API error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to get AI response' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const data = await response.json()
    const aiMessage = data.choices[0].message.content

    console.log("OpenAI response received, length:", aiMessage?.length)

    // Return both formats for compatibility
    return new Response(
      JSON.stringify({ 
        message: aiMessage,  // New format
        reply: aiMessage,    // Old format (backward compatibility)
        conversation_history: [...messages, { role: 'assistant', content: aiMessage }]
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in agrimarket-chat function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

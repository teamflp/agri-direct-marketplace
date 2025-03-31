
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!openAIApiKey) {
      throw new Error("La clé API OpenAI n'est pas configurée");
    }

    console.log("Envoi des messages à OpenAI:", JSON.stringify(messages));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Tu es l'assistant virtuel d'AgriMarket, une plateforme de vente directe entre agriculteurs bio et consommateurs. 
            Tu aides les utilisateurs avec les questions sur l'agriculture biologique, les produits de saison, 
            les fonctionnalités de la plateforme et la mise en relation avec l'équipe AgriMarket. 
            Sois utile, amical et informatif. Réponds en français uniquement.`
          },
          ...messages
        ],
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Erreur API OpenAI:', error);
      throw new Error(error.error?.message || "Erreur lors de l'appel à l'API OpenAI");
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    console.log('Réponse OpenAI reçue:', reply);

    return new Response(
      JSON.stringify({ reply }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Erreur du serveur:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

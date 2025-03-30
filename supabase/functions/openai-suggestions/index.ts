
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    const { prompt, model, type } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error("La clé API OpenAI n'est pas configurée");
    }

    console.log(`Appel OpenAI de type: ${type}`);
    console.log(`Prompt: ${prompt}`);
    
    // Choisir le modèle approprié, avec gpt-4o-mini par défaut
    const selectedModel = model || 'gpt-4o-mini';
    
    let requestBody;
    
    // Pour les requêtes de test, ne pas utiliser le format JSON
    if (type === 'test') {
      requestBody = {
        model: selectedModel,
        messages: [
          {
            role: 'system',
            content: 'Vous êtes un expert en agriculture biologique et en alimentation durable.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      };
    } else {
      // Pour les autres types de requêtes, utiliser le format JSON
      requestBody = {
        model: selectedModel,
        messages: [
          {
            role: 'system',
            content: 'Vous êtes un expert en agriculture biologique et en alimentation durable. Répondez au format JSON.'
          },
          {
            role: 'user',
            content: `${prompt} Veuillez répondre au format JSON.`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Erreur API OpenAI:', error);
      throw new Error(error.error?.message || "Erreur lors de l'appel à l'API OpenAI");
    }

    const data = await response.json();
    console.log('Réponse OpenAI reçue');
    
    return new Response(
      JSON.stringify({
        content: data.choices[0]?.message?.content,
        type: type
      }),
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

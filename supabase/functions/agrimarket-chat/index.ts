
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting - simple in-memory store (resets on function restart)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 20;

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         req.headers.get('cf-connecting-ip') ||
         req.headers.get('x-real-ip') ||
         'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = ip;
  
  // Clean up expired entries periodically
  if (Math.random() < 0.01) { // 1% chance to cleanup
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k);
      }
    }
  }
  
  const entry = rateLimitStore.get(key);
  
  if (!entry || entry.resetTime < now) {
    // First request or window expired
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limited
  }
  
  entry.count++;
  return true;
}

function createErrorResponse(
  message: string, 
  errorCode: string, 
  status: number, 
  correlationId: string,
  details?: any
) {
  return new Response(
    JSON.stringify({ 
      error: message,
      error_code: errorCode,
      correlation_id: correlationId,
      ...(details && { details })
    }),
    { 
      status, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

serve(async (req) => {
  const correlationId = crypto.randomUUID();
  const clientIP = getClientIP(req);
  const maskedIP = clientIP.replace(/\.\d+$/, '.xxx'); // Mask last octet for privacy
  
  console.log(`[${correlationId}] Request from ${maskedIP}`);
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      console.log(`[${correlationId}] Rate limited: ${maskedIP}`);
      return createErrorResponse(
        'Trop de requêtes. Veuillez patienter avant de réessayer.',
        'RATE_LIMITED',
        429,
        correlationId
      );
    }

    const body = await req.json()
    console.log(`[${correlationId}] Request body type:`, typeof body, "keys:", Object.keys(body || {}))
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      console.error(`[${correlationId}] OpenAI API key not configured`)
      return createErrorResponse(
        'Service IA non configuré',
        'MISSING_API_KEY',
        500,
        correlationId
      );
    }

    // Input validation and handling both formats
    let messages = []
    let userMessage = ''
    
    if (body.message !== undefined && body.conversation_history !== undefined) {
      // New format
      userMessage = body.message
      
      // Validate message
      if (!userMessage || typeof userMessage !== 'string') {
        return createErrorResponse(
          'Le message est requis et doit être une chaîne de caractères',
          'INVALID_REQUEST',
          400,
          correlationId
        );
      }
      
      if (userMessage.length > 2000) {
        return createErrorResponse(
          'Le message ne peut pas dépasser 2000 caractères',
          'INVALID_REQUEST',
          400,
          correlationId
        );
      }
      
      // Validate conversation history
      if (!Array.isArray(body.conversation_history)) {
        return createErrorResponse(
          'L\'historique de conversation doit être un tableau',
          'INVALID_REQUEST',
          400,
          correlationId
        );
      }
      
      if (body.conversation_history.length > 20) {
        return createErrorResponse(
          'L\'historique de conversation ne peut pas dépasser 20 messages',
          'INVALID_REQUEST',
          400,
          correlationId
        );
      }
      
      messages = [
        ...body.conversation_history,
        { role: 'user', content: userMessage }
      ]
    } else if (body.messages) {
      // Old format (backward compatibility)
      if (!Array.isArray(body.messages)) {
        return createErrorResponse(
          'Les messages doivent être un tableau',
          'INVALID_REQUEST',
          400,
          correlationId
        );
      }
      
      messages = body.messages
      userMessage = messages[messages.length - 1]?.content || ''
    } else {
      console.error(`[${correlationId}] Invalid request format:`, body)
      return createErrorResponse(
        'Format de requête invalide. Attendu { message, conversation_history } ou { messages }',
        'INVALID_REQUEST',
        400,
        correlationId
      );
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

    console.log(`[${correlationId}] Sending to OpenAI:`, { 
      messageCount: fullMessages.length, 
      userMessageLength: userMessage.length,
      historyLength: body.conversation_history?.length || 0
    })

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: fullMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[${correlationId}] OpenAI API error:`, response.status, errorText)
      
      // Handle specific OpenAI errors
      if (response.status === 429) {
        return createErrorResponse(
          'Le service IA est temporairement surchargé',
          'OPENAI_ERROR',
          503,
          correlationId,
          { openai_status: response.status }
        );
      }
      
      if (response.status >= 500) {
        return createErrorResponse(
          'Le service IA rencontre des difficultés techniques',
          'OPENAI_ERROR',
          503,
          correlationId,
          { openai_status: response.status }
        );
      }
      
      return createErrorResponse(
        'Erreur lors de la communication avec le service IA',
        'OPENAI_ERROR',
        500,
        correlationId,
        { openai_status: response.status }
      );
    }

    const data = await response.json()
    const aiMessage = data.choices[0].message.content

    console.log(`[${correlationId}] OpenAI response received, length:`, aiMessage?.length)

    // Return both formats for compatibility
    return new Response(
      JSON.stringify({ 
        message: aiMessage,  // New format
        reply: aiMessage,    // Old format (backward compatibility)
        correlation_id: correlationId,
        conversation_history: [...messages, { role: 'assistant', content: aiMessage }]
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error(`[${correlationId}] Error in agrimarket-chat function:`, error)
    return createErrorResponse(
      'Erreur interne du serveur',
      'INTERNAL',
      500,
      correlationId
    );
  }
})

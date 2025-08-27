import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Récupérer l'adresse IP de l'utilisateur depuis les en-têtes.
    // 'x-forwarded-for' est généralement défini par les proxys et l'infrastructure de Supabase.
    const ip = (req.headers.get("x-forwarded-for") ?? "").split(',')[0].trim();

    // Utiliser une IP de fallback pour les tests en local (ex: une IP en Côte d'Ivoire)
    const userIp = ip || "102.182.219.0";

    const ipinfoApiKey = Deno.env.get("IPINFO_API_KEY");
    if (!ipinfoApiKey) {
      // En l'absence de clé, retourner une valeur par défaut pour ne pas bloquer le dev
      console.warn("IPINFO_API_KEY not found. Returning default country 'CI'.");
      return new Response(JSON.stringify({ country: 'CI' }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiUrl = `https://ipinfo.io/${userIp}?token=${ipinfoApiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`IPinfo API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.country) {
        throw new Error("Country code not found in IPinfo response.");
    }

    return new Response(JSON.stringify({ country: data.country }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Error in geolocate-user function:", error);
    // En cas d'erreur, retourner une valeur par défaut pour assurer la continuité
    return new Response(JSON.stringify({ country: 'CI' }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);

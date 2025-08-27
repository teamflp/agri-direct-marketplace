import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ShippingRequest {
  destination: {
    lat: number;
    lng: number;
  };
  cart: {
    weight_kg: number;
    // Potentiellement d'autres détails comme les dimensions, le volume, etc.
  };
  farmer_id: string; // L'ID du producteur pour qui on cherche les options
}

// Simulation des transporteurs nationaux
const nationalCarriers = {
  colissimo: {
    name: "Colissimo Domicile",
    base_fee: 4.95,
    per_kg_fee: 1.5,
    calculate: function (weight_kg: number) {
      return this.base_fee + weight_kg * this.per_kg_fee;
    },
    description: (days: number) => `Livraison en ${days} jours ouvrables.`,
  },
  chronopost: {
    name: "Chronopost Express",
    base_fee: 8.50,
    per_kg_fee: 2.5,
    calculate: function (weight_kg: number) {
      return this.base_fee + weight_kg * this.per_kg_fee;
    },
    description: () => `Livraison le lendemain avant 13h.`,
  },
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, cart, farmer_id }: ShippingRequest = await req.json();

    if (!destination || !cart || !farmer_id) {
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const shippingOptions = [];

    // --- 1. Vérifier les zones de livraison locales du producteur ---
    const point = `POINT(${destination.lng} ${destination.lat})`;
    const { data: localZones, error: zonesError } = await supabase
      .from("delivery_zones")
      .select("id, name, base_fee")
      .eq("profile_id", farmer_id)
      .eq("is_active", true)
      // Utiliser la syntaxe de filtre PostgREST pour les fonctions PostGIS
      .filter('zone_polygon', 'st_contains', `SRID=4326;${point}`);

    if (zonesError) {
      console.error("Error fetching local delivery zones:", zonesError);
      // Ne pas bloquer si la recherche de zone échoue, continuer avec les transporteurs nationaux
    }

    if (localZones && localZones.length > 0) {
      for (const zone of localZones) {
        shippingOptions.push({
          id: `local-${zone.id}`,
          carrier: "local",
          name: `Livraison locale (${zone.name})`,
          price: zone.base_fee,
          description: "Livraison directe par le producteur.",
          estimated_days: 1,
        });
      }
    }

    // --- 2. Ajouter les options des transporteurs nationaux (simulation) ---

    // Colissimo
    const colissimoPrice = nationalCarriers.colissimo.calculate(cart.weight_kg);
    shippingOptions.push({
      id: "national-colissimo",
      carrier: "colissimo",
      name: nationalCarriers.colissimo.name,
      price: colissimoPrice,
      description: nationalCarriers.colissimo.description(2),
      estimated_days: 2,
    });

    // Chronopost
    const chronopostPrice = nationalCarriers.chronopost.calculate(cart.weight_kg);
    shippingOptions.push({
      id: "national-chronopost",
      carrier: "chronopost",
      name: nationalCarriers.chronopost.name,
      price: chronopostPrice,
      description: nationalCarriers.chronopost.description(),
      estimated_days: 1,
    });

    return new Response(JSON.stringify({ shipping_options: shippingOptions }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Error in get-shipping-rates function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);

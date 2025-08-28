import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const [
      profile,
      farmer_profile,
      orders,
      reviews,
      subscriptions,
      cart_items,
      favorites,
      messages_sent,
      messages_received,
    ] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("farmers").select("*").eq("user_id", user.id).single(),
      supabase.from("orders").select("*").eq("buyer_id", user.id),
      supabase.from("reviews").select("*").eq("user_id", user.id),
      supabase.from("subscriptions").select("*").eq("user_id", user.id),
      supabase.from("cart_items").select("*").eq("user_id", user.id),
      supabase.from("favorites").select("*").eq("user_id", user.id),
      supabase.from("farmer_messages").select("*").eq("sender_id", user.id),
      supabase.from("farmer_messages").select("*").eq("recipient_id", user.id),
    ]);

    const userData = {
      profile: profile.data,
      farmer_profile: farmer_profile.data,
      orders: orders.data,
      reviews: reviews.data,
      subscriptions: subscriptions.data,
      cart_items: cart_items.data,
      favorites: favorites.data,
      messages: {
        sent: messages_sent.data,
        received: messages_received.data,
      },
    };

    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

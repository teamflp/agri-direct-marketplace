
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function for logging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { sessionId, orderId } = await req.json();

    if (!sessionId && !orderId) {
      throw new Error("sessionId or orderId is required");
    }

    // Get Stripe secret key
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    let paymentStatus = 'unknown';
    let orderData = null;

    if (sessionId) {
      // Check payment status via Stripe session
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        logStep("Stripe session retrieved", { 
          sessionId, 
          paymentStatus: session.payment_status,
          status: session.status 
        });

        paymentStatus = session.payment_status || 'unpaid';
        
        // If we have the orderId from session metadata, update the order
        const sessionOrderId = session.metadata?.orderId;
        if (sessionOrderId && session.payment_status === 'paid') {
          const { error } = await supabase
            .from('orders')
            .update({ 
              payment_status: 'paid',
              stripe_session_id: sessionId,
              updated_at: new Date().toISOString()
            })
            .eq('id', sessionOrderId);

          if (!error) {
            logStep("Order updated from session check", { orderId: sessionOrderId });
          }
        }
      } catch (stripeError) {
        logStep("ERROR retrieving Stripe session", { sessionId, error: stripeError });
        paymentStatus = 'error';
      }
    }

    if (orderId) {
      // Get order from database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (order && !orderError) {
        orderData = order;
        
        // If order doesn't have payment status from session check, use database status
        if (paymentStatus === 'unknown') {
          paymentStatus = order.payment_status || 'pending';
        }
        
        logStep("Order retrieved from database", { 
          orderId, 
          dbPaymentStatus: order.payment_status,
          finalStatus: paymentStatus 
        });
      } else {
        logStep("ERROR retrieving order", { orderId, error: orderError });
      }
    }

    return new Response(
      JSON.stringify({
        paymentStatus,
        order: orderData,
        sessionId,
        orderId
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR in check-payment-status", { message: errorMessage });

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        paymentStatus: 'error'
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

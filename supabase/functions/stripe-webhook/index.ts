
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function for logging
const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY not configured");
    }
    
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET not configured");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    
    // Get the raw body
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      logStep("Webhook verified", { eventType: event.type });
    } catch (err) {
      logStep("ERROR: Webhook signature verification failed", { error: err.message });
      throw new Error("Webhook signature verification failed");
    }

    // Initialize Supabase client with service role key for database writes
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        logStep("Processing checkout.session.completed", { sessionId: session.id });

        const orderId = session.metadata?.orderId;
        const userId = session.metadata?.userId;

        if (!orderId) {
          logStep("WARNING: No orderId in session metadata");
          break;
        }

        // Update order status to paid
        const { error: orderError } = await supabase
          .from('orders')
          .update({ 
            payment_status: 'paid',
            stripe_session_id: session.id,
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId);

        if (orderError) {
          logStep("ERROR updating order", { orderId, error: orderError });
          throw orderError;
        }

        logStep("Order updated successfully", { orderId, status: 'paid' });

        // Send confirmation email (if email function exists)
        try {
          await supabase.functions.invoke('send-order-confirmation', {
            body: {
              orderId,
              userId,
              sessionId: session.id
            }
          });
          logStep("Order confirmation email sent", { orderId });
        } catch (emailError) {
          logStep("WARNING: Could not send confirmation email", { orderId, error: emailError });
          // Don't fail the webhook if email fails
        }

        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        logStep("Processing invoice.paid", { invoiceId: invoice.id });

        if (invoice.payment_intent && typeof invoice.payment_intent === 'string') {
          const paymentIntent = await stripe.paymentIntents.retrieve(invoice.payment_intent);
          const orderId = paymentIntent.metadata?.orderId;

          if (orderId && invoice.hosted_invoice_url) {
            const { error: invoiceError } = await supabase
              .from('orders')
              .update({
                invoice_url: invoice.hosted_invoice_url,
                updated_at: new Date().toISOString()
              })
              .eq('id', orderId);

            if (invoiceError) {
              logStep("ERROR updating order with invoice URL", { orderId, error: invoiceError });
            } else {
              logStep("Order updated with invoice URL", { orderId, url: invoice.hosted_invoice_url });
            }
          } else {
            logStep("WARNING: No orderId or invoice URL found for invoice.paid", { invoiceId: invoice.id });
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logStep("Processing payment_intent.succeeded", { paymentIntentId: paymentIntent.id });

        const orderId = paymentIntent.metadata?.orderId;
        
        if (orderId) {
          // Additional confirmation that payment succeeded
          const { error } = await supabase
            .from('orders')
            .update({ 
              payment_status: 'paid',
              stripe_payment_intent_id: paymentIntent.id,
              updated_at: new Date().toISOString()
            })
            .eq('id', orderId);

          if (error) {
            logStep("ERROR updating order for payment_intent", { orderId, error });
          } else {
            logStep("Order payment confirmed", { orderId });
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        logStep("Processing payment_intent.payment_failed", { paymentIntentId: paymentIntent.id });

        const orderId = paymentIntent.metadata?.orderId;
        
        if (orderId) {
          const { error } = await supabase
            .from('orders')
            .update({ 
              payment_status: 'failed',
              stripe_payment_intent_id: paymentIntent.id,
              updated_at: new Date().toISOString()
            })
            .eq('id', orderId);

          if (error) {
            logStep("ERROR updating order for failed payment", { orderId, error });
          } else {
            logStep("Order marked as failed", { orderId });
          }
        }
        break;
      }

      default:
        logStep("Unhandled event type", { eventType: event.type });
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR in webhook handler", { message: errorMessage });

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});

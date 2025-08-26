
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
  console.log(`[CHECKOUT-SESSION] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Get Stripe secret key
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      logStep("ERROR: STRIPE_SECRET_KEY not configured");
      throw new Error("STRIPE_SECRET_KEY not configured");
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      logStep("ERROR: No authorization header");
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !userData.user?.email) {
      logStep("ERROR: User not authenticated", { userError });
      throw new Error("User not authenticated");
    }

    logStep("User authenticated", { userId: userData.user.id, email: userData.user.email });

    // Define types for request body
    interface LineItem {
      name: string;
      description?: string;
      image_url?: string;
      unit_price: number;
      quantity: number;
    }

    interface RequestBody {
      amount: number;
      currency?: string;
      orderId: string;
      items: LineItem[];
      metadata?: Record<string, unknown>;
    }

    // Parse request body
    const { amount, currency = "eur", orderId, items, metadata = {} } = await req.json() as RequestBody;

    if (!amount || !orderId) {
      logStep("ERROR: Missing required fields", { amount, orderId });
      throw new Error("Amount and orderId are required");
    }

    logStep("Request parsed", { amount, currency, orderId, itemsCount: items?.length });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ 
      email: userData.user.email, 
      limit: 1 
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Existing customer found", { customerId });
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: userData.user.email,
        metadata: {
          userId: userData.user.id
        }
      });
      customerId = customer.id;
      logStep("New customer created", { customerId });
    }

    // Create line items for Stripe
    const lineItems = items?.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
          description: item.description || '',
          images: item.image_url ? [item.image_url] : [],
        },
        unit_amount: Math.round(item.unit_price * 100), // Convert to cents
      },
      quantity: item.quantity,
    })) || [{
      price_data: {
        currency: currency,
        product_data: {
          name: "Commande AgriMarket",
        },
        unit_amount: Math.round(amount * 100), // Convert to cents
      },
      quantity: 1,
    }];

    logStep("Line items prepared", { lineItemsCount: lineItems.length });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${req.headers.get("origin")}/checkout?status=canceled&order_id=${orderId}`,
      payment_intent_data: {
        metadata: {
          orderId: orderId,
          userId: userData.user.id,
          ...metadata
        },
      },
      metadata: {
        orderId: orderId,
        userId: userData.user.id,
        ...metadata
      },
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['CI', 'FR', 'BE', 'CH'] // Côte d'Ivoire, France, etc.
      },
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(
      JSON.stringify({ 
        url: session.url,
        sessionId: session.id 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR in create-checkout-session", { message: errorMessage, stack: error instanceof Error ? error.stack : undefined });
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

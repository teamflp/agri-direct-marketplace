
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function for logging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[ORDER-CONFIRMATION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { orderId, userId, sessionId } = await req.json();

    if (!orderId || !userId) {
      throw new Error("orderId and userId are required");
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get order details with items and user info
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (
            name,
            image_url,
            farmer:farmers (
              name,
              farm_name
            )
          )
        ),
        buyer:profiles (
          first_name,
          last_name,
          email
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      logStep("ERROR: Order not found", { orderId, error: orderError });
      throw new Error("Order not found");
    }

    logStep("Order details retrieved", { orderId, total: order.total });

    // Format order confirmation email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #16a34a; color: white; padding: 20px; text-align: center;">
          <h1>🌱 AgriMarket</h1>
          <h2>Commande confirmée !</h2>
        </div>
        
        <div style="padding: 20px;">
          <p>Bonjour ${order.buyer?.first_name || 'cher client'},</p>
          
          <p>Nous avons bien reçu votre paiement et votre commande <strong>#${orderId.slice(0, 8)}</strong> est confirmée !</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Détails de votre commande :</h3>
            <ul style="list-style: none; padding: 0;">
              ${order.order_items?.map((item: any) => `
                <li style="border-bottom: 1px solid #e5e7eb; padding: 10px 0;">
                  <strong>${item.product?.name || 'Produit'}</strong><br>
                  Quantité: ${item.quantity} × ${item.unit_price.toFixed(2)}€<br>
                  Producteur: ${item.product?.farmer?.farm_name || item.product?.farmer?.name || 'N/A'}<br>
                  Sous-total: ${(item.quantity * item.unit_price).toFixed(2)}€
                </li>
              `).join('') || ''}
            </ul>
            
            <div style="border-top: 2px solid #16a34a; padding-top: 15px; margin-top: 15px;">
              <p style="font-size: 18px; font-weight: bold; margin: 0;">
                Total payé : ${order.total.toFixed(2)}€
              </p>
            </div>
          </div>
          
          <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>📦 Livraison :</h3>
            <p><strong>Mode :</strong> ${order.delivery_method === 'delivery' ? 'Livraison à domicile' : 'Retrait à la ferme'}</p>
            ${order.delivery_address ? `<p><strong>Adresse :</strong> ${order.delivery_address}</p>` : ''}
            ${order.delivery_date ? `<p><strong>Date prévue :</strong> ${new Date(order.delivery_date).toLocaleDateString('fr-FR')}</p>` : ''}
          </div>
          
          <p>Nos producteurs vont préparer votre commande avec soin. Vous recevrez une notification dès qu'elle sera prête !</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'sandbox.lovable.dev') || 'https://agrimarket.ci'}/buyer/orders" 
               style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Suivre ma commande
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            Merci de soutenir nos producteurs locaux ! 🌱<br>
            L'équipe AgriMarket
          </p>
        </div>
        
        <div style="background-color: #f9fafb; padding: 15px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>Cet email de confirmation a été envoyé automatiquement. Si vous avez des questions, contactez-nous à support@agrimarket.ci</p>
        </div>
      </div>
    `;

    // In a real implementation, you would send this via a service like Resend
    // For now, we'll just log it and return success
    logStep("Email content prepared", { 
      recipient: order.buyer?.email, 
      orderId,
      contentLength: emailContent.length 
    });

    // Here you would typically call your email service:
    // const emailResult = await resend.emails.send({
    //   from: 'AgriMarket <noreply@agrimarket.ci>',
    //   to: order.buyer?.email,
    //   subject: `Commande confirmée #${orderId.slice(0, 8)} - AgriMarket`,
    //   html: emailContent
    // });

    logStep("Order confirmation processed successfully", { orderId });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Order confirmation processed",
        orderId 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    logStep("ERROR in send-order-confirmation", { message: errorMessage });

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


import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  orderId: string;
  status: string;
  customerEmail: string;
  customerName?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const statusTemplates = {
  confirmed: {
    subject: "Commande confirmée - Préparation en cours",
    template: (data: any) => `
      <h2>Votre commande a été confirmée !</h2>
      <p>Bonjour ${data.customerName || 'cher client'},</p>
      <p>Nous vous confirmons que votre commande #${data.orderId.slice(0, 8)} a été reçue et est maintenant en cours de préparation.</p>
      <p>Vous recevrez une nouvelle notification dès que votre commande sera expédiée.</p>
      <p>Merci de votre confiance !</p>
    `
  },
  shipped: {
    subject: "Commande expédiée - Suivi disponible",
    template: (data: any) => `
      <h2>Votre commande a été expédiée !</h2>
      <p>Bonjour ${data.customerName || 'cher client'},</p>
      <p>Bonne nouvelle ! Votre commande #${data.orderId.slice(0, 8)} a été expédiée.</p>
      ${data.trackingNumber ? `<p><strong>Numéro de suivi :</strong> ${data.trackingNumber}</p>` : ''}
      ${data.estimatedDelivery ? `<p><strong>Livraison estimée :</strong> ${new Date(data.estimatedDelivery).toLocaleDateString('fr-FR')}</p>` : ''}
      <p>Vous pouvez suivre l'évolution de votre livraison dans votre espace client.</p>
    `
  },
  out_for_delivery: {
    subject: "Livraison en cours - Colis en route",
    template: (data: any) => `
      <h2>Votre commande arrive bientôt !</h2>
      <p>Bonjour ${data.customerName || 'cher client'},</p>
      <p>Votre commande #${data.orderId.slice(0, 8)} est actuellement en cours de livraison.</p>
      <p>Assurez-vous d'être disponible pour réceptionner votre colis.</p>
      ${data.trackingNumber ? `<p><strong>Numéro de suivi :</strong> ${data.trackingNumber}</p>` : ''}
    `
  },
  delivered: {
    subject: "Commande livrée avec succès",
    template: (data: any) => `
      <h2>Votre commande a été livrée !</h2>
      <p>Bonjour ${data.customerName || 'cher client'},</p>
      <p>Nous vous confirmons que votre commande #${data.orderId.slice(0, 8)} a été livrée avec succès.</p>
      <p>Nous espérons que vous êtes satisfait de vos produits. N'hésitez pas à laisser un avis sur notre plateforme.</p>
      <p>Merci de votre confiance et à bientôt !</p>
    `
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, status, customerEmail, customerName, trackingNumber, estimatedDelivery }: NotificationRequest = await req.json();

    console.log(`Sending delivery notification for order ${orderId}, status: ${status}`);

    // Initialiser Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Vérifier si on a un template pour ce statut
    const template = statusTemplates[status as keyof typeof statusTemplates];
    if (!template) {
      console.log(`No template found for status: ${status}`);
      return new Response(JSON.stringify({ message: "No template for this status" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Préparer les données pour le template
    const templateData = {
      orderId,
      customerName,
      trackingNumber,
      estimatedDelivery
    };

    // Envoyer l'email
    const emailResponse = await resend.emails.send({
      from: "AgriMarket <noreply@agrimarket.com>",
      to: [customerEmail],
      subject: template.subject,
      html: template.template(templateData)
    });

    console.log("Email sent successfully:", emailResponse);

    // Créer une notification dans l'app aussi
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Récupérer l'ID de l'utilisateur depuis la commande
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('buyer_id')
      .eq('id', orderId)
      .single();

    if (!orderError && order) {
      await supabase
        .from('subscription_notifications')
        .insert({
          user_id: order.buyer_id,
          type: 'delivery',
          title: template.subject,
          message: `Mise à jour de livraison pour votre commande #${orderId.slice(0, 8)}`,
          data: { orderId, status, trackingNumber, estimatedDelivery }
        });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Error sending delivery notification:", error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};

serve(handler);

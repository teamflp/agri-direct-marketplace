import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// --- Interfaces & Templates ---

interface NotificationRequest {
  orderId: string;
  status: string;
  customerEmail: string;
  customerPhone?: string; // Ajout du numéro de téléphone
  customerName?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const statusTemplates = {
  // ... (templates email inchangés)
};

const statusSmsTemplates = {
    shipped: (data: any) => `Votre commande AgriMarket #${data.orderId.slice(0,8)} a été expédiée. Suivi: ${data.trackingNumber || 'N/A'}.`,
    out_for_delivery: (data: any) => `Votre commande AgriMarket #${data.orderId.slice(0,8)} est en cours de livraison.`,
    delivered: (data: any) => `Votre commande AgriMarket #${data.orderId.slice(0,8)} a été livrée. Merci de votre confiance !`,
};

// --- Fonctions d'envoi ---

const sendSms = async (to: string, body: string) => {
  const accountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const authToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const fromNumber = Deno.env.get("TWILIO_FROM_NUMBER");

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("Twilio config missing. Skipping SMS.");
    return;
  }

  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const credentials = btoa(`${accountSid}:${authToken}`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: to,
        From: fromNumber,
        Body: body,
      }),
    });

    const result = await response.json();
    if (result.error_code) {
      throw new Error(result.error_message);
    }
    console.log("SMS sent successfully, SID:", result.sid);
  } catch (error) {
    console.error("Error sending SMS via Twilio:", error.message);
  }
};


const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
        orderId, status, customerEmail, customerPhone,
        customerName, trackingNumber, estimatedDelivery
    }: NotificationRequest = await req.json();

    console.log(`Sending notification for order ${orderId}, status: ${status}`);

    const emailTemplate = statusTemplates[status as keyof typeof statusTemplates];
    if (!emailTemplate) {
      console.log(`No email template for status: ${status}`);
      // On ne retourne pas forcément, on peut vouloir envoyer un SMS même sans email.
    }

    const templateData = { orderId, customerName, trackingNumber, estimatedDelivery };

    // 1. Envoyer l'email (si template existe)
    if (emailTemplate) {
        const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
        await resend.emails.send({
            from: "AgriMarket <noreply@agrimarket.com>",
            to: [customerEmail],
            subject: emailTemplate.subject,
            html: emailTemplate.template(templateData)
        });
        console.log("Email sent successfully.");
    }

    // 2. Envoyer le SMS (si numéro et template existent)
    const smsTemplate = statusSmsTemplates[status as keyof typeof statusSmsTemplates];
    if (customerPhone && smsTemplate) {
        const smsBody = smsTemplate(templateData);
        await sendSms(customerPhone, smsBody);
    }

    // 3. Créer une notification dans l'app
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: order } = await supabase.from('orders').select('buyer_id').eq('id', orderId).single();
    if (order && emailTemplate) {
      await supabase.from('subscription_notifications').insert({
          user_id: order.buyer_id,
          type: 'delivery',
          title: emailTemplate.subject,
          message: `Mise à jour pour commande #${orderId.slice(0, 8)}`,
          data: { orderId, status, trackingNumber, estimatedDelivery }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("Error sending delivery notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};

serve(handler);

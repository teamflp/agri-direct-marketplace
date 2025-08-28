import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

serve(async (req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: { user } } = await createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    ).auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // It's better to perform these deletions in a transaction
    // but Supabase Edge Functions don't directly support transactions across multiple tables
    // in the same way as a backend server. We will delete from each table sequentially.
    // The ON DELETE CASCADE constraint in the database schema will handle some of this automatically.

    // The 'profiles' table has a foreign key to auth.users with ON DELETE CASCADE,
    // so deleting the user from auth should cascade to profiles.
    // However, other tables might need manual cleanup.

    const tablesToDeleteFrom = [
      "reviews",
      "subscriptions",
      "cart_items",
      "favorites",
      "farmer_messages",
      "farmers" // Assuming farmer profile is tied to user_id
    ];

    for (const table of tablesToDeleteFrom) {
        let column = 'user_id';
        if (table === 'farmer_messages') {
            // Special handling for messages table
            await supabaseAdmin.from(table).delete().eq('sender_id', user.id);
            await supabaseAdmin.from(table).delete().eq('recipient_id', user.id);
            continue;
        }
        if (table === 'farmers') {
            column = 'user_id';
        }
        const { error } = await supabaseAdmin.from(table).delete().eq(column, user.id);
        if (error) {
            console.error(`Error deleting from ${table}:`, error);
            // Decide if you want to stop or continue on error
        }
    }

    // Finally, delete the user from auth.users
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(user.id);
    if (authError) {
      throw new Error(`Could not delete user: ${authError.message}`);
    }

    return new Response(JSON.stringify({ message: "Account deleted successfully" }), {
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

-- Step 1: Add a column to track the last time an alert was sent for a variant
-- This helps prevent sending too many notifications for the same low-stock item.
ALTER TABLE public.product_variants
ADD COLUMN last_alerted_at timestamptz;

COMMENT ON COLUMN public.product_variants.last_alerted_at IS 'Timestamp of the last time a low stock alert was sent for this variant.';


-- Step 2: Create the trigger function that checks for low stock
CREATE OR REPLACE FUNCTION public.check_low_stock_alert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    farmer_user_id uuid;
    product_name text;
    variant_name text;
BEGIN
    -- Proceed only if the stock level has changed and is now lower.
    IF NEW.stock_level IS DISTINCT FROM OLD.stock_level AND NEW.stock_level < OLD.stock_level THEN
        -- Check if the new stock level is at or below the threshold, and if the threshold is configured ( > 0).
        IF NEW.stock_level <= NEW.low_stock_threshold AND NEW.low_stock_threshold > 0 THEN
            -- To prevent spam, check if an alert has not been sent recently (e.g., in the last 24 hours).
            IF NEW.last_alerted_at IS NULL OR NEW.last_alerted_at < (now() - interval '24 hours') THEN

                -- Get product and farmer details for the notification message.
                SELECT p.name, p.farmer_id INTO product_name, farmer_user_id
                FROM public.products p
                WHERE p.id = NEW.product_id;

                -- Get a display name for the variant.
                variant_name := COALESCE(NEW.options->>'name', NEW.sku, 'Défaut');

                -- Insert a notification for the farmer into the central notifications table.
                INSERT INTO public.notifications (user_id, title, message, action_url, type)
                VALUES (
                    farmer_user_id,
                    'Alerte de stock bas',
                    'Le stock pour "' || product_name || '" (Variante: ' || variant_name || ') est bas. Il ne reste que ' || NEW.stock_level || ' unité(s).',
                    '/farmer/inventory', -- A direct link to the inventory page.
                    'low_stock'
                );

                -- Update the timestamp on the variant itself to mark that an alert has been sent.
                -- This runs in the same transaction as the original update.
                UPDATE public.product_variants
                SET last_alerted_at = now()
                WHERE id = NEW.id;

            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.check_low_stock_alert() IS 'Trigger function to send a notification when a product variant stock level falls below its threshold.';


-- Step 3: Create the trigger that executes the function after an update on product_variants.
CREATE TRIGGER low_stock_alert_trigger
AFTER UPDATE ON public.product_variants
FOR EACH ROW
EXECUTE FUNCTION public.check_low_stock_alert();

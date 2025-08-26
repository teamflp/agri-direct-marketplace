CREATE OR REPLACE FUNCTION public.handle_stock_deduction(p_order_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    item RECORD;
BEGIN
    -- This function is called by the Stripe webhook after a successful payment.
    -- It iterates through the order items, decrements the stock for each variant,
    -- and creates a stock movement record for auditing purposes.

    RAISE LOG 'Processing stock deduction for order %', p_order_id;

    FOR item IN
        SELECT
            oi.quantity,
            oi.variant_id
        FROM
            public.order_items AS oi
        WHERE
            oi.order_id = p_order_id AND oi.variant_id IS NOT NULL
    LOOP
        -- Log the specific item being processed
        RAISE LOG 'Deducting % from stock for variant %', item.quantity, item.variant_id;

        -- Decrement the stock level for the purchased variant
        UPDATE public.product_variants
        SET stock_level = stock_level - item.quantity
        WHERE id = item.variant_id;

        -- Insert a record into stock_movements for traceability
        INSERT INTO public.stock_movements (variant_id, change_quantity, reason, reference_id)
        VALUES (item.variant_id, -item.quantity, 'sale', p_order_id);

    END LOOP;

    RAISE LOG 'Finished stock deduction for order %', p_order_id;
END;
$$;

-- Add a comment to the function for clarity
COMMENT ON FUNCTION public.handle_stock_deduction(uuid)
IS 'Handles stock deduction for all items in an order after successful payment.';

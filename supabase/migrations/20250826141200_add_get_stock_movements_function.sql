-- This function retrieves all stock movements for the currently authenticated farmer.
-- It joins across three tables (stock_movements, product_variants, products)
-- to securely filter by the farmer_id associated with the product.
-- This is much more efficient than fetching all movements and filtering on the client.

CREATE OR REPLACE FUNCTION public.get_farmer_stock_movements()
RETURNS TABLE (
    id uuid,
    created_at timestamptz,
    reason stock_movement_reason,
    change_quantity integer,
    reference_id uuid,
    notes text,
    product_name text,
    variant_options jsonb,
    variant_sku text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT
        sm.id,
        sm.created_at,
        sm.reason,
        sm.change_quantity,
        sm.reference_id,
        sm.notes,
        p.name AS product_name,
        pv.options AS variant_options,
        pv.sku AS variant_sku
    FROM
        public.stock_movements sm
    JOIN
        public.product_variants pv ON sm.variant_id = pv.id
    JOIN
        public.products p ON pv.product_id = p.id
    WHERE
        p.farmer_id = auth.uid()
    ORDER BY
        sm.created_at DESC;
$$;

COMMENT ON FUNCTION public.get_farmer_stock_movements()
IS 'Retrieves a list of all stock movements for the calling farmer, with product and variant details.';

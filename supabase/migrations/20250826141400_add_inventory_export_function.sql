-- This function provides a flattened view of the inventory for a given farmer,
-- making it easy to export to formats like CSV.
CREATE OR REPLACE FUNCTION public.get_farmer_inventory_for_export()
RETURNS TABLE (
    product_name text,
    variant_name text,
    sku text,
    stock_level integer,
    price numeric,
    unit text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT
        p.name AS product_name,
        COALESCE(pv.options->>'name', 'Défaut') AS variant_name,
        pv.sku,
        pv.stock_level,
        (p.price + pv.price_modifier) AS price,
        p.unit
    FROM
        public.products p
    JOIN
        public.product_variants pv ON p.id = pv.product_id
    WHERE
        p.farmer_id = auth.uid()
    ORDER BY
        p.name, variant_name;
$$;

COMMENT ON FUNCTION public.get_farmer_inventory_for_export()
IS 'Retrieves a flattened list of all product variants for the calling farmer, suitable for CSV export.';

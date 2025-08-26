CREATE OR REPLACE FUNCTION public.create_product_with_variants(
    product_data jsonb,
    variants_data jsonb
)
RETURNS uuid -- returns the new product's ID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_product_id uuid;
    variant jsonb;
    cat_id uuid;
BEGIN
    -- Note: This function assumes the user calling it has the 'farmer' role.
    -- RLS policies on the tables should prevent unauthorized access.

    -- For simplicity, this function assumes category_id is passed as a string name.
    -- A more robust implementation would handle category creation or selection.
    -- For now, we'll find or create a category with the given name.
    SELECT id INTO cat_id FROM public.categories WHERE name = product_data->>'category';
    IF cat_id IS NULL THEN
        INSERT INTO public.categories (name) VALUES (product_data->>'category') RETURNING id INTO cat_id;
    END IF;

    -- Insert the product and get its new ID
    INSERT INTO public.products (name, price, category_id, unit, is_organic, description, farmer_id)
    VALUES (
        product_data->>'name',
        (product_data->>'price')::numeric,
        cat_id,
        product_data->>'unit',
        (product_data->>'is_organic')::boolean,
        product_data->>'description',
        auth.uid() -- Set the farmer_id to the currently authenticated user
    ) RETURNING id INTO new_product_id;

    -- Loop through the variants JSON array and insert each one
    FOR variant IN SELECT * FROM jsonb_array_elements(variants_data)
    LOOP
        INSERT INTO public.product_variants (product_id, options, sku, price_modifier, stock_level, low_stock_threshold)
        VALUES (
            new_product_id,
            variant->'options',
            variant->>'sku',
            (variant->>'price_modifier')::numeric,
            (variant->>'stock_level')::integer,
            (variant->>'low_stock_threshold')::integer
        );
    END LOOP;

    RETURN new_product_id;
END;
$$;

COMMENT ON FUNCTION public.create_product_with_variants(jsonb, jsonb)
IS 'Creates a product and its associated variants in a single transaction.';

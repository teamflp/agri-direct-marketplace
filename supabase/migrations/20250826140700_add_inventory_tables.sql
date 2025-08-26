-- Step 1: Create an ENUM type for the reason of a stock movement.
-- This ensures data consistency for why stock levels change.
CREATE TYPE stock_movement_reason AS ENUM (
    'initial_stock',
    'sale',
    'return',
    'adjustment_add',
    'adjustment_remove',
    'damage'
);

-- Step 2: Create the product_variants table.
-- This table will store individual stock levels for each product variation (e.g., size, color).
CREATE TABLE public.product_variants (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku text UNIQUE,
    options jsonb,
    price_modifier numeric NOT NULL DEFAULT 0,
    stock_level integer NOT NULL DEFAULT 0,
    low_stock_threshold integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add comments for clarity
COMMENT ON TABLE public.product_variants IS 'Stores variations of products, each with its own stock level.';
COMMENT ON COLUMN public.product_variants.sku IS 'Stock Keeping Unit, a unique identifier for the variant.';
COMMENT ON COLUMN public.product_variants.options IS 'JSONB to store variant attributes like {"size": "Large", "color": "Red"}.';
COMMENT ON COLUMN public.product_variants.price_modifier IS 'Price difference from the base product price.';
COMMENT ON COLUMN public.product_variants.stock_level IS 'The actual number of items in stock for this variant.';
COMMENT ON COLUMN public.product_variants.low_stock_threshold IS 'The stock level at which a low stock alert should be triggered.';


-- Step 3: Create the stock_movements table.
-- This table provides an auditable log of all changes to inventory levels.
CREATE TABLE public.stock_movements (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    variant_id uuid NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
    change_quantity integer NOT NULL,
    reason stock_movement_reason NOT NULL,
    reference_id uuid,
    notes text,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Add comments for clarity
COMMENT ON TABLE public.stock_movements IS 'Logs every change in stock for each product variant for full traceability.';
COMMENT ON COLUMN public.stock_movements.change_quantity IS 'The quantity of the stock change. Can be positive (in) or negative (out).';
COMMENT ON COLUMN public.stock_movements.reason IS 'The reason for the stock movement (e.g., sale, return, adjustment).';
COMMENT ON COLUMN public.stock_movements.reference_id IS 'Optional reference to another table, e.g., an order_id for a sale.';


-- Step 4: Modify the existing order_items table.
-- We need to link order items to specific variants instead of general products.
ALTER TABLE public.order_items
ADD COLUMN variant_id uuid REFERENCES public.product_variants(id);

-- Make product_id nullable as the primary link is now the variant.
-- We keep it for historical data or for cases where a product has no variants.
ALTER TABLE public.order_items
ALTER COLUMN product_id DROP NOT NULL;

-- Add a check to ensure that either product_id or variant_id is set.
ALTER TABLE public.order_items
ADD CONSTRAINT order_items_product_or_variant_check
CHECK (product_id IS NOT NULL OR variant_id IS NOT NULL);


-- Step 5: Remove the old 'stock' and 'quantity' columns from the products table.
-- Stock management is now handled at the variant level.
ALTER TABLE public.products
DROP COLUMN IF EXISTS stock;

ALTER TABLE public.products
DROP COLUMN IF EXISTS quantity;

-- Step 6: Enable Row-Level Security (RLS) on the new tables.
-- This is a Supabase best practice to ensure data is secure by default.
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements ENABLE ROW LEVEL SECURITY;


-- Step 7: Define RLS policies for the new tables.
-- For now, we will allow farmers to manage variants and see stock movements for their own products.
-- Public access will be read-only for variants of products that are for sale.

-- Farmers can manage variants of their own products.
CREATE POLICY "Allow farmers to manage their own product variants"
ON public.product_variants
FOR ALL
USING (
    (SELECT farmer_id FROM public.products WHERE id = product_id) = auth.uid()
);

-- Users can view variants of any product.
CREATE POLICY "Allow all users to view product variants"
ON public.product_variants
FOR SELECT
USING (true);


-- Farmers can view stock movements for their own products.
CREATE POLICY "Allow farmers to view their own stock movements"
ON public.stock_movements
FOR SELECT
USING (
    (
        SELECT p.farmer_id
        FROM public.products p
        JOIN public.product_variants pv ON p.id = pv.product_id
        WHERE pv.id = variant_id
    ) = auth.uid()
);

-- Allow farmers to insert stock movements for their own products.
-- This is necessary for manual adjustments.
CREATE POLICY "Allow farmers to insert stock movements for their products"
ON public.stock_movements
FOR INSERT
WITH CHECK (
    (
        SELECT p.farmer_id
        FROM public.products p
        JOIN public.product_variants pv ON p.id = pv.product_id
        WHERE pv.id = variant_id
    ) = auth.uid()
);


-- Créer les buckets de stockage pour les images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('product-images', 'product-images', true, 52428800, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']),
  ('farmer-avatars', 'farmer-avatars', true, 10485760, ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Politiques RLS pour les images de produits
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own product images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own product images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Politiques RLS pour les avatars d'agriculteurs
CREATE POLICY "Public Access Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'farmer-avatars');

CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'farmer-avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own avatars" ON storage.objects
  FOR UPDATE USING (bucket_id = 'farmer-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own avatars" ON storage.objects
  FOR DELETE USING (bucket_id = 'farmer-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Améliorer la table products pour supporter les images multiples
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS primary_image_url TEXT;

-- Migrer les données existantes si nécessaire
UPDATE products 
SET images = jsonb_build_array(image_url),
    primary_image_url = image_url
WHERE image_url IS NOT NULL AND (images IS NULL OR images = '[]'::jsonb);

-- Améliorer la table orders pour le système de paiement
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT,
ADD COLUMN IF NOT EXISTS payment_metadata JSONB DEFAULT '{}'::jsonb;

-- Créer un index pour les recherches par session Stripe
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session_id ON orders(stripe_session_id);

-- Créer une table pour l'historique des statuts de commandes
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS pour l'historique des statuts
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view order status history for their orders" ON order_status_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_status_history.order_id 
      AND orders.buyer_id = auth.uid()
    )
  );

-- Fonction pour mettre à jour le statut avec historique
CREATE OR REPLACE FUNCTION update_order_status(
  order_id UUID,
  new_status TEXT,
  notes TEXT DEFAULT NULL
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  old_status TEXT;
BEGIN
  -- Récupérer l'ancien statut
  SELECT status INTO old_status FROM orders WHERE id = order_id;
  
  -- Mettre à jour le statut
  UPDATE orders 
  SET status = new_status, updated_at = NOW()
  WHERE id = order_id;
  
  -- Enregistrer dans l'historique
  INSERT INTO order_status_history (order_id, old_status, new_status, changed_by, notes)
  VALUES (order_id, old_status, new_status, auth.uid(), notes);
  
  RETURN TRUE;
END;
$$;

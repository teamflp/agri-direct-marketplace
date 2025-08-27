-- Migration: Création de la table pour les zones de livraison

-- Activer l'extension PostGIS si elle n'est pas déjà activée.
-- PostGIS est idéal pour les requêtes géographiques.
CREATE EXTENSION IF NOT EXISTS postgis;

-- Création de la table delivery_zones
CREATE TABLE IF NOT EXISTS public.delivery_zones (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name text NOT NULL,

    -- Utilisation du type `geometry` de PostGIS pour stocker les polygones des zones.
    -- SRID 4326 est la norme pour les coordonnées GPS (latitude/longitude).
    zone_polygon geometry(Polygon, 4326) NOT NULL,

    -- Frais de livraison de base pour cette zone.
    base_fee numeric(10, 2) NOT NULL DEFAULT 0.00,

    -- Actif ou non, pour facilement activer/désactiver une zone.
    is_active boolean NOT NULL DEFAULT true,

    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

-- Index pour accélérer les recherches géographiques
CREATE INDEX IF NOT EXISTS delivery_zones_geom_idx ON public.delivery_zones USING GIST (zone_polygon);

-- Index pour retrouver rapidement les zones d'un profil
CREATE INDEX IF NOT EXISTS delivery_zones_profile_id_idx ON public.delivery_zones(profile_id);

-- Fonction pour mettre à jour le champ updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour appeler la fonction avant chaque mise à jour
CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.delivery_zones
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Ajout de commentaires pour la clarté
COMMENT ON TABLE public.delivery_zones IS 'Stocke les zones de livraison géographiques définies par les producteurs.';
COMMENT ON COLUMN public.delivery_zones.profile_id IS 'Référence au profil (producteur) qui a défini la zone.';
COMMENT ON COLUMN public.delivery_zones.zone_polygon IS 'Polygone géographique de la zone de livraison (format PostGIS, SRID 4326).';
COMMENT ON COLUMN public.delivery_zones.base_fee IS 'Frais de livraison de base pour cette zone.';
COMMENT ON COLUMN public.delivery_zones.is_active IS 'Indique si la zone de livraison est actuellement active.';

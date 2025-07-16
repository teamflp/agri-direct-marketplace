import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Favorite {
  id: string;
  user_id: string;
  product_id?: string;
  farmer_id?: string;
  created_at: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
    unit: string;
    farmer?: {
      name: string;
    };
  };
  farmer?: {
    id: string;
    name: string;
    location: string;
    is_certified: boolean;
  };
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          product:products (
            id,
            name,
            price,
            image_url,
            unit,
            farmer:farmers (
              name
            )
          ),
          farmer:farmers (
            id,
            name,
            location,
            is_certified
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const transformedData: Favorite[] = (data || []).map(favorite => ({
        ...favorite,
        product: favorite.product ? {
          ...favorite.product,
          farmer: Array.isArray(favorite.product.farmer) ? favorite.product.farmer[0] : favorite.product.farmer
        } : undefined,
        farmer: Array.isArray(favorite.farmer) ? favorite.farmer[0] : favorite.farmer
      }));
      
      setFavorites(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (productId?: string, farmerId?: string) => {
    if (!user) throw new Error('Utilisateur non connecté');
    if (!productId && !farmerId) throw new Error('Product ID ou Farmer ID requis');

    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{
          user_id: user.id,
          product_id: productId,
          farmer_id: farmerId
        }])
        .select()
        .single();
      
      if (error) throw error;
      await fetchFavorites();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de l\'ajout aux favoris');
    }
  };

  const removeFromFavorites = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);
      
      if (error) throw error;
      await fetchFavorites();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la suppression');
    }
  };

  const isFavorite = (productId?: string, farmerId?: string) => {
    return favorites.some(fav => 
      (productId && fav.product_id === productId) ||
      (farmerId && fav.farmer_id === farmerId)
    );
  };

  const toggleFavorite = async (productId?: string, farmerId?: string) => {
    const existingFavorite = favorites.find(fav => 
      (productId && fav.product_id === productId) ||
      (farmerId && fav.farmer_id === farmerId)
    );

    if (existingFavorite) {
      await removeFromFavorites(existingFavorite.id);
    } else {
      await addToFavorites(productId, farmerId);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return {
    favorites,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    refetch: fetchFavorites
  };
};
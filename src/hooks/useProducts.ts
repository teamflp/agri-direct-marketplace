
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { parseJsonArray } from '@/types/database';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit: string;
  category: string;
  category_id?: string;
  farmer_id: string;
  image_url?: string;
  images?: string[];
  primary_image_url?: string;
  in_stock: boolean;
  stock_quantity?: number;
  created_at: string;
  updated_at: string;
  available_from?: string;
  available_until?: string;
  available_to?: string;
  is_organic?: boolean;
  free_delivery?: boolean;
  farm_pickup?: boolean;
  rating?: number;
  reviews_count?: number;
  farmer?: {
    id: string;
    name: string;
    location: string;
    distance: number;
  };
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (filters?: {
    category?: string;
    search?: string;
    farmer_id?: string;
    in_stock?: boolean;
  }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select(`
          *,
          farmer:farmers (
            id,
            name,
            location,
            distance
          )
        `);

      if (filters?.category) {
        query = query.eq('category', filters.category);
      }

      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      if (filters?.farmer_id) {
        query = query.eq('farmer_id', filters.farmer_id);
      }

      if (filters?.in_stock !== undefined) {
        query = query.eq('in_stock', filters.in_stock);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // Convertir les données avec les bons types
      const convertedProducts: Product[] = (data || []).map(product => ({
        ...product,
        images: parseJsonArray(product.images),
        unit: product.unit || '',
        category: product.category || product.category_id || '',
        category_id: product.category_id || product.category || '',
        available_from: product.available_from || undefined,
        available_until: product.available_until || product.available_to || undefined,
        available_to: product.available_to || product.available_until || undefined,
        is_organic: product.is_organic || false,
        free_delivery: product.free_delivery || false,
        farm_pickup: product.farm_pickup || false,
        rating: product.rating || 0,
        reviews_count: product.reviews_count || 0,
        in_stock: product.in_stock ?? true,
        updated_at: product.updated_at || product.created_at
      }));

      setProducts(convertedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          farmer:farmers (
            id,
            name,
            location,
            distance
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      return {
        ...data,
        images: parseJsonArray(data.images),
        unit: data.unit || '',
        category: data.category || data.category_id || '',
        category_id: data.category_id || data.category || '',
        available_from: data.available_from || undefined,
        available_until: data.available_until || data.available_to || undefined,
        available_to: data.available_to || data.available_until || undefined,
        is_organic: data.is_organic || false,
        free_delivery: data.free_delivery || false,
        farm_pickup: data.farm_pickup || false,
        rating: data.rating || 0,
        reviews_count: data.reviews_count || 0,
        in_stock: data.in_stock ?? true,
        updated_at: data.updated_at || data.created_at
      };
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
  };
};

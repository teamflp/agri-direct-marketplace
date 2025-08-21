
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

      const convertedProducts: Product[] = (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        unit: item.unit || '',
        category: item.category || item.category_id || '',
        category_id: item.category_id || item.category,
        farmer_id: item.farmer_id,
        image_url: item.image_url,
        images: parseJsonArray(item.images),
        primary_image_url: item.primary_image_url,
        in_stock: item.in_stock ?? true,
        stock_quantity: item.stock_quantity,
        created_at: item.created_at,
        updated_at: item.updated_at || item.created_at,
        available_from: item.available_from,
        available_until: item.available_until || item.available_to,
        available_to: item.available_to || item.available_until,
        is_organic: item.is_organic || false,
        free_delivery: item.free_delivery || false,
        farm_pickup: item.farm_pickup || false,
        rating: item.rating || 0,
        reviews_count: item.reviews_count || 0,
        farmer: item.farmer && item.farmer.length > 0 ? item.farmer[0] : undefined
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
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        unit: data.unit || '',
        category: data.category || data.category_id || '',
        category_id: data.category_id || data.category,
        farmer_id: data.farmer_id,
        image_url: data.image_url,
        images: parseJsonArray(data.images),
        primary_image_url: data.primary_image_url,
        in_stock: data.in_stock ?? true,
        stock_quantity: data.stock_quantity,
        created_at: data.created_at,
        updated_at: data.updated_at || data.created_at,
        available_from: data.available_from,
        available_until: data.available_until || data.available_to,
        available_to: data.available_to || data.available_until,
        is_organic: data.is_organic || false,
        free_delivery: data.free_delivery || false,
        farm_pickup: data.farm_pickup || false,
        rating: data.rating || 0,
        reviews_count: data.reviews_count || 0,
        farmer: data.farmer && data.farmer.length > 0 ? data.farmer[0] : undefined
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

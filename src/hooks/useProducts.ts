
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
        category: product.category || '',
        available_from: product.available_from || undefined,
        available_until: product.available_until || undefined
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
        category: data.category || '',
        available_from: data.available_from || undefined,
        available_until: data.available_until || undefined
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

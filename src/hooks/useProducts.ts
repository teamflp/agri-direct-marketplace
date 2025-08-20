
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

// Type for raw database response
interface DatabaseProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  unit?: string;
  category?: string;
  category_id?: string;
  farmer_id: string;
  image_url?: string;
  images?: any;
  primary_image_url?: string;
  in_stock?: boolean;
  stock_quantity?: number;
  created_at: string;
  updated_at?: string;
  available_from?: string;
  available_until?: string;
  available_to?: string;
  is_organic?: boolean;
  free_delivery?: boolean;
  farm_pickup?: boolean;
  rating?: number;
  reviews_count?: number;
  farmer?: Array<{
    id: string;
    name: string;
    location: string;
    distance: number;
  }>;
}

const convertDatabaseProduct = (dbProduct: DatabaseProduct): Product => {
  return {
    ...dbProduct,
    images: parseJsonArray(dbProduct.images),
    unit: dbProduct.unit || '',
    category: dbProduct.category || dbProduct.category_id || '',
    category_id: dbProduct.category_id || dbProduct.category || '',
    available_from: dbProduct.available_from || undefined,
    available_until: dbProduct.available_until || dbProduct.available_to || undefined,
    available_to: dbProduct.available_to || dbProduct.available_until || undefined,
    is_organic: dbProduct.is_organic || false,
    free_delivery: dbProduct.free_delivery || false,
    farm_pickup: dbProduct.farm_pickup || false,
    rating: dbProduct.rating || 0,
    reviews_count: dbProduct.reviews_count || 0,
    in_stock: dbProduct.in_stock ?? true,
    updated_at: dbProduct.updated_at || dbProduct.created_at,
    farmer: dbProduct.farmer && dbProduct.farmer.length > 0 ? dbProduct.farmer[0] : undefined
  };
};

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

      const convertedProducts: Product[] = (data || []).map((dbProduct: DatabaseProduct) => 
        convertDatabaseProduct(dbProduct)
      );

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

      return convertDatabaseProduct(data as DatabaseProduct);
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

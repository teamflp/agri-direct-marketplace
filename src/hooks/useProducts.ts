
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

      // Convert raw data to Product interface with explicit type casting
      const convertedProducts: Product[] = (data || []).map((rawItem: any) => {
        // Handle farmer data safely
        let farmerData = undefined;
        if (rawItem.farmer) {
          if (Array.isArray(rawItem.farmer) && rawItem.farmer.length > 0) {
            farmerData = rawItem.farmer[0];
          } else if (typeof rawItem.farmer === 'object') {
            farmerData = rawItem.farmer;
          }
        }

        return {
          id: rawItem.id,
          name: rawItem.name,
          description: rawItem.description,
          price: rawItem.price,
          unit: rawItem.unit || '',
          category: rawItem.category || rawItem.category_id || '',
          category_id: rawItem.category_id,
          farmer_id: rawItem.farmer_id,
          image_url: rawItem.image_url,
          images: parseJsonArray(rawItem.images),
          primary_image_url: rawItem.primary_image_url,
          in_stock: rawItem.in_stock ?? true,
          stock_quantity: rawItem.stock_quantity,
          created_at: rawItem.created_at,
          updated_at: rawItem.updated_at || rawItem.created_at,
          available_from: rawItem.available_from,
          available_until: rawItem.available_to, // Map available_to to available_until
          available_to: rawItem.available_to,
          is_organic: rawItem.is_organic || false,
          free_delivery: rawItem.free_delivery || false,
          farm_pickup: rawItem.farm_pickup || false,
          rating: rawItem.rating || 0,
          reviews_count: rawItem.reviews_count || 0,
          farmer: farmerData
        };
      });

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
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      // Handle farmer data safely with explicit type casting
      const rawData: any = data;
      let farmerData = undefined;
      if (rawData.farmer) {
        if (Array.isArray(rawData.farmer) && rawData.farmer.length > 0) {
          farmerData = rawData.farmer[0];
        } else if (typeof rawData.farmer === 'object') {
          farmerData = rawData.farmer;
        }
      }

      return {
        id: rawData.id,
        name: rawData.name,
        description: rawData.description,
        price: rawData.price,
        unit: rawData.unit || '',
        category: rawData.category || rawData.category_id || '',
        category_id: rawData.category_id,
        farmer_id: rawData.farmer_id,
        image_url: rawData.image_url,
        images: parseJsonArray(rawData.images),
        primary_image_url: rawData.primary_image_url,
        in_stock: rawData.in_stock ?? true,
        stock_quantity: rawData.stock_quantity,
        created_at: rawData.created_at,
        updated_at: rawData.updated_at || rawData.created_at,
        available_from: rawData.available_from,
        available_until: rawData.available_to, // Map available_to to available_until
        available_to: rawData.available_to,
        is_organic: rawData.is_organic || false,
        free_delivery: rawData.free_delivery || false,
        farm_pickup: rawData.farm_pickup || false,
        rating: rawData.rating || 0,
        reviews_count: rawData.reviews_count || 0,
        farmer: farmerData
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


import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Interface simple pour éviter les problèmes de récursion
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  farmer_id: string;
  category?: string;
  category_id?: string;
  in_stock?: boolean;
  stock_quantity?: number;
  unit?: string;
  organic?: boolean;
  local?: boolean;
  seasonal?: boolean;
  available_from?: string;
  available_to?: string;
  available_until?: string;
  farm_pickup?: boolean;
  free_delivery?: boolean;
  delivery_zones?: string[];
  created_at?: string;
  updated_at?: string;
  farmer?: {
    id: string;
    name: string;
    location: string;
  };
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: rawData, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          farmers!inner(id, name, location)
        `)
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        console.error('Error fetching products:', fetchError);
        throw fetchError;
      }

      // Transformation simple sans récursion de type
      const transformedProducts: Product[] = (rawData || []).map((item: any) => {
        const farmer = Array.isArray(item.farmers) ? item.farmers[0] : item.farmers;
        
        return {
          id: item.id,
          name: item.name || '',
          description: item.description || '',
          price: Number(item.price) || 0,
          image_url: item.image_url || '',
          farmer_id: item.farmer_id || '',
          category: item.category_name || 'Non classé',
          category_id: item.category_id || '',
          in_stock: Boolean(item.quantity > 0),
          stock_quantity: Number(item.quantity) || 0,
          unit: item.unit || 'pièce',
          organic: Boolean(item.is_organic),
          local: Boolean(item.is_local),
          seasonal: Boolean(item.is_seasonal),
          available_from: item.available_from || '',
          available_to: item.available_to || '',
          available_until: item.available_to || '',
          farm_pickup: Boolean(item.farm_pickup),
          free_delivery: Boolean(item.free_delivery),
          delivery_zones: item.delivery_zones || [],
          created_at: item.created_at || '',
          updated_at: item.updated_at || '',
          farmer: farmer ? {
            id: farmer.id || '',
            name: farmer.name || '',
            location: farmer.location || ''
          } : undefined
        };
      });

      setProducts(transformedProducts);
    } catch (err) {
      console.error('Error in fetchProducts:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const { data: rawData, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          farmers!inner(id, name, location)
        `)
        .eq('id', id)
        .maybeSingle();
      
      if (fetchError) {
        console.error('Error fetching product:', fetchError);
        return null;
      }

      if (!rawData) return null;

      const farmer = Array.isArray(rawData.farmers) ? rawData.farmers[0] : rawData.farmers;
      
      return {
        id: rawData.id,
        name: rawData.name || '',
        description: rawData.description || '',
        price: Number(rawData.price) || 0,
        image_url: rawData.image_url || '',
        farmer_id: rawData.farmer_id || '',
        category: rawData.category_name || 'Non classé',
        category_id: rawData.category_id || '',
        in_stock: Boolean(rawData.quantity > 0),
        stock_quantity: Number(rawData.quantity) || 0,
        unit: rawData.unit || 'pièce',
        organic: Boolean(rawData.is_organic),
        local: Boolean(rawData.is_local),
        seasonal: Boolean(rawData.is_seasonal),
        available_from: rawData.available_from || '',
        available_to: rawData.available_to || '',
        available_until: rawData.available_to || '',
        farm_pickup: Boolean(rawData.farm_pickup),
        free_delivery: Boolean(rawData.free_delivery),
        delivery_zones: rawData.delivery_zones || [],
        created_at: rawData.created_at || '',
        updated_at: rawData.updated_at || '',
        farmer: farmer ? {
          id: farmer.id || '',
          name: farmer.name || '',
          location: farmer.location || ''
        } : undefined
      };
    } catch (err) {
      console.error('Error getting product by ID:', err);
      return null;
    }
  };

  const searchProducts = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: rawData, error: fetchError } = await supabase
        .from('products')
        .select(`
          *,
          farmers!inner(id, name, location)
        `)
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });
      
      if (fetchError) {
        console.error('Error searching products:', fetchError);
        throw fetchError;
      }

      const transformedProducts: Product[] = (rawData || []).map((item: any) => {
        const farmer = Array.isArray(item.farmers) ? item.farmers[0] : item.farmers;
        
        return {
          id: item.id,
          name: item.name || '',
          description: item.description || '',
          price: Number(item.price) || 0,
          image_url: item.image_url || '',
          farmer_id: item.farmer_id || '',
          category: item.category_name || 'Non classé',
          category_id: item.category_id || '',
          in_stock: Boolean(item.quantity > 0),
          stock_quantity: Number(item.quantity) || 0,
          unit: item.unit || 'pièce',
          organic: Boolean(item.is_organic),
          local: Boolean(item.is_local),
          seasonal: Boolean(item.is_seasonal),
          available_from: item.available_from || '',
          available_to: item.available_to || '',
          available_until: item.available_to || '',
          farm_pickup: Boolean(item.farm_pickup),
          free_delivery: Boolean(item.free_delivery),
          delivery_zones: item.delivery_zones || [],
          created_at: item.created_at || '',
          updated_at: item.updated_at || '',
          farmer: farmer ? {
            id: farmer.id || '',
            name: farmer.name || '',
            location: farmer.location || ''
          } : undefined
        };
      });

      setProducts(transformedProducts);
    } catch (err) {
      console.error('Error in searchProducts:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    getProductById,
    searchProducts
  };
};

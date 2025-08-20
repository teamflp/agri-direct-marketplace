
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  farmer_id?: string;
  category_id?: string;
  image_url?: string;
  images?: string[];
  primary_image_url?: string;
  unit: string;
  stock: number;
  rating: number;
  reviews_count: number;
  is_organic: boolean;
  is_seasonal: boolean;
  free_delivery: boolean;
  farm_pickup: boolean;
  available_from?: string;
  available_to?: string;
  tags?: string[];
  created_at: string;
  farmer?: {
    id: string;
    name: string;
    location: string;
    distance?: number;
  };
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
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
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const transformedData: Product[] = (data || []).map(product => ({
        ...product,
        farmer: Array.isArray(product.farmer) ? product.farmer[0] : product.farmer,
        // Assurer la compatibilité avec l'ancien système d'images
        images: product.images || (product.image_url ? [product.image_url] : []),
        primary_image_url: product.primary_image_url || product.image_url
      }));
      
      setProducts(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string) => {
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
        farmer: Array.isArray(data.farmer) ? data.farmer[0] : data.farmer,
        images: data.images || (data.image_url ? [data.image_url] : []),
        primary_image_url: data.primary_image_url || data.image_url
      };
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors du chargement');
    }
  };

  const createProduct = async (productData: {
    name: string;
    description?: string;
    price: number;
    quantity: number;
    farmer_id?: string;
    category_id?: string;
    images?: string[];
    unit: string;
    stock: number;
    is_organic: boolean;
    is_seasonal: boolean;
    free_delivery: boolean;
    farm_pickup: boolean;
    available_from?: string;
    available_to?: string;
    tags?: string[];
  }) => {
    try {
      // Préparer les données avec le nouveau système d'images
      const insertData = {
        ...productData,
        images: productData.images || [],
        primary_image_url: productData.images?.[0] || null,
        // Maintenir la compatibilité avec l'ancien champ
        image_url: productData.images?.[0] || null
      };

      const { data, error } = await supabase
        .from('products')
        .insert([insertData])
        .select()
        .single();
      
      if (error) throw error;
      await fetchProducts();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la création');
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      // Préparer les données avec le nouveau système d'images
      const updateData = {
        ...productData,
        primary_image_url: productData.images?.[0] || productData.primary_image_url,
        // Maintenir la compatibilité avec l'ancien champ
        image_url: productData.images?.[0] || productData.image_url
      };

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      await fetchProducts();
      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchProducts();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Erreur lors de la suppression');
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
    createProduct,
    updateProduct,
    deleteProduct
  };
};

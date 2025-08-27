
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

// Types simplifiés pour éviter la récursion
export type ProductVariant = {
  id: string;
  product_id: string;
  options: { [key: string]: string };
  sku: string | null;
  price_modifier: number;
  stock_level: number;
  low_stock_threshold: number;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category_id: string | null;
  unit: string;
  is_organic: boolean;
  description: string | null;
  farmer_id: string;
  image_url: string | null;
  weight?: number; // Poids en kg
  created_at: string;
  updated_at: string;
  product_variants: ProductVariant[];
  // Propriétés calculées pour la compatibilité
  category?: string;
  inventory?: number;
  stock_quantity?: number;
  in_stock?: boolean;
  organic?: boolean;
  published?: boolean;
  image?: string;
  available_until?: string;
};

// Pour la compatibilité avec les anciens composants
export type ProductType = {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  unit: string;
  inventory: number;
  organic: boolean;
  published: boolean;
  description?: string;
};

// Fonction pour transformer les données de la base vers le type Product
const transformProductData = (rawProduct: any): Product => {
  return {
    id: rawProduct.id,
    name: rawProduct.name || '',
    price: rawProduct.price || 0,
    category_id: rawProduct.category_id,
    unit: rawProduct.unit || 'kg',
    is_organic: rawProduct.is_organic || false,
    description: rawProduct.description,
    farmer_id: rawProduct.farmer_id,
    image_url: rawProduct.image_url,
    weight: rawProduct.weight || 0.5, // Poids par défaut de 0.5kg
    created_at: rawProduct.created_at,
    updated_at: rawProduct.updated_at || rawProduct.created_at,
    product_variants: Array.isArray(rawProduct.product_variants) ? rawProduct.product_variants : [],
    // Propriétés calculées
    category: rawProduct.category_name || rawProduct.category_id || 'Autres',
    inventory: rawProduct.quantity || 0,
    stock_quantity: rawProduct.quantity || 0,
    in_stock: (rawProduct.quantity || 0) > 0,
    organic: rawProduct.is_organic || false,
    published: rawProduct.is_published || true,
    image: rawProduct.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43',
    available_until: rawProduct.available_to || rawProduct.updated_at
  };
};

// Adaptateur vers ProductType pour les anciens composants
export const adaptToProductType = (product: Product): ProductType => {
  return {
    id: parseInt(product.id) || 0,
    name: product.name,
    image: product.image || product.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43',
    category: product.category || 'Autres',
    price: product.price,
    unit: product.unit,
    inventory: product.inventory || 0,
    organic: product.organic || false,
    published: product.published || true,
    description: product.description || ''
  };
};

// Fetch all products for the current farmer
const fetchFarmerProducts = async (): Promise<Product[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('farmer_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching farmer products:", error);
    throw new Error(error.message);
  }

  return (data || []).map(transformProductData);
};

// Fonction simulée pour créer un produit (en attendant la RPC)
const addProduct = async ({ productData, variantsData }: {
  productData: any;
  variantsData: any[];
}) => {
  console.log('Adding product:', productData, variantsData);
  
  // Simulation - en réalité on créera la RPC function
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    throw new Error(error.message);
  }

  return data;
};

// Fetch all products (version générique)
const fetchAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message);
  }

  return (data || []).map(transformProductData);
};

// Hooks React Query
export const useFarmerProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['farmerProducts'],
    queryFn: fetchFarmerProducts,
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmerProducts'] });
    },
    onError: (error) => {
      console.error("Failed to add product:", error);
    },
  });
};

// Hook générique pour tous les produits
export const useAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['allProducts'],
    queryFn: fetchAllProducts,
  });
};

// Alias pour la compatibilité
export const useProducts = () => {
  const { data: products, isLoading: loading, error } = useAllProducts();
  
  return {
    products: products || [],
    loading,
    error: error?.message || null
  };
};

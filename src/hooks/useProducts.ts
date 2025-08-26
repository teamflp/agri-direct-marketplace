import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

// Define the types for our data structure
export type ProductVariant = Tables<'product_variants'>;
export type Product = Tables<'products'> & {
  product_variants: ProductVariant[];
};

// --- API Functions ---

// Fetch all products for the current farmer, including their variants
const fetchFarmerProducts = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants (*)
    `)
    .eq('farmer_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching farmer products:", error);
    throw new Error(error.message);
  }

  return data as Product[];
};

// Add a new product with its variants using the RPC function
type AddProductParams = {
  productData: Omit<TablesInsert<'products'>, 'farmer_id'>;
  variantsData: Omit<TablesInsert<'product_variants'>, 'product_id'>[];
}

const addProduct = async ({ productData, variantsData }: AddProductParams) => {
  // We need to adjust the productData to match the jsonb expected by the function
  const productJson = {
      name: productData.name,
      price: productData.price,
      category: productData.category_id, // Sending category name
      unit: productData.unit,
      is_organic: productData.is_organic,
      description: productData.description
  };

  const { data, error } = await supabase.rpc('create_product_with_variants', {
    product_data: productJson,
    variants_data: variantsData,
  });

  if (error) {
    console.error("Error creating product with variants:", error);
    throw new Error(error.message);
  }

  return data;
};

// --- React Query Hooks ---

// Hook to get all products for the current farmer
export const useFarmerProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['farmerProducts'],
    queryFn: fetchFarmerProducts,
  });
};

// Hook to add a new product
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // When a product is added, invalidate the products query to refetch the list
      queryClient.invalidateQueries({ queryKey: ['farmerProducts'] });
    },
    onError: (error) => {
      // We can add more robust error handling here, like showing a toast notification
      console.error("Failed to add product:", error);
    },
  });
};

// Future hooks for updating and deleting products can be added here
// export const useUpdateProduct = () => { ... }
// export const useDeleteProduct = () => { ... }

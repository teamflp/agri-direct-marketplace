import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { stock_movement_reason } from '@/integrations/supabase/types'; // Assuming the enum type can be imported

// Define the type for the data structure returned by our RPC function
export type StockMovement = {
  id: string;
  created_at: string;
  reason: stock_movement_reason;
  change_quantity: number;
  reference_id: string | null;
  notes: string | null;
  product_name: string;
  variant_options: { [key: string]: string };
  variant_sku: string | null;
};

// API Function to fetch stock movements using the RPC
const fetchStockMovements = async () => {
  const { data, error } = await supabase.rpc('get_farmer_stock_movements');

  if (error) {
    console.error("Error fetching stock movements:", error);
    throw new Error(error.message);
  }

  return data as StockMovement[];
};

// React Query Hook to get stock movements
export const useStockMovements = () => {
  return useQuery<StockMovement[], Error>({
    queryKey: ['stockMovements'],
    queryFn: fetchStockMovements,
  });
};

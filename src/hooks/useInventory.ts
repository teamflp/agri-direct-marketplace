
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { StockMovementReason, StockMovement } from '@/types/inventory';

// API Function simulé pour les mouvements de stock
const fetchStockMovements = async (): Promise<StockMovement[]> => {
  console.log('Fetching stock movements...');
  
  // Simulation de données en attendant la fonction RPC
  return [
    {
      id: '1',
      created_at: new Date().toISOString(),
      reason: 'purchase' as StockMovementReason,
      change_quantity: 10,
      reference_id: null,
      notes: 'Achat initial',
      product_name: 'Tomates',
      variant_options: { name: 'Rouge' },
      variant_sku: 'TOM-001'
    }
  ];
};

// React Query Hook to get stock movements
export const useStockMovements = () => {
  return useQuery<StockMovement[], Error>({
    queryKey: ['stockMovements'],
    queryFn: fetchStockMovements,
  });
};

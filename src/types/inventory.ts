
// Types personnalisés pour l'inventaire
export type StockMovementReason = 
  | 'purchase'
  | 'sale'
  | 'adjustment'
  | 'loss'
  | 'return'
  | 'production'
  | 'transfer'
  | 'other';

export type StockMovement = {
  id: string;
  created_at: string;
  reason: StockMovementReason;
  change_quantity: number;
  reference_id: string | null;
  notes: string | null;
  product_name: string;
  variant_options: { [key: string]: string };
  variant_sku: string | null;
};

export type InventoryProductType = {
  id: number;
  name: string;
  image: string;
  category: string;
  inventory: number;
  unit: string;
  minimumStock: number;
  lastUpdated: string;
  price: number;
};

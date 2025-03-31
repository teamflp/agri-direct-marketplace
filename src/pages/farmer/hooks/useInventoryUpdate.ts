
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { InventoryProductType } from '@/pages/farmer/FarmerInventory';

export function useInventoryUpdate() {
  const { toast } = useToast();
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | InventoryProductType>(null);
  const [lowStockProducts, setLowStockProducts] = useState<InventoryProductType[]>([]);
  
  // Initialize lowStockProducts state with mock data
  const initializeLowStockProducts = () => {
    // Mock data for LowStockProducts
    const initialLowStockProducts: InventoryProductType[] = [
      {
        id: 4,
        name: "Laitue",
        price: 1.50,
        inventory: 3,
        minimumStock: 5,
        unit: "pièce",
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=500&h=500&fit=crop",
        category: "Légumes",
        organic: true,
        published: true,
        stockHistory: [
          {
            date: "2023-05-01",
            quantity: 10,
            type: "add",
            reason: "Livraison initiale"
          },
          {
            date: "2023-05-10",
            quantity: 7,
            type: "remove",
            reason: "Ventes"
          }
        ],
        lastUpdated: "2023-05-10"
      },
      {
        id: 5,
        name: "Aubergines",
        price: 2.80,
        inventory: 4,
        minimumStock: 10,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1613878501069-18e97ac2dacf?w=500&h=500&fit=crop",
        category: "Légumes",
        organic: false,
        published: true,
        stockHistory: [
          {
            date: "2023-05-05",
            quantity: 15,
            type: "add",
            reason: "Livraison initiale"
          },
          {
            date: "2023-05-15",
            quantity: 11,
            type: "remove",
            reason: "Ventes"
          }
        ],
        lastUpdated: "2023-05-15"
      }
    ];

    setLowStockProducts(initialLowStockProducts);
  };

  const handleUpdateClick = (product: InventoryProductType) => {
    setSelectedProduct(product);
    setShowUpdateDialog(true);
  };

  const handleUpdateInventory = (productId: number, quantity: number, type: 'add' | 'remove', reason: string) => {
    setLowStockProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId) {
          // Calculate new stock
          const newInventory = type === 'add' 
            ? product.inventory + quantity
            : Math.max(0, product.inventory - quantity);
          
          // Create a new history entry
          const newHistoryEntry = {
            date: new Date().toISOString().split('T')[0],
            quantity,
            type,
            reason
          };
          
          // Return the updated product
          return {
            ...product,
            inventory: newInventory,
            stockHistory: [newHistoryEntry, ...product.stockHistory],
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return product;
      });
    });
    
    setShowUpdateDialog(false);
    
    toast({
      title: "Inventaire mis à jour",
      description: `${selectedProduct?.name} : ${quantity} unités ${type === 'add' ? 'ajoutées' : 'retirées'}`,
    });
  };

  return {
    showUpdateDialog,
    setShowUpdateDialog,
    selectedProduct,
    lowStockProducts,
    initializeLowStockProducts,
    handleUpdateClick,
    handleUpdateInventory
  };
}

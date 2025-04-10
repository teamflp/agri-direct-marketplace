
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Package, BarChart2, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import InventoryHeader from './components/InventoryHeader';
import InventoryOverview from './components/InventoryOverview';
import InventoryStats from './components/InventoryStats';
import LowStockProducts from './components/LowStockProducts';
import InventoryUpdateDialog from './components/InventoryUpdateDialog';
import ProductHistoryDialog from './components/ProductHistoryDialog';
import InventoryReportDialog from './components/InventoryReportDialog';
import { useInventoryUpdate } from './hooks/useInventoryUpdate';

// Define and export the InventoryProductType
export interface StockHistoryEntry {
  date: string;
  quantity: number;
  type: 'add' | 'remove';
  reason: string;
}

export interface InventoryProductType {
  id: number;
  name: string;
  price: number;
  inventory: number;
  minimumStock: number;
  unit: string;
  image: string;
  category: string;
  organic: boolean;
  published: boolean;
  stockHistory: StockHistoryEntry[];
  lastUpdated: string;
}

const FarmerInventory = () => {
  const { user, profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [products, setProducts] = useState<InventoryProductType[]>([]);
  
  const {
    showUpdateDialog,
    setShowUpdateDialog,
    selectedProduct,
    lowStockProducts,
    initializeLowStockProducts,
    handleUpdateClick,
    handleUpdateInventory
  } = useInventoryUpdate();
  
  // Initialize mock data
  useEffect(() => {
    const mockProducts: InventoryProductType[] = [
      {
        id: 1,
        name: "Tomates Bio",
        price: 2.99,
        inventory: 45,
        minimumStock: 10,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1592924357177-333f73b4c1dd?w=500&h=500&fit=crop",
        category: "Légumes",
        organic: true,
        published: true,
        stockHistory: [
          {
            date: "2023-05-15",
            quantity: 50,
            type: "add",
            reason: "Livraison initiale"
          },
          {
            date: "2023-05-20",
            quantity: 5,
            type: "remove",
            reason: "Vente"
          }
        ],
        lastUpdated: "2023-05-20"
      },
      {
        id: 2,
        name: "Carottes",
        price: 1.49,
        inventory: 30,
        minimumStock: 8,
        unit: "kg",
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop",
        category: "Légumes",
        organic: false,
        published: true,
        stockHistory: [
          {
            date: "2023-05-10",
            quantity: 40,
            type: "add",
            reason: "Livraison initiale"
          },
          {
            date: "2023-05-18",
            quantity: 10,
            type: "remove",
            reason: "Vente"
          }
        ],
        lastUpdated: "2023-05-18"
      },
      {
        id: 3,
        name: "Fraises",
        price: 3.99,
        inventory: 15,
        minimumStock: 20,
        unit: "barquette",
        image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&h=500&fit=crop",
        category: "Fruits",
        organic: true,
        published: true,
        stockHistory: [
          {
            date: "2023-05-12",
            quantity: 30,
            type: "add",
            reason: "Livraison initiale"
          },
          {
            date: "2023-05-19",
            quantity: 15,
            type: "remove",
            reason: "Vente"
          }
        ],
        lastUpdated: "2023-05-19"
      }
    ];
    
    setProducts(mockProducts);
    initializeLowStockProducts();
  }, []);
  
  // Filtered products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleReportClick = () => {
    setShowReportDialog(true);
  };
  
  const handleHistoryClick = (product: InventoryProductType) => {
    setSelectedProduct(product);
    setShowHistoryDialog(true);
  };
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer", icon: <BarChart2 size={20} /> },
    { title: "Produits", path: "/farmer/products", icon: <Package size={20} /> },
    { title: "Commandes", path: "/farmer/orders", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer/inventory", icon: <Package size={20} /> },
    { title: "Analytics", path: "/farmer/analytics", icon: <BarChart2 size={20} /> },
    { title: "Messages", path: "/farmer/messages", icon: <MessageSquare size={20} /> },
    { title: "Paramètres", path: "/farmer/profile", icon: <Settings size={20} /> },
  ];

  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Jean Dupont';
    
  const email = user?.email || 'jean.dupont@fermelocale.fr';

  // Calculate inventory stats
  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.inventory > 0 && p.inventory <= p.minimumStock).length;
  const outOfStockCount = products.filter(p => p.inventory === 0).length;

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?w=150&h=150&fit=crop"
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <InventoryStats 
          totalProducts={totalProducts}
          lowStockProducts={lowStockCount}
          outOfStockProducts={outOfStockCount}
        />
        
        <InventoryHeader 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onReportClick={handleReportClick}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <InventoryOverview 
              products={products}
              filteredProducts={filteredProducts}
              onUpdateClick={handleUpdateClick}
              onHistoryClick={handleHistoryClick}
            />
          </div>
          
          <div className="md:col-span-1">
            <LowStockProducts 
              lowStockProducts={lowStockProducts}
              onUpdateClick={handleUpdateClick}
            />
          </div>
        </div>
        
        {/* Dialogs */}
        {selectedProduct && (
          <>
            <InventoryUpdateDialog 
              open={showUpdateDialog}
              onOpenChange={setShowUpdateDialog}
              product={selectedProduct}
              onUpdateInventory={handleUpdateInventory}
            />
            
            <ProductHistoryDialog 
              open={showHistoryDialog}
              onOpenChange={setShowHistoryDialog}
              product={selectedProduct}
            />
          </>
        )}
        
        <InventoryReportDialog 
          open={showReportDialog}
          onOpenChange={setShowReportDialog}
          products={products}
        />
      </div>
    </DashboardLayout>
  );
};

export default FarmerInventory;

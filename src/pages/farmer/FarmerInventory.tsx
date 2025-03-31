
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  ShoppingBag, 
  MessageSquare, 
  CreditCard, 
  User, 
  Package,
  Box,
  Archive,
  Truck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import InventoryHeader from './components/InventoryHeader';
import InventoryOverview from './components/InventoryOverview';
import InventoryStats from './components/InventoryStats';
import LowStockProducts from './components/LowStockProducts';
import InventoryUpdateDialog from './components/InventoryUpdateDialog';
import InventoryReportDialog from './components/InventoryReportDialog';
import ProductHistoryDialog from './components/ProductHistoryDialog';
import { ProductType } from './components/ProductDeleteDialog';
import { useInventoryUpdate } from './hooks/useInventoryUpdate';

// Enrichir le type ProductType avec des informations d'inventaire
export type InventoryProductType = ProductType & {
  stockHistory: {
    date: string;
    quantity: number;
    type: 'add' | 'remove';
    reason: string;
  }[];
  minimumStock: number;
  lastUpdated: string;
}

// Mock data pour les produits avec inventaire
const inventoryProducts: InventoryProductType[] = [
  {
    id: 1,
    name: "Panier de légumes bio",
    price: 16350,
    inventory: 20,
    unit: "panier",
    category: "Légumes",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    stockHistory: [
      { date: "2023-10-01", quantity: 30, type: "add", reason: "Récolte" },
      { date: "2023-10-05", quantity: 5, type: "remove", reason: "Commande #235" },
      { date: "2023-10-10", quantity: 5, type: "remove", reason: "Commande #247" }
    ],
    minimumStock: 10,
    lastUpdated: "2023-10-10"
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    price: 5600,
    inventory: 8,
    unit: "500g",
    category: "Miel",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    stockHistory: [
      { date: "2023-09-15", quantity: 50, type: "add", reason: "Production" },
      { date: "2023-09-20", quantity: 12, type: "remove", reason: "Commande #215" },
      { date: "2023-09-25", quantity: 15, type: "remove", reason: "Commande #217" },
      { date: "2023-10-05", quantity: 15, type: "remove", reason: "Commande #240" }
    ],
    minimumStock: 15,
    lastUpdated: "2023-10-05"
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    price: 2750,
    inventory: 35,
    unit: "250g",
    category: "Fromage",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    stockHistory: [
      { date: "2023-10-02", quantity: 40, type: "add", reason: "Production" },
      { date: "2023-10-07", quantity: 5, type: "remove", reason: "Commande #242" }
    ],
    minimumStock: 20,
    lastUpdated: "2023-10-07"
  },
  {
    id: 4,
    name: "Tomates anciennes",
    price: 980,
    inventory: 5,
    unit: "kg",
    category: "Légumes",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1592924357461-a191879026f4",
    stockHistory: [
      { date: "2023-09-29", quantity: 20, type: "add", reason: "Récolte" },
      { date: "2023-10-03", quantity: 8, type: "remove", reason: "Commande #237" },
      { date: "2023-10-08", quantity: 7, type: "remove", reason: "Commande #244" }
    ],
    minimumStock: 10,
    lastUpdated: "2023-10-08"
  },
  {
    id: 5,
    name: "Œufs fermiers",
    price: 3200,
    inventory: 0,
    unit: "douzaine",
    category: "Œufs",
    organic: true,
    published: false,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
    stockHistory: [
      { date: "2023-09-20", quantity: 50, type: "add", reason: "Production" },
      { date: "2023-09-25", quantity: 20, type: "remove", reason: "Commande #219" },
      { date: "2023-10-01", quantity: 15, type: "remove", reason: "Commande #230" },
      { date: "2023-10-06", quantity: 15, type: "remove", reason: "Commande #241" }
    ],
    minimumStock: 20,
    lastUpdated: "2023-10-06"
  },
  {
    id: 6,
    name: "Salade mesclun",
    price: 1200,
    inventory: 0,
    unit: "250g",
    category: "Légumes",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f",
    stockHistory: [
      { date: "2023-09-28", quantity: 30, type: "add", reason: "Récolte" },
      { date: "2023-10-02", quantity: 12, type: "remove", reason: "Commande #234" },
      { date: "2023-10-05", quantity: 18, type: "remove", reason: "Commande #240" }
    ],
    minimumStock: 15,
    lastUpdated: "2023-10-05"
  }
];

const FarmerInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | InventoryProductType>(null);
  const [products, setProducts] = useState<InventoryProductType[]>(inventoryProducts);
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User size={20} /> },
    { title: "Mes produits", path: "/farmer-dashboard/products", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer-dashboard/inventory", icon: <Package size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <Truck size={20} /> },
    { title: "Messagerie", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mon abonnement", path: "/farmer-dashboard/subscription", icon: <CreditCard size={20} /> },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUpdateClick = (product: InventoryProductType) => {
    setSelectedProduct(product);
    setShowUpdateDialog(true);
  };
  
  const handleHistoryClick = (product: InventoryProductType) => {
    setSelectedProduct(product);
    setShowHistoryDialog(true);
  };
  
  const handleReportClick = () => {
    setShowReportDialog(true);
  };
  
  const handleUpdateInventory = (productId: number, quantity: number, type: 'add' | 'remove', reason: string) => {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === productId) {
          // Calculer le nouveau stock
          const newInventory = type === 'add' 
            ? product.inventory + quantity
            : Math.max(0, product.inventory - quantity);
          
          // Créer un nouvel enregistrement d'historique
          const newHistoryEntry = {
            date: new Date().toISOString().split('T')[0],
            quantity,
            type,
            reason
          };
          
          // Retourner le produit mis à jour
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

  // Produits avec stock faible
  const lowStockProducts = products.filter(product => 
    product.inventory > 0 && product.inventory <= product.minimumStock
  );
  
  // Produits en rupture de stock
  const outOfStockProducts = products.filter(product => 
    product.inventory === 0
  );

  return (
    <DashboardLayout
      name="Sophie Dubois"
      email="sophie.d@email.com"
      avatar={
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Sophie Dubois" />
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <InventoryHeader 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onReportClick={handleReportClick}
        />

        <InventoryOverview 
          products={products}
          filteredProducts={filteredProducts}
          onUpdateClick={handleUpdateClick}
          onHistoryClick={handleHistoryClick}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InventoryStats 
            totalProducts={products.length}
            lowStockProducts={lowStockProducts.length}
            outOfStockProducts={outOfStockProducts.length}
          />
          <LowStockProducts 
            lowStockProducts={lowStockProducts}
            onUpdateClick={handleUpdateClick}
          />
        </div>
      </div>

      {selectedProduct && (
        <InventoryUpdateDialog 
          open={showUpdateDialog}
          onOpenChange={setShowUpdateDialog}
          product={selectedProduct}
          onUpdateInventory={handleUpdateInventory}
        />
      )}
      
      <InventoryReportDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        products={products}
      />
      
      <ProductHistoryDialog
        open={showHistoryDialog}
        onOpenChange={setShowHistoryDialog}
        product={selectedProduct}
      />
    </DashboardLayout>
  );
};

export default FarmerInventory;

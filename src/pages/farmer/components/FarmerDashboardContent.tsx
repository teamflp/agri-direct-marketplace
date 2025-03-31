
import React, { useEffect } from 'react';
import DashboardStatsCards from '@/pages/farmer/components/DashboardStatsCards';
import RecentOrders from '@/pages/farmer/components/RecentOrders';
import TopProducts from '@/pages/farmer/components/TopProducts';
import FarmerSeasonalAdvice from '@/components/farmer/FarmerSeasonalAdvice';
import LowStockProducts from '@/pages/farmer/components/LowStockProducts';
import InventoryUpdateDialog from '@/pages/farmer/components/InventoryUpdateDialog';
import UpcomingEvents from '@/pages/farmer/components/UpcomingEvents';
import { useInventoryUpdate } from '../hooks/useInventoryUpdate';

// Mock data types
interface DashboardStatsType {
  salesThisMonth: number;
  customersCount: number;
  productsCount: number;
}

interface OrderType {
  id: string;
  customer: string;
  date: string;
  total: number;
  items: number;
  status: string;
}

interface ProductType {
  id: number;
  name: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
  sales: number;
}

const FarmerDashboardContent = () => {
  // Use the inventory update hook
  const {
    showUpdateDialog,
    setShowUpdateDialog,
    selectedProduct,
    lowStockProducts,
    initializeLowStockProducts,
    handleUpdateClick,
    handleUpdateInventory
  } = useInventoryUpdate();

  // Initialize lowStockProducts on component mount
  useEffect(() => {
    initializeLowStockProducts();
  }, []);

  // Mock data for DashboardStatsCards
  const dashboardStats: DashboardStatsType = {
    salesThisMonth: 37,
    customersCount: 24,
    productsCount: 18
  };

  // Mock data for RecentOrders
  const recentOrders: OrderType[] = [
    {
      id: "CMD-001",
      customer: "Marie Dubois",
      date: "12 Mai 2023",
      total: 45.50,
      items: 4,
      status: "Confirmée"
    },
    {
      id: "CMD-002",
      customer: "Pierre Martin",
      date: "10 Mai 2023",
      total: 32.20,
      items: 3,
      status: "Livrée"
    }
  ];

  // Mock data for TopProducts
  const topProducts: ProductType[] = [
    {
      id: 1,
      name: "Tomates Bio",
      price: 3.50,
      stock: 25,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1546520057-a59c8fb22400?w=500&h=500&fit=crop",
      sales: 42
    },
    {
      id: 2,
      name: "Carottes",
      price: 2.20,
      stock: 18,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop",
      sales: 36
    },
    {
      id: 3,
      name: "Pommes de terre",
      price: 1.80,
      stock: 40,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop",
      sales: 28
    }
  ];

  // Event handlers
  const handleViewAllOrders = () => {
    window.location.href = "/farmer-dashboard/orders";
  };

  const handleManageProducts = () => {
    window.location.href = "/farmer-dashboard/products";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord Agriculteur</h1>
      
      <DashboardStatsCards 
        salesThisMonth={dashboardStats.salesThisMonth}
        customersCount={dashboardStats.customersCount}
        productsCount={dashboardStats.productsCount}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders 
          orders={recentOrders} 
          onViewAllOrders={handleViewAllOrders} 
        />
        <TopProducts 
          products={topProducts} 
          onManageProducts={handleManageProducts} 
        />
      </div>
      
      {/* Seasonal advice section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Conseils de culture</h2>
        <FarmerSeasonalAdvice />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LowStockProducts 
          lowStockProducts={lowStockProducts} 
          onUpdateClick={handleUpdateClick} 
        />
        
        <UpcomingEvents />
      </div>
      
      {/* Dialog for inventory updates */}
      {selectedProduct && (
        <InventoryUpdateDialog 
          open={showUpdateDialog}
          onOpenChange={setShowUpdateDialog}
          product={selectedProduct}
          onUpdateInventory={handleUpdateInventory}
        />
      )}
    </div>
  );
};

export default FarmerDashboardContent;

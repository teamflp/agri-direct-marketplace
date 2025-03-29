
import React from 'react';
import DashboardStatsCards from './DashboardStatsCards';
import RecentOrders from './RecentOrders';
import TopProducts from './TopProducts';

interface ProductType {
  id: number;
  name: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
  sales: number;
}

interface OrderType {
  id: string;
  customer: string;
  date: string;
  total: number;
  items: number;
  status: string;
}

interface SubscriptionType {
  plan: string;
  startDate: string;
  endDate: string;
  featuresUsed: {
    productsUsed: number;
    productsLimit: number;
    storageUsed: number;
    storageLimit: number;
    salesThisMonth: number;
    customersCount: number;
  }
}

interface DashboardOverviewProps {
  products: ProductType[];
  orders: OrderType[];
  subscription: SubscriptionType;
  onViewAllOrders: () => void;
  onManageProducts: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  products,
  orders,
  subscription,
  onViewAllOrders,
  onManageProducts
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      
      {/* Stats Cards */}
      <DashboardStatsCards 
        salesThisMonth={subscription.featuresUsed.salesThisMonth}
        customersCount={subscription.featuresUsed.customersCount}
        productsCount={products.length}
      />
      
      {/* Recent Orders */}
      <RecentOrders orders={orders} onViewAllOrders={onViewAllOrders} />
      
      {/* Top Products */}
      <TopProducts products={products} onManageProducts={onManageProducts} />
    </div>
  );
};

export default DashboardOverview;

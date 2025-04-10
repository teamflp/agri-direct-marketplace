
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Package, BarChart2, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AnalyticsHeader from './components/AnalyticsHeader';
import AnalyticsCharts from './components/AnalyticsCharts';
import PopularProducts from './components/PopularProducts';
import OptimizationTips from './components/OptimizationTips';
import { 
  monthlySalesData, 
  productSalesData, 
  customerLocationData, 
  weekdaySalesData, 
  weeklySalesData, 
  yearlySalesData, 
  yearlyProductSalesData, 
  yearlyCustomerLocationData 
} from './data/analyticsData';

const FarmerAnalytics = () => {
  const { user, profile } = useAuth();
  const [periodFilter, setPeriodFilter] = useState('month');
  
  // Select data based on period filter
  const currentMonthlySalesData = periodFilter === 'week' 
    ? weeklySalesData 
    : periodFilter === 'year' 
      ? yearlySalesData 
      : monthlySalesData;
  
  const currentProductSalesData = periodFilter === 'year' 
    ? yearlyProductSalesData 
    : productSalesData;
  
  const currentCustomerLocationData = periodFilter === 'year' 
    ? yearlyCustomerLocationData 
    : customerLocationData;
  
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

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?w=150&h=150&fit=crop"
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Analyses et statistiques</h1>
        
        <AnalyticsHeader 
          periodFilter={periodFilter} 
          setPeriodFilter={setPeriodFilter}
          monthlySalesData={currentMonthlySalesData}
          productSalesData={currentProductSalesData}
          customerLocationData={currentCustomerLocationData}
          weekdaySalesData={weekdaySalesData}
        />
        
        <AnalyticsCharts 
          monthlySalesData={currentMonthlySalesData}
          productSalesData={currentProductSalesData}
          customerLocationData={currentCustomerLocationData}
          weekdaySalesData={weekdaySalesData}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PopularProducts />
          <OptimizationTips periodFilter={periodFilter} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerAnalytics;

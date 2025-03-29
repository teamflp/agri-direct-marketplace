
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { User, ShoppingCart, Users, MessageSquare, FileText, Calendar } from 'lucide-react';

// Components
import AnalyticsHeader from './components/AnalyticsHeader';
import SummaryCards from './components/SummaryCards';
import AnalyticsCharts from './components/AnalyticsCharts';
import OptimizationTips from './components/OptimizationTips';

// Data
import { 
  monthlySalesData, 
  productSalesData, 
  customerLocationData, 
  weekdaySalesData 
} from './data/analyticsData';

const FarmerAnalytics = () => {
  const [periodFilter, setPeriodFilter] = useState('month');
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User size={20} /> },
    { title: "Produits", path: "/farmer-dashboard/products", icon: <ShoppingCart size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <Users size={20} /> },
    { title: "Messages", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Analyses", path: "/farmer-dashboard/analytics", icon: <FileText size={20} /> },
    { title: "Abonnement", path: "/farmer-dashboard/subscription", icon: <Calendar size={20} /> },
  ];

  return (
    <DashboardLayout
      name="Ferme des Quatre Saisons"
      email="ferme4saisons@email.com"
      avatar={
        <div className="bg-agrimarket-green text-white text-xl font-semibold flex items-center justify-center h-full">
          FQ
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        {/* Analytics header with period filter and export button */}
        <AnalyticsHeader 
          periodFilter={periodFilter} 
          setPeriodFilter={setPeriodFilter} 
        />

        {/* Summary cards showing key metrics */}
        <SummaryCards />

        {/* Charts for data visualization */}
        <AnalyticsCharts 
          monthlySalesData={monthlySalesData}
          productSalesData={productSalesData}
          customerLocationData={customerLocationData}
          weekdaySalesData={weekdaySalesData}
        />

        {/* Optimization tips based on data analysis */}
        <OptimizationTips />
      </div>
    </DashboardLayout>
  );
};

export default FarmerAnalytics;

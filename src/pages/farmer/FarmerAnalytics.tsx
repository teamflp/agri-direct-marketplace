
import React, { useState, useMemo } from 'react';
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
  weekdaySalesData,
  weeklySalesData,
  yearlyProductSalesData,
  yearlyCustomerLocationData,
  yearlySalesData
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

  // Filter data based on selected period
  const filteredData = useMemo(() => {
    switch (periodFilter) {
      case 'week':
        return {
          salesData: weeklySalesData,
          productData: productSalesData.slice(0, 3), // Fewer products for weekly view
          locationData: customerLocationData.slice(0, 3), // Fewer locations for weekly view
          dayData: weekdaySalesData
        };
      case 'year':
        return {
          salesData: yearlySalesData,
          productData: yearlyProductSalesData,
          locationData: yearlyCustomerLocationData,
          dayData: weekdaySalesData // Same weekday data for yearly view
        };
      case 'month':
      default:
        return {
          salesData: monthlySalesData,
          productData: productSalesData,
          locationData: customerLocationData,
          dayData: weekdaySalesData
        };
    }
  }, [periodFilter]);

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
          monthlySalesData={filteredData.salesData}
          productSalesData={filteredData.productData}
          customerLocationData={filteredData.locationData}
          weekdaySalesData={filteredData.dayData}
        />

        {/* Summary cards showing key metrics */}
        <SummaryCards periodFilter={periodFilter} />

        {/* Charts for data visualization */}
        <AnalyticsCharts 
          monthlySalesData={filteredData.salesData}
          productSalesData={filteredData.productData}
          customerLocationData={filteredData.locationData}
          weekdaySalesData={filteredData.dayData}
        />

        {/* Optimization tips based on data analysis */}
        <OptimizationTips periodFilter={periodFilter} />
      </div>
    </DashboardLayout>
  );
};

export default FarmerAnalytics;

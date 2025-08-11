
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { buyerMenuItems } from '@/components/layout/dashboardNavigation';
import { useAuth } from '@/contexts/AuthContext';
import BuyerDashboardContent from '@/components/buyer/dashboard/BuyerDashboardContent';

const BuyerDashboard = () => {
  const { user, profile } = useAuth();
  
  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Martin Pasquier';
    
  const email = user?.email || 'martin.p@email.com';

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          MP
        </div>
      }
      menuItems={buyerMenuItems}
    >
      <BuyerDashboardContent userName={name} />
    </DashboardLayout>
  );
};

export default BuyerDashboard;

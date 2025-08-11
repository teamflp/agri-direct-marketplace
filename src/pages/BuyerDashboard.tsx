
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getBuyerDashboardMenuItems } from '@/components/buyer/dashboard/BuyerDashboardMenu';
import { useAuth } from '@/contexts/AuthContext';
import BuyerDashboardContent from '@/components/buyer/dashboard/BuyerDashboardContent';

const BuyerDashboard = () => {
  const { user, profile } = useAuth();
  
  console.log('BuyerDashboard - user:', !!user, 'profile:', profile);
  
  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : user?.email?.split('@')[0] || 'Utilisateur';
    
  const email = user?.email || 'email@example.com';

  const menuItems = getBuyerDashboardMenuItems();

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          {profile?.first_name?.charAt(0) || name.charAt(0).toUpperCase()}{profile?.last_name?.charAt(0) || ''}
        </div>
      }
      menuItems={menuItems}
    >
      <BuyerDashboardContent userName={name} />
    </DashboardLayout>
  );
};

export default BuyerDashboard;

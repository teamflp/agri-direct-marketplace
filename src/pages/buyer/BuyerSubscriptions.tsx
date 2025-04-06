
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UserSubscriptions from '@/components/subscriptions/UserSubscriptions';
import { useAuth } from '@/contexts/AuthContext';
import { getBuyerDashboardMenuItems } from '@/components/buyer/dashboard/BuyerDashboardMenu';

const BuyerSubscriptions = () => {
  const { profile } = useAuth();
  const menuItems = getBuyerDashboardMenuItems();
  
  return (
    <DashboardLayout
      name={`${profile?.first_name || ''} ${profile?.last_name || ''}`}
      email={profile?.phone_number || ''}
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          {profile?.first_name?.charAt(0) || ''}{profile?.last_name?.charAt(0) || ''}
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mes Abonnements</h1>
        <UserSubscriptions showTitle={false} />
      </div>
    </DashboardLayout>
  );
};

export default BuyerSubscriptions;

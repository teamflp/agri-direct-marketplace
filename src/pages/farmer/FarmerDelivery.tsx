
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { farmerMenuItems } from '@/components/layout/dashboardNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { FarmerDeliveryManagement } from '@/components/delivery/FarmerDeliveryManagement';

const FarmerDelivery = () => {
  const { user, profile } = useAuth();
  
  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Sophie Dubois';
    
  const email = user?.email || 'sophie.dubois@fermelocale.fr';

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?w=150&h=150&fit=crop"
      menuItems={farmerMenuItems}
    >
      <FarmerDeliveryManagement />
    </DashboardLayout>
  );
};

export default FarmerDelivery;

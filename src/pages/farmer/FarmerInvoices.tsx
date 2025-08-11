
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { farmerMenuItems } from '@/components/layout/dashboardNavigation';
import { useAuth } from '@/contexts/AuthContext';
import InvoiceHistory from '@/pages/farmer/components/InvoiceHistory';
import BillingDetails from '@/pages/farmer/components/BillingDetails';
import { subscriptionData, invoicesData } from './data/subscriptionData';

const FarmerInvoices = () => {
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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Factures</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InvoiceHistory invoices={invoicesData} />
          </div>
          <div>
            <BillingDetails subscription={subscriptionData} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerInvoices;

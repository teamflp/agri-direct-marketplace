
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Hooks and data
import { useDashboardData } from './farmer/hooks/useDashboardData';

// Components
import DashboardSidebar from './farmer/components/DashboardSidebar';
import DashboardOverview from './farmer/components/DashboardOverview';
import ProductsList from './farmer/components/ProductsList';
import OrdersList from './farmer/components/OrdersList';
import MessagesList from './farmer/components/MessagesList';
import SubscriptionDetails from './farmer/components/SubscriptionDetails';

const FarmerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const { products, orders, messages, subscription } = useDashboardData();
  
  const handleViewAllOrders = () => {
    setSelectedTab("orders");
  };

  const handleManageProducts = () => {
    setSelectedTab("products");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 bg-gray-50 pb-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <DashboardSidebar 
              selectedTab={selectedTab} 
              setSelectedTab={setSelectedTab} 
            />
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                {/* Overview Tab */}
                <TabsContent value="overview">
                  <DashboardOverview 
                    products={products}
                    orders={orders}
                    subscription={subscription}
                    onViewAllOrders={handleViewAllOrders}
                    onManageProducts={handleManageProducts}
                  />
                </TabsContent>
                
                {/* Products Tab */}
                <TabsContent value="products">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Mes produits</h1>
                    <Button className="bg-agrimarket-green hover:bg-agrimarket-green/90">
                      Ajouter un produit
                    </Button>
                  </div>
                  <ProductsList products={products} />
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders">
                  <h1 className="text-3xl font-bold mb-6">Commandes</h1>
                  <OrdersList orders={orders} />
                </TabsContent>
                
                {/* Messages Tab */}
                <TabsContent value="messages">
                  <h1 className="text-3xl font-bold mb-6">Messagerie</h1>
                  <MessagesList messages={messages} />
                </TabsContent>
                
                {/* Subscription Tab */}
                <TabsContent value="subscription">
                  <h1 className="text-3xl font-bold mb-6">Mon abonnement</h1>
                  <SubscriptionDetails subscription={subscription} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FarmerDashboard;

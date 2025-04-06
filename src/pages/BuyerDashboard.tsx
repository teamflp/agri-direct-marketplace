
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import BuyerPersonalizedAdvice from '@/components/buyer/BuyerPersonalizedAdvice';
import BuyerDashboardSidebar from '@/components/buyer/dashboard/BuyerDashboardSidebar';
import BuyerDashboardOrdersTab from '@/components/buyer/dashboard/BuyerDashboardOrdersTab';
import BuyerDashboardFavoritesTab from '@/components/buyer/dashboard/BuyerDashboardFavoritesTab';
import BuyerDashboardMessagesTab from '@/components/buyer/dashboard/BuyerDashboardMessagesTab';
import BuyerDashboardRecommendedProducts from '@/components/buyer/dashboard/BuyerDashboardRecommendedProducts';

// Mock data for recent purchases
const recentPurchases = [
  {
    id: "prod-001",
    name: "Panier de légumes bio",
    category: "Légumes"
  },
  {
    id: "prod-002",
    name: "Miel de fleurs sauvages",
    category: "Miel"
  },
  {
    id: "prod-003",
    name: "Fromage de chèvre frais",
    category: "Produits laitiers"
  }
];

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 bg-gray-50 pb-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <BuyerDashboardSidebar 
              name="Martin Pasquier"
              email="martin.p@email.com"
              avatarInitials="MP"
            />
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
              
              <Tabs defaultValue="orders" className="mb-8">
                <TabsList>
                  <TabsTrigger value="orders">Mes commandes</TabsTrigger>
                  <TabsTrigger value="favorites">Mes favoris</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
                
                {/* Orders Tab */}
                <TabsContent value="orders">
                  <BuyerDashboardOrdersTab />
                </TabsContent>
                
                {/* Favorites Tab */}
                <TabsContent value="favorites">
                  <BuyerDashboardFavoritesTab />
                </TabsContent>
                
                {/* Messages Tab */}
                <TabsContent value="messages">
                  <BuyerDashboardMessagesTab />
                </TabsContent>
              </Tabs>
              
              {/* Personalized Advice Section */}
              <div className="mt-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Conseils personnalisés</h2>
                <BuyerPersonalizedAdvice recentPurchases={recentPurchases} />
              </div>
              
              {/* Recommended Products */}
              <BuyerDashboardRecommendedProducts />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyerDashboard;

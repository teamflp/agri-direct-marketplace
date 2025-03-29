
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Users,
  MessageSquare,
  FileText,
  Settings,
  ShieldAlert,
  Landmark,
  CreditCard,
  BarChart4
} from 'lucide-react';

// Import the new component files
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminStatisticsCards from '@/components/admin/AdminStatisticsCards';
import AdminUsersTab from '@/components/admin/AdminUsersTab';
import AdminFarmersTab from '@/components/admin/AdminFarmersTab';
import AdminMessagesTab from '@/components/admin/AdminMessagesTab';
import AdminDisputesTab from '@/components/admin/AdminDisputesTab';
import AdminSubscriptionsTab from '@/components/admin/AdminSubscriptionsTab';

// Import the statistics data
import { adminStatistics } from '@/components/admin/data/adminData';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 bg-gray-50 pb-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <AdminSidebar />
            </div>
            
            {/* Main content */}
            <div className="w-full md:w-3/4">
              <h1 className="text-3xl font-bold mb-6">Tableau de bord admin</h1>
              
              {/* Statistics Cards */}
              <AdminStatisticsCards statistics={adminStatistics} />
              
              <Tabs defaultValue="users" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                  <TabsTrigger value="farmers">Agriculteurs</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="disputes">Litiges</TabsTrigger>
                  <TabsTrigger value="subscriptions">Abonnements</TabsTrigger>
                </TabsList>
                
                {/* Users Tab */}
                <TabsContent value="users">
                  <AdminUsersTab />
                </TabsContent>
                
                {/* Farmers Tab */}
                <TabsContent value="farmers">
                  <AdminFarmersTab />
                </TabsContent>
                
                {/* Messages Tab */}
                <TabsContent value="messages">
                  <AdminMessagesTab />
                </TabsContent>
                
                {/* Disputes Tab */}
                <TabsContent value="disputes">
                  <AdminDisputesTab />
                </TabsContent>
                
                {/* Subscriptions Tab */}
                <TabsContent value="subscriptions">
                  <AdminSubscriptionsTab />
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

export default AdminDashboard;

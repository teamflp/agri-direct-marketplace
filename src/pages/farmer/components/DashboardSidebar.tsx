
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  User,
  FileText,
  MessageSquare,
  Users,
  Info,
  BarChart
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SidebarProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="w-full md:w-1/4">
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-20 w-20 mb-4">
              <div className="bg-agrimarket-green text-white text-xl font-semibold flex items-center justify-center h-full">
                FQ
              </div>
            </Avatar>
            <h2 className="text-xl font-bold">Ferme des Quatre Saisons</h2>
            <p className="text-gray-500">ferme4saisons@email.com</p>
            <div className="bg-agrimarket-lightGreen text-agrimarket-green px-3 py-1 rounded-full text-sm mt-2">
              Abonnement Pro
            </div>
            <Button variant="outline" className="mt-4 w-full">
              <User className="w-4 h-4 mr-2" /> Éditer mon profil
            </Button>
          </div>
          
          <div className="space-y-2">
            <Button 
              variant={selectedTab === "overview" ? "default" : "ghost"} 
              className={`w-full justify-start ${selectedTab === "overview" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
              onClick={() => setSelectedTab("overview")}
            >
              <User className="w-4 h-4 mr-2" /> Tableau de bord
            </Button>
            <Button 
              variant={selectedTab === "products" ? "default" : "ghost"} 
              className={`w-full justify-start ${selectedTab === "products" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
              onClick={() => setSelectedTab("products")}
            >
              <FileText className="w-4 h-4 mr-2" /> Mes produits
            </Button>
            <Button 
              variant={selectedTab === "orders" ? "default" : "ghost"} 
              className={`w-full justify-start ${selectedTab === "orders" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
              onClick={() => setSelectedTab("orders")}
            >
              <Users className="w-4 h-4 mr-2" /> Commandes
            </Button>
            <Button 
              variant={selectedTab === "messages" ? "default" : "ghost"} 
              className={`w-full justify-start ${selectedTab === "messages" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
              onClick={() => setSelectedTab("messages")}
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Messagerie
            </Button>
            <Link to="/farmer-dashboard/analytics">
              <Button 
                variant={selectedTab === "analytics" ? "default" : "ghost"} 
                className={`w-full justify-start ${selectedTab === "analytics" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
              >
                <BarChart className="w-4 h-4 mr-2" /> Analyses
              </Button>
            </Link>
            <Button 
              variant={selectedTab === "subscription" ? "default" : "ghost"} 
              className={`w-full justify-start ${selectedTab === "subscription" ? "bg-agrimarket-green hover:bg-agrimarket-green/90" : ""}`}
              onClick={() => setSelectedTab("subscription")}
            >
              <Info className="w-4 h-4 mr-2" /> Mon abonnement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSidebar;

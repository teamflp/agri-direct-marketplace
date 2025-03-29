
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
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

const AdminSidebar = () => {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-20 w-20 mb-4">
            <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
              AM
            </div>
          </Avatar>
          <h2 className="text-xl font-bold">Admin AgriMarket</h2>
          <p className="text-gray-500">admin@agrimarket.com</p>
          <Button variant="outline" className="mt-4 w-full">
            <Settings className="w-4 h-4 mr-2" /> Paramètres
          </Button>
        </div>
        
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <BarChart4 className="w-4 h-4 mr-2" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="w-4 h-4 mr-2" /> Utilisateurs
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="w-4 h-4 mr-2" /> Agriculteurs
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare className="w-4 h-4 mr-2" /> Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <ShieldAlert className="w-4 h-4 mr-2" /> Litiges
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="w-4 h-4 mr-2" /> Abonnements
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Landmark className="w-4 h-4 mr-2" /> Finances
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="w-4 h-4 mr-2" /> Rapports
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSidebar;

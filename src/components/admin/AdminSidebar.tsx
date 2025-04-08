
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath.includes(path);
  };

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
          <Button variant="outline" className="mt-4 w-full" asChild>
            <Link to="/admin/settings">
              <Settings className="w-4 h-4 mr-2" /> Paramètres
            </Link>
          </Button>
        </div>
        
        <div className="space-y-2">
          <Button 
            variant={isActive("/admin") && !isActive("/admin/users") && !isActive("/admin/farmers") && !isActive("/admin/messages") && !isActive("/admin/disputes") && !isActive("/admin/subscriptions") && !isActive("/admin/finances") && !isActive("/admin/reports") && !isActive("/admin/settings") ? "default" : "ghost"} 
            className="w-full justify-start" 
            asChild
          >
            <Link to="/admin">
              <BarChart4 className="w-4 h-4 mr-2" /> Dashboard
            </Link>
          </Button>
          <Button 
            variant={isActive("/admin/users") ? "default" : "ghost"} 
            className="w-full justify-start" 
            asChild
          >
            <Link to="/admin/users">
              <Users className="w-4 h-4 mr-2" /> Utilisateurs
            </Link>
          </Button>
          <Button 
            variant={isActive("/admin/farmers") ? "default" : "ghost"} 
            className="w-full justify-start" 
            asChild
          >
            <Link to="/admin/farmers">
              <User className="w-4 h-4 mr-2" /> Agriculteurs
            </Link>
          </Button>
          <Button 
            variant={isActive("/admin/messages") ? "default" : "ghost"} 
            className="w-full justify-start" 
            asChild
          >
            <Link to="/admin/messages">
              <MessageSquare className="w-4 h-4 mr-2" /> Messages
            </Link>
          </Button>
          <Button 
            variant={isActive("/admin/disputes") ? "default" : "ghost"} 
            className="w-full justify-start" 
            asChild
          >
            <Link to="/admin/disputes">
              <ShieldAlert className="w-4 h-4 mr-2" /> Litiges
            </Link>
          </Button>
          <Button 
            variant={isActive("/admin/subscriptions") ? "default" : "ghost"} 
            className="w-full justify-start" 
            asChild
          >
            <Link to="/admin/subscriptions">
              <CreditCard className="w-4 h-4 mr-2" /> Abonnements
            </Link>
          </Button>
          <Button 
            variant={isActive("/admin/finances") ? "default" : "ghost"} 
            className="w-full justify-start" 
            asChild
          >
            <Link to="/admin/finances">
              <Landmark className="w-4 h-4 mr-2" /> Finances
            </Link>
          </Button>
          <Button 
            variant={isActive("/admin/reports") ? "default" : "ghost"} 
            className="w-full justify-start" 
            asChild
          >
            <Link to="/admin/reports">
              <FileText className="w-4 h-4 mr-2" /> Rapports
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSidebar;

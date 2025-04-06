
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Settings } from 'lucide-react';
import { getBuyerDashboardMenuItems } from './BuyerDashboardMenu';

interface BuyerDashboardSidebarProps {
  name: string;
  email: string;
  avatarInitials: string;
}

const BuyerDashboardSidebar = ({ name, email, avatarInitials }: BuyerDashboardSidebarProps) => {
  const menuItems = getBuyerDashboardMenuItems();
  
  return (
    <div className="w-full md:w-1/4">
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-20 w-20 mb-4">
              <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
                {avatarInitials}
              </div>
            </Avatar>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-500">{email}</p>
            <Button variant="outline" className="mt-4 w-full" asChild>
              <Link to="/buyer/profile">
                <User className="w-4 h-4 mr-2" /> Éditer mon profil
              </Link>
            </Button>
          </div>
          
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Button 
                key={item.path}
                variant="ghost" 
                className="w-full justify-start" 
                asChild
              >
                <Link to={item.path}>
                  {item.icon} <span className="ml-2">{item.title}</span>
                </Link>
              </Button>
            ))}
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/buyer/profile">
                <Settings className="w-4 h-4 mr-2" /> Paramètres
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerDashboardSidebar;

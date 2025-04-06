
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Bell, ShoppingCart, Search, MessageSquare, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { useNotification } from '@/contexts/NotificationContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";

interface MobileBottomNavProps {
  onNotificationClick: () => void;
  onCartClick: () => void;
}

const MobileBottomNav = ({
  onNotificationClick,
  onCartClick
}: MobileBottomNavProps) => {
  const { totalItems } = useCart();
  const { unreadCount } = useNotification();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 py-2 px-4 block md:hidden z-50 bg-lime-100">
      <div className="flex items-center justify-around">
        <Button asChild variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 transition-colors">
          <Link to="/" className="flex flex-col items-center orange-500">
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Rechercher</span>
          </Link>
        </Button>
        
        <Button asChild variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 transition-colors">
          <Link to="/chat" className="flex flex-col items-center">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Chat</span>
          </Link>
        </Button>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                asChild
                variant="ghost" 
                size="icon" 
                className="text-gray-600 hover:bg-gray-100 transition-colors flex flex-col items-center"
              >
                <Link to="/contact" className="flex flex-col items-center">
                  <Info className="h-5 w-5" />
                  <span className="text-xs mt-1">Aide</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Besoin d'aide ? Contactez-nous</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:bg-gray-100 transition-colors relative" 
          onClick={onNotificationClick}
        >
          <div className="flex flex-col items-center">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && 
              <Badge 
                className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-xs" 
                variant="destructive"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            }
            <span className="text-xs mt-1">Notifications</span>
          </div>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:bg-gray-100 transition-colors relative" 
          onClick={onCartClick}
        >
          <div className="flex flex-col items-center">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && 
              <Badge 
                className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-agrimarket-orange text-white border-white text-xs"
              >
                {totalItems}
              </Badge>
            }
            <span className="text-xs mt-1">Panier</span>
          </div>
        </Button>
        
        <Button asChild variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100 transition-colors">
          <Link to="/login" className="flex flex-col items-center">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Compte</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomNav;

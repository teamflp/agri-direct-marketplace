
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';
import NotificationIcon from '@/components/notifications/NotificationIcon';
import HeaderAuthActions from './HeaderAuthActions';

const HeaderActions = () => {
  // À remplacer par un vrai compteur provenant du contexte de panier
  const cartItemCount = 3;
  
  return (
    <div className="flex items-center gap-2 ml-auto">
      <div className="hidden sm:flex items-center gap-4">
        <Link to="/cart" className="relative">
          <Button variant="outline" size="icon" className="rounded-full">
            <ShoppingCart className="h-[1.2rem] w-[1.2rem] text-gray-700" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-agrimarket-orange text-white">
                {cartItemCount}
              </Badge>
            )}
            <span className="sr-only">Panier</span>
          </Button>
        </Link>
        
        <Button variant="outline" size="icon" className="rounded-full" asChild>
          <Link to="/buyer/favorites">
            <Heart className="h-[1.2rem] w-[1.2rem] text-gray-700" />
            <span className="sr-only">Favoris</span>
          </Link>
        </Button>
        
        <NotificationIcon />
      </div>

      <HeaderAuthActions />
    </div>
  );
};

export default HeaderActions;

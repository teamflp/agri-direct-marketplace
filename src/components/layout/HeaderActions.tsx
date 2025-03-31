
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MiniCart } from '@/components/cart/MiniCart';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import HeaderSearch from './HeaderSearch';

interface HeaderActionsProps {
  menuOpen: boolean;
  toggleMenu: () => void;
  isMobile: boolean;
  searchPlaceholder: string;
}

const HeaderActions = ({ menuOpen, toggleMenu, isMobile, searchPlaceholder }: HeaderActionsProps) => {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {/* Bouton menu mobile - visible seulement sur mobile et placé en premier */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-600 hover:bg-gray-100 order-first"
          onClick={toggleMenu}
          aria-label="Menu principal"
        >
          <span className="sr-only">Menu</span>
          {menuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      )}
      
      {/* Recherche */}
      <HeaderSearch placeholder={searchPlaceholder} />
      
      {/* Notification */}
      <NotificationCenter />
      
      {/* Panier */}
      <MiniCart />
      
      {/* Profil */}
      <Button 
        asChild 
        variant="ghost" 
        size="icon" 
        className="text-gray-600 hover:bg-gray-100 transition-colors relative group"
      >
        <Link to="/login" className="relative flex items-center justify-center">
          <User className="h-5 w-5" />
          <span className="absolute -bottom-7 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Connexion
          </span>
        </Link>
      </Button>
    </div>
  );
};

export default HeaderActions;

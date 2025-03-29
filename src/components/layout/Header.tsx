
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MiniCart } from '@/components/cart/MiniCart';
import { useCart } from '@/contexts/CartContext';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { cart } = useCart();
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-agrimarket-orange">AgriMarket</span>
          </Link>
          
          {/* Navigation centrale - alignée au centre sur desktop */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
                {t('header.home')}
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
                {t('header.products')}
              </Link>
              <Link to="/farmers" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
                {t('header.farmers')}
              </Link>
              <Link to="/farmers-map" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
                {t('header.map')}
              </Link>
              <Link to="/subscriptions" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
                {t('header.subscriptions')}
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
                {t('header.contact')}
              </Link>
              <Link to="/notifications-demo" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
                {t('header.notificationsDemo')}
              </Link>
            </div>
          </nav>
          
          {/* Actions à droite */}
          <div className="flex items-center space-x-4">
            {/* Recherche */}
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Notification */}
            <NotificationCenter />
            
            {/* Panier */}
            <div className="relative">
              <MiniCart />
            </div>
            
            {/* Profil */}
            <Button asChild variant="ghost" size="icon" className="text-gray-600">
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            
            {/* Bouton menu mobile - caché sur desktop */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>
        
        {/* Menu mobile - visible uniquement sur mobile quand menuOpen est true */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.home')}
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.products')}
              </Link>
              <Link 
                to="/farmers" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.farmers')}
              </Link>
              <Link 
                to="/farmers-map" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.map')}
              </Link>
              <Link 
                to="/subscriptions" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.subscriptions')}
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.contact')}
              </Link>
              <Link 
                to="/notifications-demo" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.notificationsDemo')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

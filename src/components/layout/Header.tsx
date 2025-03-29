
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MiniCart } from '@/components/cart/MiniCart';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Temporary solution until i18next is fully implemented
  const t = (key: string) => {
    const translations: { [key: string]: string } = {
      'header.home': 'Accueil',
      'header.products': 'Produits',
      'header.farmers': 'Agriculteurs',
      'header.subscriptions': 'Abonnements',
      'header.seasonal': 'Calendrier saisonnier',
      'header.contact': 'Contact',
    };
    return translations[key] || key;
  };

  return (
    <header className="bg-green-600 text-white shadow-md fixed w-full z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white">AgriMarket</span>
          </Link>
          
          {/* Navigation centrale - alignée au centre sur tous les écrans */}
          <nav className="hidden md:flex items-center justify-center space-x-8">
            <Link to="/" className="text-white hover:text-green-100 font-medium transition-colors">
              {t('header.home')}
            </Link>
            <Link to="/products" className="text-white hover:text-green-100 font-medium transition-colors">
              {t('header.products')}
            </Link>
            <Link to="/farmers" className="text-white hover:text-green-100 font-medium transition-colors">
              {t('header.farmers')}
            </Link>
            <Link to="/seasonal-calendar" className="text-white hover:text-green-100 font-medium transition-colors">
              {t('header.seasonal')}
            </Link>
            <Link to="/subscriptions" className="text-white hover:text-green-100 font-medium transition-colors">
              {t('header.subscriptions')}
            </Link>
            <Link to="/contact" className="text-white hover:text-green-100 font-medium transition-colors">
              {t('header.contact')}
            </Link>
          </nav>
          
          {/* Actions à droite */}
          <div className="flex items-center space-x-4">
            {/* Recherche */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-green-500">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Notification */}
            <NotificationCenter />
            
            {/* Panier */}
            <MiniCart />
            
            {/* Profil */}
            <Button asChild variant="ghost" size="icon" className="text-white hover:bg-green-500">
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            
            {/* Bouton menu mobile - caché sur desktop */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-white hover:bg-green-500"
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
          <div className="md:hidden py-4 border-t border-green-500">
            <nav className="flex flex-col space-y-4 px-4">
              <Link 
                to="/" 
                className="text-white hover:text-green-100 font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.home')}
              </Link>
              <Link 
                to="/products" 
                className="text-white hover:text-green-100 font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.products')}
              </Link>
              <Link 
                to="/farmers" 
                className="text-white hover:text-green-100 font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.farmers')}
              </Link>
              <Link 
                to="/seasonal-calendar" 
                className="text-white hover:text-green-100 font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.seasonal')}
              </Link>
              <Link 
                to="/subscriptions" 
                className="text-white hover:text-green-100 font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.subscriptions')}
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-green-100 font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.contact')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

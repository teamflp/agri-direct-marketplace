
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, X, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MiniCart } from '@/components/cart/MiniCart';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Input } from "@/components/ui/input";
import AgrimarketLogo from '@/components/logo/AgrimarketLogo';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Détection du défilement pour appliquer les effets visuels
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Temporary solution until i18next is fully implemented
  const t = (key: string) => {
    const translations: { [key: string]: string } = {
      'header.home': 'Accueil',
      'header.products': 'Produits',
      'header.farmers': 'Agriculteurs',
      'header.subscriptions': 'Abonnements',
      'header.seasonal': 'Calendrier saisonnier',
      'header.contact': 'Contact',
      'header.search.placeholder': 'Rechercher...',
    };
    return translations[key] || key;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header 
      className={`${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-white py-3'
      } fixed w-full z-50 transition-all duration-300 top-0 left-0`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - aligné à gauche */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <AgrimarketLogo />
            </Link>
          </div>
          
          {/* Navigation - centrée et mise à jour avec le style orange */}
          <nav className="hidden md:flex items-center justify-center space-x-4 lg:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50">
              {t('header.home')}
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50">
              {t('header.products')}
            </Link>
            <Link to="/farmers" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50">
              {t('header.farmers')}
            </Link>
            <Link to="/seasonal-calendar" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50">
              {t('header.seasonal')}
            </Link>
            <Link to="/subscriptions" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50">
              {t('header.subscriptions')}
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50">
              {t('header.contact')}
            </Link>
          </nav>
          
          {/* Actions à droite */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Recherche */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="absolute right-0 top-[-5px] flex items-center">
                  <div className="relative flex items-center bg-white rounded-md shadow-md overflow-hidden transition-all duration-300 animate-fade-in w-screen max-w-xs">
                    <Input
                      type="text"
                      placeholder={t('header.search.placeholder')}
                      className="pl-3 pr-10 py-2 w-full text-gray-800 border-0 focus:ring-0 focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <Button 
                      type="submit" 
                      className="absolute right-0 top-0 h-full rounded-l-none bg-agrimarket-orange hover:bg-agrimarket-brown transition-colors"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    className="ml-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Fermer la recherche"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Rechercher"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            {/* Notification */}
            <NotificationCenter />
            
            {/* Panier */}
            <MiniCart />
            
            {/* Profil - restauré et amélioré */}
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
            
            {/* Bouton menu mobile - caché sur desktop */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden text-gray-600 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu principal"
            >
              <span className="sr-only">Menu</span>
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Menu mobile - visible uniquement sur mobile quand menuOpen est true */}
        {menuOpen && (
          <div className="md:hidden py-3 mt-2 border-t border-gray-200 bg-white">
            <nav className="flex flex-col space-y-3 px-2">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.home')}
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.products')}
              </Link>
              <Link 
                to="/farmers" 
                className="text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.farmers')}
              </Link>
              <Link 
                to="/seasonal-calendar" 
                className="text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.seasonal')}
              </Link>
              <Link 
                to="/subscriptions" 
                className="text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.subscriptions')}
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.contact')}
              </Link>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50 flex items-center"
                onClick={() => setMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Connexion
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

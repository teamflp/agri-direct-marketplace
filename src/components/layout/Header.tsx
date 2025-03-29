
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MiniCart } from '@/components/cart/MiniCart';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { Input } from "@/components/ui/input";

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
          ? 'bg-green-600/95 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-green-600 py-3'
      } text-white fixed w-full z-50 transition-all duration-300 top-0 left-0`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - aligné à gauche */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className={`font-bold text-white ${scrolled ? 'text-lg' : 'text-xl'} transition-all duration-300`}>
                AgriMarket
              </span>
            </Link>
          </div>
          
          {/* Navigation - centrée */}
          <nav className="hidden md:flex items-center justify-center space-x-4 lg:space-x-8">
            <Link to="/" className="text-white hover:text-green-100 font-medium transition-colors px-2 py-1 rounded-md hover:bg-green-500/30">
              {t('header.home')}
            </Link>
            <Link to="/products" className="text-white hover:text-green-100 font-medium transition-colors px-2 py-1 rounded-md hover:bg-green-500/30">
              {t('header.products')}
            </Link>
            <Link to="/farmers" className="text-white hover:text-green-100 font-medium transition-colors px-2 py-1 rounded-md hover:bg-green-500/30">
              {t('header.farmers')}
            </Link>
            <Link to="/seasonal-calendar" className="text-white hover:text-green-100 font-medium transition-colors px-2 py-1 rounded-md hover:bg-green-500/30">
              {t('header.seasonal')}
            </Link>
            <Link to="/subscriptions" className="text-white hover:text-green-100 font-medium transition-colors px-2 py-1 rounded-md hover:bg-green-500/30">
              {t('header.subscriptions')}
            </Link>
            <Link to="/contact" className="text-white hover:text-green-100 font-medium transition-colors px-2 py-1 rounded-md hover:bg-green-500/30">
              {t('header.contact')}
            </Link>
          </nav>
          
          {/* Actions à droite */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Recherche */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="absolute right-0 top-0 flex w-screen max-w-xs -mr-2">
                  <Input
                    type="text"
                    placeholder={t('header.search.placeholder')}
                    className="pl-3 pr-10 py-2 w-full text-black rounded-l-md focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button 
                    type="submit" 
                    className="rounded-l-none bg-green-500 hover:bg-green-400"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-[-45px] text-white hover:bg-green-500"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-green-500"
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
            
            {/* Profil - masqué pour correspondre à l'image */}
            <Button asChild variant="ghost" size="icon" className="hidden text-white hover:bg-green-500">
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
              aria-label="Menu principal"
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
          <div className="md:hidden py-3 mt-2 border-t border-green-500 bg-green-600/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-3 px-2">
              <Link 
                to="/" 
                className="text-white hover:text-green-100 font-medium transition-colors p-2 rounded-md hover:bg-green-500/30"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.home')}
              </Link>
              <Link 
                to="/products" 
                className="text-white hover:text-green-100 font-medium transition-colors p-2 rounded-md hover:bg-green-500/30"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.products')}
              </Link>
              <Link 
                to="/farmers" 
                className="text-white hover:text-green-100 font-medium transition-colors p-2 rounded-md hover:bg-green-500/30"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.farmers')}
              </Link>
              <Link 
                to="/seasonal-calendar" 
                className="text-white hover:text-green-100 font-medium transition-colors p-2 rounded-md hover:bg-green-500/30"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.seasonal')}
              </Link>
              <Link 
                to="/subscriptions" 
                className="text-white hover:text-green-100 font-medium transition-colors p-2 rounded-md hover:bg-green-500/30"
                onClick={() => setMenuOpen(false)}
              >
                {t('header.subscriptions')}
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-green-100 font-medium transition-colors p-2 rounded-md hover:bg-green-500/30"
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

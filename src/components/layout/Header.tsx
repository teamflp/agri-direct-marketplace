import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AgrimarketLogo from '@/components/logo/AgrimarketLogo';
import HeaderNavigation from './HeaderNavigation';
import HeaderAuthActions from './HeaderAuthActions';
import HeaderMobileMenu from './HeaderMobileMenu';
import MobileBottomNav from './MobileBottomNav';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import { t } from '@/services/translation';
import { MiniCart } from '@/components/cart/MiniCart';
import { useAuth } from '@/contexts/AuthContext';
import { navigationLinks } from './navLinks';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { profile } = useAuth();

  // Navigation links with translated labels and icons
  const navLinks = navigationLinks.map(link => ({
    path: link.path,
    label: t(link.translationKey),
    icon: link.icon,
    iconOnly: link.iconOnly
  }));

  // Détection du défilement pour appliquer les effets visuels
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };
  
  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  // Determine if the user is a farmer and show the appropriate link
  const dashboardLink = profile?.role === 'farmer' ? '/farmer' : '/buyer';

  return (
    <>
      <header 
        className={`${
          scrolled 
            ? 'bg-white shadow-md py-2' 
            : 'bg-white py-3'
        } fixed w-full z-50 transition-all duration-300 top-0 left-0 right-0`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo - aligné à gauche */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <AgrimarketLogo />
              </Link>
            </div>
            
            {/* Navigation - centrée et cachée sur mobile */}
            <div className="hidden md:flex flex-grow justify-center">
              <HeaderNavigation links={navLinks} />
            </div>
            
            {/* Actions à droite - visibles uniquement sur desktop */}
            <div className="hidden md:flex items-center gap-3">
              {/* Notification Center - seulement si l'utilisateur est connecté */}
              {profile && <NotificationCenter />}
              
              {/* Mini panier */}
              <MiniCart />
              
              {/* Boutons de connexion/inscription */}
              <HeaderAuthActions />
            </div>
            
            {/* Menu hamburger sur mobile */}
            <div className="md:hidden flex items-center">
              <button 
                className="p-2 text-gray-600"
                onClick={toggleMenu}
                aria-label="Menu principal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
          </div>
          
          {/* Menu mobile */}
          <HeaderMobileMenu 
            isOpen={menuOpen} 
            links={navLinks} 
            onClose={() => setMenuOpen(false)} 
          />
        </div>
        </div>
      </header>
      
      {/* Barre de navigation mobile en bas */}
      <div className="md:hidden">
        <MobileBottomNav 
          onNotificationClick={handleNotificationClick} 
          onCartClick={handleCartClick} 
        />
      </div>
      
      {/* Ajout d'un espace en bas pour la barre de navigation mobile */}
      <div className="pb-16 md:hidden"></div>
    </>
  );
};

export default Header;

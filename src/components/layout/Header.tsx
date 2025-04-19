
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import AgrimarketLogo from '@/components/logo/AgrimarketLogo';
import HeaderNavigation from './HeaderNavigation';
import HeaderAuthActions from './HeaderAuthActions';
import HeaderMobileMenu from './HeaderMobileMenu';
import MobileBottomNav from './MobileBottomNav';
import { t } from '@/services/translation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const isMobile = useIsMobile();

  // Navigation links
  const navLinks = [
    { path: '/', label: t('header.home') },
    { path: '/products', label: t('header.products') },
    { path: '/farmers', label: t('header.farmers') },
    { path: '/seasonal-calendar', label: t('header.seasonal') },
    { path: '/subscriptions', label: t('header.subscriptions') },
    { path: '/contact', label: t('header.contact') },
  ];

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

  return (
    <>
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
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <AgrimarketLogo />
              </Link>
            </div>
            
            {/* Navigation - centrée */}
            <HeaderNavigation links={navLinks} />
            
            {/* Actions à droite - visibles uniquement sur desktop */}
            <div className="flex items-center">
              <HeaderAuthActions />
            </div>
            
            {/* Menu hamburger sur mobile */}
            {isMobile && (
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
            )}
          </div>
          
          {/* Menu mobile */}
          <HeaderMobileMenu 
            isOpen={menuOpen} 
            links={navLinks} 
            onClose={() => setMenuOpen(false)} 
          />
        </div>
      </header>
      
      {/* Barre de navigation mobile en bas */}
      {isMobile && (
        <MobileBottomNav 
          onNotificationClick={handleNotificationClick} 
          onCartClick={handleCartClick} 
        />
      )}
      
      {/* Ajout d'un espace en bas pour la barre de navigation mobile */}
      {isMobile && <div className="pb-16"></div>}
    </>
  );
};

export default Header;

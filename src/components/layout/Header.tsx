
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import AgrimarketLogo from '@/components/logo/AgrimarketLogo';
import HeaderNavigation from './HeaderNavigation';
import HeaderActions from './HeaderActions';
import HeaderMobileMenu from './HeaderMobileMenu';
import { t } from '@/services/translation';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
          <HeaderNavigation links={navLinks} />
          
          {/* Actions à droite */}
          <HeaderActions 
            menuOpen={menuOpen} 
            toggleMenu={toggleMenu} 
            isMobile={isMobile}
            searchPlaceholder={t('header.search.placeholder')}
          />
        </div>
        
        {/* Menu mobile */}
        <HeaderMobileMenu 
          isOpen={menuOpen} 
          links={navLinks} 
          onClose={() => setMenuOpen(false)} 
        />
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';
import HeaderNavigation from './HeaderNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  links: {
    path: string;
    label: string;
  }[];
  onClose: () => void;
}

const HeaderMobileMenu = ({ isOpen, links, onClose }: HeaderMobileMenuProps) => {
  const { user, profile, signOut } = useAuth();
  
  if (!isOpen) return null;

  const getProfileLinkClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClassName = "text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50 flex items-center";
    const activeClassName = "text-agrimarket-green bg-agrimarket-green/10 font-semibold";
    return isActive ? `${baseClassName} ${activeClassName}` : baseClassName;
  };

  return (
    <div className="md:hidden fixed inset-x-0 top-[60px] z-40 py-3 mt-2 border-t border-gray-200 bg-white shadow-lg max-h-[calc(100vh-60px)] overflow-y-auto">
      <HeaderNavigation
        links={links}
        isMobile={true}
        onClickMobile={onClose}
      />
      <div className="mt-3 px-4 space-y-3">
        {user ? (
          <>
            <NavLink 
              to="/buyer/profile" 
              className={getProfileLinkClassName}
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  <User className="h-5 w-5 mr-2" />
                  <span aria-current={isActive ? 'page' : undefined}>
                    Mon profil
                  </span>
                </>
              )}
            </NavLink>
            <Button 
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-agrimarket-orange font-medium"
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Déconnexion
            </Button>
          </>
        ) : (
          <div className="flex flex-col space-y-3 px-2">
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                `border-2 border-agrimarket-orange font-semibold p-3 rounded-md flex items-center justify-center w-full transition-colors ${
                  isActive 
                    ? 'bg-agrimarket-orange text-white' 
                    : 'text-agrimarket-orange hover:bg-agrimarket-orange/10'
                }`
              }
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  <span aria-current={isActive ? 'page' : undefined}>
                    Connexion
                  </span>
                </>
              )}
            </NavLink>
            <NavLink 
              to="/register" 
              className={({ isActive }) => 
                `font-semibold shadow-sm p-3 rounded-md flex items-center justify-center w-full transition-colors ${
                  isActive 
                    ? 'bg-agrimarket-brown text-white' 
                    : 'bg-agrimarket-orange hover:bg-agrimarket-brown text-white'
                }`
              }
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  <User className="h-5 w-5 mr-2" />
                  <span aria-current={isActive ? 'page' : undefined}>
                    Inscription
                  </span>
                </>
              )}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMobileMenu;

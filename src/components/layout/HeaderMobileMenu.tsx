
import React from 'react';
import { Link } from 'react-router-dom';
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
  const { user, signOut } = useAuth();
  
  if (!isOpen) return null;

  return (
    <div className="md:hidden py-3 mt-2 border-t border-gray-200 bg-white">
      <HeaderNavigation
        links={links}
        isMobile={true}
        onClickMobile={onClose}
      />
      <div className="mt-3 px-2 space-y-2">
        {user ? (
          <>
            <Link 
              to="/buyer/profile" 
              className="text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50 flex items-center"
              onClick={onClose}
            >
              <User className="h-5 w-5 mr-2" />
              Mon profil
            </Link>
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
          <>
            <Link 
              to="/login" 
              className="border-2 border-agrimarket-orange text-agrimarket-orange font-semibold hover:bg-agrimarket-orange/10 p-2 rounded-md flex items-center justify-center w-full"
              onClick={onClose}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Connexion
            </Link>
            <Link 
              to="/register" 
              className="bg-agrimarket-orange text-white font-semibold hover:bg-agrimarket-brown shadow-sm p-2 rounded-md flex items-center justify-center w-full"
              onClick={onClose}
            >
              <User className="h-5 w-5 mr-2" />
              Inscription
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderMobileMenu;

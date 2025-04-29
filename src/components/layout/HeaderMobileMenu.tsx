
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
  const { user, profile, signOut } = useAuth();
  
  if (!isOpen) return null;

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
          <div className="flex flex-col space-y-3 px-2">
            <Link 
              to="/login" 
              className="border-2 border-agrimarket-orange text-agrimarket-orange font-semibold hover:bg-agrimarket-orange/10 p-3 rounded-md flex items-center justify-center w-full"
              onClick={onClose}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Connexion
            </Link>
            <Link 
              to="/register" 
              className="bg-agrimarket-orange hover:bg-agrimarket-brown text-white font-semibold shadow-sm p-3 rounded-md flex items-center justify-center w-full"
              onClick={onClose}
            >
              <User className="h-5 w-5 mr-2" />
              Inscription
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMobileMenu;


import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import HeaderNavigation from './HeaderNavigation';

interface HeaderMobileMenuProps {
  isOpen: boolean;
  links: {
    path: string;
    label: string;
  }[];
  onClose: () => void;
}

const HeaderMobileMenu = ({ isOpen, links, onClose }: HeaderMobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden py-3 mt-2 border-t border-gray-200 bg-white">
      <HeaderNavigation
        links={links}
        isMobile={true}
        onClickMobile={onClose}
      />
      <div className="mt-3 px-2">
        <Link 
          to="/login" 
          className="text-gray-700 hover:text-agrimarket-green font-medium transition-colors p-2 rounded-md hover:bg-gray-50 flex items-center"
          onClick={onClose}
        >
          <User className="h-5 w-5 mr-2" />
          Connexion
        </Link>
      </div>
    </div>
  );
};

export default HeaderMobileMenu;

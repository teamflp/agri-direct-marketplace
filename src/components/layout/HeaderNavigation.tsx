
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderNavigationProps {
  links: {
    path: string;
    label: string;
  }[];
  isMobile?: boolean;
  onClickMobile?: () => void;
}

const HeaderNavigation = ({ links, isMobile = false, onClickMobile }: HeaderNavigationProps) => {
  const baseClassName = "text-gray-700 hover:text-agrimarket-orange font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50";
  
  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-3 px-2">
        {links.map((link) => (
          <Link 
            key={link.path}
            to={link.path} 
            className={baseClassName}
            onClick={onClickMobile}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    );
  }
  
  return (
    <nav className="hidden md:flex items-center justify-center space-x-4 lg:space-x-8">
      {links.map((link) => (
        <Link 
          key={link.path}
          to={link.path} 
          className={baseClassName}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderNavigation;

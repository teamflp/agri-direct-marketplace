
import React from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderNavigationProps {
  links: {
    path: string;
    label: string;
    icon?: any;
    iconOnly?: boolean;
  }[];
  isMobile?: boolean;
  onClickMobile?: () => void;
}

const HeaderNavigation = ({ links, isMobile = false, onClickMobile }: HeaderNavigationProps) => {
  const getNavLinkClassName = ({ isActive }: { isActive: boolean }) => {
    const baseClassName = "text-gray-700 hover:text-agrimarket-orange font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50 flex items-center gap-1";
    const activeClassName = "text-agrimarket-orange bg-agrimarket-orange/10 font-semibold";
    return isActive ? `${baseClassName} ${activeClassName}` : baseClassName;
  };
  
  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-3 px-2" role="navigation" aria-label="Navigation principale mobile">
        {links.map((link) => (
          <NavLink 
            key={link.path}
            to={link.path} 
            end={link.path === '/'}
            className={getNavLinkClassName}
            onClick={onClickMobile}
          >
            {({ isActive }) => (
              <span aria-current={isActive ? 'page' : undefined} className="flex items-center gap-2">
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    );
  }
  
  return (
    <nav className="hidden md:flex items-center justify-center space-x-2 lg:space-x-6" role="navigation" aria-label="Navigation principale">
      {links.map((link) => (
        <NavLink 
          key={link.path}
          to={link.path} 
          end={link.path === '/'}
          className={getNavLinkClassName}
        >
          {({ isActive }) => (
            <span aria-current={isActive ? 'page' : undefined} className="flex items-center gap-1">
              {link.icon && <link.icon className="h-4 w-4" />}
              {!link.iconOnly && link.label}
              {link.iconOnly && <span className="sr-only">{link.label}</span>}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default HeaderNavigation;

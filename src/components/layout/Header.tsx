
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MiniCart } from "@/components/cart/MiniCart";
import { Menu, X, User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Accueil", path: "/" },
  { name: "Produits", path: "/products" },
  { name: "Agriculteurs", path: "/farmers" },
  { name: "Abonnements", path: "/subscriptions" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-agrimarket-green">
              Agri<span className="text-agrimarket-orange">Market</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`text-gray-700 hover:text-agrimarket-green transition-colors py-2 ${
                      location.pathname === item.path ? "border-b-2 border-agrimarket-green" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <MiniCart />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Compte
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login">Se connecter</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register">S'inscrire</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/buyer-dashboard">Espace acheteur</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/farmer-dashboard">Espace agriculteur</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <MiniCart />
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={`block py-2 text-gray-700 hover:text-agrimarket-green transition-colors ${
                        location.pathname === item.path ? "font-medium text-agrimarket-green" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t space-y-3">
                <Link 
                  to="/login" 
                  className="block py-2 text-gray-700 hover:text-agrimarket-green transition-colors"
                >
                  Se connecter
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 text-gray-700 hover:text-agrimarket-green transition-colors"
                >
                  S'inscrire
                </Link>
                <Link 
                  to="/buyer-dashboard" 
                  className="block py-2 text-gray-700 hover:text-agrimarket-green transition-colors"
                >
                  Espace acheteur
                </Link>
                <Link 
                  to="/farmer-dashboard" 
                  className="block py-2 text-gray-700 hover:text-agrimarket-green transition-colors"
                >
                  Espace agriculteur
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

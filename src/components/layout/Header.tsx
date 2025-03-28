
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingCart, X, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-agrimarket-orange mr-2">Agri<span className="text-agrimarket-green">Market</span></div>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-agrimarket-orange transition-colors">Accueil</Link>
            <Link to="/products" className="font-medium hover:text-agrimarket-orange transition-colors">Produits</Link>
            <Link to="/farmers" className="font-medium hover:text-agrimarket-orange transition-colors">Agriculteurs</Link>
            <Link to="/subscriptions" className="font-medium hover:text-agrimarket-orange transition-colors">Abonnements</Link>
            <Link to="/contact" className="font-medium hover:text-agrimarket-orange transition-colors">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Link to="/search">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-agrimarket-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Button>
            </Link>
            
            <div className="hidden md:block">
              <Link to="/login">
                <Button variant="default" className="bg-agrimarket-orange hover:bg-orange-600 text-white">
                  Connexion / Inscription
                </Button>
              </Link>
            </div>
            
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="font-medium p-2 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>Accueil</Link>
              <Link to="/products" className="font-medium p-2 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>Produits</Link>
              <Link to="/farmers" className="font-medium p-2 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>Agriculteurs</Link>
              <Link to="/subscriptions" className="font-medium p-2 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>Abonnements</Link>
              <Link to="/contact" className="font-medium p-2 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>Contact</Link>
              <div className="pt-2 border-t">
                <Link to="/login">
                  <Button variant="default" className="w-full bg-agrimarket-orange hover:bg-orange-600 text-white">
                    Connexion / Inscription
                  </Button>
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

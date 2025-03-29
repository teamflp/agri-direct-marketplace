
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MiniCart } from '@/components/cart/MiniCart';
import { useCart } from '@/contexts/CartContext';
import NotificationCenter from '@/components/notifications/NotificationCenter';

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { cart } = useCart();
  
  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-agrimarket-orange">AgriMarket</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
              Accueil
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
              Produits
            </Link>
            <Link to="/farmers" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
              Agriculteurs
            </Link>
            <Link to="/farmers-map" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
              Carte
            </Link>
            <Link to="/subscriptions" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
              Abonnements
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
              Contact
            </Link>
            <Link to="/notifications-demo" className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors">
              Notifications Demo
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Notification Component */}
            <NotificationCenter />
            
            {/* Cart */}
            <div className="relative">
              <MiniCart />
            </div>
            
            {/* Login/Profile */}
            <Button asChild variant="outline" size="icon" className="rounded-full">
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Produits
              </Link>
              <Link 
                to="/farmers" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Agriculteurs
              </Link>
              <Link 
                to="/farmers-map" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Carte
              </Link>
              <Link 
                to="/subscriptions" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Abonnements
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/notifications-demo" 
                className="text-gray-700 hover:text-agrimarket-orange font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Notifications Demo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

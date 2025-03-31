
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, CreditCard } from 'lucide-react';
import AgrimarketLogo from '@/components/logo/AgrimarketLogo';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t w-screen">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <AgrimarketLogo />
            </div>
            <p className="text-gray-600 mb-4">
              Plateforme qui connecte les agriculteurs directement aux consommateurs, pour des produits frais, locaux et durables.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-agrimarket-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agrimarket-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agrimarket-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-agrimarket-green transition-colors">Accueil</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-agrimarket-green transition-colors">Produits</Link></li>
              <li><Link to="/farmers" className="text-gray-600 hover:text-agrimarket-green transition-colors">Agriculteurs</Link></li>
              <li><Link to="/subscriptions" className="text-gray-600 hover:text-agrimarket-green transition-colors">Abonnements</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-agrimarket-green transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-green transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-green transition-colors">Guide agriculteurs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-green transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-green transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Légal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-green transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-green transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-green transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-green transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} AgriMarket. Tous droits réservés.</p>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center mb-1">
                    <span className="text-white font-bold text-xs">MTN</span>
                  </div>
                  <span className="text-xs text-gray-600">MTN Money</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center mb-1">
                    <span className="text-white font-bold text-xs">OM</span>
                  </div>
                  <span className="text-xs text-gray-600">Orange Money</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center mb-1">
                    <span className="text-white font-bold text-xs">MV</span>
                  </div>
                  <span className="text-xs text-gray-600">Move</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center mb-1">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs text-gray-600">Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

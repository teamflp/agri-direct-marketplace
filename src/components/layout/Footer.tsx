
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">AgriMarket</h3>
            <p className="text-gray-600 mb-4">
              Plateforme qui connecte les agriculteurs directement aux consommateurs, pour des produits frais, locaux et durables.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-agrimarket-orange">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agrimarket-orange">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-agrimarket-orange">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-agrimarket-orange">Accueil</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-agrimarket-orange">Produits</Link></li>
              <li><Link to="/farmers" className="text-gray-600 hover:text-agrimarket-orange">Agriculteurs</Link></li>
              <li><Link to="/subscriptions" className="text-gray-600 hover:text-agrimarket-orange">Abonnements</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-agrimarket-orange">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-orange">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-orange">Guide agriculteurs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-orange">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-orange">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-orange">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-orange">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-orange">Mentions légales</a></li>
              <li><a href="#" className="text-gray-600 hover:text-agrimarket-orange">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} AgriMarket. Tous droits réservés.</p>
            <div className="mt-4 md:mt-0">
              <img 
                src="/lovable-uploads/6ca1f9ee-2c05-447b-a54b-a0c40c93438b.png"
                alt="Méthodes de paiement"
                className="h-8" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

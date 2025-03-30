import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturesSection from '@/components/home/FeaturesSection';
import MapSection from '@/components/home/MapSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import SubscriptionSection from '@/components/home/SubscriptionSection';
import ProductCard from '@/components/products/ProductCard';
import FarmerCard from '@/components/farmers/FarmerCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Exemples de données de produits
const featuredProducts = [
  {
    id: 1,
    name: "Panier de légumes bio",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    price: 24.90,
    unit: "panier",
    rating: 4.8,
    farmerName: "Ferme des Quatre Saisons",
    farmerId: 1, // Added farmerId
    organic: true,
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    price: 8.50,
    unit: "pot 500g",
    rating: 4.9,
    farmerName: "Les Ruches de Marie",
    farmerId: 2, // Added farmerId
    organic: true,
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    price: 4.20,
    unit: "pièce",
    rating: 4.7,
    farmerName: "Chèvrerie du Vallon",
    farmerId: 3, // Added farmerId
    organic: false,
  },
  {
    id: 4,
    name: "Œufs fermiers",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    price: 3.60,
    unit: "boîte de 6",
    rating: 4.6,
    farmerName: "Ferme des Collines",
    farmerId: 4, // Added farmerId
    organic: true,
  },
];

// Exemples de données d'agriculteurs
const featuredFarmers = [
  {
    id: 1,
    name: "Ferme des Quatre Saisons",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    location: "Loire-Atlantique",
    distance: 12.5,
    rating: 4.8,
    productsCount: 18,
    specialties: ["Bio", "Légumes", "Fruits"],
  },
  {
    id: 2,
    name: "Les Ruches de Marie",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    location: "Maine-et-Loire",
    distance: 24.1,
    rating: 4.9,
    productsCount: 6,
    specialties: ["Miel", "Bio"],
  },
  {
    id: 3,
    name: "Chèvrerie du Vallon",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    location: "Vendée",
    distance: 35.8,
    rating: 4.7,
    productsCount: 12,
    specialties: ["Fromage", "Produits laitiers"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 sm:pt-24">
        <HeroBanner />
        
        <FeaturesSection />
        
        {/* Section Produits à la Une */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Produits à la une</h2>
              <Link to="/products">
                <Button variant="link" className="text-agrimarket-orange flex items-center">
                  Voir tous les produits <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
        
        <MapSection />
        
        {/* Section Agriculteurs à découvrir */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Agriculteurs à découvrir</h2>
              <Link to="/farmers">
                <Button variant="link" className="text-agrimarket-orange flex items-center">
                  Voir tous les agriculteurs <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredFarmers.map(farmer => (
                <FarmerCard key={farmer.id} {...farmer} />
              ))}
            </div>
          </div>
        </section>
        
        <TestimonialsSection />
        
        <SubscriptionSection />
        
        {/* Section CTA */}
        <section className="py-20 bg-agrimarket-orange">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Prêt à rejoindre la révolution agricole ?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Que vous soyez agriculteur ou consommateur, AgriMarket vous permet de participer à un système alimentaire plus juste et durable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-agrimarket-orange hover:bg-gray-100 text-lg py-6 px-8">
                Créer un compte
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg py-6 px-8">
                En savoir plus
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

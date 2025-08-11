
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FarmerCard from '@/components/farmers/FarmerCard';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFarmers } from '@/hooks/useFarmers';

const Farmers = () => {
  const { farmers, loading, error } = useFarmers();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    certified: false,
    maxDistance: 50,
    minRating: 0,
  });

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCertified = !filters.certified || farmer.is_certified;
    const matchesDistance = !farmer.distance || farmer.distance <= filters.maxDistance;
    const matchesRating = farmer.rating >= filters.minRating;

    return matchesSearch && matchesCertified && matchesDistance && matchesRating;
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agrimarket-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des agriculteurs...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600">Erreur lors du chargement: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Nos Agriculteurs</h1>
          <p className="text-gray-600 mb-6">
            Découvrez les producteurs locaux de votre région
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher par nom, lieu ou spécialité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="certified"
                    checked={filters.certified}
                    onChange={(e) => setFilters(prev => ({ ...prev, certified: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="certified" className="text-sm">Certifié bio uniquement</label>
                </div>
                
                <div>
                  <label className="text-sm block mb-1">Distance max: {filters.maxDistance}km</label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={filters.maxDistance}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm block mb-1">Note minimum: {filters.minRating}/5</label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.minRating}
                    onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {filteredFarmers.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">Aucun agriculteur trouvé avec ces critères.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarmers.map((farmer) => (
              <FarmerCard 
                key={farmer.id}
                id={parseInt(farmer.id)}
                name={farmer.name}
                image="https://images.unsplash.com/photo-1566472814542-3571fb3b9e7a"
                location={farmer.location}
                distance={farmer.distance || 0}
                rating={farmer.rating}
                productsCount={0}
                specialties={['Légumes bio', 'Fruits de saison']}
                onClick={() => console.log('Navigate to farmer', farmer.id)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Farmers;

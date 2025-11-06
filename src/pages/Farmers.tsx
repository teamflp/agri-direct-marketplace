// @ts-nocheck
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FarmerCard from '@/components/farmers/FarmerCard';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFarmers } from '@/hooks/useFarmers';

const Farmers = () => {
  const { farmers, loading, error } = useFarmers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    certified: false,
    maxDistance: 50,
  });

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.farm_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCertified = !filters.certified || farmer.is_certified;
    const matchesDistance = !farmer.distance || farmer.distance <= filters.maxDistance;

    return matchesSearch && matchesCertified && matchesDistance;
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agrimarket-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des producteurs...</p>
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
            <p className="text-red-600">Erreur lors du chargement des producteurs: {error}</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Nos Producteurs</h1>
          <p className="text-gray-600 mb-6">
            Découvrez nos producteurs locaux et leurs exploitations
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher un producteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filters.certified ? "default" : "outline"}
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, certified: !prev.certified }))}
              >
                <Filter className="h-4 w-4 mr-1" />
                Certifié Bio
              </Button>
            </div>
          </div>

          {filters.certified && (
            <div className="mb-4">
              <Badge variant="secondary" className="mr-2">
                Certifié Bio
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-4 w-4 p-0"
                  onClick={() => setFilters(prev => ({ ...prev, certified: false }))}
                >
                  ×
                </Button>
              </Badge>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">Aucun producteur trouvé avec ces critères.</p>
            </div>
          ) : (
            filteredFarmers.map((farmer) => (
              <FarmerCard
                key={farmer.id}
                id={farmer.id}
                name={farmer.name}
                farmName={farmer.farm_name}
                location={farmer.location}
                distance={farmer.distance}
                phone={farmer.phone}
                description={farmer.description}
                isCertified={farmer.is_certified}
                rating={farmer.rating}
                reviewsCount={farmer.reviews_count}
              />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Farmers;

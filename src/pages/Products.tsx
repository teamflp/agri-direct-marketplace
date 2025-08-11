
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import ActiveFilters from '@/components/products/ActiveFilters';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/useProducts';

const Products = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 100],
    organic: false,
    freeDelivery: false,
    farmPickup: false,
    distance: 50,
    rating: 0,
    inStock: false,
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || product.category_id === filters.category;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesOrganic = !filters.organic || product.is_organic;
    const matchesFreeDelivery = !filters.freeDelivery || product.free_delivery;
    const matchesFarmPickup = !filters.farmPickup || product.farm_pickup;
    const matchesRating = product.rating >= filters.rating;
    const matchesStock = !filters.inStock || product.stock > 0;
    const matchesDistance = !product.farmer?.distance || product.farmer.distance <= filters.distance;

    return matchesSearch && matchesCategory && matchesPrice && matchesOrganic && 
           matchesFreeDelivery && matchesFarmPickup && matchesRating && 
           matchesStock && matchesDistance;
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 100],
      organic: false,
      freeDelivery: false,
      farmPickup: false,
      distance: 50,
      rating: 0,
      inStock: false,
    });
    setSearchTerm('');
  };

  const removeFilter = (filterKey: string) => {
    if (filterKey === 'search') {
      setSearchTerm('');
    } else if (filterKey === 'priceRange') {
      setFilters(prev => ({ ...prev, priceRange: [0, 100] }));
    } else if (filterKey === 'distance') {
      setFilters(prev => ({ ...prev, distance: 50 }));
    } else if (filterKey === 'rating') {
      setFilters(prev => ({ ...prev, rating: 0 }));
    } else {
      setFilters(prev => ({ ...prev, [filterKey]: filterKey === 'category' ? '' : false }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agrimarket-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des produits...</p>
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
            <p className="text-red-600">Erreur lors du chargement des produits: {error}</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Produits Locaux</h1>
          <p className="text-gray-600 mb-6">
            Découvrez nos produits frais directement des producteurs locaux
          </p>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher des produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <ActiveFilters
            filters={filters}
            searchTerm={searchTerm}
            onRemoveFilter={removeFilter}
            onClearAll={clearFilters}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFilterChange}
            />
          </aside>

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Aucun produit trouvé avec ces critères.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;

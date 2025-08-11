
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters, { ProductFilters as ProductFiltersType } from '@/components/products/ProductFilters';
import ActiveFilters from '@/components/products/ActiveFilters';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/useProducts';

const Products = () => {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFiltersType>({
    search: '',
    priceRange: [0, 100],
    categories: [],
    organic: false,
    localOnly: false,
    freeDelivery: false,
    farmPickup: false,
    distance: 50,
  });

  // Available categories (could be fetched from API)
  const categories = ['Légumes', 'Fruits', 'Produits laitiers', 'Viande', 'Épicerie'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filters.categories.length === 0 || 
                           filters.categories.includes(product.category_id || '');
    const matchesPrice = product.price >= filters.priceRange[0] && 
                        product.price <= filters.priceRange[1];
    const matchesOrganic = !filters.organic || product.is_organic;
    const matchesFreeDelivery = !filters.freeDelivery || product.free_delivery;
    const matchesFarmPickup = !filters.farmPickup || product.farm_pickup;
    const matchesDistance = !filters.localOnly || 
                           !product.farmer?.distance || 
                           product.farmer.distance <= 30;

    return matchesSearch && matchesCategory && matchesPrice && 
           matchesOrganic && matchesFreeDelivery && matchesFarmPickup && 
           matchesDistance;
  });

  const handleFilterChange = (newFilters: ProductFiltersType) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      priceRange: [0, 100],
      categories: [],
      organic: false,
      localOnly: false,
      freeDelivery: false,
      farmPickup: false,
      distance: 50,
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
    } else if (filterKey.startsWith('category-')) {
      const category = filterKey.replace('category-', '');
      setFilters(prev => ({ 
        ...prev, 
        categories: prev.categories.filter(c => c !== category) 
      }));
    } else {
      setFilters(prev => ({ ...prev, [filterKey]: false }));
    }
  };

  // Count active filters
  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'categories') return count + (value as string[]).length;
    if (key === 'priceRange') {
      const range = value as [number, number];
      return count + (range[0] !== 0 || range[1] !== 100 ? 1 : 0);
    }
    if (key === 'distance') return count + (value !== 50 ? 1 : 0);
    if (typeof value === 'boolean') return count + (value ? 1 : 0);
    return count;
  }, 0) + (searchTerm ? 1 : 0);

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
          
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={clearFilters}
            categories={categories}
            isOpen={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
            activeFiltersCount={activeFiltersCount}
          />
          
          <ActiveFilters
            filters={filters}
            searchTerm={searchTerm}
            onRemoveFilter={removeFilter}
            onClearAll={clearFilters}
          />
        </div>

        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Aucun produit trouvé avec ces critères.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={parseInt(product.id)}
                  name={product.name}
                  image={product.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43'}
                  price={product.price}
                  unit={product.unit}
                  rating={product.rating}
                  reviews={product.reviews_count}
                  farmerName={product.farmer?.name || 'Producteur'}
                  farmerId={parseInt(product.farmer?.id || '1')}
                  distance={product.farmer?.distance}
                  organic={product.is_organic}
                  freeDelivery={product.free_delivery}
                  farmPickup={product.farm_pickup}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;

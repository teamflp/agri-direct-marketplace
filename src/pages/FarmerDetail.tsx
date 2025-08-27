import React from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FarmerHero from '@/components/farmer/FarmerHero';
import FarmerDescription from '@/components/farmer/FarmerDescription';
import ProductCard from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const FarmerDetail = () => {
  const router = useRouter();
  const { farmerId } = router.query;
  const { products, loading, error } = useProducts();

  // Placeholder data for farmer details
  const farmer = {
    id: farmerId,
    name: 'Ferme de Jean',
    description: 'Producteur local de fruits et légumes biologiques.',
    image: 'https://images.unsplash.com/photo-1497900304864-273dfb3aae33?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D',
    rating: 4.5,
    reviews: 50,
  };

  // Filter products based on farmerId
  const farmerProducts = products.filter(product => product.farmerId === farmerId);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agrimarket-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des produits du producteur...</p>
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
        <FarmerHero farmer={farmer} />

        <FarmerDescription farmer={farmer} />

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Produits de {farmer.name}
          </h2>
          {farmerProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Ce producteur n'a pas encore de produits disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43'}
                  price={product.price}
                  unit={product.unit}
                  rating={0}
                  reviews={0}
                  farmerName={farmer.name}
                  farmerId={farmer.id}
                  distance={0}
                  organic={product.is_organic || false}
                  freeDelivery={false}
                  farmPickup={false}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FarmerDetail;

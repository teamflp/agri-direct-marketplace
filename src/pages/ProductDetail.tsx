import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const ProductDetail = () => {
  const { productId } = useParams();
  const { products, loading, error } = useProducts();

  // Find the product with the matching ID
  const product = products.find(p => p.id === productId);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agrimarket-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du produit...</p>
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
            <p className="text-red-600">Erreur lors du chargement du produit: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Produit non trouvé.</p>
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
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43'}
          price={product.price}
          unit={product.unit}
          rating={0}
          reviews={0}
          farmerName="Producteur"
          farmerId="1"
          distance={0}
          organic={product.is_organic || false}
          freeDelivery={false}
          farmPickup={false}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

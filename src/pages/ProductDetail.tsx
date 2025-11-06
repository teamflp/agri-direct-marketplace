// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useProducts } from '@/hooks/useProducts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Truck, Store, Leaf, Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrency } from '@/contexts/CurrencyContext';
import AddToCartButton from '@/components/products/AddToCartButton';
import ProductSocialActions from '@/components/products/ProductSocialActions';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { useUnifiedReviews } from '@/hooks/useUnifiedReviews';
import { Separator } from '@/components/ui/separator';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const { getProductReviews } = useUnifiedReviews();
  const { formatPrice, isLoading: isCurrencyLoading } = useCurrency();

  // Find the product with the matching ID
  const product = products.find(p => p.id === id);
  const productReviews = id ? getProductReviews(id) : [];

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="md:flex md:gap-8">
            {/* Colonne de l'image */}
            <div className="md:w-1/2">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43'}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
                {product.is_organic && (
                  <Badge className="absolute top-2 left-2 bg-green-500 text-white border-none">
                    <Leaf className="h-3 w-3 mr-1" /> Bio
                  </Badge>
                )}
              </div>
            </div>

            {/* Colonne des informations */}
            <div className="md:w-1/2 mt-6 md:mt-0">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              <Link
                to={`/farmer/${product.farmer?.id}`}
                className="text-lg text-gray-600 hover:text-agrimarket-orange transition-colors mt-1 inline-block"
              >
                par {product.farmer?.name || 'Producteur local'}
              </Link>

              <div className="my-4">
                <ReviewSummary reviews={productReviews} size="md" />
              </div>

              <p className="text-3xl font-bold text-agrimarket-orange my-4">
                {isCurrencyLoading ? '...' : formatPrice(product.price)}
                <span className="text-lg text-gray-500"> /{product.unit}</span>
              </p>

              <p className="text-gray-700 mb-6">
                {product.description || "Aucune description disponible pour ce produit."}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.free_delivery && (
                  <Badge variant="secondary" className="text-xs">
                    <Truck className="h-3 w-3 mr-1" />
                    Livraison gratuite
                  </Badge>
                )}
                {product.farm_pickup && (
                  <Badge variant="secondary" className="text-xs">
                    <Store className="h-3 w-3 mr-1" />
                    Retrait à la ferme
                  </Badge>
                )}
                {product.farmer?.distance && (
                  <Badge variant="secondary" className="text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    {product.farmer.distance} km
                  </Badge>
                )}
              </div>

              <Separator className="my-6" />

              <div className="flex items-center gap-4">
                <AddToCartButton
                  productId={parseInt(product.id)}
                  productName={product.name}
                  productPrice={product.price}
                  productImage={product.image_url || ''}
                  productUnit={product.unit}
                  farmerName={product.farmer?.name || ''}
                  farmerId={parseInt(product.farmer?.id || '0')}
                  className="flex-grow"
                />
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

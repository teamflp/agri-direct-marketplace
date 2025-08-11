
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { StarRating } from '@/components/reviews/StarRating';
import { ProductReviews } from '@/components/reviews/ProductReviews';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { useProducts } from '@/hooks/useProducts';
import { useUnifiedReviews } from '@/hooks/useUnifiedReviews';
import { ShoppingCart, MapPin, Truck, Store } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useProducts();
  const { getProductReviews } = useUnifiedReviews();
  
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

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

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600">Produit non trouvé</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const productReviews = getProductReviews(id!);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <img
              src={product.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43'}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <ReviewSummary reviews={productReviews} size="lg" />
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-agrimarket-green">
                {product.price}€
              </span>
              <span className="text-gray-600">/ {product.unit}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {product.is_organic && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Bio
                </Badge>
              )}
              {product.free_delivery && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Truck className="h-3 w-3 mr-1" />
                  Livraison gratuite
                </Badge>
              )}
              {product.farm_pickup && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Store className="h-3 w-3 mr-1" />
                  Retrait à la ferme
                </Badge>
              )}
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700">{product.description}</p>
              
              {product.farmer && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Producteur</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{product.farmer.name}</span>
                      {product.farmer.distance && (
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {product.farmer.distance} km
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{product.farmer.location}</p>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <Button size="lg" className="w-full">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Ajouter au panier
            </Button>
          </div>
        </div>
        
        <ProductReviews productId={id!} productName={product.name} />
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;

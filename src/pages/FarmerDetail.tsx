
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FarmerReviews } from '@/components/reviews/FarmerReviews';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { useFarmers } from '@/hooks/useFarmers';
import { useProducts } from '@/hooks/useProducts';
import { useUnifiedReviews } from '@/hooks/useUnifiedReviews';
import { MapPin, Phone, Globe, Award, MessageCircle } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';

const FarmerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getFarmerById } = useFarmers();
  const { products } = useProducts();
  const { getFarmerReviews } = useUnifiedReviews();
  
  const [farmer, setFarmer] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadFarmer = async () => {
      if (!id) return;
      
      try {
        const farmerData = await getFarmerById(id);
        setFarmer(farmerData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };

    loadFarmer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agrimarket-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du producteur...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !farmer) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600">Producteur non trouvé</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const farmerReviews = getFarmerReviews(id!);
  const farmerProducts = products.filter(p => p.farmer?.id === id);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-agrimarket-green rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {farmer.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle>{farmer.name}</CardTitle>
                    {farmer.farm_name && (
                      <p className="text-sm text-gray-600">{farmer.farm_name}</p>
                    )}
                  </div>
                </div>
                <ReviewSummary reviews={farmerReviews} size="md" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{farmer.location}</span>
                </div>
                
                {farmer.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{farmer.phone}</span>
                  </div>
                )}
                
                {farmer.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <a 
                      href={farmer.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-agrimarket-green hover:underline"
                    >
                      Site web
                    </a>
                  </div>
                )}
                
                {farmer.is_certified && (
                  <Badge className="bg-green-100 text-green-800">
                    <Award className="h-3 w-3 mr-1" />
                    Certifié Bio
                  </Badge>
                )}
                
                <Button className="w-full" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacter
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            {farmer.description && (
              <Card>
                <CardHeader>
                  <CardTitle>À propos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{farmer.description}</p>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Produits ({farmerProducts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {farmerProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {farmerProducts.slice(0, 4).map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        image={product.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43'}
                        price={product.price}
                        unit={product.unit}
                        rating={product.rating}
                        reviews={product.reviews_count}
                        farmerName={farmer.name}
                        farmerId={farmer.id}
                        distance={farmer.distance}
                        organic={product.is_organic}
                        freeDelivery={product.free_delivery}
                        farmPickup={product.farm_pickup}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Aucun produit disponible pour le moment
                  </p>
                )}
              </CardContent>
            </Card>
            
            <FarmerReviews farmerId={id!} farmerName={farmer.name} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FarmerDetail;


import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BuyerDashboardRecommendedProducts = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Produits recommandés pour vous</CardTitle>
        <CardDescription>
          Basés sur vos achats précédents et vos préférences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Produit 1 */}
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 relative">
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" 
                alt="Produit" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">Fruits secs assortis</h3>
              <p className="text-sm text-gray-600">Plantation Bio du Sud</p>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold">8 450 FCFA</p>
                <Button size="sm" className="bg-agrimarket-orange hover:bg-orange-600" asChild>
                  <Link to="/products">
                    Voir
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Produit 2 */}
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 relative">
              <img 
                src="https://images.unsplash.com/photo-1594489573458-2423bb0fcd1a" 
                alt="Produit" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">Huile d'olive extra vierge</h3>
              <p className="text-sm text-gray-600">Oliveraie Sunlight</p>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold">10 820 FCFA</p>
                <Button size="sm" className="bg-agrimarket-orange hover:bg-orange-600" asChild>
                  <Link to="/products">
                    Voir
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Produit 3 */}
          <Card className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 relative">
              <img 
                src="https://images.unsplash.com/photo-1598170845058-32b9d6a5da37" 
                alt="Produit" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">Confiture artisanale</h3>
              <p className="text-sm text-gray-600">Ferme des Collines</p>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold">5 180 FCFA</p>
                <Button size="sm" className="bg-agrimarket-orange hover:bg-orange-600" asChild>
                  <Link to="/products">
                    Voir
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerDashboardRecommendedProducts;

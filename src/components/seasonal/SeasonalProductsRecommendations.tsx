
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Sun } from 'lucide-react';
import { getProductsByMonth } from '@/lib/seasonal-data';

const SeasonalProductsRecommendations = () => {
  const currentMonth = new Date().getMonth() + 1; // Les mois commencent à 0 en JavaScript
  const products = getProductsByMonth(currentMonth).filter(p => p.highlight).slice(0, 4);
  
  // Obtenir le nom du mois actuel en français
  const currentMonthName = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date());

  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-green-600" />
          Produits de saison - {currentMonthName}
        </CardTitle>
        <CardDescription>
          Les meilleurs produits disponibles ce mois-ci
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.organic && (
                  <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 border-none">
                    <Leaf className="h-3 w-3 mr-1" /> Bio
                  </Badge>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.category}</p>
                <div className="mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    En saison
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonalProductsRecommendations;

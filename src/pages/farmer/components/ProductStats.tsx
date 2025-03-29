
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ProductStatsProps = {
  totalProducts: number;
  publishedProducts: number;
  outOfStockProducts: number;
  organicProducts: number;
};

const ProductStats = ({ 
  totalProducts, 
  publishedProducts, 
  outOfStockProducts, 
  organicProducts 
}: ProductStatsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques produits</CardTitle>
        <CardDescription>
          Aperçu de votre catalogue de produits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Total des produits</span>
            <span className="text-lg font-bold">{totalProducts}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Produits publiés</span>
            <span className="text-lg font-bold">{publishedProducts}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Produits en rupture</span>
            <span className="text-lg font-bold text-red-500">{outOfStockProducts}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Produits biologiques</span>
            <span className="text-lg font-bold text-agrimarket-green">{organicProducts}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductStats;

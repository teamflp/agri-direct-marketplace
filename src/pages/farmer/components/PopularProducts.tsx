import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PopularProductsProps = {
  // In a real app, this would be fetched from an API
  // For now, we'll keep it hardcoded as in the original component
};

const PopularProducts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits populaires</CardTitle>
        <CardDescription>
          Vos produits les plus vendus ce mois-ci
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4">
          <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-agrimarket-orange text-white">1</span>
            <div className="flex-1">
              <p className="font-medium">Miel de fleurs sauvages</p>
              <p className="text-sm text-gray-500">56 ventes ce mois-ci</p>
            </div>
            <p className="font-semibold">5 600 FCFA</p>
          </li>
          <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-gray-400 text-white">2</span>
            <div className="flex-1">
              <p className="font-medium">Panier de légumes bio</p>
              <p className="text-sm text-gray-500">42 ventes ce mois-ci</p>
            </div>
            <p className="font-semibold">16 350 FCFA</p>
          </li>
          <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full bg-amber-800 text-white">3</span>
            <div className="flex-1">
              <p className="font-medium">Fromage de chèvre frais</p>
              <p className="text-sm text-gray-500">38 ventes ce mois-ci</p>
            </div>
            <p className="font-semibold">2 750 FCFA</p>
          </li>
        </ol>
      </CardContent>
    </Card>
  );
};

export default PopularProducts;

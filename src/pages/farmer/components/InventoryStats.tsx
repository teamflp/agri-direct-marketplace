
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, AlertTriangle, CheckCircle2 } from 'lucide-react';

type InventoryStatsProps = {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
};

const InventoryStats = ({
  totalProducts,
  lowStockProducts,
  outOfStockProducts
}: InventoryStatsProps) => {
  const inStockProducts = totalProducts - outOfStockProducts;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Statistiques d'inventaire</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <span>Total des produits</span>
            </div>
            <span className="font-bold text-lg">{totalProducts}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <span>Produits en stock</span>
            </div>
            <span className="font-bold text-lg">{inStockProducts}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <span>Stock faible</span>
            </div>
            <span className="font-bold text-lg">{lowStockProducts}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <span>Rupture de stock</span>
            </div>
            <span className="font-bold text-lg">{outOfStockProducts}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryStats;

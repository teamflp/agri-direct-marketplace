
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus, Box } from 'lucide-react';
import { InventoryProductType } from '../FarmerInventory';

type LowStockProductsProps = {
  lowStockProducts: InventoryProductType[];
  onUpdateClick: (product: InventoryProductType) => void;
};

const LowStockProducts = ({
  lowStockProducts,
  onUpdateClick
}: LowStockProductsProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg flex items-center">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          Produits à réapprovisionner
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lowStockProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
            <Box className="h-12 w-12 mb-2 text-green-500" />
            <p>Tous vos produits sont correctement approvisionnés</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-amber-600">
                      Stock actuel: {product.inventory} {product.unit}
                      <span className="text-gray-500"> (Min: {product.minimumStock})</span>
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-agrimarket-green text-white hover:bg-agrimarket-green/80"
                  onClick={() => onUpdateClick(product)}
                >
                  <Plus className="mr-1 h-4 w-4" /> Ajouter
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LowStockProducts;

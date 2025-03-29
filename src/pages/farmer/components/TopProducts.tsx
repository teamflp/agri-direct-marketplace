
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductType {
  id: number;
  name: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
  sales: number;
}

interface TopProductsProps {
  products: ProductType[];
  onManageProducts: () => void;
}

const TopProducts: React.FC<TopProductsProps> = ({ products, onManageProducts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits les plus vendus</CardTitle>
        <CardDescription>
          Vos produits les plus populaires
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.sort((a, b) => b.sales - a.sales).slice(0, 3).map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-agrimarket-green text-white text-xs px-2 py-1 rounded-full">
                  {product.sales} ventes
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">{product.price.toFixed(2)} €/{product.unit}</p>
                  <p className="text-sm">Stock: {product.stock}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline" onClick={onManageProducts}>
          Gérer tous les produits
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopProducts;

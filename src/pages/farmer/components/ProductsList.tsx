
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductType {
  id: number;
  name: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
  sales: number;
}

interface ProductsListProps {
  products: ProductType[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex h-40">
                <div className="w-1/3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="font-bold">{product.price.toFixed(2)} €/{product.unit}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm mr-2">Stock:</span>
                    <span className={`text-sm font-medium ${
                      product.stock > 10 
                        ? "text-green-600" 
                        : product.stock > 5 
                        ? "text-yellow-600" 
                        : "text-red-600"
                    }`}>
                      {product.stock} {product.unit}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.sales} ventes totales
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsList;


import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Leaf } from 'lucide-react';
import { getProductsByMonth } from '@/lib/seasonal-data';

interface MonthlyProductsListProps {
  month: number;
  compact?: boolean;
}

const MonthlyProductsList = ({ month, compact = false }: MonthlyProductsListProps) => {
  const products = getProductsByMonth(month);
  
  // Grouper les produits par catégorie
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);
  
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun produit disponible ce mois-ci
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <div key={category} className={compact ? "mb-2" : "mb-6"}>
          <h4 className={`font-medium ${compact ? "mb-1 text-base" : "mb-3 text-lg"}`}>{category}</h4>
          <div className="flex flex-wrap gap-2">
            {categoryProducts.map(product => (
              <Badge 
                key={product.id} 
                variant={product.highlight ? "default" : "outline"}
                className={`${product.highlight ? "bg-green-600 hover:bg-green-700" : ""} ${compact ? "text-xs" : "text-sm"} gap-1`}
              >
                {product.organic && <Leaf className={`${compact ? "h-3 w-3" : "h-4 w-4"}`} />}
                {product.name}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthlyProductsList;

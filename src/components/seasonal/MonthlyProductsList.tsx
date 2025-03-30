
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Leaf } from 'lucide-react';
import { getProductsByMonth } from '@/lib/seasonal-data';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface MonthlyProductsListProps {
  month: number;
  compact?: boolean;
  searchTerm?: string;
  categories?: string[];
}

const MonthlyProductsList = ({ month, compact = false, searchTerm = '', categories = [] }: MonthlyProductsListProps) => {
  // Récupérer tous les produits pour le mois donné
  let products = getProductsByMonth(month);
  
  // Filtrer par terme de recherche si présent
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    products = products.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.category.toLowerCase().includes(term)
    );
  }
  
  // Filtrer par catégories si elles sont sélectionnées
  if (categories.length > 0) {
    products = products.filter(product => categories.includes(product.category));
  }
  
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
        {searchTerm || categories.length > 0 
          ? "Aucun produit ne correspond à votre recherche pour ce mois-ci" 
          : "Aucun produit disponible ce mois-ci"}
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
              <HoverCard key={product.id}>
                <HoverCardTrigger>
                  <Badge 
                    variant={product.highlight ? "default" : "outline"}
                    className={`
                      ${product.highlight ? "bg-green-600 hover:bg-green-700" : "hover:bg-gray-100"} 
                      ${compact ? "text-xs" : "text-sm"} 
                      gap-1 cursor-pointer transition-colors
                    `}
                  >
                    {product.organic && <Leaf className={`${compact ? "h-3 w-3" : "h-4 w-4"} text-green-500`} />}
                    {product.name}
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{product.name}</h4>
                      {product.organic && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Leaf className="h-3 w-3 mr-1" /> Bio
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Catégorie: {product.category}</p>
                    <div className="text-sm">
                      <span className="font-medium">Disponibilité: </span>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <span 
                          key={m} 
                          className={`inline-block w-4 h-4 rounded-sm mx-0.5 ${
                            product.months.includes(m) 
                              ? product.highlight && m === month
                                ? "bg-green-600" 
                                : "bg-green-200"
                              : "bg-gray-100"
                          }`}
                          title={new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date(2023, m - 1, 1))}
                        />
                      ))}
                    </div>
                    {product.highlight && month && product.months.includes(month) && (
                      <p className="text-xs text-green-700 mt-2">✓ En pleine saison ce mois-ci</p>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MonthlyProductsList;

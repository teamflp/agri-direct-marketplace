
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useSupabaseApiKey } from "@/hooks/use-supabase-api-key";
import seasonalProducts, { getProductsByMonth } from '@/lib/seasonal-data';

interface SeasonalProduct {
  name: string;
  description: string;
  benefits: string[];
  category: string;
  image: string;
}

const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1; // Les mois commencent à 0 en JavaScript
  if ([3, 4, 5].includes(month)) return "printemps";
  if ([6, 7, 8].includes(month)) return "été";
  if ([9, 10, 11].includes(month)) return "automne";
  return "hiver";
};

const getUserCountry = (): string => {
  // Cette fonction pourrait être enrichie avec une véritable détection de pays
  // Pour l'instant, nous utilisons une valeur par défaut
  return "France";
};

const SeasonalAIRecommendations = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<SeasonalProduct[]>([]);
  const { apiKeyState } = useSupabaseApiKey();
  const currentMonth = new Date().getMonth() + 1;
  const season = getCurrentSeason();
  const country = getUserCountry();
  
  useEffect(() => {
    // Récupérer les produits de saison pour le mois actuel
    const productsForMonth = getProductsByMonth(currentMonth);
    
    // Sélectionner 3 produits aléatoires pour les recommandations
    const randomProducts = [...productsForMonth]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(product => ({
        name: product.name,
        description: getProductDescription(product.name, product.category),
        benefits: getProductBenefits(product.name, product.category),
        category: product.category,
        image: product.image
      }));
    
    setRecommendedProducts(randomProducts);
  }, [currentMonth]);
  
  // Fonction pour générer une description basée sur le produit
  const getProductDescription = (name: string, category: string): string => {
    const descriptions: Record<string, string[]> = {
      "Fruits": [
        "Fruit délicieux et rafraîchissant, parfait en dessert ou en collation.",
        "Saveur douce et juteuse, idéal pour les salades de fruits ou à déguster nature.",
        "Fruit sucré et parfumé, excellent pour les tartes et compotes."
      ],
      "Légumes": [
        "Légume savoureux et polyvalent, idéal pour les plats cuisinés ou en accompagnement.",
        "Légume nutritif qui se prête à de nombreuses préparations.",
        "Parfait pour les salades, soupes et plats mijotés de saison."
      ],
      "Légumes verts": [
        "Feuilles tendres et savoureuses, excellentes en salade ou cuites.",
        "Légume vert nutritif, riche en vitamines et minéraux essentiels.",
        "Saveur délicate, parfait pour accompagner vos plats ou en soupe."
      ],
      "Fruits à coque": [
        "Collation nutritive et croquante, idéale pour les encas.",
        "Saveur riche et texture croquante, parfait pour les salades ou en snack.",
        "Excellent pour enrichir vos plats et pâtisseries."
      ],
      "Miel": [
        "Douceur naturelle aux arômes complexes, idéal pour sucrer vos boissons et desserts.",
        "Saveur riche et texture onctueuse, parfait comme alternative au sucre raffiné.",
        "Produit naturel aux multiples bienfaits pour la santé."
      ]
    };
    
    // Si la catégorie existe dans notre dictionnaire, prendre une description aléatoire
    if (descriptions[category]) {
      const categoryDescriptions = descriptions[category];
      return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
    }
    
    // Description par défaut si la catégorie n'est pas dans notre dictionnaire
    return `${name} de saison, savoureux et frais.`;
  };
  
  // Fonction pour générer des bienfaits basés sur le produit
  const getProductBenefits = (name: string, category: string): string[] => {
    const benefits: Record<string, string[][]> = {
      "Fruits": [
        ["Riche en vitamines", "Source de fibres"],
        ["Bon pour la digestion", "Contient des antioxydants"],
        ["Renforce le système immunitaire", "Faible en calories"]
      ],
      "Légumes": [
        ["Source de vitamines et minéraux", "Faible en calories"],
        ["Riche en fibres", "Bon pour la santé digestive"],
        ["Contient des antioxydants", "Aide à maintenir une bonne santé"]
      ],
      "Légumes verts": [
        ["Riche en fer et calcium", "Source de vitamine K"],
        ["Excellent pour la santé oculaire", "Faible en calories"],
        ["Contient de la chlorophylle", "Aide à détoxifier l'organisme"]
      ],
      "Fruits à coque": [
        ["Source de protéines végétales", "Riches en bonnes graisses"],
        ["Contient des minéraux essentiels", "Bon pour la santé cardiaque"],
        ["Riche en antioxydants", "Aide à réguler le cholestérol"]
      ],
      "Miel": [
        ["Propriétés antibactériennes", "Source d'énergie naturelle"],
        ["Riche en antioxydants", "Apaise les maux de gorge"],
        ["Favorise la cicatrisation", "Alternative naturelle au sucre"]
      ]
    };
    
    // Si la catégorie existe dans notre dictionnaire, prendre des bienfaits aléatoires
    if (benefits[category]) {
      const categoryBenefits = benefits[category];
      return categoryBenefits[Math.floor(Math.random() * categoryBenefits.length)];
    }
    
    // Bienfaits par défaut si la catégorie n'est pas dans notre dictionnaire
    return ["Produit de saison", "Cultivé localement"];
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-yellow-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-yellow-600" />
          Recommandations - Produits de saison
        </CardTitle>
        <CardDescription>
          Suggestions personnalisées basées sur la saison actuelle: {season} en {country}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {recommendedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedProducts.map((product, index) => (
              <div key={index} className="rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-32 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <Badge className="bg-green-100 text-green-800 border-none">
                      {product.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                  
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Bienfaits:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {product.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Chargement des recommandations de produits de saison...
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-end items-center">
        <div className="text-xs text-gray-500 flex items-center">
          <Leaf className="h-3 w-3 mr-1 text-green-500" /> 
          Produits locaux et de saison
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeasonalAIRecommendations;

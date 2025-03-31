
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, ShoppingBag, Apple, UtensilsCrossed } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BuyerPersonalizedAdviceProps {
  recentPurchases?: Array<{
    id: string;
    name: string;
    category: string;
  }>;
}

// Type pour les suggestions de recettes
interface RecipeSuggestion {
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  preparationTime: string;
}

const BuyerPersonalizedAdvice = ({ recentPurchases = [] }: BuyerPersonalizedAdviceProps) => {
  const hasProducts = recentPurchases.length > 0;

  // Fonction pour générer des suggestions de recettes basées sur les achats
  const getRecipeSuggestions = (purchases: Array<{id: string; name: string; category: string;}>): RecipeSuggestion[] => {
    // Dans une application réelle, ces données viendraient d'une API
    const suggestions: RecipeSuggestion[] = [
      {
        title: "Salade fraîche de légumes",
        description: "Une salade légère et nutritive à base de produits frais",
        ingredients: ["Laitue", "Tomates cerises", "Concombre", "Huile d'olive", "Vinaigre balsamique"],
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=500&fit=crop",
        preparationTime: "15 min"
      },
      {
        title: "Compote de pommes maison",
        description: "Une compote douce et parfumée, idéale pour le dessert",
        ingredients: ["Pommes", "Cannelle", "Sucre de canne", "Jus de citron"],
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500&h=500&fit=crop",
        preparationTime: "25 min"
      },
      {
        title: "Fromage de chèvre et miel",
        description: "Un accord parfait entre le fromage de chèvre frais et le miel",
        ingredients: ["Fromage de chèvre", "Miel", "Thym frais", "Pain de campagne"],
        image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?w=500&h=500&fit=crop",
        preparationTime: "5 min"
      }
    ];
    
    // Filtre les suggestions selon les achats de l'utilisateur
    if (purchases.length === 0) return [];
    
    return suggestions.filter((_, index) => index < 2); // Limite à 2 suggestions pour la démo
  };

  // Obtenir les suggestions de recettes
  const recipeSuggestions = getRecipeSuggestions(recentPurchases);

  return (
    <Card className="w-full">
      <CardHeader className="bg-amber-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-600" />
          Conseils personnalisés
        </CardTitle>
        <CardDescription>
          Recommandations basées sur vos achats récents
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {hasProducts ? (
          <div className="space-y-6">
            {/* Conseils sur les produits */}
            <div className="space-y-4">
              {recentPurchases.map((product) => (
                <Card key={product.id} className="border border-amber-100">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Apple className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg mb-1">{product.name}</h4>
                        <p className="text-gray-600">
                          {product.category === "Légumes" && 
                            "Conservez ce produit dans un endroit frais et sec. Idéal pour une soupe ou un ragoût."}
                          {product.category === "Fruits" && 
                            "Ce fruit est riche en vitamines. Consommez-le frais ou en compote pour préserver ses nutriments."}
                          {product.category === "Produits laitiers" && 
                            "Conservez au réfrigérateur. Idéal en accompagnement d'une planche apéritive."}
                          {!["Légumes", "Fruits", "Produits laitiers"].includes(product.category) && 
                            "Produit de qualité sélectionné par nos agriculteurs partenaires."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Suggestions de recettes */}
            {recipeSuggestions.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-amber-600" />
                  Recettes recommandées
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recipeSuggestions.map((recipe, index) => (
                    <Card key={index} className="overflow-hidden border border-amber-100">
                      <div className="h-48 relative">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-amber-100 text-amber-800">
                          {recipe.preparationTime}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-lg mb-1">{recipe.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
                        
                        <Separator className="my-2" />
                        
                        <div>
                          <h5 className="text-sm font-medium mb-1">Ingrédients:</h5>
                          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                            {recipe.ingredients.map((ingredient, i) => (
                              <li key={i}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Alert className="bg-amber-50 border-amber-200">
            <ShoppingBag className="h-4 w-4 text-amber-600" />
            <AlertTitle>Aucun achat récent</AlertTitle>
            <AlertDescription>
              Effectuez des achats pour recevoir des conseils personnalisés sur l'utilisation et la conservation de vos produits.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default BuyerPersonalizedAdvice;

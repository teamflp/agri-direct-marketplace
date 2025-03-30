
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UtensilsCrossed, Sparkles } from 'lucide-react';
import { useSupabaseApiKey } from '@/hooks/use-supabase-api-key';
import { openAIService } from '@/services/openai-service';
import ApiKeyDialog from './ApiKeyDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface RecipeWithIngredients {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  nutritionalInfo: string;
  preparationTime: string;
}

const SeasonalRecipesCard = () => {
  const { apiKeyState } = useSupabaseApiKey();
  const [recipes, setRecipes] = useState<RecipeWithIngredients[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getRecipes = async () => {
    if (!apiKeyState.isKeySet) {
      toast({
        title: "Clé API requise",
        description: "Veuillez configurer votre clé API OpenAI dans Supabase pour utiliser cette fonctionnalité",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Exemple d'ingrédients et préférences, dans une application réelle, cela viendrait du profil utilisateur
      const ingredients = ["tomates", "courgettes", "basilic", "fromage de chèvre"];
      const dietaryPreferences = ["végétarien", "sans gluten"];
      
      const results = await openAIService.getSeasonalRecipes(ingredients, dietaryPreferences);
      setRecipes(results);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-emerald-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-emerald-600" />
          Recettes saisonnières
        </CardTitle>
        <CardDescription>
          Recettes personnalisées utilisant des produits de saison
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {recipes.length > 0 ? (
          <div className="space-y-6">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg">{recipe.title}</h3>
                <p className="text-gray-600 mt-1 mb-2">{recipe.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    {recipe.preparationTime}
                  </Badge>
                </div>
                
                <Separator className="my-3" />
                
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-2">Ingrédients:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-2">Préparation:</h4>
                  <ol className="list-decimal list-inside text-sm text-gray-600">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="mb-1">{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  <p>{recipe.nutritionalInfo}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">
              Obtenez des recettes personnalisées avec les produits de saison disponibles
            </p>
            {apiKeyState.isKeySet ? (
              <Button 
                onClick={getRecipes}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Obtenir des recettes
                  </>
                )}
              </Button>
            ) : (
              <ApiKeyDialog 
                trigger={
                  <Button className="bg-agrimarket-orange hover:bg-orange-600">
                    Configurer l'API OpenAI
                  </Button>
                }
              />
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between">
        <div className="text-xs text-gray-500">Propulsé par OpenAI</div>
        <ApiKeyDialog />
      </CardFooter>
    </Card>
  );
};

export default SeasonalRecipesCard;

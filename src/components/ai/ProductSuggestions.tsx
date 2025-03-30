
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Loader2, Sparkles } from 'lucide-react';
import { useOpenAIKey } from '@/hooks/use-openai-key';
import { openAIService } from '@/services/openai-service';
import ApiKeyDialog from './ApiKeyDialog';
import { useToast } from '@/hooks/use-toast';

interface ProductSuggestion {
  name: string;
  description: string;
  benefits: string[];
  category: string;
}

const ProductSuggestions = () => {
  const { isKeySet } = useOpenAIKey();
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "printemps";
    if (month >= 5 && month <= 7) return "été";
    if (month >= 8 && month <= 10) return "automne";
    return "hiver";
  };

  const getSuggestions = async () => {
    if (!isKeySet) {
      toast({
        title: "Clé API requise",
        description: "Veuillez configurer votre clé API OpenAI pour utiliser cette fonctionnalité",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Exemple de préférences, dans une application réelle, cela viendrait du profil utilisateur
      const userPreferences = ["bio", "local", "végétarien"];
      const season = getCurrentSeason();
      
      const results = await openAIService.getProductSuggestions(userPreferences, season);
      setSuggestions(results);
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
      <CardHeader className="bg-agrimarket-lightGreen pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-agrimarket-green" />
          Suggestions IA
        </CardTitle>
        <CardDescription>
          Recommandations personnalisées de produits de saison
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {suggestions.length > 0 ? (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg flex items-center gap-1">
                  {suggestion.name}
                  {suggestion.category === "Bio" && <Leaf className="h-4 w-4 text-agrimarket-green" />}
                </h3>
                <p className="text-gray-600 mt-1">{suggestion.description}</p>
                <div className="mt-2">
                  <h4 className="text-sm font-medium">Bienfaits:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {suggestion.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">
              Obtenez des suggestions personnalisées de produits bio et de saison
            </p>
            {isKeySet ? (
              <Button 
                onClick={getSuggestions}
                disabled={loading}
                className="bg-agrimarket-green hover:bg-green-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Obtenir des suggestions
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

export default ProductSuggestions;

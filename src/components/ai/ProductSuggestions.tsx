
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Loader2, Sparkles } from 'lucide-react';
import { useSupabaseApiKey } from '@/hooks/use-supabase-api-key';
import { openAIService } from '@/services/openai-service';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductSuggestion {
  name: string;
  description: string;
  benefits: string[];
  category: string;
  image?: string;
}

const ProductSuggestions = () => {
  const { apiKeyState } = useSupabaseApiKey();
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Images de produits par défaut pour associer à chaque suggestion
  const defaultImages = [
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&h=300",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=300&h=300",
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=300&h=300",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=300&h=300"
  ];

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "printemps";
    if (month >= 5 && month <= 7) return "été";
    if (month >= 8 && month <= 10) return "automne";
    return "hiver";
  };

  const getSuggestions = async () => {
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
      // Exemple de préférences, dans une application réelle, cela viendrait du profil utilisateur
      const userPreferences = ["bio", "local", "végétarien"];
      const season = getCurrentSeason();
      
      const results = await openAIService.getProductSuggestions(userPreferences, season);
      console.log("Suggestions reçues:", results);
      
      // Ajouter une image aléatoire à chaque suggestion
      const suggestionsWithImages = results.map((suggestion, index) => ({
        ...suggestion,
        image: defaultImages[index % defaultImages.length]
      }));
      
      setSuggestions(suggestionsWithImages);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des suggestions:", error);
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
          <Sparkles className="h-5 w-5 text-emerald-600" />
          Recommandations produits
        </CardTitle>
        <CardDescription>
          Recommandations personnalisées de produits de saison
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {suggestions.length > 0 ? (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 shadow-sm flex gap-4">
                <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                  <img 
                    src={suggestion.image} 
                    alt={suggestion.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg flex items-center gap-1">
                    {suggestion.name}
                    {suggestion.category.toLowerCase().includes("bio") && (
                      <Leaf className="h-4 w-4 text-emerald-600" />
                    )}
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">
              Obtenez des suggestions personnalisées de produits bio et de saison
            </p>
            {apiKeyState.isKeySet ? (
              <Button 
                onClick={getSuggestions}
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
                    Obtenir des suggestions
                  </>
                )}
              </Button>
            ) : (
              <div className="text-center text-gray-600">
                API non configurée
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductSuggestions;

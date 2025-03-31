
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Brain, Loader2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { openAIService } from '@/services/openai-service';
import { Alert, AlertDescription } from "@/components/ui/alert";
import ApiKeyDialog from './ApiKeyDialog';
import { useSupabaseApiKey } from "@/hooks/use-supabase-api-key";

interface AIRecommendation {
  name: string;
  description: string;
  benefits: string[];
  category: string;
}

const SeasonalAIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiKeyState } = useSupabaseApiKey();
  
  // Obtenir la saison actuelle
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1; // Les mois commencent à 0 en JavaScript
    if ([3, 4, 5].includes(month)) return "printemps";
    if ([6, 7, 8].includes(month)) return "été";
    if ([9, 10, 11].includes(month)) return "automne";
    return "hiver";
  };
  
  const season = getCurrentSeason();
  
  const generateRecommendations = async () => {
    if (!apiKeyState.isKeySet) {
      setError("La clé API OpenAI n'est pas configurée. Veuillez configurer la clé API pour utiliser cette fonctionnalité.");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      // Préférences utilisées pour la démonstration - dans une version complète, 
      // ces préférences pourraient venir du profil utilisateur
      const userPreferences = ["bio", "local", "nutritif", "facile à cuisiner"];
      
      const result = await openAIService.getProductSuggestions(userPreferences, season);
      setRecommendations(result);
    } catch (err: any) {
      console.error("Erreur lors de la génération des recommandations:", err);
      setError(err.message || "Une erreur s'est produite lors de la génération des recommandations.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-yellow-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-yellow-600" />
          Recommandations IA - Produits de saison
        </CardTitle>
        <CardDescription>
          Suggestions personnalisées basées sur la saison actuelle: {season}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!recommendations.length && !isLoading && !error && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Obtenez des recommandations personnalisées de produits de saison générées par IA.
            </p>
            <Button onClick={generateRecommendations} className="gap-2">
              <Brain className="h-4 w-4" />
              Générer des recommandations
            </Button>
          </div>
        )}
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-green-600 animate-spin mb-4" />
            <p className="text-gray-600">Génération des recommandations en cours...</p>
          </div>
        )}
        
        {recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg">{rec.name}</h3>
                    <Badge className="bg-green-100 text-green-800 border-none">
                      {rec.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{rec.description}</p>
                  
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Bienfaits:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {rec.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        {recommendations.length > 0 && (
          <Button onClick={generateRecommendations} variant="outline" className="gap-2" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
            Regénérer
          </Button>
        )}
        <div className="text-xs text-gray-500 flex items-center">
          <Leaf className="h-3 w-3 mr-1 text-green-500" /> 
          Propulsé par IA
          <ApiKeyDialog trigger={<Button variant="ghost" size="sm" className="p-0 h-auto ml-2 text-gray-500 hover:bg-transparent hover:underline">Config</Button>} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SeasonalAIRecommendations;

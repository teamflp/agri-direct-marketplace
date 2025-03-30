
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Loader2, Sparkles } from 'lucide-react';
import { useSupabaseApiKey } from '@/hooks/use-supabase-api-key';
import { openAIService } from '@/services/openai-service';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface GardeningAdvice {
  title: string;
  content: string;
  difficulty: string;
  season: string;
  tools: string[];
}

const GardeningTipsCard = () => {
  const { apiKeyState, testApiKey } = useSupabaseApiKey();
  const [tips, setTips] = useState<GardeningAdvice[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getTips = async () => {
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
      // Dans une application réelle, ces données viendraient du profil de l'utilisateur
      const plantTypes = ["tomates", "salades", "aromates", "fleurs"];
      const gardenLocation = "Balcon ensoleillé, Paris";
      const gardenSize = "Petit (4m²)";
      const experience = "Débutant";
      
      const results = await openAIService.getGardeningAdvice(
        plantTypes, 
        gardenLocation,
        gardenSize,
        experience
      );
      setTips(results);
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

  const getDifficultyColor = (difficulty: string) => {
    const difficulties: Record<string, string> = {
      "Facile": "green",
      "Moyen": "amber",
      "Difficile": "red",
      "Débutant": "green",
      "Intermédiaire": "amber",
      "Avancé": "red"
    };
    
    // Chercher la correspondance partielle
    for (const [key, value] of Object.entries(difficulties)) {
      if (difficulty.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    
    return "gray";
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          Conseils de jardinage
        </CardTitle>
        <CardDescription>
          Astuces personnalisées pour votre jardin ou potager
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {tips.length > 0 ? (
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{tip.title}</h3>
                  <Badge className={`bg-${getDifficultyColor(tip.difficulty)}-100 text-${getDifficultyColor(tip.difficulty)}-800 hover:bg-${getDifficultyColor(tip.difficulty)}-200`}>
                    {tip.difficulty}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Saison idéale: {tip.season}
                </div>
                <p className="text-gray-700 mt-2 mb-3">{tip.content}</p>
                <div className="mt-2">
                  <h4 className="text-xs font-medium mb-1">Outils recommandés:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tip.tools.map((tool, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">
              Obtenez des conseils personnalisés pour votre jardin ou potager
            </p>
            {apiKeyState.isKeySet ? (
              <Button 
                onClick={getTips}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Obtenir des conseils
                  </>
                )}
              </Button>
            ) : (
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={testApiKey}>
                Configurer l'API
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GardeningTipsCard;


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Flower2, Loader2, Sparkles } from 'lucide-react';
import { useOpenAIKey } from '@/hooks/use-openai-key';
import { openAIService } from '@/services/openai-service';
import ApiKeyDialog from './ApiKeyDialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface FarmingTip {
  title: string;
  content: string;
  category: string;
}

const FarmingTipsCard = () => {
  const { isKeySet } = useOpenAIKey();
  const [tips, setTips] = useState<FarmingTip[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "printemps";
    if (month >= 5 && month <= 7) return "été";
    if (month >= 8 && month <= 10) return "automne";
    return "hiver";
  };

  const getTips = async () => {
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
      // Dans une application réelle, ces données viendraient du profil de l'agriculteur
      const cropTypes = ["tomates", "aubergines", "poivrons", "herbes aromatiques"];
      const farmLocation = "Région de Thiès, Sénégal";
      const season = getCurrentSeason();
      
      const results = await openAIService.getFarmingTips(cropTypes, farmLocation, season);
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

  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      "Irrigation": "blue",
      "Pest Control": "red",
      "Soil Health": "amber",
      "Pest Management": "red",
      "Nutriments": "amber",
      "Biodiversité": "emerald",
      "Fertilisation": "amber",
      "Protection": "red",
      "Santé des Plantes": "green",
    };
    
    // Chercher la correspondance partielle
    for (const [key, value] of Object.entries(categories)) {
      if (category.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    
    return "gray";
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-amber-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Flower2 className="h-5 w-5 text-amber-600" />
          Conseils agricoles IA
        </CardTitle>
        <CardDescription>
          Recommendations personnalisées pour votre exploitation
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {tips.length > 0 ? (
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{tip.title}</h3>
                  <Badge className={`bg-${getCategoryColor(tip.category)}-100 text-${getCategoryColor(tip.category)}-800 hover:bg-${getCategoryColor(tip.category)}-200`}>
                    {tip.category}
                  </Badge>
                </div>
                <p className="text-gray-600 mt-2 text-sm">{tip.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">
              Obtenez des conseils personnalisés pour optimiser votre production agricole
            </p>
            {isKeySet ? (
              <Button 
                onClick={getTips}
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-700 text-white"
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

export default FarmingTipsCard;

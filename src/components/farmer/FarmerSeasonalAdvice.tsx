
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Leaf, Calendar, Sprout } from 'lucide-react';

interface SeasonalCropSuggestion {
  id: string;
  name: string;
  season: string;
  advice: string;
}

interface FarmerSeasonalAdviceProps {
  cropSuggestions?: SeasonalCropSuggestion[];
}

const FarmerSeasonalAdvice = ({ cropSuggestions }: FarmerSeasonalAdviceProps) => {
  // Si aucune suggestion n'est fournie, créer des suggestions par défaut basées sur la saison actuelle
  const currentMonth = new Date().getMonth();
  const currentSeason = 
    currentMonth >= 2 && currentMonth <= 4 ? "Printemps" :
    currentMonth >= 5 && currentMonth <= 7 ? "Été" :
    currentMonth >= 8 && currentMonth <= 10 ? "Automne" : "Hiver";
  
  const defaultSuggestions: Record<string, SeasonalCropSuggestion[]> = {
    "Printemps": [
      { id: "spring-1", name: "Tomates", season: "Printemps", advice: "Semez en intérieur 6-8 semaines avant le dernier gel. Transplantez quand la température nocturne dépasse 10°C." },
      { id: "spring-2", name: "Salades", season: "Printemps", advice: "Semez directement en pleine terre dès que le sol peut être travaillé. Récoltez avant les fortes chaleurs." },
      { id: "spring-3", name: "Carottes", season: "Printemps", advice: "Semez en pleine terre dans un sol meuble et profond. Échelonnez les semis pour des récoltes successives." }
    ],
    "Été": [
      { id: "summer-1", name: "Courgettes", season: "Été", advice: "Plantez en pleine terre après les dernières gelées. Récoltez régulièrement pour stimuler la production." },
      { id: "summer-2", name: "Concombres", season: "Été", advice: "Cultivez dans un sol riche en compost. Arrosez régulièrement pour éviter l'amertume des fruits." },
      { id: "summer-3", name: "Aubergines", season: "Été", advice: "Plantez dans un endroit ensoleillé et chaud. Tuteurez pour soutenir les plants chargés de fruits." }
    ],
    "Automne": [
      { id: "autumn-1", name: "Choux", season: "Automne", advice: "Semez en été pour une récolte d'automne. Protégez des chenilles avec un voile anti-insectes." },
      { id: "autumn-2", name: "Épinards", season: "Automne", advice: "Semez en fin d'été pour une récolte d'automne. Résiste bien aux températures fraîches." },
      { id: "autumn-3", name: "Poireaux", season: "Automne", advice: "Repiquez les plants en été. Buttez pour obtenir un fût blanc plus long." }
    ],
    "Hiver": [
      { id: "winter-1", name: "Ail", season: "Hiver", advice: "Plantez les gousses à l'automne pour une récolte l'été suivant. Privilégiez un sol bien drainé." },
      { id: "winter-2", name: "Mâche", season: "Hiver", advice: "Semez en fin d'été pour des récoltes tout l'hiver. Supporte bien le froid mais pas l'excès d'humidité." },
      { id: "winter-3", name: "Oignons", season: "Hiver", advice: "Plantez à l'automne pour des oignons plus précoces. Espacez suffisamment pour favoriser le grossissement." }
    ]
  };
  
  const suggestions = cropSuggestions || defaultSuggestions[currentSeason] || [];

  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          Conseils de culture saisonniers
        </CardTitle>
        <CardDescription>
          Recommandations pour la saison actuelle: {currentSeason}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {suggestions.length > 0 ? (
          <div className="space-y-4">
            {suggestions.map((crop) => (
              <Card key={crop.id} className="border border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Sprout className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">{crop.name}</h4>
                      <p className="text-gray-600">{crop.advice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Alert className="bg-green-50 border-green-200">
            <Leaf className="h-4 w-4 text-green-600" />
            <AlertTitle>Aucune suggestion disponible</AlertTitle>
            <AlertDescription>
              Revenez bientôt pour des conseils de culture adaptés à votre région et à la saison.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default FarmerSeasonalAdvice;

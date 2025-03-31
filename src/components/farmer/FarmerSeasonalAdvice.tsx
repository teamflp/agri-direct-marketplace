
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Sprout, UtensilsCrossed } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CropSuggestion {
  name: string;
  description: string;
  difficulty: string;
  growthTime: string;
  image: string;
  tips: string[];
}

interface RecipeSuggestion {
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  preparationTime: string;
}

const FarmerSeasonalAdvice = () => {
  // Obtenir le mois actuel
  const currentMonth = new Date().getMonth();
  const seasons = ["Hiver", "Hiver", "Printemps", "Printemps", "Printemps", "Été", "Été", "Été", "Automne", "Automne", "Automne", "Hiver"];
  const currentSeason = seasons[currentMonth];
  
  // Suggestions de cultures selon la saison
  const cropSuggestions: CropSuggestion[] = [
    {
      name: "Tomates cerises",
      description: "Variété robuste et productive, parfaite pour les marchés locaux",
      difficulty: "Modérée",
      growthTime: "70-80 jours",
      image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=500&h=500&fit=crop",
      tips: [
        "Planter en pleine terre après les dernières gelées",
        "Tuteurer régulièrement pour soutenir la croissance",
        "Arroser à la base pour éviter les maladies fongiques"
      ]
    },
    {
      name: "Courgettes",
      description: "Culture facile et rendement important, idéale pour diversifier votre offre",
      difficulty: "Facile",
      growthTime: "45-55 jours",
      image: "https://images.unsplash.com/photo-1586789923396-437ef4883682?w=500&h=500&fit=crop",
      tips: [
        "Semer en poquet de 2-3 graines",
        "Récolter régulièrement pour stimuler la production",
        "Prévoir un espacement d'au moins 80cm entre les plants"
      ]
    }
  ];

  // Recettes à suggérer avec les produits de saison
  const recipeSuggestions: RecipeSuggestion[] = [
    {
      title: "Salade printanière",
      description: "Idéale à proposer en suggestion à vos clients pour valoriser vos produits",
      ingredients: ["Jeunes pousses d'épinards", "Radis", "Fraises", "Fromage de chèvre frais", "Vinaigrette au miel"],
      image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=500&h=500&fit=crop",
      preparationTime: "15 min"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-green-600" />
          Conseils saisonniers - {currentSeason}
        </CardTitle>
        <CardDescription>
          Recommandations pour optimiser votre production cette saison
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Suggestions de cultures */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-600" />
              Cultures recommandées
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cropSuggestions.map((crop, index) => (
                <Card key={index} className="overflow-hidden border border-green-100">
                  <div className="h-48 relative">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                      {crop.difficulty}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium text-lg mb-1">{crop.name}</h4>
                    <p className="text-gray-600 text-sm mb-1">{crop.description}</p>
                    <p className="text-green-700 text-sm mb-3">Temps de croissance: {crop.growthTime}</p>
                    
                    <Separator className="my-2" />
                    
                    <div>
                      <h5 className="text-sm font-medium mb-1">Conseils de culture:</h5>
                      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                        {crop.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Suggestions de recettes */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-green-600" />
              Recettes à suggérer à vos clients
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {recipeSuggestions.map((recipe, index) => (
                <Card key={index} className="overflow-hidden border border-green-100">
                  <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="relative h-full">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                        {recipe.preparationTime}
                      </Badge>
                    </div>
                    <div className="md:col-span-2">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-lg mb-1">{recipe.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
                        
                        <Separator className="my-2" />
                        
                        <div>
                          <h5 className="text-sm font-medium mb-1">Ingrédients de saison:</h5>
                          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                            {recipe.ingredients.map((ingredient, i) => (
                              <li key={i}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FarmerSeasonalAdvice;

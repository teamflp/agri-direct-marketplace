
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Users, ShoppingBag } from 'lucide-react';

interface OptimizationTipsProps {
  periodFilter: string;
}

const OptimizationTips: React.FC<OptimizationTipsProps> = ({ periodFilter }) => {
  // Adjust tips based on the period filter
  const getTipsForPeriod = () => {
    switch (periodFilter) {
      case 'week':
        return [
          {
            icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
            title: "Offre spéciale weekend",
            description: "Les ventes du weekend représentent 60% de vos revenus. Envisagez une offre promotionnelle pour maximiser cette tendance."
          },
          {
            icon: <ShoppingBag className="h-8 w-8 text-blue-500" />,
            title: "Rupture de stock imminente",
            description: "Les fraises et tomates sont très demandées cette semaine. Assurez-vous d'avoir un stock suffisant."
          }
        ];
      case 'year':
        return [
          {
            icon: <Users className="h-8 w-8 text-green-500" />,
            title: "Fidélisez vos clients",
            description: "42% de vos revenus proviennent de clients réguliers. Envisagez un programme de fidélité pour la nouvelle année."
          },
          {
            icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
            title: "Nouveaux produits saisonniers",
            description: "Analysez vos tendances annuelles pour planifier de nouveaux produits saisonniers pour l'année prochaine."
          }
        ];
      default: // month
        return [
          {
            icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
            title: "Optimisez votre tarification",
            description: "Vos marges sur les produits laitiers sont inférieures de 12% à la moyenne du marché. Envisagez une révision des prix."
          },
          {
            icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
            title: "Opportunité marketing",
            description: "Les ventes de légumes bio ont augmenté de 23% ce mois-ci. Mettez en avant ces produits dans vos communications."
          }
        ];
    }
  };

  const tips = getTipsForPeriod();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conseils d'optimisation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {tips.map((tip, index) => (
          <div key={index} className="flex space-x-4">
            <div className="mt-1">{tip.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OptimizationTips;

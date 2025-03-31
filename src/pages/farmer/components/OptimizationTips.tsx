
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, TrendingUp, ShoppingBag, CalendarClock } from 'lucide-react';

interface OptimizationTipsProps {
  periodFilter: string;
}

const OptimizationTips: React.FC<OptimizationTipsProps> = ({ periodFilter }) => {
  // Different tips based on the period filter
  const periodTips = {
    week: [
      {
        icon: <TrendingUp className="h-5 w-5 text-agrimarket-green" />,
        title: "Optimisez les ventes du week-end",
        description: "Les ventes sont plus importantes le samedi. Proposez des offres spéciales ou des livraisons gratuites pour ces jours."
      },
      {
        icon: <ShoppingBag className="h-5 w-5 text-agrimarket-green" />,
        title: "Mettez en avant les fraises",
        description: "Ce produit a connu une forte demande cette semaine. Augmentez son stock et sa visibilité."
      },
      {
        icon: <CalendarClock className="h-5 w-5 text-agrimarket-green" />,
        title: "Planifiez pour la semaine prochaine",
        description: "Préparez-vous pour une augmentation des commandes du mercredi au samedi selon les tendances actuelles."
      }
    ],
    month: [
      {
        icon: <Lightbulb className="h-5 w-5 text-agrimarket-green" />,
        title: "Diversifiez votre offre",
        description: "Les clients qui achètent des tomates bio achètent souvent des herbes aromatiques. Envisagez de créer des packs."
      },
      {
        icon: <TrendingUp className="h-5 w-5 text-agrimarket-green" />,
        title: "Améliorez le panier moyen",
        description: "Proposez des remises sur les achats supérieurs à 5000 FCFA pour encourager des paniers plus importants."
      },
      {
        icon: <ShoppingBag className="h-5 w-5 text-agrimarket-green" />,
        title: "Promotions régionales",
        description: "La majorité de vos clients viennent de Dakar. Envisagez des offres spéciales de livraison dans cette région."
      }
    ],
    year: [
      {
        icon: <CalendarClock className="h-5 w-5 text-agrimarket-green" />,
        title: "Planifiez selon les saisons",
        description: "Vos ventes sont plus importantes de juin à septembre. Préparez des stocks plus importants pour cette période."
      },
      {
        icon: <ShoppingBag className="h-5 w-5 text-agrimarket-green" />,
        title: "Développez de nouveaux produits",
        description: "Les fraises et tomates représentent 40% de vos ventes annuelles. Investissez dans ces cultures ou des variétés similaires."
      },
      {
        icon: <Lightbulb className="h-5 w-5 text-agrimarket-green" />,
        title: "Fidélisez vos clients",
        description: "Implémentez un programme de fidélité pour augmenter le taux de rétention client qui est actuellement de 65%."
      }
    ]
  };

  const tips = periodTips[periodFilter as keyof typeof periodTips] || periodTips.month;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conseils d'optimisation</CardTitle>
        <CardDescription>
          Basés sur l'analyse de vos données de vente
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              {tip.icon}
              <h3 className="font-medium">{tip.title}</h3>
            </div>
            <p className="text-sm text-gray-500">{tip.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OptimizationTips;


import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from 'lucide-react';

const advantages = [
  {
    title: "Fraîcheur garantie",
    description: "Nos produits sont récoltés le jour même ou la veille de la livraison pour une fraîcheur maximale."
  },
  {
    title: "Économies sur le long terme",
    description: "Bénéficiez de prix avantageux et stables toute l'année grâce à l'engagement direct avec les agriculteurs."
  },
  {
    title: "Découvrez de nouveaux produits",
    description: "Chaque panier contient une sélection variée qui vous permet de découvrir de nouveaux produits de saison."
  },
  {
    title: "Livraison pratique",
    description: "Recevez vos produits directement chez vous sans avoir à vous déplacer, à la fréquence qui vous convient."
  },
  {
    title: "Soutien aux agriculteurs locaux",
    description: "En vous abonnant, vous soutenez directement les agriculteurs de votre région et encouragez l'agriculture durable."
  },
  {
    title: "Flexibilité totale",
    description: "Mettez en pause ou annulez votre abonnement à tout moment, sans engagement à long terme."
  }
];

const SubscriptionAdvantages = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pourquoi s'abonner à nos paniers ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les avantages d'un abonnement régulier à nos paniers de produits frais
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-agrimarket-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAdvantages;

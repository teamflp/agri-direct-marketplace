
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Basic",
    price: "0",
    description: "Parfait pour débuter sur la plateforme",
    features: [
      "5 produits maximum",
      "Page de profil basique",
      "Commissions de 10%",
      "Support par email"
    ],
    highlighted: false,
    buttonText: "Commencer gratuitement"
  },
  {
    name: "Pro",
    price: "13 050",
    description: "Pour les agriculteurs qui veulent se développer",
    features: [
      "Produits illimités",
      "Page de profil personnalisée",
      "Commissions de 5%",
      "Mise en avant sur la plateforme",
      "Support prioritaire"
    ],
    highlighted: true,
    buttonText: "Souscrire maintenant"
  },
  {
    name: "Premium",
    price: "32 700",
    description: "Solution complète pour maximiser vos ventes",
    features: [
      "Produits illimités",
      "Page de profil professionnelle",
      "Commissions de 3%",
      "Mise en avant prioritaire",
      "Support dédié 7j/7",
      "Outils d'analyse avancés",
      "Formation marketing incluse"
    ],
    highlighted: false,
    buttonText: "Passer à Premium"
  }
];

const SubscriptionSection = () => {
  return (
    <section className="py-16 bg-agrimarket-lightGreen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos formules d'abonnement</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pour les agriculteurs qui souhaitent vendre sur AgriMarket, choisissez la formule qui vous convient le mieux.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg overflow-hidden shadow-md border ${
                plan.highlighted ? 'border-agrimarket-orange transform -translate-y-4 scale-105' : 'border-gray-100'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-agrimarket-orange text-white text-center py-2 font-medium text-sm">
                  Recommandé
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price} FCFA</span>
                  <span className="text-gray-600">/mois</span>
                </div>
                
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-agrimarket-green mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-agrimarket-orange hover:bg-orange-600 text-white' 
                      : 'bg-white border-agrimarket-green text-agrimarket-green hover:bg-agrimarket-green hover:text-white'
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;

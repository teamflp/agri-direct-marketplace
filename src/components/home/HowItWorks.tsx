
import React from 'react';
import { Search, ShoppingCart, Truck, ThumbsUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-white" />,
      title: "Découvrez",
      description: "Trouvez des agriculteurs locaux et parcourez leurs produits frais et de saison"
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-white" />,
      title: "Commandez",
      description: "Sélectionnez vos produits préférés et ajoutez-les à votre panier"
    },
    {
      icon: <Truck className="h-10 w-10 text-white" />,
      title: "Recevez",
      description: "Faites-vous livrer à domicile ou récupérez votre commande à la ferme"
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-white" />,
      title: "Profitez",
      description: "Dégustez des produits frais tout en soutenant les agriculteurs locaux"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acheter des produits locaux n'a jamais été aussi simple
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-r from-agrimarket-orange to-agrimarket-brown rounded-full p-5 mb-4">
                {step.icon}
              </div>
              <div className="relative mb-8 md:mb-0 md:static">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {/* Ligne de connexion entre les étapes (visible uniquement sur desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-200">
                    <div className="absolute right-0 -top-1.5 w-3 h-3 rounded-full bg-agrimarket-orange"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

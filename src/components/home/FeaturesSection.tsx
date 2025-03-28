
import React from 'react';
import { Leaf, TruckIcon, BadgeCheck, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: <TruckIcon className="w-10 h-10 text-agrimarket-orange" />,
    title: "Livraison locale",
    description: "Des produits frais livrés directement chez vous par les agriculteurs de votre région."
  },
  {
    icon: <Leaf className="w-10 h-10 text-agrimarket-green" />,
    title: "Agriculture durable",
    description: "Des produits cultivés avec des méthodes respectueuses de l'environnement et de la biodiversité."
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-agrimarket-orange" />,
    title: "Transparence totale",
    description: "Connaissez l'origine de vos aliments et les méthodes de production utilisées."
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-agrimarket-green" />,
    title: "Soutien direct",
    description: "Les agriculteurs reçoivent une juste rémunération pour leur travail grâce aux circuits courts."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Pourquoi choisir AgriMarket ?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Une nouvelle manière de consommer qui soutient l'agriculture locale tout en vous offrant les meilleurs produits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

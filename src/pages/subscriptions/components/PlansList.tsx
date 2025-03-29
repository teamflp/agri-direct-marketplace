
import React from 'react';
import SubscriptionPlans from '@/components/subscriptions/SubscriptionPlans';

// Plans d'abonnement
const subscriptionPlans = [
  {
    id: "panier-basic",
    name: "Panier Découverte",
    description: "Une sélection de légumes de saison pour découvrir nos produits",
    price: {
      weekly: 2500,
      biweekly: 4500,
      monthly: 8500
    },
    features: [
      "4-5 variétés de légumes",
      "Idéal pour 1-2 personnes",
      "Produits 100% biologiques",
      "Livraison incluse"
    ],
    popular: false,
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=300&h=200&fit=crop",
    products: [
      { id: 1, name: "Tomates", quantity: 1, image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300&h=300&fit=crop" },
      { id: 2, name: "Carottes", quantity: 1, image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=300&h=300&fit=crop" },
      { id: 3, name: "Salades", quantity: 2, image: "https://images.unsplash.com/photo-1621194066807-89dfbf5eb682?w=300&h=300&fit=crop" },
    ],
    farmerId: 2,
    farmerName: "Ferme des Quatre Saisons",
    farmerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
  },
  {
    id: "panier-family",
    name: "Panier Famille",
    description: "Un assortiment complet pour toute la famille pendant une semaine",
    price: {
      weekly: 4500,
      biweekly: 8500,
      monthly: 16000
    },
    features: [
      "8-10 variétés de légumes",
      "Idéal pour 3-4 personnes",
      "Produits 100% biologiques",
      "Livraison incluse",
      "1 produit surprise chaque semaine"
    ],
    popular: true,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=200&fit=crop",
    products: [
      { id: 1, name: "Tomates", quantity: 2, image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300&h=300&fit=crop" },
      { id: 2, name: "Carottes", quantity: 2, image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=300&h=300&fit=crop" },
      { id: 3, name: "Salades", quantity: 3, image: "https://images.unsplash.com/photo-1621194066807-89dfbf5eb682?w=300&h=300&fit=crop" },
      { id: 4, name: "Poivrons", quantity: 2, image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop" },
      { id: 5, name: "Oignons", quantity: 2, image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=300&h=300&fit=crop" },
      { id: 6, name: "Courgettes", quantity: 2, image: "https://images.unsplash.com/photo-1596356453620-8964a982d60f?w=300&h=300&fit=crop" },
    ],
    farmerId: 2,
    farmerName: "Ferme des Quatre Saisons",
    farmerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
  },
  {
    id: "panier-gourmet",
    name: "Panier Gourmet",
    description: "Une sélection premium avec des produits rares et de saison",
    price: {
      weekly: 6500,
      biweekly: 12000,
      monthly: 22000
    },
    features: [
      "6-8 variétés de légumes premium",
      "Produits rares ou de spécialité",
      "100% biologiques et artisanaux",
      "Livraison incluse",
      "Fiches recettes incluses",
      "Accès à des événements exclusifs"
    ],
    popular: false,
    image: "https://images.unsplash.com/photo-1543158266-0066955047b0?w=300&h=200&fit=crop",
    products: [
      { id: 1, name: "Tomates anciennes", quantity: 1, image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=300&h=300&fit=crop" },
      { id: 2, name: "Carottes pourpres", quantity: 1, image: "https://images.unsplash.com/photo-1582515073490-39981397c445?w=300&h=300&fit=crop" },
      { id: 3, name: "Mesclun de salades", quantity: 1, image: "https://images.unsplash.com/photo-1621194066807-89dfbf5eb682?w=300&h=300&fit=crop" },
      { id: 7, name: "Asperges", quantity: 1, image: "https://images.unsplash.com/photo-1555704574-a9be4adeb3c3?w=300&h=300&fit=crop" },
      { id: 8, name: "Champignons", quantity: 1, image: "https://images.unsplash.com/photo-1504674055460-49d830dc9d3d?w=300&h=300&fit=crop" },
      { id: 9, name: "Herbes fraîches", quantity: 1, image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop" },
    ],
    farmerId: 2,
    farmerName: "Ferme des Quatre Saisons",
    farmerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
  }
];

const PlansList = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nos formules d'abonnement</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choisissez le panier qui correspond le mieux à vos besoins et recevez des produits frais et de saison régulièrement
        </p>
      </div>
      
      <SubscriptionPlans plans={subscriptionPlans} />
    </div>
  );
};

export default PlansList;

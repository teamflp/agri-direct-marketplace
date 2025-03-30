
import React, { useEffect, useState } from 'react';
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

// On ajoute aussi les formules pour les agriculteurs
const farmerPlans = [
  {
    id: "basic",
    name: "Basic",
    description: "Parfait pour débuter sur la plateforme",
    price: {
      monthly: 0
    },
    features: [
      "5 produits maximum",
      "Page de profil basique",
      "Commissions de 10%",
      "Support par email"
    ],
    popular: false,
    type: "farmer"
  },
  {
    id: "pro",
    name: "Pro",
    description: "Pour les agriculteurs qui veulent se développer",
    price: {
      monthly: 13050
    },
    features: [
      "Produits illimités",
      "Page de profil personnalisée",
      "Commissions de 5%",
      "Mise en avant sur la plateforme",
      "Support prioritaire"
    ],
    popular: true,
    type: "farmer"
  },
  {
    id: "premium",
    name: "Premium",
    description: "Solution complète pour maximiser vos ventes",
    price: {
      monthly: 32700
    },
    features: [
      "Produits illimités",
      "Page de profil professionnelle",
      "Commissions de 3%",
      "Mise en avant prioritaire",
      "Support dédié 7j/7",
      "Outils d'analyse avancés",
      "Formation marketing incluse"
    ],
    popular: false,
    type: "farmer"
  }
];

type PlansListProps = {
  initialSelectedPlan?: string | null;
};

const PlansList: React.FC<PlansListProps> = ({ initialSelectedPlan }) => {
  // État pour gérer l'onglet actif (paniers ou formules agriculteurs)
  const [activeTab, setActiveTab] = useState<'baskets' | 'farmer-plans'>('baskets');

  useEffect(() => {
    // Si un plan agriculteur est sélectionné, afficher cet onglet
    if (initialSelectedPlan === 'pro' || initialSelectedPlan === 'premium' || initialSelectedPlan === 'basic') {
      setActiveTab('farmer-plans');
    }
  }, [initialSelectedPlan]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nos formules d'abonnement</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choisissez la formule qui correspond le mieux à vos besoins
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('baskets')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'baskets'
                ? 'bg-white shadow-sm text-agrimarket-green'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Paniers de produits
          </button>
          <button
            onClick={() => setActiveTab('farmer-plans')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'farmer-plans'
                ? 'bg-white shadow-sm text-agrimarket-green'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Formules agriculteurs
          </button>
        </div>
      </div>
      
      {activeTab === 'baskets' ? (
        <SubscriptionPlans plans={subscriptionPlans} />
      ) : (
        <SubscriptionPlans plans={farmerPlans.map(plan => ({
          ...plan,
          id: plan.id,
          name: plan.name,
          description: plan.description,
          price: {
            weekly: plan.price.monthly / 4,
            biweekly: plan.price.monthly / 2,
            monthly: plan.price.monthly
          },
          features: plan.features,
          popular: plan.popular,
          image: undefined,
          products: [],
          farmerId: 0,
          farmerName: "AgriMarket",
          farmerAvatar: undefined
        }))} 
        defaultFrequency="monthly"
        isFarmerPlan={true}
        />
      )}
    </div>
  );
};

export default PlansList;


import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SubscriptionPlans from '@/components/subscriptions/SubscriptionPlans';
import UserSubscriptions from '@/components/subscriptions/UserSubscriptions';
import { useSubscription } from '@/contexts/SubscriptionContext';

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

const faqItems = [
  {
    question: "Comment fonctionnent les abonnements aux paniers ?",
    answer: "Nos abonnements permettent de recevoir régulièrement des paniers de produits frais directement de nos agriculteurs partenaires. Vous choisissez la fréquence (hebdomadaire, bimensuelle ou mensuelle) et le type de panier. Votre carte est débitée automatiquement avant chaque livraison, et vous pouvez mettre en pause ou annuler votre abonnement à tout moment."
  },
  {
    question: "Puis-je personnaliser le contenu de mon panier ?",
    answer: "Le contenu des paniers est défini par l'agriculteur en fonction des récoltes de saison. Cependant, certains agriculteurs proposent des options de personnalisation où vous pouvez échanger certains produits. Vous pouvez contacter directement l'agriculteur pour discuter des possibilités de personnalisation."
  },
  {
    question: "Comment sont livrés les paniers ?",
    answer: "Les paniers sont livrés directement à votre domicile ou à un point relais, selon les options disponibles dans votre région. La livraison est généralement effectuée dans les 24 à 48 heures suivant la récolte, garantissant ainsi la fraîcheur maximale des produits."
  },
  {
    question: "Que se passe-t-il si je ne suis pas chez moi lors de la livraison ?",
    answer: "Si vous n'êtes pas disponible lors de la livraison, vous pouvez indiquer un lieu sûr où déposer votre panier (véranda, chez un voisin, etc.) dans les instructions de livraison. Vous pouvez également choisir de recevoir votre panier à un point relais où il sera conservé jusqu'à votre passage."
  },
  {
    question: "Comment puis-je annuler ou mettre en pause mon abonnement ?",
    answer: "Vous pouvez gérer votre abonnement directement depuis votre espace client dans la section 'Mes abonnements'. Vous y trouverez des options pour mettre en pause votre abonnement (pour les vacances par exemple) ou l'annuler définitivement. L'annulation doit être effectuée au moins 48h avant la prochaine livraison prévue."
  },
  {
    question: "Les produits sont-ils tous biologiques ?",
    answer: "Tous nos agriculteurs partenaires pratiquent une agriculture respectueuse de l'environnement. La majorité des produits sont certifiés biologiques, mais certains agriculteurs sont en conversion ou pratiquent une agriculture raisonnée sans avoir le label. Les méthodes de production sont clairement indiquées pour chaque agriculteur sur notre plateforme."
  }
];

const Subscriptions = () => {
  const { getUserSubscriptions } = useSubscription();
  const userSubscriptions = getUserSubscriptions();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Bannière principale */}
        <div className="bg-gradient-to-r from-agrimarket-green to-agrimarket-lightGreen py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Abonnez-vous à des paniers frais et locaux
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Recevez régulièrement des produits de saison directement de nos agriculteurs partenaires
            </p>
            <Button size="lg" className="bg-white text-agrimarket-green hover:bg-gray-100">
              Découvrir nos paniers
            </Button>
          </div>
        </div>
        
        {/* Mes abonnements (si l'utilisateur en a) */}
        {userSubscriptions.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <UserSubscriptions />
          </div>
        )}
        
        {/* Grille des abonnements */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos formules d'abonnement</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choisissez le panier qui correspond le mieux à vos besoins et recevez des produits frais et de saison régulièrement
            </p>
          </div>
          
          <SubscriptionPlans plans={subscriptionPlans} />
        </div>
        
        {/* Avantages */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi s'abonner à nos paniers ?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez les avantages d'un abonnement régulier à nos paniers de produits frais
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Fraîcheur garantie</h3>
                  <p className="text-gray-600">
                    Nos produits sont récoltés le jour même ou la veille de la livraison pour une fraîcheur maximale.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Économies sur le long terme</h3>
                  <p className="text-gray-600">
                    Bénéficiez de prix avantageux et stables toute l'année grâce à l'engagement direct avec les agriculteurs.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Découvrez de nouveaux produits</h3>
                  <p className="text-gray-600">
                    Chaque panier contient une sélection variée qui vous permet de découvrir de nouveaux produits de saison.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Livraison pratique</h3>
                  <p className="text-gray-600">
                    Recevez vos produits directement chez vous sans avoir à vous déplacer, à la fréquence qui vous convient.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Soutien aux agriculteurs locaux</h3>
                  <p className="text-gray-600">
                    En vous abonnant, vous soutenez directement les agriculteurs de votre région et encouragez l'agriculture durable.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Flexibilité totale</h3>
                  <p className="text-gray-600">
                    Mettez en pause ou annulez votre abonnement à tout moment, sans engagement à long terme.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trouvez des réponses aux questions les plus courantes sur nos abonnements
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Vous avez d'autres questions ? Contactez notre équipe
            </p>
            <Button className="bg-agrimarket-green hover:bg-green-700 text-white">
              Nous contacter
            </Button>
          </div>
        </div>
        
        {/* CTA final */}
        <div className="bg-agrimarket-orange py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à recevoir vos produits frais ?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Souscrivez à un abonnement dès aujourd'hui et commencez à savourer des produits frais et locaux chaque semaine
            </p>
            <Button size="lg" className="bg-white text-agrimarket-orange hover:bg-gray-100">
              S'abonner maintenant
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscriptions;

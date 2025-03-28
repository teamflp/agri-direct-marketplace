
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SubscriptionSection from '@/components/home/SubscriptionSection';

const monthlyPlans = [
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
    price: "19,90",
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
    price: "49,90",
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

const yearlyPlans = [
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
    price: "199",
    description: "Pour les agriculteurs qui veulent se développer",
    features: [
      "Produits illimités",
      "Page de profil personnalisée",
      "Commissions de 5%",
      "Mise en avant sur la plateforme",
      "Support prioritaire",
      "2 mois offerts"
    ],
    highlighted: true,
    buttonText: "Souscrire à l'année"
  },
  {
    name: "Premium",
    price: "499",
    description: "Solution complète pour maximiser vos ventes",
    features: [
      "Produits illimités",
      "Page de profil professionnelle",
      "Commissions de 3%",
      "Mise en avant prioritaire",
      "Support dédié 7j/7",
      "Outils d'analyse avancés",
      "Formation marketing incluse",
      "2 mois offerts"
    ],
    highlighted: false,
    buttonText: "Passer à Premium"
  }
];

const faqItems = [
  {
    question: "Comment choisir le bon abonnement pour mon activité ?",
    answer: "Le choix de votre abonnement dépend principalement du volume de produits que vous souhaitez vendre et de vos besoins en visibilité. L'abonnement Basic est idéal pour tester la plateforme, tandis que les abonnements Pro et Premium offrent des fonctionnalités avancées pour développer votre activité. N'hésitez pas à contacter notre équipe pour un conseil personnalisé."
  },
  {
    question: "Puis-je changer d'abonnement en cours d'année ?",
    answer: "Oui, vous pouvez passer à un abonnement supérieur à tout moment. La différence sera calculée au prorata de la période restante. Pour passer à un abonnement inférieur, le changement prendra effet à la fin de votre période d'abonnement en cours."
  },
  {
    question: "Comment fonctionnent les commissions sur les ventes ?",
    answer: "Les commissions sont un pourcentage prélevé sur chaque vente réalisée via notre plateforme. Ce taux varie selon votre type d'abonnement : 10% pour l'abonnement Basic, 5% pour le Pro et 3% pour le Premium. Ces commissions servent à maintenir et améliorer la plateforme."
  },
  {
    question: "Quelles sont les méthodes de paiement acceptées ?",
    answer: "Nous acceptons plusieurs méthodes de paiement pour votre abonnement : cartes bancaires (Visa, Mastercard), Mobile Money (Orange Money, MTN Money), et virements bancaires pour les abonnements annuels."
  },
  {
    question: "L'abonnement se renouvelle-t-il automatiquement ?",
    answer: "Oui, tous nos abonnements sont configurés pour se renouveler automatiquement à la fin de la période souscrite, afin d'éviter toute interruption de service. Vous recevrez un email de notification 7 jours avant le renouvellement, avec la possibilité d'annuler si vous le souhaitez."
  },
  {
    question: "Comment obtenir une facture pour mon abonnement ?",
    answer: "Les factures sont automatiquement générées et envoyées à votre adresse email après chaque paiement. Vous pouvez également retrouver l'historique de toutes vos factures dans la section 'Mon compte > Abonnement > Factures'."
  }
];

const Subscriptions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Bannière principale */}
        <div className="bg-gradient-to-r from-agrimarket-green to-agrimarket-lightGreen py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vendez vos produits en toute simplicité
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Choisissez la formule qui correspond à vos besoins et développez votre activité avec AgriMarket
            </p>
            <Button size="lg" className="bg-white text-agrimarket-green hover:bg-gray-100">
              Démarrer maintenant
            </Button>
          </div>
        </div>
        
        {/* Grille des abonnements */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos formules d'abonnement</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choisissez l'abonnement qui convient le mieux à vos besoins et bénéficiez de tous les avantages de la plateforme AgriMarket
            </p>
          </div>
          
          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                <TabsTrigger value="yearly">Annuel (2 mois offerts)</TabsTrigger>
              </TabsList>
            </div>
            
            {/* Plans mensuels */}
            <TabsContent value="monthly">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {monthlyPlans.map((plan, index) => (
                  <Card 
                    key={index} 
                    className={`relative overflow-hidden ${
                      plan.highlighted ? 'border-agrimarket-orange shadow-lg' : 'border-gray-200'
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute top-0 left-0 right-0 bg-agrimarket-orange text-white text-center py-2 font-medium text-sm">
                        Recommandé
                      </div>
                    )}
                    
                    <CardHeader className={plan.highlighted ? 'pt-12' : ''}>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price}€</span>
                        <span className="text-gray-500">/mois</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="w-5 h-5 text-agrimarket-green mr-2 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className={`w-full ${
                          plan.highlighted 
                            ? 'bg-agrimarket-orange hover:bg-orange-600 text-white' 
                            : ''
                        }`}
                        variant={plan.highlighted ? 'default' : 'outline'}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Plans annuels */}
            <TabsContent value="yearly">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {yearlyPlans.map((plan, index) => (
                  <Card 
                    key={index} 
                    className={`relative overflow-hidden ${
                      plan.highlighted ? 'border-agrimarket-orange shadow-lg' : 'border-gray-200'
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute top-0 left-0 right-0 bg-agrimarket-orange text-white text-center py-2 font-medium text-sm">
                        Recommandé
                      </div>
                    )}
                    
                    <CardHeader className={plan.highlighted ? 'pt-12' : ''}>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price}€</span>
                        <span className="text-gray-500">/an</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="w-5 h-5 text-agrimarket-green mr-2 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <Button 
                        className={`w-full ${
                          plan.highlighted 
                            ? 'bg-agrimarket-orange hover:bg-orange-600 text-white' 
                            : ''
                        }`}
                        variant={plan.highlighted ? 'default' : 'outline'}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Avantages */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi rejoindre AgriMarket ?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bénéficiez de nombreux avantages en rejoignant notre communauté d'agriculteurs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Visibilité accrue</h3>
                  <p className="text-gray-600">
                    Présentez vos produits à des milliers de clients potentiels dans votre région et au-delà.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gestion simplifiée</h3>
                  <p className="text-gray-600">
                    Profitez d'outils de gestion intuitifs pour vos produits, commandes et paiements.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Prix justes</h3>
                  <p className="text-gray-600">
                    Fixez vos propres prix et éliminez les intermédiaires pour une meilleure rentabilité.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Communauté active</h3>
                  <p className="text-gray-600">
                    Rejoignez un réseau d'agriculteurs partageant les mêmes valeurs et échangez des conseils.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Support dédié</h3>
                  <p className="text-gray-600">
                    Bénéficiez d'une assistance personnalisée pour vous aider à développer votre activité.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-agrimarket-lightGreen p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-agrimarket-green" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Paiements sécurisés</h3>
                  <p className="text-gray-600">
                    Recevez vos paiements rapidement et en toute sécurité via notre système intégré.
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
              Prêt à développer votre activité ?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Rejoignez notre communauté de producteurs et connectez-vous directement avec des clients à la recherche de produits locaux de qualité
            </p>
            <Button size="lg" className="bg-white text-agrimarket-orange hover:bg-gray-100">
              Créer mon compte agriculteur
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscriptions;

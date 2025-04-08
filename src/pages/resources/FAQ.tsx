
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const faqCategories = {
    general: [
      {
        question: "Qu'est-ce qu'AgriMarket?",
        answer: "AgriMarket est une plateforme qui connecte directement les agriculteurs aux consommateurs. Notre mission est de faciliter l'accès à des produits frais et locaux tout en offrant aux agriculteurs un canal de vente directe et équitable."
      },
      {
        question: "Comment fonctionne AgriMarket?",
        answer: "AgriMarket permet aux agriculteurs de créer un profil, d'ajouter leurs produits et de les proposer à la vente. Les consommateurs peuvent parcourir les produits par catégorie ou par producteur, les commander en ligne et se faire livrer ou les récupérer directement chez l'agriculteur."
      },
      {
        question: "Dans quelles régions AgriMarket est-il disponible?",
        answer: "Actuellement, AgriMarket est disponible dans plusieurs régions d'Afrique de l'Ouest, principalement au Sénégal, en Côte d'Ivoire et au Ghana. Nous prévoyons d'étendre nos services à d'autres pays dans les mois à venir."
      },
      {
        question: "Comment contacter le service client?",
        answer: "Vous pouvez contacter notre service client par email à support@agrimarket.ci, par téléphone au +225 07 XX XX XX XX ou via le formulaire de contact sur notre site. Notre équipe est disponible du lundi au vendredi de 8h à 18h."
      }
    ],
    compte: [
      {
        question: "Comment créer un compte sur AgriMarket?",
        answer: "Pour créer un compte, cliquez sur 'Connexion / Inscription' en haut à droite de la page, puis choisissez 'Créer un compte'. Remplissez le formulaire avec vos informations personnelles et sélectionnez votre type de compte (consommateur ou agriculteur)."
      },
      {
        question: "Comment réinitialiser mon mot de passe?",
        answer: "Si vous avez oublié votre mot de passe, cliquez sur 'Connexion', puis sur 'Mot de passe oublié?'. Entrez votre adresse e-mail et suivez les instructions envoyées par email pour réinitialiser votre mot de passe."
      },
      {
        question: "Comment modifier mes informations personnelles?",
        answer: "Connectez-vous à votre compte, accédez à votre tableau de bord et cliquez sur 'Profil'. Vous pourrez alors modifier vos informations personnelles, votre adresse et vos préférences de communication."
      },
      {
        question: "Comment supprimer mon compte?",
        answer: "Pour supprimer votre compte, connectez-vous, accédez à votre profil, puis aux paramètres du compte. Cliquez sur 'Supprimer mon compte' et suivez les instructions. Notez que cette action est irréversible et supprimera toutes vos données."
      }
    ],
    commandes: [
      {
        question: "Comment passer une commande?",
        answer: "Pour passer une commande, parcourez les produits disponibles, ajoutez-les à votre panier, puis cliquez sur 'Commander'. Sélectionnez votre méthode de livraison et de paiement, puis confirmez votre commande."
      },
      {
        question: "Quels sont les modes de paiement acceptés?",
        answer: "Nous acceptons plusieurs méthodes de paiement : Orange Money, MTN Money, cartes bancaires via Stripe, et dans certains cas, le paiement à la livraison."
      },
      {
        question: "Comment annuler une commande?",
        answer: "Pour annuler une commande, accédez à votre historique de commandes dans votre tableau de bord et cliquez sur 'Annuler' à côté de la commande concernée. Notez que l'annulation n'est possible que si la commande n'a pas encore été préparée par l'agriculteur."
      },
      {
        question: "Comment suivre ma commande?",
        answer: "Une fois votre commande confirmée, vous recevrez un email de confirmation avec un numéro de suivi. Vous pouvez également suivre l'état de votre commande dans la section 'Mes commandes' de votre tableau de bord."
      }
    ],
    agriculteurs: [
      {
        question: "Comment devenir vendeur sur AgriMarket?",
        answer: "Pour devenir vendeur, créez un compte agriculteur, complétez votre profil avec les informations de votre exploitation, et souscrivez à l'un de nos abonnements pour commencer à vendre vos produits."
      },
      {
        question: "Quelles sont les commissions prélevées par AgriMarket?",
        answer: "Nos commissions varient selon le type d'abonnement : 8% pour l'abonnement Standard, 5% pour l'abonnement Premium et 3% pour l'abonnement Business."
      },
      {
        question: "Comment sont gérés les paiements pour les agriculteurs?",
        answer: "Les paiements sont sécurisés via notre plateforme. Une fois la commande livrée et confirmée reçue par le client, l'argent est versé sur votre compte AgriMarket, déduction faite de notre commission. Vous pouvez ensuite retirer les fonds selon un calendrier hebdomadaire ou mensuel."
      },
      {
        question: "Comment gérer mon inventaire de produits?",
        answer: "Dans votre tableau de bord agriculteur, accédez à la section 'Produits' où vous pourrez ajouter, modifier ou supprimer des produits, mettre à jour les stocks et les prix, et suivre les statistiques de vente."
      }
    ],
    livraison: [
      {
        question: "Quelles sont les options de livraison disponibles?",
        answer: "Nous proposons la livraison à domicile dans les zones urbaines, le retrait chez l'agriculteur, et des points de collecte dans certaines localités. Les options disponibles dépendent de votre emplacement et des préférences de l'agriculteur."
      },
      {
        question: "Combien coûte la livraison?",
        answer: "Les frais de livraison varient en fonction de la distance, du poids et du volume de votre commande. Le montant exact vous sera communiqué avant la validation de votre commande."
      },
      {
        question: "Quels sont les délais de livraison?",
        answer: "Les délais de livraison dépendent de la disponibilité des produits et de votre emplacement. En général, comptez 1 à 3 jours pour une livraison en zone urbaine, et jusqu'à 5 jours pour les zones rurales éloignées."
      },
      {
        question: "Que faire en cas de problème avec ma livraison?",
        answer: "Si vous rencontrez un problème avec votre livraison (retard, produits endommagés, etc.), contactez immédiatement notre service client via votre espace personnel ou par téléphone. Nous traiterons votre demande sous 24h."
      }
    ]
  };

  const filterFAQs = (category) => {
    if (!searchQuery) return faqCategories[category];
    
    return faqCategories[category].filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const allCategoriesEmpty = Object.keys(faqCategories).every(category => 
    filterFAQs(category).length === 0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Bannière */}
        <div className="bg-agrimarket-green/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Questions fréquentes</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Trouvez rapidement des réponses à toutes vos questions concernant AgriMarket.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Recherchez dans nos FAQ..."
                className="pl-10 pr-4 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Onglets de FAQ */}
          <Tabs defaultValue="general" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="compte">Compte</TabsTrigger>
              <TabsTrigger value="commandes">Commandes</TabsTrigger>
              <TabsTrigger value="agriculteurs">Agriculteurs</TabsTrigger>
              <TabsTrigger value="livraison">Livraison</TabsTrigger>
            </TabsList>
            
            {allCategoriesEmpty && searchQuery && (
              <div className="text-center py-10">
                <p className="text-lg text-gray-600">Aucun résultat trouvé pour "{searchQuery}"</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery('')}
                >
                  Réinitialiser la recherche
                </Button>
              </div>
            )}
            
            <TabsContent value="general">
              {filterFAQs('general').length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filterFAQs('general').map((faq, index) => (
                    <AccordionItem key={index} value={`general-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : searchQuery && (
                <p className="text-center py-6 text-gray-500">Aucun résultat dans cette catégorie</p>
              )}
            </TabsContent>
            
            <TabsContent value="compte">
              {filterFAQs('compte').length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filterFAQs('compte').map((faq, index) => (
                    <AccordionItem key={index} value={`compte-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : searchQuery && (
                <p className="text-center py-6 text-gray-500">Aucun résultat dans cette catégorie</p>
              )}
            </TabsContent>
            
            <TabsContent value="commandes">
              {filterFAQs('commandes').length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filterFAQs('commandes').map((faq, index) => (
                    <AccordionItem key={index} value={`commandes-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : searchQuery && (
                <p className="text-center py-6 text-gray-500">Aucun résultat dans cette catégorie</p>
              )}
            </TabsContent>
            
            <TabsContent value="agriculteurs">
              {filterFAQs('agriculteurs').length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filterFAQs('agriculteurs').map((faq, index) => (
                    <AccordionItem key={index} value={`agriculteurs-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : searchQuery && (
                <p className="text-center py-6 text-gray-500">Aucun résultat dans cette catégorie</p>
              )}
            </TabsContent>
            
            <TabsContent value="livraison">
              {filterFAQs('livraison').length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filterFAQs('livraison').map((faq, index) => (
                    <AccordionItem key={index} value={`livraison-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : searchQuery && (
                <p className="text-center py-6 text-gray-500">Aucun résultat dans cette catégorie</p>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Section "Vous n'avez pas trouvé votre réponse ?" */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h2>
            <p className="text-gray-600 mb-6">
              Notre équipe de support est disponible pour vous aider avec toutes vos questions.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild className="bg-agrimarket-orange hover:bg-agrimarket-brown text-white">
                <Link to="/contact">Contactez-nous</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/resources/support">Centre d'aide</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;

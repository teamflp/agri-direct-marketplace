
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plant, Sprout, Droplet, Sun, CloudRain, Shovel, FileSpreadsheet, Truck, Coins, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const GuideAgriculteurs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Bannière */}
        <div className="bg-agrimarket-green/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Guide pour les agriculteurs</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Conseils, ressources et tutoriels pour maximiser votre succès sur la plateforme AgriMarket.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {/* Section des thèmes principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Plant className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Techniques de culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Méthodes modernes et traditionnelles pour optimiser vos rendements tout en préservant les sols.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Coins className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Ventes et tarification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Stratégies pour fixer vos prix, gérer vos stocks et augmenter vos revenus.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Certification et qualité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Processus de certification, normes de qualité et meilleures pratiques pour rassurer les consommateurs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <FileSpreadsheet className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Gestion administrative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Conseils pour la comptabilité, la fiscalité et les obligations légales des producteurs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Truck className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Logistique et livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Solutions pour le stockage, le conditionnement et la livraison de vos produits.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Sun className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Agriculture durable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Pratiques écologiques et durables pour préserver l'environnement et valoriser votre production.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Section FAQ spécifique aux agriculteurs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Questions fréquentes des agriculteurs</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Comment créer mon profil d'agriculteur sur AgriMarket ?</AccordionTrigger>
                <AccordionContent>
                  Pour créer votre profil, inscrivez-vous sur notre plateforme en choisissant le rôle "Agriculteur". 
                  Renseignez vos informations personnelles, les coordonnées de votre exploitation, ajoutez des photos 
                  attrayantes et détaillez vos méthodes de production. Une fois votre profil complet, vous pourrez 
                  commencer à ajouter vos produits et à les proposer à la vente.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Quelles sont les commissions prélevées par AgriMarket ?</AccordionTrigger>
                <AccordionContent>
                  Notre commission varie selon votre niveau d'abonnement. Les agriculteurs avec un abonnement Standard 
                  paient 8% de commission, les abonnés Premium 5%, et les membres Business seulement 3%. En contrepartie, 
                  nous gérons la plateforme, le marketing et la relation client pour vous permettre de vous concentrer sur 
                  votre production.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Comment sont gérées les livraisons ?</AccordionTrigger>
                <AccordionContent>
                  Vous avez deux options : gérer vous-même vos livraisons ou utiliser notre réseau de partenaires 
                  logistiques. Si vous choisissez notre réseau, vous pouvez définir des points de collecte ou proposer 
                  la livraison à domicile. Les frais sont calculés en fonction du poids, du volume et de la distance, et 
                  peuvent être à votre charge ou à celle du client, selon vos préférences.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Comment puis-je maximiser mes ventes sur la plateforme ?</AccordionTrigger>
                <AccordionContent>
                  Pour augmenter vos ventes, complétez votre profil à 100%, ajoutez des photos de qualité, décrivez 
                  précisément vos produits et vos méthodes de production, répondez rapidement aux clients, maintenez 
                  un stock à jour, et proposez des prix compétitifs. Participez également aux événements promotionnels 
                  d'AgriMarket et utilisez nos outils d'analytics pour optimiser votre offre.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Comment sont gérés les paiements ?</AccordionTrigger>
                <AccordionContent>
                  Les paiements des clients sont sécurisés via notre plateforme. Une fois la commande livrée et confirmée 
                  reçue par le client, l'argent est versé sur votre compte AgriMarket. Vous pouvez ensuite retirer les fonds 
                  vers votre compte bancaire ou mobile money (Orange Money, MTN Money, etc.) selon un calendrier 
                  hebdomadaire ou mensuel, à votre convenance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Ressources supplémentaires */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Ressources utiles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Button variant="outline" className="flex items-center justify-start gap-3 h-auto p-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <FileSpreadsheet className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Guide d'utilisation de la plateforme</h3>
                  <p className="text-sm text-gray-600">PDF - 2.4 MB</p>
                </div>
              </Button>
              
              <Button variant="outline" className="flex items-center justify-start gap-3 h-auto p-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Calendrier des cultures saisonnières</h3>
                  <p className="text-sm text-gray-600">PDF - 1.8 MB</p>
                </div>
              </Button>
              
              <Button variant="outline" className="flex items-center justify-start gap-3 h-auto p-4">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <FileSpreadsheet className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Modèle de plan d'affaires agricole</h3>
                  <p className="text-sm text-gray-600">Excel - 850 KB</p>
                </div>
              </Button>
              
              <Button variant="outline" className="flex items-center justify-start gap-3 h-auto p-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <FileSpreadsheet className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Guide des certifications disponibles</h3>
                  <p className="text-sm text-gray-600">PDF - 3.1 MB</p>
                </div>
              </Button>
            </div>
            
            <div className="mt-10 text-center">
              <Button className="bg-agrimarket-orange hover:bg-agrimarket-brown text-white">
                Accéder à tous les documents
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GuideAgriculteurs;

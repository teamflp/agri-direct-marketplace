
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Cookies = () => {
  const [preferences, setPreferences] = React.useState({
    necessary: true, // Toujours activé, ne peut pas être désactivé
    functional: true,
    analytics: true,
    marketing: false,
  });
  
  const handleToggle = (category) => {
    if (category === 'necessary') return; // Les cookies nécessaires ne peuvent pas être désactivés
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const handleSavePreferences = () => {
    // Dans une application réelle, vous enregistreriez ces préférences
    // dans le stockage local ou les cookies
    console.log('Préférences enregistrées:', preferences);
    toast.success("Vos préférences de cookies ont été enregistrées");
  };
  
  const acceptAll = () => {
    setPreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    toast.success("Tous les cookies ont été acceptés");
  };
  
  const rejectAll = () => {
    setPreferences({
      necessary: true, // Toujours activé
      functional: false,
      analytics: false,
      marketing: false,
    });
    toast.success("Les cookies optionnels ont été refusés");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Politique de gestion des cookies</h1>
            <p className="text-gray-500 mb-8">Dernière mise à jour : 8 avril 2025</p>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p>
                Sur AgriMarket, nous utilisons des cookies et d'autres technologies similaires pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Ce document explique comment nous utilisons les cookies, et comment vous pouvez les contrôler.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte placé sur votre appareil lorsque vous visitez un site web. Les cookies sont largement utilisés par les propriétaires de sites web pour faire fonctionner leurs sites, ou pour améliorer l'efficacité de leurs sites, ainsi que pour fournir des informations aux propriétaires du site.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Types de cookies que nous utilisons</h2>
              <p>
                Nous utilisons différents types de cookies sur notre plateforme :
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Cookies strictement nécessaires</h3>
              <p>
                Ces cookies sont essentiels au fonctionnement de notre site et vous permettent d'utiliser ses fonctionnalités de base, comme la navigation entre les pages et l'accès aux zones sécurisées. Sans ces cookies, nous ne pouvons pas fournir les services que vous demandez. Ces cookies ne collectent pas d'informations vous concernant qui pourraient être utilisées à des fins de marketing ou pour mémoriser les sites que vous avez visités sur Internet.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Exemples :</strong> Cookies de session pour gérer votre panier d'achat, cookies d'authentification.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Cookies de fonctionnalité</h3>
              <p>
                Ces cookies nous permettent de vous offrir une fonctionnalité et une personnalisation améliorées. Ils peuvent être définis par nous ou par des fournisseurs tiers dont nous avons ajouté les services à nos pages. Si vous n'autorisez pas ces cookies, certains ou tous ces services peuvent ne pas fonctionner correctement.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Exemples :</strong> Cookies de préférence de langue, cookies de localisation.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Cookies analytiques/de performance</h3>
              <p>
                Ces cookies nous permettent de compter les visites et les sources de trafic, afin que nous puissions mesurer et améliorer les performances de notre site. Ils nous aident à savoir quelles pages sont les plus et les moins populaires et à voir comment les visiteurs se déplacent sur le site. Si vous n'autorisez pas ces cookies, nous ne saurons pas quand vous avez visité notre site.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Exemples :</strong> Google Analytics, Hotjar.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.4 Cookies de ciblage/publicitaires</h3>
              <p>
                Ces cookies peuvent être définis via notre site par nos partenaires publicitaires. Ils peuvent être utilisés par ces entreprises pour établir un profil de vos intérêts et vous montrer des publicités pertinentes sur d'autres sites. Ils ne stockent pas directement des informations personnelles, mais sont basés sur l'identification unique de votre navigateur et de votre appareil Internet.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Exemples :</strong> Facebook Pixel, Google Ads.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Comment gérer vos préférences en matière de cookies</h2>
              <p>
                Vous pouvez modifier vos préférences en matière de cookies à tout moment en utilisant le panneau de contrôle ci-dessous. De plus, la plupart des navigateurs web vous permettent de contrôler les cookies via leurs paramètres. Veuillez consulter la documentation de votre navigateur pour savoir comment le faire.
              </p>
              <p className="mt-4">
                Veuillez noter que la désactivation de certains cookies peut affecter la fonctionnalité de notre site et limiter votre capacité à utiliser certaines fonctionnalités.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies tiers</h2>
              <p>
                Certains cookies sont placés par des services tiers qui apparaissent sur nos pages. Nous n'avons pas de contrôle direct sur ces cookies. Nous vous encourageons à consulter les politiques de confidentialité de ces tiers pour plus d'informations.
              </p>
              <p className="mt-4">
                Voici les principaux services tiers que nous utilisons :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Google Analytics : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Politique de confidentialité</a></li>
                <li>Facebook : <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Politique de confidentialité</a></li>
                <li>Stripe (pour les paiements) : <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Politique de confidentialité</a></li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Durée de stockage des cookies</h2>
              <p>
                La durée de stockage des cookies sur votre appareil varie en fonction du type de cookie :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Cookies de session : ces cookies sont temporaires et sont supprimés lorsque vous fermez votre navigateur.</li>
                <li>Cookies persistants : ces cookies restent sur votre appareil jusqu'à ce qu'ils expirent ou que vous les supprimiez. La durée de vie de ces cookies varie de quelques minutes à plusieurs années.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Modifications de la politique de cookies</h2>
              <p>
                Nous pouvons mettre à jour cette politique de cookies de temps à autre. Lorsque nous apportons des modifications importantes, nous vous en informerons par le biais d'un avis sur notre site web ou par d'autres moyens de communication.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
              <p>
                Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter à :
              </p>
              <p className="mt-4">
                <strong>E-mail:</strong> privacy@agrimarket.ci<br />
                <strong>Adresse:</strong> AgriMarket, Plateau, Immeuble Palm Club, Abidjan, Côte d'Ivoire
              </p>
            </div>
            
            {/* Panneau de gestion des cookies */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-12">
              <h2 className="text-xl font-bold mb-4">Gérer vos préférences de cookies</h2>
              <p className="text-gray-600 mb-6">
                Vous pouvez personnaliser vos préférences de cookies ci-dessous. Les cookies strictement nécessaires ne peuvent pas être désactivés car ils sont essentiels au bon fonctionnement du site.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Cookies strictement nécessaires</h3>
                    <p className="text-sm text-gray-500">Essentiels au fonctionnement du site</p>
                  </div>
                  <Switch checked={preferences.necessary} disabled className="opacity-50" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Cookies de fonctionnalité</h3>
                    <p className="text-sm text-gray-500">Pour améliorer votre expérience utilisateur</p>
                  </div>
                  <Switch 
                    checked={preferences.functional}
                    onCheckedChange={() => handleToggle('functional')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Cookies analytiques</h3>
                    <p className="text-sm text-gray-500">Pour nous aider à améliorer notre site</p>
                  </div>
                  <Switch 
                    checked={preferences.analytics}
                    onCheckedChange={() => handleToggle('analytics')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Cookies de ciblage</h3>
                    <p className="text-sm text-gray-500">Pour la personnalisation des publicités</p>
                  </div>
                  <Switch 
                    checked={preferences.marketing}
                    onCheckedChange={() => handleToggle('marketing')}
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  onClick={acceptAll}
                  className="bg-agrimarket-green hover:bg-agrimarket-green/90 text-white flex-1"
                >
                  Accepter tous les cookies
                </Button>
                <Button 
                  onClick={rejectAll}
                  variant="outline"
                  className="flex-1"
                >
                  Refuser les cookies optionnels
                </Button>
                <Button 
                  onClick={handleSavePreferences}
                  className="bg-agrimarket-orange hover:bg-agrimarket-brown text-white flex-1"
                >
                  Enregistrer mes préférences
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;

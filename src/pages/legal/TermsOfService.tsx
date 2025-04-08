
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>
            <p className="text-gray-500 mb-8">Dernière mise à jour : 8 avril 2025</p>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Bienvenue sur la plateforme AgriMarket. Les présentes conditions d'utilisation régissent votre utilisation de notre site web, de nos services et de notre application mobile (collectivement, la "Plateforme"). En utilisant notre Plateforme, vous acceptez d'être lié par les présentes conditions. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre Plateforme.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptation des conditions</h2>
              <p>
                En accédant ou en utilisant la Plateforme AgriMarket, vous confirmez que vous avez lu, compris et accepté d'être lié par les présentes Conditions d'Utilisation, qui constituent un accord légal entre vous et AgriMarket (ci-après désigné par "nous", "notre", ou "AgriMarket").
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Admissibilité</h2>
              <p>
                Pour utiliser la Plateforme, vous devez être âgé d'au moins 18 ans et posséder la capacité juridique pour conclure un contrat contraignant. Si vous utilisez la Plateforme au nom d'une entreprise ou d'une autre entité juridique, vous déclarez avoir l'autorité pour engager cette entité.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Description des services</h2>
              <p>
                AgriMarket est une plateforme qui met en relation les agriculteurs et les consommateurs, permettant la vente directe de produits agricoles frais. Les services que nous proposons comprennent, sans s'y limiter :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>La création de profils pour les agriculteurs et les consommateurs</li>
                <li>La mise en ligne et la recherche de produits agricoles</li>
                <li>La facilitation des commandes et des paiements</li>
                <li>La coordination des options de livraison et de collecte</li>
                <li>Le partage d'informations agricoles et de conseils</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Inscription et comptes utilisateurs</h2>
              <p>
                Pour accéder à certaines fonctionnalités de notre Plateforme, vous devrez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos informations d'identification et de toutes les activités qui se produisent sous votre compte. Vous acceptez de :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Fournir des informations exactes, à jour et complètes lors de l'inscription</li>
                <li>Maintenir et mettre à jour rapidement vos informations de compte</li>
                <li>Protéger la sécurité de votre compte en ne partageant pas vos identifiants</li>
                <li>Nous informer immédiatement de toute utilisation non autorisée de votre compte</li>
              </ul>
              <p>
                Nous nous réservons le droit de désactiver tout compte utilisateur à notre seule discrétion, notamment si nous estimons que vous avez enfreint les présentes Conditions d'Utilisation.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Dispositions spécifiques aux agriculteurs</h2>
              <p>
                Si vous vous inscrivez en tant qu'agriculteur sur notre Plateforme, vous acceptez également les dispositions suivantes :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Vous garantissez que tous les produits que vous proposez sont conformes aux lois et réglementations applicables en matière de sécurité alimentaire et de commerce.</li>
                <li>Vous êtes responsable de l'exactitude des descriptions, des prix et de la disponibilité des produits que vous proposez.</li>
                <li>Vous acceptez de maintenir un niveau de qualité élevé pour vos produits et services.</li>
                <li>Vous acceptez de payer les commissions applicables à AgriMarket pour les ventes réalisées via la Plateforme.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Dispositions spécifiques aux acheteurs</h2>
              <p>
                En tant qu'acheteur sur notre Plateforme, vous acceptez les dispositions suivantes :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Vous êtes responsable de vérifier que les produits que vous commandez répondent à vos besoins et exigences.</li>
                <li>Vous acceptez de payer intégralement et ponctuellement pour les produits que vous commandez.</li>
                <li>Vous acceptez de respecter les conditions de livraison ou de collecte convenues.</li>
                <li>Vous comprenez que les produits agricoles peuvent être soumis à des variations naturelles en termes d'apparence, de goût et de disponibilité.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contenu utilisateur</h2>
              <p>
                Notre Plateforme peut vous permettre de publier, de télécharger ou de soumettre du contenu. Vous conservez tous les droits sur le contenu que vous soumettez, mais vous nous accordez une licence mondiale, non exclusive, transférable, sous-licenciable et libre de redevances pour utiliser, reproduire, modifier, adapter, publier, traduire et distribuer ce contenu sur notre Plateforme et dans nos communications marketing.
              </p>
              <p className="mt-4">
                Vous déclarez et garantissez que :
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Vous possédez ou avez obtenu tous les droits nécessaires pour le contenu que vous soumettez.</li>
                <li>Le contenu que vous soumettez n'enfreint pas les droits de tiers, y compris les droits d'auteur, de marque, de confidentialité ou de publicité.</li>
                <li>Le contenu que vous soumettez n'est pas illégal, diffamatoire, offensant ou autrement répréhensible.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Paiements et commissions</h2>
              <p>
                AgriMarket facilite les transactions entre agriculteurs et consommateurs. Les agriculteurs acceptent de payer une commission sur chaque vente réalisée via la Plateforme. Les taux de commission actuels sont disponibles sur notre Plateforme et peuvent être modifiés à notre discrétion, moyennant un préavis raisonnable.
              </p>
              <p className="mt-4">
                Pour les acheteurs, les paiements effectués via notre Plateforme sont traités par des prestataires de services de paiement tiers. Nous ne stockons pas les données de carte de crédit. En effectuant un paiement, vous acceptez les conditions d'utilisation de ces prestataires de services.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Propriété intellectuelle</h2>
              <p>
                La Plateforme AgriMarket et tout son contenu, fonctionnalités et caractéristiques sont la propriété exclusive d'AgriMarket ou de ses concédants de licence. Notre Plateforme est protégée par le droit d'auteur, le droit des marques et d'autres lois en Côte d'Ivoire et à l'étranger.
              </p>
              <p className="mt-4">
                Vous ne pouvez pas reproduire, distribuer, modifier, créer des œuvres dérivées, afficher publiquement, exécuter publiquement, republier, télécharger, stocker ou transmettre tout matériel de notre Plateforme, sauf si cela est expressément permis par les présentes Conditions d'Utilisation.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Limitation de responsabilité</h2>
              <p>
                Dans toute la mesure permise par la loi applicable, AgriMarket, ses dirigeants, administrateurs, employés, agents et affiliés ne seront pas responsables des dommages indirects, spéciaux, accessoires, consécutifs ou punitifs de quelque nature que ce soit, résultant de votre accès ou de votre utilisation, ou de votre incapacité à accéder ou à utiliser, la Plateforme ou tout contenu sur la Plateforme.
              </p>
              <p className="mt-4">
                Notre responsabilité totale pour toutes les réclamations liées aux présentes Conditions d'Utilisation ne dépassera pas le montant que vous avez payé, le cas échéant, pour accéder à notre Plateforme au cours des douze (12) mois précédant la réclamation.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Indemnisation</h2>
              <p>
                Vous acceptez de défendre, d'indemniser et de dégager de toute responsabilité AgriMarket, ses affiliés, concédants de licence et prestataires de services, ainsi que leurs dirigeants, administrateurs, employés, contractants, agents et successeurs respectifs, contre toute réclamation, responsabilité, dommage, jugement, sentence, perte, coût, dépense ou frais (y compris les honoraires d'avocat raisonnables) résultant de ou liés à votre utilisation de la Plateforme en violation des présentes Conditions d'Utilisation.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">12. Modifications des conditions</h2>
              <p>
                Nous nous réservons le droit de modifier les présentes Conditions d'Utilisation à tout moment. Les conditions modifiées entreront en vigueur dès leur publication sur notre Plateforme. Votre utilisation continue de la Plateforme après la publication des Conditions d'Utilisation modifiées constitue votre acceptation de ces modifications.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">13. Résiliation</h2>
              <p>
                Nous pouvons résilier ou suspendre votre accès à notre Plateforme immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous enfreignez les présentes Conditions d'Utilisation.
              </p>
              <p className="mt-4">
                Toutes les dispositions des présentes Conditions d'Utilisation qui, par leur nature, devraient survivre à la résiliation, survivront à la résiliation, y compris, sans s'y limiter, les dispositions relatives à la propriété, les exclusions de garantie, l'indemnisation et les limitations de responsabilité.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">14. Droit applicable et règlement des litiges</h2>
              <p>
                Les présentes Conditions d'Utilisation sont régies et interprétées conformément aux lois de la Côte d'Ivoire, sans égard aux principes de conflit de lois.
              </p>
              <p className="mt-4">
                Tout litige découlant des présentes Conditions d'Utilisation ou lié à celles-ci sera soumis à la compétence exclusive des tribunaux d'Abidjan, Côte d'Ivoire.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">15. Contact</h2>
              <p>
                Si vous avez des questions concernant les présentes Conditions d'Utilisation, veuillez nous contacter à l'adresse suivante : legal@agrimarket.ci
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;

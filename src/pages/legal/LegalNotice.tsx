
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Separator } from "@/components/ui/separator";

const LegalNotice = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>
            <p className="text-gray-500 mb-8">Dernière mise à jour : 8 avril 2025</p>
            
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Informations légales</h2>
              <p>
                Le site web et l'application mobile AgriMarket sont édités par :
              </p>
              <p className="mt-4">
                <strong>AgriMarket</strong><br />
                Société à Responsabilité Limitée (SARL) au capital de 10.000.000 FCFA<br />
                Siège social : Plateau, Immeuble Palm Club, Abidjan, Côte d'Ivoire<br />
                RCCM : CI-ABJ-2023-B-21234<br />
                Numéro de TVA : CI23456789<br />
                Téléphone : +225 07 XX XX XX XX<br />
                Email : contact@agrimarket.ci
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Directeur de la publication</h2>
              <p>
                <strong>Directeur de la publication :</strong> Kouadio N'Guessan, Président Directeur Général<br />
                <strong>Contact :</strong> direction@agrimarket.ci
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Hébergement</h2>
              <p>
                Le site web d'AgriMarket est hébergé par :
              </p>
              <p className="mt-4">
                <strong>AWS (Amazon Web Services)</strong><br />
                Amazon Web Services, Inc.<br />
                410 Terry Ave North<br />
                Seattle, WA 98109-5210<br />
                United States<br />
                <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://aws.amazon.com</a>
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Propriété intellectuelle</h2>
              <p>
                Le contenu du site AgriMarket, incluant, sans limitation, les textes, graphismes, images, logos, vidéos, icônes et code source, est la propriété exclusive d'AgriMarket ou de ses partenaires et est protégé par les lois ivoiriennes et internationales relatives à la propriété intellectuelle.
              </p>
              <p className="mt-4">
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit d'AgriMarket. Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les articles 113 et suivants du Code de la Propriété Intellectuelle ivoirien.
              </p>
              <p className="mt-4">
                Le non-respect de cette interdiction constitue une contrefaçon pouvant engager la responsabilité civile et pénale du contrefacteur.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Protection des données personnelles</h2>
              <p>
                AgriMarket s'engage à protéger les données personnelles de ses utilisateurs conformément à la loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel en Côte d'Ivoire et aux autres réglementations applicables.
              </p>
              <p className="mt-4">
                Pour plus d'informations sur la manière dont nous collectons, utilisons et protégeons vos données, veuillez consulter notre <a href="/legal/privacy-policy" className="text-blue-600 hover:underline">Politique de confidentialité</a>.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer l'expérience utilisateur. Pour en savoir plus sur notre utilisation des cookies, veuillez consulter notre <a href="/legal/cookies" className="text-blue-600 hover:underline">Politique relative aux cookies</a>.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Conditions d'utilisation</h2>
              <p>
                L'utilisation du site AgriMarket implique l'acceptation pleine et entière des <a href="/legal/terms-of-service" className="text-blue-600 hover:underline">Conditions générales d'utilisation</a>.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Loi applicable et juridiction</h2>
              <p>
                Les présentes mentions légales sont régies par la loi ivoirienne. En cas de litige, les tribunaux d'Abidjan seront seuls compétents.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contacts</h2>
              <p>
                Pour toute question concernant les présentes mentions légales, vous pouvez nous contacter à l'adresse suivante :
              </p>
              <p className="mt-4">
                <strong>AgriMarket</strong><br />
                Service juridique<br />
                Plateau, Immeuble Palm Club<br />
                Abidjan, Côte d'Ivoire<br />
                Email : legal@agrimarket.ci
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalNotice;

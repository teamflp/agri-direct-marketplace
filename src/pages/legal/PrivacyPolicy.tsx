
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/contexts/AuthContext';
import { ShieldCheck, Download, Edit, Trash2, Cookie } from 'lucide-react';

const PrivacyPolicy = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigateToProfile = (tab: string) => {
    navigate('/buyer/profile', { state: { defaultTab: tab } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
            <p className="text-gray-500 mb-8">Dernière mise à jour : 8 avril 2025</p>

            {user && (
              <Card className="mb-12 bg-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-agrimarket-green" />
                    <span>Vos droits et contrôles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => handleNavigateToProfile('profile')}>
                    <Edit className="mr-2 h-4 w-4" /> Mettre à jour mon profil
                  </Button>
                  <Button variant="outline" onClick={() => handleNavigateToProfile('security')}>
                    <Download className="mr-2 h-4 w-4" /> Exporter mes données
                  </Button>
                  <Button variant="outline" onClick={() => handleNavigateToProfile('security')}>
                    <Trash2 className="mr-2 h-4 w-4" /> Supprimer mon compte
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/legal/cookies">
                      <Cookie className="mr-2 h-4 w-4" /> Gérer mes cookies
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <div className="prose prose-lg max-w-none">
              <p>
                Chez AgriMarket, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre plateforme.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Informations que nous collectons</h2>
              <p>
                Nous collectons plusieurs types d'informations vous concernant, notamment :
              </p>
              <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Informations que vous nous fournissez</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Informations d'identification : nom, prénom, adresse e-mail, numéro de téléphone.</li>
                <li>Informations de compte : nom d'utilisateur, mot de passe, préférences de compte.</li>
                <li>Informations de profil : photos, descriptions, informations sur votre exploitation agricole (pour les agriculteurs).</li>
                <li>Informations de transaction : détails des produits achetés, historique des commandes, informations de paiement.</li>
                <li>Communications : messages que vous échangez avec d'autres utilisateurs ou avec notre service client.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Informations collectées automatiquement</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Données d'utilisation : pages visitées, temps passé sur la plateforme, actions effectuées.</li>
                <li>Informations sur l'appareil : type d'appareil, système d'exploitation, navigateur, adresse IP.</li>
                <li>Données de localisation : avec votre consentement, nous pouvons collecter des données précises sur votre localisation pour vous proposer des agriculteurs à proximité.</li>
                <li>Cookies et technologies similaires : nous utilisons des cookies pour améliorer votre expérience sur notre plateforme. Pour en savoir plus et pour gérer vos préférences, consultez notre <Link to="/legal/cookies">Politique de gestion des cookies</Link>.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Comment nous utilisons vos informations</h2>
              <p>Nous utilisons les informations collectées pour :</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Fournir, maintenir et améliorer notre plateforme.</li>
                <li>Traiter vos transactions et gérer vos commandes.</li>
                <li>Vous permettre de communiquer avec d'autres utilisateurs de la plateforme.</li>
                <li>Vous envoyer des notifications concernant votre compte et vos commandes.</li>
                <li>Vous proposer un contenu personnalisé et des recommandations de produits.</li>
                <li>Analyser l'utilisation de notre plateforme pour l'améliorer.</li>
                <li>Détecter, prévenir et résoudre les problèmes techniques et de sécurité.</li>
                <li>Respecter nos obligations légales.</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Partage de vos informations</h2>
              <p>Nous pouvons partager vos informations avec :</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Autres utilisateurs</strong> : Certaines de vos informations sont visibles par d'autres utilisateurs de la plateforme (par exemple, votre profil public, vos avis).</li>
                <li><strong>Prestataires de services</strong> : Nous travaillons avec des prestataires de services tiers qui nous aident à exploiter notre plateforme (traitement des paiements, hébergement, analyses, etc.).</li>
                <li><strong>Partenaires commerciaux</strong> : Nous pouvons partager des informations avec nos partenaires commerciaux pour vous proposer certains services ou promotions.</li>
                <li><strong>Conformité légale</strong> : Nous pouvons divulguer vos informations si la loi l'exige ou si nous croyons de bonne foi que cette divulgation est nécessaire pour se conformer à la loi, protéger nos droits ou assurer votre sécurité.</li>
              </ul>
              <p>
                Nous ne vendons pas vos données personnelles à des tiers.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Conservation des données</h2>
              <p>
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les objectifs décrits dans cette politique de confidentialité, à moins qu'une période de conservation plus longue ne soit requise ou autorisée par la loi.
              </p>
              <p className="mt-4">
                Si vous demandez la suppression de votre compte, nous supprimerons vos données personnelles dans un délai raisonnable, sauf si leur conservation est nécessaire pour des raisons légales ou comptables.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'accès non autorisé, la divulgation, l'altération et la destruction. Ces mesures comprennent, sans s'y limiter, le chiffrement des données, le contrôle des accès et des procédures régulières d'audit de sécurité.
              </p>
              <p className="mt-4">
                Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Vos droits en matière de protection des données</h2>
              <p>
                Selon votre lieu de résidence, vous pouvez disposer de certains droits concernant vos données personnelles. Vous pouvez exercer la plupart de ces droits directement depuis votre profil utilisateur.
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><b>Droit d'accès et à la portabilité :</b> Vous pouvez demander une copie de vos données personnelles. <a href="#" onClick={() => handleNavigateToProfile('security')}>Cliquez ici pour exporter vos données</a>.</li>
                <li><b>Droit de rectification :</b> Vous pouvez modifier ou mettre à jour vos informations personnelles directement dans votre <a href="#" onClick={() => handleNavigateToProfile('profile')}>profil</a>.</li>
                <li><b>Droit à l'effacement (« droit à l'oubli ») :</b> Vous pouvez demander la suppression de votre compte et de vos données personnelles. <a href="#" onClick={() => handleNavigateToProfile('security')}>Cliquez ici pour supprimer votre compte</a>.</li>
                <li><b>Droit à la limitation du traitement et droit d'opposition :</b> Vous pouvez limiter l'utilisation de vos données, par exemple en gérant vos <a href="#" onClick={() => navigate('/buyer/profile', { state: { defaultTab: 'notifications' } })}>préférences de notification</a> ou vos <Link to="/legal/cookies">préférences de cookies</Link>.</li>
                <li><b>Droit de retirer votre consentement :</b> Pour les traitements basés sur le consentement (comme certains cookies ou la géolocalisation), vous pouvez retirer votre consentement à tout moment via les paramètres de votre compte ou de votre navigateur.</li>
              </ul>
              <p>
                Pour toute autre demande ou si vous ne parvenez pas à exercer vos droits via votre profil, vous pouvez nous contacter à privacy@agrimarket.ci. Nous traiterons votre demande conformément aux lois applicables et y répondrons dans un délai raisonnable.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Transferts internationaux de données</h2>
              <p>
                Vos données personnelles peuvent être transférées et traitées dans des pays autres que celui dans lequel vous résidez. Ces pays peuvent avoir des lois de protection des données différentes des lois de votre pays.
              </p>
              <p className="mt-4">
                Si nous transférons vos données personnelles à l'étranger, nous prendrons des mesures appropriées pour garantir que vos données personnelles bénéficient d'un niveau de protection adéquat, conformément à cette politique de confidentialité et aux lois applicables.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Enfants</h2>
              <p>
                Notre plateforme n'est pas destinée aux enfants de moins de 18 ans, et nous ne collectons pas sciemment des données personnelles auprès d'enfants de moins de 18 ans. Si vous êtes un parent ou un tuteur et que vous pensez que votre enfant nous a fourni des données personnelles, veuillez nous contacter pour que nous puissions prendre les mesures nécessaires.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications de cette politique de confidentialité</h2>
              <p>
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. La version à jour sera toujours disponible sur notre plateforme, et nous vous informerons des modifications importantes par e-mail ou par notification sur notre plateforme.
              </p>
              <p className="mt-4">
                Nous vous encourageons à consulter régulièrement cette politique de confidentialité pour rester informé des modifications.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact</h2>
              <p>
                Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou la façon dont nous traitons vos données personnelles, veuillez nous contacter à :
              </p>
              <p className="mt-4">
                <strong>E-mail:</strong> privacy@agrimarket.ci<br />
                <strong>Adresse postale:</strong> AgriMarket, Plateau, Immeuble Palm Club, Abidjan, Côte d'Ivoire
              </p>
              <p className="mt-4">
                Si vous n'êtes pas satisfait de la façon dont nous avons traité votre plainte, vous pouvez contacter l'autorité de protection des données compétente dans votre pays de résidence.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

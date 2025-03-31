
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Lock, CreditCard, CheckCircle2 } from 'lucide-react';

const SecuritySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Paiements Sécurisés</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous avons intégré les solutions de paiement les plus fiables et populaires pour vous offrir une expérience d'achat en toute sécurité.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-md bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Shield className="h-8 w-8 text-agrimarket-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Protection de vos Données</h3>
                  <p className="text-gray-600">
                    Toutes vos informations de paiement sont chiffrées et sécurisées. Nous ne stockons pas vos données bancaires sur nos serveurs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Lock className="h-8 w-8 text-agrimarket-green" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Transactions Sécurisées</h3>
                  <p className="text-gray-600">
                    Nos partenaires de paiement utilisent des protocoles de sécurité avancés pour protéger chaque transaction que vous effectuez.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Nos Méthodes de Paiement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">MTN</span>
              </div>
              <h4 className="font-bold mb-2">MTN Money</h4>
              <p className="text-gray-600 text-sm text-center">
                Payez facilement avec votre compte MTN Mobile Money.
              </p>
              <div className="mt-3">
                <Badge variant="success" className="text-xs">Vérification instantanée</Badge>
              </div>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">OM</span>
              </div>
              <h4 className="font-bold mb-2">Orange Money</h4>
              <p className="text-gray-600 text-sm text-center">
                Réglez vos achats rapidement avec Orange Money.
              </p>
              <div className="mt-3">
                <Badge variant="success" className="text-xs">Confirmation rapide</Badge>
              </div>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <span className="text-white font-bold text-lg">MV</span>
              </div>
              <h4 className="font-bold mb-2">Move</h4>
              <p className="text-gray-600 text-sm text-center">
                Effectuez vos paiements via l'application Move.
              </p>
              <div className="mt-3">
                <Badge variant="success" className="text-xs">Sans frais supplémentaires</Badge>
              </div>
            </div>
            
            <div className="flex flex-col items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-3">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold mb-2">Stripe</h4>
              <p className="text-gray-600 text-sm text-center">
                Payez par carte bancaire via notre partenaire Stripe.
              </p>
              <div className="mt-3">
                <Badge variant="success" className="text-xs">Protection acheteur</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-xl font-bold">Notre Engagement</h3>
          </div>
          <Separator className="mb-4" />
          <p className="text-center text-gray-700">
            AgriMarket s'engage à maintenir les normes de sécurité les plus élevées pour protéger vos informations et garantir des transactions sûres. 
            Nous effectuons régulièrement des audits de sécurité et utilisons des technologies de pointe pour assurer la protection de vos données.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;

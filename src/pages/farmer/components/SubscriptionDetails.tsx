
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SubscriptionType {
  plan: string;
  startDate: string;
  endDate: string;
  featuresUsed: {
    productsUsed: number;
    productsLimit: number;
    storageUsed: number;
    storageLimit: number;
    salesThisMonth: number;
    customersCount: number;
  }
}

interface SubscriptionDetailsProps {
  subscription: SubscriptionType;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ subscription }) => {
  // Calculate percentage for progress bars
  const productsPercentage = (subscription.featuresUsed.productsUsed / subscription.featuresUsed.productsLimit) * 100;
  const storagePercentage = (subscription.featuresUsed.storageUsed / subscription.featuresUsed.storageLimit) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails de l'abonnement</CardTitle>
        <CardDescription>
          Formule {subscription.plan} - Valable du {subscription.startDate} au {subscription.endDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-agrimarket-lightGreen p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-agrimarket-green font-medium">Formule Pro</h3>
            <Button variant="outline" className="text-agrimarket-green border-agrimarket-green hover:bg-agrimarket-green hover:text-white">
              Mettre à niveau
            </Button>
          </div>
          <p className="text-sm">
            Votre abonnement vous permet de publier jusqu'à 50 produits, de disposer de 500 Mo de stockage pour vos images, et d'accéder à toutes les fonctionnalités premium.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Produits utilisés</span>
              <span className="text-sm font-medium">
                {subscription.featuresUsed.productsUsed}/{subscription.featuresUsed.productsLimit}
              </span>
            </div>
            <Progress value={productsPercentage} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Stockage utilisé</span>
              <span className="text-sm font-medium">
                {subscription.featuresUsed.storageUsed} Mo/{subscription.featuresUsed.storageLimit} Mo
              </span>
            </div>
            <Progress value={storagePercentage} className="h-2" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Historique de paiement</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>01/01/2023</span>
                  <span className="font-medium">199.00 €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>01/01/2022</span>
                  <span className="font-medium">189.00 €</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Prochain paiement</h3>
              <div className="text-sm">
                <p>Date: <span className="font-medium">01/01/2024</span></p>
                <p>Montant: <span className="font-medium">199.00 €</span></p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Modifier moyen de paiement
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
          Annuler l'abonnement
        </Button>
        <Button className="bg-agrimarket-green hover:bg-agrimarket-green/90">
          Télécharger la facture
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionDetails;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, ShoppingBag, Apple } from 'lucide-react';

interface BuyerPersonalizedAdviceProps {
  recentPurchases?: Array<{
    id: string;
    name: string;
    category: string;
  }>;
}

const BuyerPersonalizedAdvice = ({ recentPurchases = [] }: BuyerPersonalizedAdviceProps) => {
  const hasProducts = recentPurchases.length > 0;

  return (
    <Card className="w-full">
      <CardHeader className="bg-amber-50 pb-2">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-600" />
          Conseils personnalisés
        </CardTitle>
        <CardDescription>
          Recommandations basées sur vos achats récents
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {hasProducts ? (
          <div className="space-y-4">
            {recentPurchases.map((product) => (
              <Card key={product.id} className="border border-amber-100">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Apple className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">{product.name}</h4>
                      <p className="text-gray-600">
                        {product.category === "Légumes" && 
                          "Conservez ce produit dans un endroit frais et sec. Idéal pour une soupe ou un ragoût."}
                        {product.category === "Fruits" && 
                          "Ce fruit est riche en vitamines. Consommez-le frais ou en compote pour préserver ses nutriments."}
                        {product.category === "Produits laitiers" && 
                          "Conservez au réfrigérateur. Idéal en accompagnement d'une planche apéritive."}
                        {!["Légumes", "Fruits", "Produits laitiers"].includes(product.category) && 
                          "Produit de qualité sélectionné par nos agriculteurs partenaires."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Alert className="bg-amber-50 border-amber-200">
            <ShoppingBag className="h-4 w-4 text-amber-600" />
            <AlertTitle>Aucun achat récent</AlertTitle>
            <AlertDescription>
              Effectuez des achats pour recevoir des conseils personnalisés sur l'utilisation et la conservation de vos produits.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default BuyerPersonalizedAdvice;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ShoppingCart, Users } from 'lucide-react';

const OptimizationTips: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conseils d'optimisation</CardTitle>
        <CardDescription>
          Basés sur l'analyse de vos données de vente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium flex items-center text-blue-700">
              <Clock className="h-5 w-5 mr-2" />
              Meilleur moment pour vendre
            </h3>
            <p className="mt-2 text-sm">
              Vos ventes sont plus élevées le week-end, particulièrement le samedi. 
              Envisagez d'organiser des promotions ou des événements spéciaux ces jours-là.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium flex items-center text-green-700">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Produits populaires
            </h3>
            <p className="mt-2 text-sm">
              Les fraises et les tomates sont vos produits les plus vendus. 
              Assurez-vous d'en avoir suffisamment en stock et envisagez d'élargir cette gamme.
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg">
            <h3 className="font-medium flex items-center text-amber-700">
              <Users className="h-5 w-5 mr-2" />
              Opportunités géographiques
            </h3>
            <p className="mt-2 text-sm">
              La majorité de vos clients sont à Dakar et Thiès. 
              Envisagez des livraisons gratuites ou des points de vente dans ces zones.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptimizationTips;

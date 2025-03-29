
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Ventes totales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">31 420 FCFA</div>
          <div className="flex items-center text-sm mt-2 text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+8.2% vs période précédente</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Nombre de commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">128</div>
          <div className="flex items-center text-sm mt-2 text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>+12.5% vs période précédente</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Panier moyen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">2 455 FCFA</div>
          <div className="flex items-center text-sm mt-2 text-red-600">
            <TrendingDown className="h-4 w-4 mr-1" />
            <span>-3.1% vs période précédente</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;

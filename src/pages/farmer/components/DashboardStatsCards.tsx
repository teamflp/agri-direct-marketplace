
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatsProps {
  salesThisMonth: number;
  customersCount: number;
  productsCount: number;
}

const DashboardStatsCards: React.FC<StatsProps> = ({ 
  salesThisMonth, 
  customersCount, 
  productsCount 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 mb-1">Ventes ce mois</p>
            <h3 className="text-3xl font-bold text-agrimarket-green">
              {salesThisMonth}
            </h3>
            <p className="text-green-600 flex items-center mt-2">
              <ArrowUp className="w-4 h-4 mr-1" /> 12% vs mois dernier
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 mb-1">Clients actifs</p>
            <h3 className="text-3xl font-bold text-agrimarket-green">
              {customersCount}
            </h3>
            <p className="text-green-600 flex items-center mt-2">
              <ArrowUp className="w-4 h-4 mr-1" /> 5% vs mois dernier
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 mb-1">Produits en stock</p>
            <h3 className="text-3xl font-bold text-agrimarket-green">
              {productsCount}
            </h3>
            <p className="text-red-600 flex items-center mt-2">
              <ArrowDown className="w-4 h-4 mr-1" /> 2 en rupture
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStatsCards;

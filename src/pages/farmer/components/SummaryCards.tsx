
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardsProps {
  periodFilter: string;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ periodFilter }) => {
  // Different data based on the period filter
  const periodData = {
    week: {
      totalSales: '12 750 FCFA',
      growthSales: '+4.8%',
      orders: '42',
      growthOrders: '+7.1%',
      avgBasket: '2 180 FCFA',
      growthBasket: '+1.4%',
      isSalesPositive: true,
      isOrdersPositive: true,
      isBasketPositive: true
    },
    month: {
      totalSales: '31 420 FCFA',
      growthSales: '+8.2%',
      orders: '128',
      growthOrders: '+12.5%',
      avgBasket: '2 455 FCFA',
      growthBasket: '-3.1%',
      isSalesPositive: true,
      isOrdersPositive: true,
      isBasketPositive: false
    },
    year: {
      totalSales: '341 580 FCFA',
      growthSales: '+15.7%',
      orders: '1 405',
      growthOrders: '+18.2%',
      avgBasket: '2 430 FCFA',
      growthBasket: '-2.4%',
      isSalesPositive: true,
      isOrdersPositive: true,
      isBasketPositive: false
    }
  };

  const data = periodData[periodFilter as keyof typeof periodData] || periodData.month;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Ventes totales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{data.totalSales}</div>
          <div className={`flex items-center text-sm mt-2 ${data.isSalesPositive ? 'text-green-600' : 'text-red-600'}`}>
            {data.isSalesPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{data.growthSales} vs période précédente</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Nombre de commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{data.orders}</div>
          <div className={`flex items-center text-sm mt-2 ${data.isOrdersPositive ? 'text-green-600' : 'text-red-600'}`}>
            {data.isOrdersPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{data.growthOrders} vs période précédente</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Panier moyen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{data.avgBasket}</div>
          <div className={`flex items-center text-sm mt-2 ${data.isBasketPositive ? 'text-green-600' : 'text-red-600'}`}>
            {data.isBasketPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            <span>{data.growthBasket} vs période précédente</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;

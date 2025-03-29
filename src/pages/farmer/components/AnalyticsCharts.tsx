
import React from 'react';
import DashboardChart from '@/components/charts/DashboardChart';

interface AnalyticsChartsProps {
  monthlySalesData: any[];
  productSalesData: any[];
  customerLocationData: any[];
  weekdaySalesData: any[];
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  monthlySalesData,
  productSalesData,
  customerLocationData,
  weekdaySalesData
}) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Ventes mensuelles"
          description="Évolution du chiffre d'affaires par mois"
          type="line"
          data={monthlySalesData}
          xAxisKey="month"
          yAxisKey="ventes"
          formatter={(value) => `${value.toLocaleString()} FCFA`}
          height={300}
        />

        <DashboardChart
          title="Ventes par produit"
          description="Répartition des ventes par produit"
          type="bar"
          data={productSalesData}
          xAxisKey="name"
          yAxisKey="ventes"
          formatter={(value) => `${value} unités`}
          height={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Répartition géographique des clients"
          description="D'où viennent vos clients"
          type="pie"
          data={customerLocationData}
          xAxisKey="location"
          yAxisKey="clients"
          formatter={(value) => `${value} clients`}
          height={300}
        />

        <DashboardChart
          title="Ventes par jour de la semaine"
          description="Quels jours sont les plus actifs pour vos ventes"
          type="area"
          data={weekdaySalesData}
          xAxisKey="jour"
          yAxisKey="ventes"
          formatter={(value) => `${value} commandes`}
          height={300}
        />
      </div>
    </>
  );
};

export default AnalyticsCharts;

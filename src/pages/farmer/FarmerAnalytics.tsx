
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardChart from '@/components/charts/DashboardChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Download, Calendar, FileText, MessageSquare, Users, Clock, ShoppingCart, User } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

// Données fictives pour les graphiques
const monthlySalesData = [
  { month: 'Jan', ventes: 12500 },
  { month: 'Fév', ventes: 18700 },
  { month: 'Mar', ventes: 15400 },
  { month: 'Avr', ventes: 21000 },
  { month: 'Mai', ventes: 24800 },
  { month: 'Juin', ventes: 22500 },
  { month: 'Juil', ventes: 28700 },
  { month: 'Août', ventes: 31200 },
  { month: 'Sep', ventes: 29800 },
];

const productSalesData = [
  { name: 'Tomates Bio', ventes: 145 },
  { name: 'Salade', ventes: 87 },
  { name: 'Carottes', ventes: 112 },
  { name: 'Fraises', ventes: 198 },
  { name: 'Courgettes', ventes: 65 },
];

const customerLocationData = [
  { location: 'Dakar', clients: 42 },
  { location: 'Thiès', clients: 28 },
  { location: 'Saint-Louis', clients: 15 },
  { location: 'Ziguinchor', clients: 8 },
  { location: 'Autres', clients: 12 },
];

const weekdaySalesData = [
  { jour: 'Lun', ventes: 32 },
  { jour: 'Mar', ventes: 25 },
  { jour: 'Mer', ventes: 37 },
  { jour: 'Jeu', ventes: 45 },
  { jour: 'Ven', ventes: 52 },
  { jour: 'Sam', ventes: 78 },
  { jour: 'Dim', ventes: 15 },
];

const FarmerAnalytics = () => {
  const { toast } = useToast();
  const [periodFilter, setPeriodFilter] = useState('month');
  
  const handleDownloadReport = (format: string) => {
    toast({
      title: `Rapport ${format.toUpperCase()} téléchargé`,
      description: `Le rapport d'analyse a été téléchargé au format ${format.toUpperCase()}`,
    });
  };
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User size={20} /> },
    { title: "Produits", path: "/farmer-dashboard/products", icon: <ShoppingCart size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <Users size={20} /> },
    { title: "Messages", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Analyses", path: "/farmer-dashboard/analytics", icon: <FileText size={20} /> },
    { title: "Abonnement", path: "/farmer-dashboard/subscription", icon: <Calendar size={20} /> },
  ];

  return (
    <DashboardLayout
      name="Ferme des Quatre Saisons"
      email="ferme4saisons@email.com"
      avatar={
        <div className="bg-agrimarket-green text-white text-xl font-semibold flex items-center justify-center h-full">
          FQ
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Analyses des ventes</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Tabs
              value={periodFilter}
              onValueChange={setPeriodFilter}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="week">Semaine</TabsTrigger>
                <TabsTrigger value="month">Mois</TabsTrigger>
                <TabsTrigger value="year">Année</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              variant="outline"
              className="flex gap-2"
              onClick={() => handleDownloadReport('pdf')}
            >
              <Download className="h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

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
      </div>
    </DashboardLayout>
  );
};

export default FarmerAnalytics;


import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Users,
  MessageSquare,
  FileText,
  Settings,
  ShieldAlert,
  Landmark,
  CreditCard,
  BarChart4,
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Printer,
  Mail,
  Share2
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

// Mock data for reports
const userGrowthData = [
  { month: 'Jan', utilisateurs: 120, agriculteurs: 35 },
  { month: 'Fév', utilisateurs: 150, agriculteurs: 42 },
  { month: 'Mar', utilisateurs: 180, agriculteurs: 48 },
  { month: 'Avr', utilisateurs: 210, agriculteurs: 52 },
  { month: 'Mai', utilisateurs: 250, agriculteurs: 58 },
  { month: 'Juin', utilisateurs: 290, agriculteurs: 65 },
  { month: 'Juil', utilisateurs: 310, agriculteurs: 72 },
  { month: 'Août', utilisateurs: 340, agriculteurs: 78 },
  { month: 'Sep', utilisateurs: 380, agriculteurs: 85 },
];

const salesByRegionData = [
  { region: 'Dakar', value: 35 },
  { region: 'Thiès', value: 25 },
  { region: 'Saint-Louis', value: 15 },
  { region: 'Fatick', value: 10 },
  { region: 'Kaolack', value: 8 },
  { region: 'Autres', value: 7 },
];

const salesByCategoryData = [
  { name: 'Fruits', value: 28 },
  { name: 'Légumes', value: 35 },
  { name: 'Miel', value: 10 },
  { name: 'Produits laitiers', value: 15 },
  { name: 'Huiles', value: 12 },
];

const monthlySalesData = [
  { month: 'Jan', ventes: 320000 },
  { month: 'Fév', ventes: 400000 },
  { month: 'Mar', ventes: 550000 },
  { month: 'Avr', ventes: 620000 },
  { month: 'Mai', ventes: 680000 },
  { month: 'Juin', ventes: 750000 },
  { month: 'Juil', ventes: 820000 },
  { month: 'Août', ventes: 900000 },
  { month: 'Sep', ventes: 950000 },
];

const topSellingProductsData = [
  { 
    id: 1,
    name: "Panier de légumes bio",
    farmer: "Ferme des Quatre Saisons",
    sales: 352,
    revenue: 5754600,
    growth: 12.5
  },
  { 
    id: 2,
    name: "Miel de fleurs sauvages",
    farmer: "Les Ruches de Marie",
    sales: 267,
    revenue: 1495200,
    growth: 8.2
  },
  { 
    id: 3,
    name: "Fromage de chèvre frais",
    farmer: "Chèvrerie du Vallon",
    sales: 215,
    revenue: 591250,
    growth: -3.1
  },
  { 
    id: 4,
    name: "Huile d'olive extra vierge",
    farmer: "Oliveraie Sunlight",
    sales: 198,
    revenue: 2142360,
    growth: 15.3
  },
  { 
    id: 5,
    name: "Œufs fermiers",
    farmer: "Potager du Village",
    sales: 176,
    revenue: 563200,
    growth: 5.7
  },
];

const yearlyRevenueData = [
  { year: '2020', revenue: 4250000 },
  { year: '2021', revenue: 6800000 },
  { year: '2022', revenue: 8500000 },
  { year: '2023', revenue: 11250000, predicted: true },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const AdminReports = () => {
  const [periodFilter, setPeriodFilter] = useState<string>("month");
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Dashboard", path: "/admin-dashboard", icon: <BarChart4 size={20} /> },
    { title: "Utilisateurs", path: "/admin-dashboard/users", icon: <Users size={20} /> },
    { title: "Agriculteurs", path: "/admin-dashboard/farmers", icon: <User size={20} /> },
    { title: "Messages", path: "/admin-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Litiges", path: "/admin-dashboard/disputes", icon: <ShieldAlert size={20} /> },
    { title: "Abonnements", path: "/admin-dashboard/subscriptions", icon: <CreditCard size={20} /> },
    { title: "Finances", path: "/admin-dashboard/finances", icon: <Landmark size={20} /> },
    { title: "Rapports", path: "/admin-dashboard/reports", icon: <FileText size={20} /> },
  ];
  
  const handleDownloadReport = (format: string) => {
    toast({
      title: `Rapport ${format.toUpperCase()} généré`,
      description: `Le rapport ${periodFilter === 'month' ? 'mensuel' : 'annuel'} a été téléchargé au format ${format.toUpperCase()}`,
    });
  };
  
  const handlePrintReport = () => {
    toast({
      title: "Impression lancée",
      description: "Le rapport va être imprimé sur votre imprimante par défaut",
    });
  };
  
  const handleEmailReport = () => {
    toast({
      title: "Rapport envoyé par email",
      description: "Le rapport a été envoyé à votre adresse email",
    });
  };
  
  const handleShareReport = () => {
    toast({
      title: "Partage de rapport",
      description: "Le lien du rapport a été copié dans le presse-papier",
    });
  };

  return (
    <DashboardLayout
      name="Admin AgriMarket"
      email="admin@agrimarket.com"
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          AM
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Rapports</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Tabs
              value={periodFilter}
              onValueChange={setPeriodFilter}
              className="w-[200px]"
            >
              <TabsList className="w-full">
                <TabsTrigger value="month" className="flex-1">Mois</TabsTrigger>
                <TabsTrigger value="year" className="flex-1">Année</TabsTrigger>
              </TabsList>
            </Tabs>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="default"
                  className="bg-agrimarket-green hover:bg-green-700 flex gap-2"
                >
                  <Download className="h-4 w-4" />
                  Exporter
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Format d'export</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDownloadReport('pdf')}>
                  <FileText className="h-4 w-4 mr-2" /> PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadReport('csv')}>
                  <FileText className="h-4 w-4 mr-2" /> CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadReport('xlsx')}>
                  <FileText className="h-4 w-4 mr-2" /> Excel
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePrintReport}>
                  <Printer className="h-4 w-4 mr-2" /> Imprimer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEmailReport}>
                  <Mail className="h-4 w-4 mr-2" /> Envoyer par email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShareReport}>
                  <Share2 className="h-4 w-4 mr-2" /> Partager
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">380</div>
              <div className="flex items-center text-sm mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+11.8% vs période précédente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total agriculteurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">85</div>
              <div className="flex items-center text-sm mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+9.0% vs période précédente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1 208</div>
              <div className="flex items-center text-sm mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+5.5% vs période précédente</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Chiffre d'affaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">10.5M FCFA</div>
              <div className="flex items-center text-sm mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+7.2% vs période précédente</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Croissance des utilisateurs</CardTitle>
              <CardDescription>
                Évolution du nombre d'utilisateurs et d'agriculteurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={userGrowthData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone"
                      dataKey="utilisateurs"
                      name="Utilisateurs"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone"
                      dataKey="agriculteurs"
                      name="Agriculteurs"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ventes mensuelles</CardTitle>
              <CardDescription>
                Évolution du chiffre d'affaires des ventes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlySalesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('fr-FR').format(value as number) + ' FCFA'} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="ventes" 
                      name="Ventes" 
                      stroke="#0ea5e9" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ventes par région</CardTitle>
              <CardDescription>
                Répartition des ventes par région géographique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByRegionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="region"
                      label={({ region, percent }) => `${region}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {salesByRegionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ventes par catégorie</CardTitle>
              <CardDescription>
                Répartition des ventes par catégorie de produit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {salesByCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chiffre d'affaires annuel</CardTitle>
              <CardDescription>
                Évolution du chiffre d'affaires par année
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={yearlyRevenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('fr-FR').format(value as number) + ' FCFA'} />
                    <Legend />
                    <Bar 
                      dataKey="revenue" 
                      name="Chiffre d'affaires" 
                      fill={COLORS[0]}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produits les plus vendus</CardTitle>
            <CardDescription>
              Les produits les plus populaires sur la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rang</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Agriculteur</TableHead>
                  <TableHead>Unités vendues</TableHead>
                  <TableHead>Chiffre d'affaires</TableHead>
                  <TableHead>Évolution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingProductsData.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>#{index + 1}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.farmer}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>{product.revenue.toLocaleString()} FCFA</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${
                        product.growth > 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {product.growth > 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span>{product.growth > 0 ? '+' : ''}{product.growth}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;

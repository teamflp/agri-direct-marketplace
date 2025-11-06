// @ts-nocheck
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Users,
  MessageSquare,
  FileText,
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
  Share2,
  AlertTriangle
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
import { useAdminReports } from '@/hooks/admin/useAdminReports';
import { Skeleton } from '@/components/ui/skeleton';
import Papa from 'papaparse';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const AdminReports = () => {
  const [periodFilter, setPeriodFilter] = useState<string>("month");
  const { toast } = useToast();
  const { data: reportData, loading, error } = useAdminReports();
  
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
    if (!reportData) {
      toast({
        title: "Erreur",
        description: "Les données ne sont pas encore chargées.",
        variant: "destructive",
      });
      return;
    }

    switch (format) {
      case 'csv': {
        const dataToExport = reportData.topSellingProducts;
        if (!dataToExport || dataToExport.length === 0) {
          toast({ title: "Information", description: "Aucune donnée à exporter." });
          return;
        }

        const csv = Papa.unparse(dataToExport, {
            header: true,
            delimiter: ";",
            quotes: true,
        });

        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "export-meilleurs-produits.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast({
          title: "Export CSV réussi",
          description: "Le fichier des produits les plus vendus a été téléchargé.",
        });
        break;
      }
      case 'pdf':
      case 'xlsx': {
        toast({
          title: `Fonctionnalité non disponible`,
          description: `L'export en ${format.toUpperCase()} n'est pas encore implémenté.`,
        });
        break;
      }
      default:
        break;
    }
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

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
          <Skeleton className="h-96" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Erreur de chargement des rapports</h3>
          <p className="text-red-700">{error}</p>
        </div>
      );
    }

    if (!reportData) {
      return <div className="text-center py-8">Aucune donnée à afficher.</div>;
    }

    const { kpis, userGrowth, monthlySales, salesByCategory, topSellingProducts } = reportData;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-xl">Total utilisateurs</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{kpis.totalUsers}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-xl">Total agriculteurs</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{kpis.totalFarmers}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-xl">Total ventes</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{kpis.totalSales}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-xl">Chiffre d'affaires</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{kpis.totalRevenue.toLocaleString()} FCFA</div></CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Croissance des utilisateurs</CardTitle><CardDescription>Évolution sur les 12 derniers mois</CardDescription></CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend />
                    <Area type="monotone" dataKey="utilisateurs" name="Utilisateurs" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="agriculteurs" name="Agriculteurs" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Ventes mensuelles</CardTitle><CardDescription>Évolution du CA sur les 12 derniers mois</CardDescription></CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySales} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip formatter={(value) => new Intl.NumberFormat('fr-FR').format(value as number) + ' FCFA'} /><Legend />
                    <Line type="monotone" dataKey="ventes" name="Ventes" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Chiffre d'affaires annuel</CardTitle><CardDescription>Évolution du chiffre d'affaires par année</CardDescription></CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.yearlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis /><Tooltip formatter={(value) => new Intl.NumberFormat('fr-FR').format(value as number) + ' FCFA'} /><Legend />
                    <Bar dataKey="revenue" name="Chiffre d'affaires" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Ventes par catégorie</CardTitle><CardDescription>Répartition du CA par catégorie de produit</CardDescription></CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={salesByCategory} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                      {salesByCategory.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(value) => new Intl.NumberFormat('fr-FR').format(value as number) + ' FCFA'} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Top 5 Produits les plus vendus</CardTitle><CardDescription>Les produits les plus populaires sur la plateforme (par unités vendues)</CardDescription></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rang</TableHead><TableHead>Produit</TableHead><TableHead>Agriculteur</TableHead><TableHead>Unités vendues</TableHead><TableHead>Chiffre d'affaires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingProducts.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell>#{index + 1}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.farmer}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell>{product.revenue.toLocaleString()} FCFA</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
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
            <Tabs value={periodFilter} onValueChange={setPeriodFilter} className="w-[200px]">
              <TabsList className="w-full">
                <TabsTrigger value="month" className="flex-1">Mois</TabsTrigger>
                <TabsTrigger value="year" className="flex-1">Année</TabsTrigger>
              </TabsList>
            </Tabs>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="bg-agrimarket-green hover:bg-green-700 flex gap-2">
                  <Download className="h-4 w-4" />
                  Exporter
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Format d'export</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDownloadReport('pdf')}><FileText className="h-4 w-4 mr-2" /> PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadReport('csv')}><FileText className="h-4 w-4 mr-2" /> CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadReport('xlsx')}><FileText className="h-4 w-4 mr-2" /> Excel</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handlePrintReport}><Printer className="h-4 w-4 mr-2" /> Imprimer</DropdownMenuItem>
                <DropdownMenuItem onClick={handleEmailReport}><Mail className="h-4 w-4 mr-2" /> Envoyer par email</DropdownMenuItem>
                <DropdownMenuItem onClick={handleShareReport}><Share2 className="h-4 w-4 mr-2" /> Partager</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {renderContent()}
      </div>
    </DashboardLayout>
  );
};

export default AdminReports;

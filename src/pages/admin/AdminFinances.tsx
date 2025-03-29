
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
  Search,
  ArrowUpDown,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar
} from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
} from 'recharts';
import { useToast } from '@/hooks/use-toast';

// Mock data for transactions
const transactions = [
  {
    id: "TRX-2023-001",
    type: "Abonnement",
    farmer: "Sophie Dubois (Ferme des Quatre Saisons)",
    amount: 32700,
    fee: 1635,
    date: "15/09/2023",
    status: "Réussi",
    method: "Carte bancaire"
  },
  {
    id: "TRX-2023-002",
    type: "Vente",
    farmer: "Jean Leclerc (Les Ruches de Marie)",
    amount: 25800,
    fee: 1290,
    date: "16/09/2023",
    status: "Réussi",
    method: "Mobile Money"
  },
  {
    id: "TRX-2023-003",
    type: "Abonnement",
    farmer: "Michel Blanc (Potager du Village)",
    amount: 13050,
    fee: 652,
    date: "18/09/2023",
    status: "Échoué",
    method: "Carte bancaire"
  },
  {
    id: "TRX-2023-004",
    type: "Vente",
    farmer: "Marie Lambert (Ferme des Collines)",
    amount: 42500,
    fee: 2125,
    date: "20/09/2023",
    status: "Réussi",
    method: "Carte bancaire"
  },
  {
    id: "TRX-2023-005",
    type: "Abonnement",
    farmer: "Thomas Petit (Oliveraie Sunlight)",
    amount: 32700,
    fee: 1635,
    date: "22/09/2023",
    status: "Réussi",
    method: "Mobile Money"
  },
  {
    id: "TRX-2023-006",
    type: "Vente",
    farmer: "Sophie Dubois (Ferme des Quatre Saisons)",
    amount: 18500,
    fee: 925,
    date: "24/09/2023",
    status: "Réussi",
    method: "Carte bancaire"
  },
  {
    id: "TRX-2023-007",
    type: "Vente",
    farmer: "Jean Leclerc (Les Ruches de Marie)",
    amount: 9350,
    fee: 467,
    date: "26/09/2023",
    status: "Réussi",
    method: "Carte bancaire"
  },
  {
    id: "TRX-2023-008",
    type: "Vente",
    farmer: "Michel Blanc (Potager du Village)",
    amount: 15000,
    fee: 750,
    date: "28/09/2023",
    status: "Remboursé",
    method: "Mobile Money"
  }
];

// Mock data for charts
const monthlyRevenueData = [
  { month: 'Jan', abonnements: 125000, ventes: 320000 },
  { month: 'Fév', abonnements: 180000, ventes: 400000 },
  { month: 'Mar', abonnements: 250000, ventes: 550000 },
  { month: 'Avr', abonnements: 290000, ventes: 620000 },
  { month: 'Mai', abonnements: 320000, ventes: 680000 },
  { month: 'Juin', abonnements: 350000, ventes: 750000 },
  { month: 'Juil', abonnements: 380000, ventes: 820000 },
  { month: 'Août', abonnements: 400000, ventes: 900000 },
  { month: 'Sep', abonnements: 430000, ventes: 950000 },
];

const paymentMethodsData = [
  { name: 'Carte bancaire', value: 65 },
  { name: 'Mobile Money', value: 30 },
  { name: 'Transfert bancaire', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminFinances = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         transaction.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter ? transaction.type === typeFilter : true;
    const matchesStatus = statusFilter ? transaction.status === statusFilter : true;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Calculate financial metrics
  const totalRevenue = transactions
    .filter(t => t.status === "Réussi")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalFees = transactions
    .filter(t => t.status === "Réussi")
    .reduce((sum, t) => sum + t.fee, 0);
    
  const totalSubscriptionRevenue = transactions
    .filter(t => t.status === "Réussi" && t.type === "Abonnement")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalSalesRevenue = transactions
    .filter(t => t.status === "Réussi" && t.type === "Vente")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const handleDownloadReport = (format: string) => {
    toast({
      title: `Rapport ${format.toUpperCase()} généré`,
      description: `Le rapport financier a été téléchargé au format ${format.toUpperCase()}`,
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
          <h1 className="text-3xl font-bold">Finances</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={dateFilter || ""} onValueChange={(value) => setDateFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {dateFilter || "Période"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les périodes</SelectItem>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois-ci</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              className="inline-flex items-center gap-2"
              onClick={() => handleDownloadReport('csv')}
            >
              <Download className="h-4 w-4" />
              Exporter CSV
            </Button>
            <Button 
              variant="outline" 
              className="inline-flex items-center gap-2"
              onClick={() => handleDownloadReport('pdf')}
            >
              <Download className="h-4 w-4" />
              Exporter PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Revenu total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-agrimarket-green">
                {totalRevenue.toLocaleString()} FCFA
              </div>
              <div className="flex items-center text-sm mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+12.5% vs mois précédent</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Commissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-agrimarket-orange">
                {totalFees.toLocaleString()} FCFA
              </div>
              <div className="flex items-center text-sm mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+8.2% vs mois précédent</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Abonnements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {totalSubscriptionRevenue.toLocaleString()} FCFA
              </div>
              <div className="flex items-center text-sm mt-2 text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+15.3% vs mois précédent</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Ventes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {totalSalesRevenue.toLocaleString()} FCFA
              </div>
              <div className="flex items-center text-sm mt-2 text-red-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span>-3.1% vs mois précédent</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Évolution des revenus</CardTitle>
              <CardDescription>
                Revenus mensuels des abonnements et des ventes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyRevenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => new Intl.NumberFormat('fr-FR').format(value as number) + ' FCFA'} 
                    />
                    <Legend />
                    <Bar dataKey="abonnements" name="Abonnements" fill="#9333ea" barSize={30} />
                    <Bar dataKey="ventes" name="Ventes" fill="#0ea5e9" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Méthodes de paiement</CardTitle>
              <CardDescription>
                Répartition des méthodes de paiement utilisées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentMethodsData.map((entry, index) => (
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
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Historique des transactions sur la plateforme
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter || ""} onValueChange={(value) => setTypeFilter(value || null)}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      {typeFilter || "Type"}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les types</SelectItem>
                    <SelectItem value="Abonnement">Abonnement</SelectItem>
                    <SelectItem value="Vente">Vente</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      {statusFilter || "Statut"}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les statuts</SelectItem>
                    <SelectItem value="Réussi">Réussi</SelectItem>
                    <SelectItem value="Échoué">Échoué</SelectItem>
                    <SelectItem value="Remboursé">Remboursé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="pt-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Rechercher une transaction..."
                  className="pl-8 pr-4"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Agriculteur</TableHead>
                  <TableHead>Montant <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucune transaction trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          transaction.type === "Abonnement" 
                            ? "bg-purple-100 text-purple-800 border-purple-200" 
                            : "bg-blue-100 text-blue-800 border-blue-200"
                        }>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.farmer}</TableCell>
                      <TableCell>{transaction.amount.toLocaleString()} FCFA</TableCell>
                      <TableCell>{transaction.fee.toLocaleString()} FCFA</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === "Réussi" 
                            ? "bg-green-100 text-green-800" 
                            : transaction.status === "Échoué"
                            ? "bg-red-100 text-red-800"
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminFinances;

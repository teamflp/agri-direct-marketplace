
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
  Plus,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  Filter
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

// Mock data for farmers
const farmers = [
  {
    id: 1,
    name: "Sophie Dubois",
    farm: "Ferme des Quatre Saisons",
    email: "sophie.d@email.com",
    phone: "+221 77 123 45 67",
    subscription: "Premium",
    revenue: 1250000,
    products: 28,
    status: "Vérifié",
    joinDate: "15/03/2023",
    location: "Région de Thiès"
  },
  {
    id: 2,
    name: "Jean Leclerc",
    farm: "Les Ruches de Marie",
    email: "jean.l@email.com",
    phone: "+221 78 234 56 78",
    subscription: "Pro",
    revenue: 680000,
    products: 12,
    status: "En attente",
    joinDate: "05/09/2022",
    location: "Région de Saint-Louis"
  },
  {
    id: 3,
    name: "Michel Blanc",
    farm: "Potager du Village",
    email: "michel.b@email.com",
    phone: "+221 76 345 67 89",
    subscription: "Basic",
    revenue: 320000,
    products: 7,
    status: "Vérifié",
    joinDate: "20/06/2023",
    location: "Région de Dakar"
  },
  {
    id: 4,
    name: "Marie Lambert",
    farm: "Ferme des Collines",
    email: "marie.l@email.com",
    phone: "+221 70 456 78 90",
    subscription: "Pro",
    revenue: 890000,
    products: 15,
    status: "Vérifié",
    joinDate: "10/01/2023",
    location: "Région de Fatick"
  },
  {
    id: 5,
    name: "Thomas Petit",
    farm: "Oliveraie Sunlight",
    email: "thomas.p@email.com",
    phone: "+221 75 567 89 01",
    subscription: "Premium",
    revenue: 1450000,
    products: 20,
    status: "Suspendu",
    joinDate: "25/04/2022",
    location: "Région de Kaolack"
  }
];

const AdminFarmers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<null | typeof farmers[0]>(null);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
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

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         farmer.farm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubscription = subscriptionFilter ? farmer.subscription === subscriptionFilter : true;
    const matchesStatus = statusFilter ? farmer.status === statusFilter : true;
    
    return matchesSearch && matchesSubscription && matchesStatus;
  });
  
  const openVerifyDialog = (farmer: typeof farmers[0]) => {
    setSelectedFarmer(farmer);
    setShowVerifyDialog(true);
  };
  
  const openSuspendDialog = (farmer: typeof farmers[0]) => {
    setSelectedFarmer(farmer);
    setShowSuspendDialog(true);
  };
  
  const handleVerifyFarmer = () => {
    if (selectedFarmer) {
      toast({
        title: "Agriculteur vérifié",
        description: `${selectedFarmer.farm} (${selectedFarmer.name}) a été vérifié avec succès`,
        variant: "default",
      });
      setShowVerifyDialog(false);
      // Dans une vraie app, mise à jour de l'état
    }
  };
  
  const handleSuspendFarmer = () => {
    if (selectedFarmer) {
      toast({
        title: selectedFarmer.status === "Suspendu" ? "Agriculteur réactivé" : "Agriculteur suspendu",
        description: selectedFarmer.status === "Suspendu" 
          ? `${selectedFarmer.farm} a été réactivé avec succès` 
          : `${selectedFarmer.farm} a été suspendu avec succès`,
        variant: "default",
      });
      setShowSuspendDialog(false);
      // Dans une vraie app, mise à jour de l'état
    }
  };
  
  const handleEditFarmer = (farmerId: number) => {
    toast({
      title: "Édition d'agriculteur",
      description: `Redirection vers la page d'édition de l'agriculteur ID: ${farmerId}`,
    });
    // Dans une vraie app, redirection vers la page d'édition
  };
  
  const handleViewFarmer = (farmerId: number) => {
    toast({
      title: "Profil agriculteur",
      description: `Affichage du profil de l'agriculteur ID: ${farmerId}`,
    });
    // Dans une vraie app, redirection vers la page de profil
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
          <h1 className="text-3xl font-bold">Gestion des agriculteurs</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher un agriculteur..."
                className="pl-8 pr-4"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Select value={subscriptionFilter || ""} onValueChange={(value) => setSubscriptionFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {subscriptionFilter || "Abonnement"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les abonnements</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
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
                <SelectItem value="Vérifié">Vérifié</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Suspendu">Suspendu</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-agrimarket-green hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Ajouter
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des agriculteurs</CardTitle>
            <CardDescription>
              Gérez les agriculteurs de la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Exploitation <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
                  <TableHead>Propriétaire</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Abonnement</TableHead>
                  <TableHead>Revenus</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFarmers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucun agriculteur trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFarmers.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell>{farmer.id}</TableCell>
                      <TableCell className="font-medium">{farmer.farm}</TableCell>
                      <TableCell>{farmer.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{farmer.email}</div>
                          <div className="text-gray-500">{farmer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          farmer.subscription === "Premium" 
                            ? "bg-purple-100 text-purple-800" 
                            : farmer.subscription === "Pro"
                            ? "bg-agrimarket-orange/20 text-agrimarket-orange"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {farmer.subscription}
                        </span>
                      </TableCell>
                      <TableCell>{farmer.revenue.toLocaleString()} FCFA</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          farmer.status === "Vérifié" 
                            ? "bg-green-100 text-green-800" 
                            : farmer.status === "En attente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {farmer.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="inline-flex items-center gap-1"
                          onClick={() => handleViewFarmer(farmer.id)}
                        >
                          <Eye size={16} />
                          <span className="hidden sm:inline">Voir</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="inline-flex items-center gap-1 ml-2"
                          onClick={() => handleEditFarmer(farmer.id)}
                        >
                          <Edit size={16} />
                          <span className="hidden sm:inline">Éditer</span>
                        </Button>
                        {farmer.status === "En attente" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="inline-flex items-center gap-1 ml-2 text-green-600 hover:text-green-700"
                            onClick={() => openVerifyDialog(farmer)}
                          >
                            <CheckCircle size={16} />
                            <span className="hidden sm:inline">Vérifier</span>
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`inline-flex items-center gap-1 ml-2 ${
                            farmer.status === "Suspendu" 
                              ? "text-green-600 hover:text-green-700" 
                              : "text-red-600 hover:text-red-700"
                          }`}
                          onClick={() => openSuspendDialog(farmer)}
                        >
                          <Ban size={16} />
                          <span className="hidden sm:inline">
                            {farmer.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total agriculteurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{farmers.length}</div>
              <p className="text-sm text-gray-500 mt-1">
                Tous les agriculteurs inscrits
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {farmers.filter(f => f.status === "En attente").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Agriculteurs à vérifier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Vérifiés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-agrimarket-green">
                {farmers.filter(f => f.status === "Vérifié").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Agriculteurs actifs vérifiés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Revenus générés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {farmers
                  .filter(f => f.status !== "Suspendu")
                  .reduce((sum, farmer) => sum + farmer.revenue, 0)
                  .toLocaleString()} FCFA
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Revenus totaux des agriculteurs
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Verify farmer dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vérifier l'agriculteur</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir vérifier {selectedFarmer?.farm} ({selectedFarmer?.name}) ? 
              Cela permettra à l'agriculteur de vendre ses produits sur la plateforme.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowVerifyDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="default"
              className="bg-agrimarket-green hover:bg-green-700"
              onClick={handleVerifyFarmer}
            >
              Vérifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend/reactive farmer dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedFarmer?.status === "Suspendu" ? "Réactiver l'agriculteur" : "Suspendre l'agriculteur"}
            </DialogTitle>
            <DialogDescription>
              {selectedFarmer?.status === "Suspendu" 
                ? `Êtes-vous sûr de vouloir réactiver ${selectedFarmer?.farm} ? Cela lui permettra de vendre à nouveau sur la plateforme.`
                : `Êtes-vous sûr de vouloir suspendre ${selectedFarmer?.farm} ? Cela l'empêchera de vendre sur la plateforme.`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowSuspendDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              variant={selectedFarmer?.status === "Suspendu" ? "default" : "destructive"} 
              onClick={handleSuspendFarmer}
            >
              {selectedFarmer?.status === "Suspendu" ? "Réactiver" : "Suspendre"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminFarmers;

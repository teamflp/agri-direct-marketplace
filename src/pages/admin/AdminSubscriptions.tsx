
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
  ArrowUpDown,
  Filter,
  AlertCircle
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
import { Progress } from '@/components/ui/progress';
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

// Mock data for subscriptions
const subscriptions = [
  {
    id: 1,
    farmer: {
      id: 1,
      name: "Sophie Dubois",
      farm: "Ferme des Quatre Saisons",
      email: "sophie.d@email.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
    },
    plan: "Premium",
    startDate: "15/03/2023",
    nextBilling: "15/10/2023",
    amount: 32700,
    status: "Actif",
    paymentMethod: "Carte bancaire",
    paymentDetails: "**** 4242",
    renewalType: "Automatique"
  },
  {
    id: 2,
    farmer: {
      id: 2,
      name: "Jean Leclerc",
      farm: "Les Ruches de Marie",
      email: "jean.l@email.com",
      avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop"
    },
    plan: "Pro",
    startDate: "05/09/2022",
    nextBilling: "05/10/2023",
    amount: 13050,
    status: "Actif",
    paymentMethod: "Mobile Money",
    paymentDetails: "**** 7890",
    renewalType: "Automatique"
  },
  {
    id: 3,
    farmer: {
      id: 3,
      name: "Michel Blanc",
      farm: "Potager du Village",
      email: "michel.b@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    plan: "Basic",
    startDate: "12/11/2023",
    nextBilling: "-",
    amount: 0,
    status: "Actif",
    paymentMethod: "-",
    paymentDetails: "-",
    renewalType: "-"
  },
  {
    id: 4,
    farmer: {
      id: 4,
      name: "Marie Lambert",
      farm: "Ferme des Collines",
      email: "marie.l@email.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
    },
    plan: "Premium",
    startDate: "10/01/2023",
    nextBilling: "En attente",
    amount: 32700,
    status: "Paiement en échec",
    paymentMethod: "Carte bancaire",
    paymentDetails: "**** 6543",
    renewalType: "Automatique"
  },
  {
    id: 5,
    farmer: {
      id: 5,
      name: "Thomas Petit",
      farm: "Oliveraie Sunlight",
      email: "thomas.p@email.com",
      avatar: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=150&h=150&fit=crop"
    },
    plan: "Pro",
    startDate: "25/04/2022",
    nextBilling: "-",
    amount: 13050,
    status: "Annulé",
    paymentMethod: "Carte bancaire",
    paymentDetails: "**** 9876",
    renewalType: "Annulé"
  }
];

// Mock data for plans
const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    description: "Plan gratuit pour les petits agriculteurs",
    features: [
      "Jusqu'à 10 produits",
      "100MB de stockage",
      "Commission de 10% par vente",
      "Support par email"
    ],
    activeSubscribers: 35
  },
  {
    id: "pro",
    name: "Pro",
    price: 13050,
    description: "Plan idéal pour les agriculteurs en croissance",
    features: [
      "Jusqu'à 100 produits",
      "2GB de stockage",
      "Commission de 5% par vente",
      "Support prioritaire",
      "Statistiques avancées"
    ],
    activeSubscribers: 24
  },
  {
    id: "premium",
    name: "Premium",
    price: 32700,
    description: "Plan pour les agriculteurs professionnels",
    features: [
      "Produits illimités",
      "10GB de stockage",
      "Commission de 3% par vente",
      "Support prioritaire 24/7",
      "Mise en avant sur la page d'accueil",
      "Outils marketing avancés"
    ],
    activeSubscribers: 18
  }
];

const AdminSubscriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<null | typeof subscriptions[0]>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
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

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         subscription.farmer.farm.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.farmer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan = planFilter ? subscription.plan === planFilter : true;
    const matchesStatus = statusFilter ? subscription.status === statusFilter : true;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });
  
  const totalActiveSubscribers = plans.reduce((sum, plan) => sum + plan.activeSubscribers, 0);
  const monthlyRevenue = subscriptions
    .filter(sub => sub.status === "Actif")
    .reduce((sum, sub) => sum + sub.amount, 0);
  
  const openCancelDialog = (subscription: typeof subscriptions[0]) => {
    setSelectedSubscription(subscription);
    setShowCancelDialog(true);
  };
  
  const handleCancelSubscription = () => {
    if (selectedSubscription) {
      toast({
        title: "Abonnement annulé",
        description: `L'abonnement de ${selectedSubscription.farmer.farm} a été annulé avec succès`,
        variant: "default",
      });
      setShowCancelDialog(false);
      // Dans une vraie app, mise à jour de l'état
    }
  };
  
  const handleReactivateSubscription = (subscriptionId: number) => {
    toast({
      title: "Abonnement réactivé",
      description: `L'abonnement a été réactivé avec succès`,
      variant: "default",
    });
    // Dans une vraie app, mise à jour de l'état
  };
  
  const handleEditSubscription = (subscriptionId: number) => {
    toast({
      title: "Modification d'abonnement",
      description: `Redirection vers la page d'édition de l'abonnement ID: ${subscriptionId}`,
    });
    // Dans une vraie app, redirection vers la page d'édition
  };
  
  const handleViewSubscription = (subscriptionId: number) => {
    toast({
      title: "Détails de l'abonnement",
      description: `Affichage des détails de l'abonnement ID: ${subscriptionId}`,
    });
    // Dans une vraie app, redirection vers la page de détails
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
          <h1 className="text-3xl font-bold">Gestion des abonnements</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher un abonnement..."
                className="pl-8 pr-4"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Select value={planFilter || ""} onValueChange={(value) => setPlanFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {planFilter || "Forfait"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les forfaits</SelectItem>
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
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Paiement en échec">Paiement en échec</SelectItem>
                <SelectItem value="Annulé">Annulé</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-agrimarket-green hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" /> Ajouter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Abonnements actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-agrimarket-green">
                {subscriptions.filter(s => s.status === "Actif").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Abonnements actuellement actifs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Revenu mensuel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-agrimarket-orange">
                {monthlyRevenue.toLocaleString()} FCFA
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Revenu total des abonnements
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Paiements en échec</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {subscriptions.filter(s => s.status === "Paiement en échec").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Abonnements avec problèmes de paiement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Taux de conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {Math.round((plans.filter(p => p.id !== "basic")[0].activeSubscribers + plans.filter(p => p.id !== "basic")[1].activeSubscribers) / totalActiveSubscribers * 100)}%
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Utilisateurs avec abonnement payant
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des abonnements</CardTitle>
            <CardDescription>
              Gérez les abonnements des agriculteurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Agriculteur <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
                  <TableHead>Forfait</TableHead>
                  <TableHead>Date de début</TableHead>
                  <TableHead>Prochain paiement</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucun abonnement trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>{subscription.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{subscription.farmer.farm}</div>
                          <div className="text-xs text-gray-500">({subscription.farmer.name})</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          subscription.plan === "Premium" 
                            ? "bg-purple-100 text-purple-800" 
                            : subscription.plan === "Pro"
                            ? "bg-agrimarket-orange/20 text-agrimarket-orange"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {subscription.plan}
                        </span>
                      </TableCell>
                      <TableCell>{subscription.startDate}</TableCell>
                      <TableCell>{subscription.nextBilling}</TableCell>
                      <TableCell>{subscription.amount.toLocaleString()} FCFA</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          subscription.status === "Actif" 
                            ? "bg-green-100 text-green-800" 
                            : subscription.status === "Paiement en échec"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {subscription.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="inline-flex items-center gap-1"
                          onClick={() => handleViewSubscription(subscription.id)}
                        >
                          <Eye size={16} />
                          <span className="hidden sm:inline">Voir</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="inline-flex items-center gap-1 ml-2"
                          onClick={() => handleEditSubscription(subscription.id)}
                        >
                          <Edit size={16} />
                          <span className="hidden sm:inline">Éditer</span>
                        </Button>
                        {subscription.status === "Annulé" ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="inline-flex items-center gap-1 ml-2 text-green-600 hover:text-green-700"
                            onClick={() => handleReactivateSubscription(subscription.id)}
                          >
                            <CheckCircle size={16} />
                            <span className="hidden sm:inline">Réactiver</span>
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="inline-flex items-center gap-1 ml-2 text-red-600 hover:text-red-700"
                            onClick={() => openCancelDialog(subscription)}
                            disabled={subscription.status === "Annulé"}
                          >
                            <Ban size={16} />
                            <span className="hidden sm:inline">Annuler</span>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forfaits disponibles</CardTitle>
            <CardDescription>
              Aperçu des forfaits et de leur popularité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{plan.name}</CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        plan.id === "premium" 
                          ? "bg-purple-100 text-purple-800" 
                          : plan.id === "pro"
                          ? "bg-agrimarket-orange/20 text-agrimarket-orange"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {plan.price.toLocaleString()} FCFA
                      </span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Abonnés actifs</span>
                          <span className="font-medium">{plan.activeSubscribers}</span>
                        </div>
                        <Progress 
                          value={(plan.activeSubscribers / totalActiveSubscribers) * 100}
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.round((plan.activeSubscribers / totalActiveSubscribers) * 100)}% des abonnés
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Fonctionnalités</h4>
                        <ul className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-agrimarket-green mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-center"
                          onClick={() => toast({
                            title: "Modifier forfait",
                            description: `Redirection vers la page d'édition du forfait ${plan.name}`,
                          })}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier forfait
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cancel subscription dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Annuler l'abonnement</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir annuler l'abonnement de {selectedSubscription?.farmer.farm} ({selectedSubscription?.farmer.name}) ? 
              Cela mettra fin à l'abonnement {selectedSubscription?.plan} et aux avantages associés.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowCancelDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelSubscription}
            >
              Confirmer l'annulation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminSubscriptions;

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  MessageSquare, 
  CreditCard, 
  User, 
  Eye, 
  TruckIcon,
  Search,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Clock
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const orders = [
  {
    id: "CMD-2023-001",
    customer: "Martin Pasquier",
    date: "27/09/2023",
    total: 23450,
    items: 3,
    status: "En livraison",
    paid: true
  },
  {
    id: "CMD-2023-002",
    customer: "Lucie Martin",
    date: "26/09/2023",
    total: 12700,
    items: 2,
    status: "En préparation",
    paid: true
  },
  {
    id: "CMD-2023-003",
    customer: "Thomas Leroy",
    date: "25/09/2023",
    total: 8900,
    items: 1,
    status: "Nouvelle",
    paid: true
  },
  {
    id: "CMD-2023-004",
    customer: "Julie Moreau",
    date: "24/09/2023",
    total: 35600,
    items: 4,
    status: "Livrée",
    paid: true
  },
  {
    id: "CMD-2023-005",
    customer: "Antoine Dubois",
    date: "23/09/2023",
    total: 29800,
    items: 3,
    status: "Livrée",
    paid: true
  },
  {
    id: "CMD-2023-006",
    customer: "Marie Lambert",
    date: "22/09/2023",
    total: 17350,
    items: 2,
    status: "Annulée",
    paid: false
  }
];

const FarmerOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User size={20} /> },
    { title: "Mes produits", path: "/farmer-dashboard/products", icon: <ShoppingBag size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <ShoppingBag size={20} /> },
    { title: "Messagerie", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mon abonnement", path: "/farmer-dashboard/subscription", icon: <CreditCard size={20} /> },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast({
      title: "Statut mis à jour",
      description: `La commande ${orderId} est maintenant "${newStatus}"`,
    });
    // Dans une vraie app, mise à jour de l'état
  };
  
  const handleViewOrder = (orderId: string) => {
    toast({
      title: "Détails de la commande",
      description: `Affichage des détails pour la commande ${orderId}`,
    });
    // Dans une vraie app, navigation vers la page de détails
  };

  return (
    <DashboardLayout
      name="Sophie Dubois"
      email="sophie.d@email.com"
      avatar={
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Sophie Dubois" />
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Commandes</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher une commande..."
                className="pl-8 pr-4"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {statusFilter || "Tous les statuts"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Nouvelle">Nouvelle</SelectItem>
                <SelectItem value="En préparation">En préparation</SelectItem>
                <SelectItem value="En livraison">En livraison</SelectItem>
                <SelectItem value="Livrée">Livrée</SelectItem>
                <SelectItem value="Annulée">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gestion des commandes</CardTitle>
            <CardDescription>
              Suivez et gérez les commandes de vos clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commande <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Aucune commande trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.total.toLocaleString()} FCFA</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          order.status === "Livrée" 
                            ? "bg-green-100 text-green-800" 
                            : order.status === "En livraison"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "En préparation"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Nouvelle"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {order.status === "Livrée" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {order.status === "En préparation" && <Clock className="w-3 h-3 mr-1" />}
                          {order.status === "En livraison" && <TruckIcon className="w-3 h-3 mr-1" />}
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {order.paid ? (
                          <span className="text-green-600 font-medium">Payée</span>
                        ) : (
                          <span className="text-red-600 font-medium">Non payée</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="inline-flex items-center gap-1"
                          onClick={() => handleViewOrder(order.id)}
                        >
                          <Eye size={16} />
                          <span className="hidden sm:inline">Détails</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="inline-flex items-center gap-1 ml-2"
                              disabled={order.status === "Annulée" || order.status === "Livrée"}
                            >
                              Statut
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Changer le statut</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "En préparation")}>
                              En préparation
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "En livraison")}>
                              En livraison
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Livrée")}>
                              Livrée
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "Annulée")} className="text-red-600">
                              Annuler
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Nouvelles commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {orders.filter(o => o.status === "Nouvelle").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Commandes en attente de traitement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">En préparation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {orders.filter(o => o.status === "En préparation").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Commandes en cours de préparation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Chiffre d'affaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-agrimarket-green">
                {orders
                  .filter(o => o.status !== "Annulée")
                  .reduce((sum, order) => sum + order.total, 0)
                  .toLocaleString()} FCFA
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Total des commandes ce mois-ci
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerOrders;

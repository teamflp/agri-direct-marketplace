
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

// Mock data for users
const users = [
  {
    id: 1,
    name: "Martin Pasquier",
    email: "martin.p@email.com",
    type: "Consommateur",
    status: "Actif",
    joinDate: "27/07/2023",
    orders: 8,
    lastLogin: "Aujourd'hui, 14:30"
  },
  {
    id: 2,
    name: "Sophie Dubois",
    email: "sophie.d@email.com",
    type: "Agriculteur",
    status: "Actif",
    joinDate: "15/03/2023",
    orders: 0,
    lastLogin: "Hier, 10:15"
  },
  {
    id: 3,
    name: "Jean Leclerc",
    email: "jean.l@email.com",
    type: "Agriculteur",
    status: "Suspendu",
    joinDate: "05/09/2022",
    orders: 0,
    lastLogin: "Il y a 2 semaines"
  },
  {
    id: 4,
    name: "Lucie Martin",
    email: "lucie.m@email.com",
    type: "Consommateur",
    status: "Actif",
    joinDate: "12/11/2023",
    orders: 3,
    lastLogin: "Il y a 3 jours"
  },
  {
    id: 5,
    name: "Michel Blanc",
    email: "michel.b@email.com",
    type: "Agriculteur",
    status: "Actif",
    joinDate: "20/06/2023",
    orders: 0,
    lastLogin: "Aujourd'hui, 09:45"
  },
  {
    id: 6,
    name: "Marie Lambert",
    email: "marie.l@email.com",
    type: "Consommateur",
    status: "Inactif",
    joinDate: "03/02/2023",
    orders: 1,
    lastLogin: "Il y a 2 mois"
  }
];

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<null | typeof users[0]>(null);
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter ? user.type === typeFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const openSuspendDialog = (user: typeof users[0]) => {
    setSelectedUser(user);
    setShowSuspendDialog(true);
  };
  
  const handleSuspendUser = () => {
    if (selectedUser) {
      toast({
        title: selectedUser.status === "Suspendu" ? "Utilisateur réactivé" : "Utilisateur suspendu",
        description: selectedUser.status === "Suspendu" 
          ? `${selectedUser.name} a été réactivé avec succès` 
          : `${selectedUser.name} a été suspendu avec succès`,
        variant: "default",
      });
      setShowSuspendDialog(false);
      // Dans une vraie app, mise à jour de l'état
    }
  };
  
  const handleEditUser = (userId: number) => {
    toast({
      title: "Édition d'utilisateur",
      description: `Redirection vers la page d'édition de l'utilisateur ID: ${userId}`,
    });
    // Dans une vraie app, redirection vers la page d'édition
  };
  
  const handleViewUser = (userId: number) => {
    toast({
      title: "Profil utilisateur",
      description: `Affichage du profil de l'utilisateur ID: ${userId}`,
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
          <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher un utilisateur..."
                className="pl-8 pr-4"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Select value={typeFilter || ""} onValueChange={(value) => setTypeFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {typeFilter || "Type d'utilisateur"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="Consommateur">Consommateur</SelectItem>
                <SelectItem value="Agriculteur">Agriculteur</SelectItem>
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
                <SelectItem value="Inactif">Inactif</SelectItem>
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
            <CardTitle>Liste des utilisateurs</CardTitle>
            <CardDescription>
              Gérez les utilisateurs de la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Commandes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      Aucun utilisateur trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.type === "Agriculteur" 
                            ? "bg-agrimarket-lightGreen text-agrimarket-green" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {user.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Actif" 
                            ? "bg-green-100 text-green-800" 
                            : user.status === "Inactif"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>{user.orders}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="inline-flex items-center gap-1"
                          onClick={() => handleViewUser(user.id)}
                        >
                          <Eye size={16} />
                          <span className="hidden sm:inline">Voir</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="inline-flex items-center gap-1 ml-2"
                          onClick={() => handleEditUser(user.id)}
                        >
                          <Edit size={16} />
                          <span className="hidden sm:inline">Éditer</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={`inline-flex items-center gap-1 ml-2 ${
                            user.status === "Suspendu" 
                              ? "text-green-600 hover:text-green-700" 
                              : "text-red-600 hover:text-red-700"
                          }`}
                          onClick={() => openSuspendDialog(user)}
                        >
                          <Ban size={16} />
                          <span className="hidden sm:inline">
                            {user.status === "Suspendu" ? "Réactiver" : "Suspendre"}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Total utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{users.length}</div>
              <p className="text-sm text-gray-500 mt-1">
                Tous les utilisateurs inscrits
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Consommateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {users.filter(u => u.type === "Consommateur").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Clients inscrits sur la plateforme
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Agriculteurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-agrimarket-green">
                {users.filter(u => u.type === "Agriculteur").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Vendeurs inscrits sur la plateforme
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suspend/reactive user dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.status === "Suspendu" ? "Réactiver l'utilisateur" : "Suspendre l'utilisateur"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser?.status === "Suspendu" 
                ? `Êtes-vous sûr de vouloir réactiver ${selectedUser?.name} ? Cela lui permettra d'accéder à nouveau à la plateforme.`
                : `Êtes-vous sûr de vouloir suspendre ${selectedUser?.name} ? Cela l'empêchera d'accéder à la plateforme.`
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
              variant={selectedUser?.status === "Suspendu" ? "default" : "destructive"} 
              onClick={handleSuspendUser}
            >
              {selectedUser?.status === "Suspendu" ? "Réactiver" : "Suspendre"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminUsers;

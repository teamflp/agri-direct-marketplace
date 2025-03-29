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
  Eye,
  CheckCircle,
  ArrowUpDown,
  Filter,
  X
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
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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

const messages = [
  {
    id: 1,
    from: {
      id: 1,
      name: "Martin Pasquier",
      type: "Consommateur",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    to: {
      id: 2,
      name: "Sophie Dubois",
      type: "Agriculteur",
      farm: "Ferme des Quatre Saisons",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
    },
    subject: "Question sur les produits bio",
    content: "Bonjour, je voudrais savoir si vos légumes sont certifiés bio et si vous proposez des paniers hebdomadaires ? Merci d'avance pour votre réponse.",
    date: "Aujourd'hui, 14:32",
    status: "Non résolu"
  },
  {
    id: 2,
    from: {
      id: 3,
      name: "Lucie Martin",
      type: "Consommateur",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    to: {
      id: 4,
      name: "Jean Leclerc",
      type: "Agriculteur",
      farm: "Les Ruches de Marie",
      avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop"
    },
    subject: "Problème avec ma commande",
    content: "Bonjour, j'ai reçu ma commande aujourd'hui mais il manque un pot de miel dans le colis. Pouvez-vous me contacter pour résoudre ce problème ? Merci.",
    date: "Hier, 10:15",
    status: "En traitement"
  },
  {
    id: 3,
    from: {
      id: 2,
      name: "Sophie Dubois",
      type: "Agriculteur",
      farm: "Ferme des Quatre Saisons",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
    },
    to: {
      id: 5,
      name: "Support AgriMarket",
      type: "Support",
      avatar: ""
    },
    subject: "Problème de paiement",
    content: "Bonjour, je rencontre des difficultés avec le système de paiement. Les montants reçus ne correspondent pas aux montants des commandes. Pouvez-vous m'aider à résoudre ce problème ?",
    date: "21/09/2023",
    status: "Résolu"
  },
  {
    id: 4,
    from: {
      id: 6,
      name: "Thomas Leroy",
      type: "Consommateur",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop"
    },
    to: {
      id: 5,
      name: "Support AgriMarket",
      type: "Support",
      avatar: ""
    },
    subject: "Confusion sur les frais de livraison",
    content: "Bonjour, je ne comprends pas comment sont calculés les frais de livraison. Pouvez-vous m'expliquer la politique de livraison ? Merci.",
    date: "19/09/2023",
    status: "Non résolu"
  },
  {
    id: 5,
    from: {
      id: 4,
      name: "Jean Leclerc",
      type: "Agriculteur",
      farm: "Les Ruches de Marie",
      avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop"
    },
    to: {
      id: 3,
      name: "Lucie Martin",
      type: "Consommateur",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    subject: "Réponse concernant votre commande",
    content: "Bonjour Lucie, je vous présente mes excuses pour l'erreur dans votre commande. Je vous envoie le pot de miel manquant dès demain. Merci pour votre compréhension.",
    date: "Hier, 11:30",
    status: "En traitement"
  }
];

const AdminMessages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<null | typeof messages[0]>(null);
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [showMessageDetail, setShowMessageDetail] = useState(false);
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

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         message.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.to.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? message.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const openResolveDialog = (message: typeof messages[0]) => {
    setSelectedMessage(message);
    setShowResolveDialog(true);
  };
  
  const openMessageDetail = (message: typeof messages[0]) => {
    setSelectedMessage(message);
    setShowMessageDetail(true);
  };
  
  const handleResolveMessage = () => {
    if (selectedMessage) {
      toast({
        title: "Message résolu",
        description: `Le message "${selectedMessage.subject}" a été marqué comme résolu`,
        variant: "default",
      });
      setShowResolveDialog(false);
    }
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
          <h1 className="text-3xl font-bold">Gestion des messages</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher un message..."
                className="pl-8 pr-4"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {statusFilter || "Statut"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Non résolu">Non résolu</SelectItem>
                <SelectItem value="En traitement">En traitement</SelectItem>
                <SelectItem value="Résolu">Résolu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Messages et communications</CardTitle>
            <CardDescription>
              Suivi des communications entre utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Expéditeur</TableHead>
                  <TableHead>Destinataire</TableHead>
                  <TableHead>Sujet <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Aucun message trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>{message.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            {message.from.avatar ? (
                              <img src={message.from.avatar} alt={message.from.name} />
                            ) : (
                              <div className="bg-agrimarket-orange text-white text-xs font-semibold flex items-center justify-center h-full">
                                AM
                              </div>
                            )}
                          </Avatar>
                          <div>
                            <div className="font-medium">{message.from.name}</div>
                            <div className="text-xs text-gray-500">
                              {message.from.type === "Agriculteur" ? message.from.farm : message.from.type}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            {message.to.avatar ? (
                              <img src={message.to.avatar} alt={message.to.name} />
                            ) : (
                              <div className="bg-agrimarket-orange text-white text-xs font-semibold flex items-center justify-center h-full">
                                AM
                              </div>
                            )}
                          </Avatar>
                          <div>
                            <div className="font-medium">{message.to.name}</div>
                            <div className="text-xs text-gray-500">
                              {message.to.type === "Agriculteur" ? message.to.farm : message.to.type}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="truncate max-w-[200px]" title={message.subject}>
                          {message.subject}
                        </div>
                      </TableCell>
                      <TableCell>{message.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          message.status === "Résolu" 
                            ? "bg-green-100 text-green-800" 
                            : message.status === "En traitement"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {message.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="inline-flex items-center gap-1"
                          onClick={() => openMessageDetail(message)}
                        >
                          <Eye size={16} />
                          <span className="hidden sm:inline">Voir</span>
                        </Button>
                        {message.status !== "Résolu" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="inline-flex items-center gap-1 ml-2 bg-agrimarket-green text-white hover:bg-agrimarket-green/80"
                            onClick={() => openResolveDialog(message)}
                          >
                            <CheckCircle size={16} />
                            <span className="hidden sm:inline">Résoudre</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Messages non résolus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {messages.filter(m => m.status === "Non résolu").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Messages nécessitant une attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">En traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {messages.filter(m => m.status === "En traitement").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Messages en cours de gestion
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Messages résolus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-agrimarket-green">
                {messages.filter(m => m.status === "Résolu").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Messages traités et fermés
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Résoudre le message</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir marquer ce message comme résolu ? 
              Cela indiquera que le problème a été traité et ne nécessite plus d'attention.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowResolveDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="default"
              className="bg-agrimarket-green hover:bg-green-700"
              onClick={handleResolveMessage}
            >
              Résoudre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMessageDetail} onOpenChange={setShowMessageDetail}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <DialogTitle className="pr-8">{selectedMessage?.subject}</DialogTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowMessageDetail(false)}
                className="h-6 w-6 rounded-full absolute right-4 top-4"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500">{selectedMessage?.date}</div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                selectedMessage?.status === "Résolu" 
                  ? "bg-green-100 text-green-800" 
                  : selectedMessage?.status === "En traitement"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {selectedMessage?.status}
              </span>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 mt-2">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                {selectedMessage?.from.avatar ? (
                  <img src={selectedMessage.from.avatar} alt={selectedMessage.from.name} />
                ) : (
                  <div className="bg-agrimarket-orange text-white text-sm font-semibold flex items-center justify-center h-full">
                    AM
                  </div>
                )}
              </Avatar>
              <div>
                <div className="font-medium">De: {selectedMessage?.from.name}</div>
                <div className="text-sm text-gray-500">
                  {selectedMessage?.from.type === "Agriculteur" ? selectedMessage.from.farm : selectedMessage?.from.type}
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                {selectedMessage?.to.avatar ? (
                  <img src={selectedMessage.to.avatar} alt={selectedMessage.to.name} />
                ) : (
                  <div className="bg-agrimarket-orange text-white text-sm font-semibold flex items-center justify-center h-full">
                    AM
                  </div>
                )}
              </Avatar>
              <div>
                <div className="font-medium">À: {selectedMessage?.to.name}</div>
                <div className="text-sm text-gray-500">
                  {selectedMessage?.to.type === "Agriculteur" ? selectedMessage.to.farm : selectedMessage?.to.type}
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="text-sm whitespace-pre-line">
                {selectedMessage?.content}
              </div>
            </div>
            
            {selectedMessage?.status !== "Résolu" && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">Ajouter une note ou une réponse:</h4>
                <Textarea 
                  placeholder="Écrivez votre note ou réponse ici..." 
                  className="min-h-[100px]"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowMessageDetail(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    variant="default"
                    className="bg-agrimarket-orange hover:bg-orange-600"
                  >
                    Envoyer
                  </Button>
                  <Button 
                    variant="default"
                    className="bg-agrimarket-green hover:bg-green-700"
                    onClick={() => {
                      handleResolveMessage();
                      setShowMessageDetail(false);
                    }}
                  >
                    Résoudre
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminMessages;

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
  AlertCircle,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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

const disputes = [
  {
    id: 1,
    customer: {
      id: 1,
      name: "Martin Pasquier",
      email: "martin.p@email.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    farmer: {
      id: 2,
      name: "Sophie Dubois",
      farm: "Ferme des Quatre Saisons",
      email: "sophie.d@email.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
    },
    order: "ORD-2023-001",
    issue: "Produit endommagé",
    details: "J'ai reçu un panier avec des légumes abîmés. Les tomates sont écrasées et certaines courgettes sont pourries. Je souhaite un remboursement ou un remplacement.",
    date: "27/09/2023",
    status: "En attente",
    priority: "Moyen"
  },
  {
    id: 2,
    customer: {
      id: 3,
      name: "Lucie Martin",
      email: "lucie.m@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    farmer: {
      id: 4,
      name: "Jean Leclerc",
      farm: "Les Ruches de Marie",
      email: "jean.l@email.com",
      avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop"
    },
    order: "ORD-2023-015",
    issue: "Livraison non reçue",
    details: "Je n'ai jamais reçu ma commande alors qu'elle est marquée comme livrée. J'ai essayé de contacter l'agriculteur mais je n'ai pas eu de réponse.",
    date: "15/09/2023",
    status: "Résolu",
    priority: "Élevé"
  },
  {
    id: 3,
    customer: {
      id: 5,
      name: "Thomas Leroy",
      email: "thomas.l@email.com",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop"
    },
    farmer: {
      id: 6,
      name: "Marie Lambert",
      farm: "Oliveraie Sunlight",
      email: "marie.l@email.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
    },
    order: "ORD-2023-022",
    issue: "Quantité incorrecte",
    details: "J'ai commandé 5 bouteilles d'huile d'olive mais n'en ai reçu que 3. Je souhaite recevoir les 2 bouteilles manquantes.",
    date: "23/09/2023",
    status: "En traitement",
    priority: "Faible"
  },
  {
    id: 4,
    customer: {
      id: 7,
      name: "Antoine Dubois",
      email: "antoine.d@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    farmer: {
      id: 2,
      name: "Sophie Dubois",
      farm: "Ferme des Quatre Saisons",
      email: "sophie.d@email.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
    },
    order: "ORD-2023-030",
    issue: "Qualité insatisfaisante",
    details: "Les fruits que j'ai reçus n'étaient pas de la qualité habituelle. Les pommes étaient molles et les poires pas mûres.",
    date: "29/09/2023",
    status: "En attente",
    priority: "Moyen"
  }
];

const disputeConversations = [
  {
    disputeId: 1,
    messages: [
      {
        id: 1,
        sender: "customer",
        senderName: "Martin Pasquier",
        text: "Bonjour, j'ai reçu un panier avec des légumes abîmés. Les tomates sont écrasées et certaines courgettes sont pourries. Je souhaite un remboursement ou un remplacement.",
        date: "27/09/2023, 14:30"
      }
    ]
  },
  {
    disputeId: 2,
    messages: [
      {
        id: 1,
        sender: "customer",
        senderName: "Lucie Martin",
        text: "Bonjour, je n'ai jamais reçu ma commande alors qu'elle est marquée comme livrée. J'ai essayé de contacter l'agriculteur mais je n'ai pas eu de réponse.",
        date: "15/09/2023, 09:45"
      },
      {
        id: 2,
        sender: "admin",
        senderName: "Admin AgriMarket",
        text: "Bonjour Lucie, nous avons bien reçu votre signalement et nous allons contacter l'agriculteur pour clarifier la situation.",
        date: "15/09/2023, 10:30"
      },
      {
        id: 3,
        sender: "farmer",
        senderName: "Jean Leclerc",
        text: "Bonjour, je m'excuse pour ce désagrément. Il semble y avoir eu une erreur dans notre système de livraison. Je vais vous renvoyer votre commande aujourd'hui.",
        date: "16/09/2023, 11:15"
      },
      {
        id: 4,
        sender: "customer",
        senderName: "Lucie Martin",
        text: "Merci beaucoup, j'ai bien reçu la commande ce matin.",
        date: "17/09/2023, 09:20"
      },
      {
        id: 5,
        sender: "admin",
        senderName: "Admin AgriMarket",
        text: "Nous sommes heureux que le problème ait été résolu. N'hésitez pas à nous contacter si vous avez d'autres questions.",
        date: "17/09/2023, 10:00"
      }
    ]
  },
  {
    disputeId: 3,
    messages: [
      {
        id: 1,
        sender: "customer",
        senderName: "Thomas Leroy",
        text: "Bonjour, j'ai commandé 5 bouteilles d'huile d'olive mais n'en ai reçu que 3. Je souhaite recevoir les 2 bouteilles manquantes.",
        date: "23/09/2023, 15:20"
      },
      {
        id: 2,
        sender: "admin",
        senderName: "Admin AgriMarket",
        text: "Bonjour Thomas, nous avons contacté Mme Lambert concernant votre commande. Nous attendons sa réponse.",
        date: "24/09/2023, 09:15"
      }
    ]
  },
  {
    disputeId: 4,
    messages: [
      {
        id: 1,
        sender: "customer",
        senderName: "Antoine Dubois",
        text: "Les fruits que j'ai reçus n'étaient pas de la qualité habituelle. Les pommes étaient molles et les poires pas mûres.",
        date: "29/09/2023, 11:45"
      }
    ]
  }
];

const AdminDisputes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [selectedDispute, setSelectedDispute] = useState<null | typeof disputes[0]>(null);
  const [newReply, setNewReply] = useState("");
  const [showDisputeDetail, setShowDisputeDetail] = useState(false);
  const [showResolveDialog, setShowResolveDialog] = useState(false);
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

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.issue.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dispute.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispute.order.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? dispute.status === statusFilter : true;
    const matchesPriority = priorityFilter ? dispute.priority === priorityFilter : true;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });
  
  const getDisputeConversation = (disputeId: number) => {
    return disputeConversations.find(conversation => conversation.disputeId === disputeId)?.messages || [];
  };
  
  const openDisputeDetail = (dispute: typeof disputes[0]) => {
    setSelectedDispute(dispute);
    setShowDisputeDetail(true);
  };
  
  const openResolveDialog = () => {
    if (selectedDispute) {
      setShowResolveDialog(true);
    }
  };
  
  const handleResolveDispute = () => {
    if (selectedDispute) {
      toast({
        title: "Litige résolu",
        description: `Le litige concernant la commande ${selectedDispute.order} a été marqué comme résolu`,
        variant: "default",
      });
      setShowResolveDialog(false);
    }
  };
  
  const handleSendReply = () => {
    if (!newReply.trim() || !selectedDispute) return;
    
    toast({
      title: "Réponse envoyée",
      description: `Votre réponse a été envoyée aux deux parties`,
    });
    
    setNewReply("");
  };
  
  const handleSetDisputeStatus = (disputeId: number, newStatus: string) => {
    toast({
      title: "Statut mis à jour",
      description: `Le litige a été mis à jour au statut: ${newStatus}`,
    });
  };
  
  const handleSetDisputePriority = (disputeId: number, newPriority: string) => {
    toast({
      title: "Priorité mise à jour",
      description: `La priorité du litige a été mise à jour à: ${newPriority}`,
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
          <h1 className="text-3xl font-bold">Gestion des litiges</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher un litige..."
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
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="En traitement">En traitement</SelectItem>
                <SelectItem value="Résolu">Résolu</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter || ""} onValueChange={(value) => setPriorityFilter(value || null)}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {priorityFilter || "Priorité"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les priorités</SelectItem>
                <SelectItem value="Élevé">Élevée</SelectItem>
                <SelectItem value="Moyen">Moyenne</SelectItem>
                <SelectItem value="Faible">Faible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Litiges ouverts</CardTitle>
            <CardDescription>
              Gestion des problèmes signalés par les utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Agriculteur</TableHead>
                  <TableHead>Commande</TableHead>
                  <TableHead>Problème <ArrowUpDown className="inline h-4 w-4 ml-1" /></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDisputes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      Aucun litige trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDisputes.map((dispute) => (
                    <TableRow key={dispute.id}>
                      <TableCell>{dispute.id}</TableCell>
                      <TableCell>{dispute.customer.name}</TableCell>
                      <TableCell>{dispute.farmer.name}</TableCell>
                      <TableCell>{dispute.order}</TableCell>
                      <TableCell>
                        <div className="truncate max-w-[150px]" title={dispute.issue}>
                          {dispute.issue}
                        </div>
                      </TableCell>
                      <TableCell>{dispute.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          dispute.priority === "Élevé" 
                            ? "bg-red-100 text-red-800" 
                            : dispute.priority === "Moyen"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {dispute.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          dispute.status === "Résolu" 
                            ? "bg-green-100 text-green-800" 
                            : dispute.status === "En traitement"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {dispute.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="inline-flex items-center gap-1"
                          onClick={() => openDisputeDetail(dispute)}
                        >
                          <Eye size={16} />
                          <span className="hidden sm:inline">Voir</span>
                        </Button>
                        {dispute.status !== "Résolu" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="inline-flex items-center gap-1 ml-2 bg-agrimarket-green text-white hover:bg-agrimarket-green/80"
                            onClick={() => {
                              setSelectedDispute(dispute);
                              openResolveDialog();
                            }}
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
              <CardTitle className="text-xl">Litiges en attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {disputes.filter(d => d.status === "En attente").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Litiges nécessitant une action
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">En traitement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {disputes.filter(d => d.status === "En traitement").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Litiges en cours de résolution
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Litiges résolus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-agrimarket-green">
                {disputes.filter(d => d.status === "Résolu").length}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Problèmes résolus ce mois
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Résoudre le litige</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir marquer ce litige comme résolu ? 
              Cela indiquera que le problème a été traité et ne nécessite plus d'attention.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <p className="text-sm font-medium mb-1">Motif de résolution :</p>
              <Select defaultValue="accord">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un motif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accord">Accord trouvé entre les parties</SelectItem>
                  <SelectItem value="remboursement">Remboursement effectué</SelectItem>
                  <SelectItem value="remplacement">Produit remplacé</SelectItem>
                  <SelectItem value="compensation">Compensation offerte</SelectItem>
                  <SelectItem value="autres">Autres</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea 
              placeholder="Commentaire de résolution (optionnel)" 
              className="resize-none"
            />
          </div>
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
              onClick={handleResolveDispute}
            >
              Confirmer la résolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDisputeDetail} onOpenChange={setShowDisputeDetail}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <DialogTitle>Litige #{selectedDispute?.id} - {selectedDispute?.issue}</DialogTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowDisputeDetail(false)}
                className="h-6 w-6 rounded-full absolute right-4 top-4"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
              <div className="text-sm text-gray-500">{selectedDispute?.date} - Commande {selectedDispute?.order}</div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedDispute?.priority === "Élevé" 
                    ? "bg-red-100 text-red-800" 
                    : selectedDispute?.priority === "Moyen"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  Priorité: {selectedDispute?.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedDispute?.status === "Résolu" 
                    ? "bg-green-100 text-green-800" 
                    : selectedDispute?.status === "En traitement"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {selectedDispute?.status}
                </span>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-6 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Client</h3>
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={selectedDispute?.customer.avatar} alt={selectedDispute?.customer.name} />
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedDispute?.customer.name}</div>
                    <div className="text-sm text-gray-500">{selectedDispute?.customer.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Agriculteur</h3>
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={selectedDispute?.farmer.avatar} alt={selectedDispute?.farmer.name} />
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedDispute?.farmer.name}</div>
                    <div className="text-sm text-gray-500">{selectedDispute?.farmer.farm}</div>
                    <div className="text-sm text-gray-500">{selectedDispute?.farmer.email}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Détails du problème</h3>
              <div className="bg-gray-50 p-3 rounded-md text-sm">
                {selectedDispute?.details}
              </div>
            </div>
            
            <Tabs defaultValue="conversation" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="conversation" className="flex-1">Conversation</TabsTrigger>
                <TabsTrigger value="actions" className="flex-1">Actions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversation" className="space-y-4 mt-4">
                <div className="bg-gray-50 rounded-md p-4 max-h-[300px] overflow-y-auto">
                  {selectedDispute && getDisputeConversation(selectedDispute.id).length > 0 ? (
                    <div className="space-y-4">
                      {selectedDispute && getDisputeConversation(selectedDispute.id).map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${
                            message.sender === 'admin' 
                              ? 'justify-end' 
                              : 'justify-start'
                          }`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'admin' 
                                ? 'bg-agrimarket-orange text-white' 
                                : message.sender === 'customer'
                                ? 'bg-blue-100'
                                : 'bg-green-100'
                            }`}
                          >
                            <div className="font-medium text-xs mb-1">
                              {message.senderName} 
                              <span className={`ml-2 ${
                                message.sender === 'admin' 
                                  ? 'text-white/70' 
                                  : 'text-gray-500'
                              }`}>
                                {message.date}
                              </span>
                            </div>
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      Aucun message dans cette conversation
                    </div>
                  )}
                </div>
                
                {selectedDispute?.status !== "Résolu" && (
                  <div className="space-y-2">
                    <Textarea 
                      placeholder="Écrivez votre réponse..." 
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="default"
                        className="bg-agrimarket-orange hover:bg-orange-600"
                        onClick={handleSendReply}
                      >
                        Envoyer
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="actions" className="space-y-4 mt-4">
                {selectedDispute && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Modifier le statut</p>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={selectedDispute.status === "En attente" ? "bg-yellow-100" : ""}
                          onClick={() => handleSetDisputeStatus(selectedDispute.id, "En attente")}
                        >
                          En attente
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={selectedDispute.status === "En traitement" ? "bg-blue-100" : ""}
                          onClick={() => handleSetDisputeStatus(selectedDispute.id, "En traitement")}
                        >
                          En traitement
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={selectedDispute.status === "Résolu" ? "bg-green-100" : ""}
                          onClick={() => handleSetDisputeStatus(selectedDispute.id, "Résolu")}
                        >
                          Résolu
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Modifier la priorité</p>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={selectedDispute.priority === "Faible" ? "bg-blue-100" : ""}
                          onClick={() => handleSetDisputePriority(selectedDispute.id, "Faible")}
                        >
                          Faible
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={selectedDispute.priority === "Moyen" ? "bg-orange-100" : ""}
                          onClick={() => handleSetDisputePriority(selectedDispute.id, "Moyen")}
                        >
                          Moyenne
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={selectedDispute.priority === "Élevé" ? "bg-red-100" : ""}
                          onClick={() => handleSetDisputePriority(selectedDispute.id, "Élevé")}
                        >
                          Élevée
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Actions disponibles</p>
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => toast({
                            title: "Email envoyé",
                            description: "Un email de rappel a été envoyé aux deux parties",
                          })}
                        >
                          Envoyer un rappel par email
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => toast({
                            title: "Litige transféré",
                            description: "Le litige a été transféré au service support",
                          })}
                        >
                          Transférer au service support
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => toast({
                            title: "Litige escaladé",
                            description: "Le litige a été escaladé au responsable",
                          })}
                        >
                          Escalader au responsable
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button 
                        variant="default"
                        className="bg-agrimarket-green hover:bg-green-700 w-full"
                        onClick={openResolveDialog}
                        disabled={selectedDispute.status === "Résolu"}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {selectedDispute.status === "Résolu" ? "Déjà résolu" : "Marquer comme résolu"}
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminDisputes;

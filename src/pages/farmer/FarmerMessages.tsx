
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  MessageSquare, 
  CreditCard, 
  User, 
  Send,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock data for messages
const conversations = [
  {
    id: 1,
    customer: {
      id: 1,
      name: "Martin Pasquier",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    lastMessage: "Bonjour, je voulais savoir si ma commande serait prête demain?",
    date: "Aujourd'hui, 14:30",
    unread: true,
    messages: [
      {
        id: 1,
        sender: "farmer",
        text: "Bonjour M. Pasquier, j'espère que vous allez bien!",
        date: "Hier, 10:15"
      },
      {
        id: 2,
        sender: "customer",
        text: "Bonjour Mme Dubois, tout va bien merci! Je voulais savoir si ma commande serait prête demain?",
        date: "Aujourd'hui, 14:30"
      }
    ]
  },
  {
    id: 2,
    customer: {
      id: 2,
      name: "Lucie Martin",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    lastMessage: "Merci pour votre commande, n'hésitez pas si vous avez des questions.",
    date: "Hier, 10:15",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "farmer",
        text: "Bonjour Mme Martin, je vous confirme que votre commande a bien été préparée.",
        date: "Hier, 09:45"
      },
      {
        id: 2,
        sender: "farmer",
        text: "Merci pour votre commande, n'hésitez pas si vous avez des questions.",
        date: "Hier, 10:15"
      }
    ]
  },
  {
    id: 3,
    customer: {
      id: 3,
      name: "Thomas Leroy",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop"
    },
    lastMessage: "Est-ce que vous avez des légumes de saison cette semaine?",
    date: "Lundi, 15:45",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Bonjour, je suis intéressé par vos produits de saison.",
        date: "Lundi, 15:40"
      },
      {
        id: 2,
        sender: "customer",
        text: "Est-ce que vous avez des légumes de saison cette semaine?",
        date: "Lundi, 15:45"
      }
    ]
  },
  {
    id: 4,
    customer: {
      id: 4,
      name: "Marie Dufour",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop"
    },
    lastMessage: "Bonjour, je souhaiterais commander quelques produits pour une occasion spéciale.",
    date: "Dimanche, 12:20",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Bonjour, je souhaiterais commander quelques produits pour une occasion spéciale.",
        date: "Dimanche, 12:20"
      }
    ]
  }
];

const FarmerMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState<typeof conversations[0] | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    toast({
      title: "Message envoyé",
      description: `Votre message a été envoyé à ${selectedConversation.customer.name}`,
    });
    
    // Dans une vraie app, mise à jour de l'état
    setNewMessage("");
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
          <h1 className="text-3xl font-bold">Messagerie</h1>
          {conversations.filter(c => c.unread).length > 0 && (
            <Badge className="bg-agrimarket-green px-3 py-1 text-sm">
              {conversations.filter(c => c.unread).length} message{conversations.filter(c => c.unread).length > 1 ? 's' : ''} non lu{conversations.filter(c => c.unread).length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Rechercher un client..."
                  className="pl-8 pr-4"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredConversations.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">Aucune conversation trouvée</p>
                ) : (
                  filteredConversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedConversation?.id === conversation.id 
                          ? 'bg-agrimarket-orange/10 border border-agrimarket-orange/20' 
                          : 'hover:bg-gray-100 border border-transparent'
                      } ${conversation.unread ? 'border-l-4 border-l-agrimarket-green' : ''}`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <img src={conversation.customer.avatar} alt={conversation.customer.name} />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="font-medium truncate">{conversation.customer.name}</p>
                            <p className="text-xs text-gray-500">{conversation.date}</p>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="border-b">
              {selectedConversation ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={selectedConversation.customer.avatar} alt={selectedConversation.customer.name} />
                  </Avatar>
                  <div>
                    <CardTitle>{selectedConversation.customer.name}</CardTitle>
                    <CardDescription>Client</CardDescription>
                  </div>
                </div>
              ) : (
                <CardTitle>Sélectionnez une conversation</CardTitle>
              )}
            </CardHeader>
            <CardContent className="p-0">
              {selectedConversation ? (
                <div className="flex flex-col h-[500px]">
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {selectedConversation.messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === 'farmer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender === 'farmer' 
                              ? 'bg-agrimarket-orange text-white' 
                              : 'bg-gray-100'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${message.sender === 'farmer' ? 'text-white/70' : 'text-gray-500'}`}>
                            {message.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Textarea 
                        placeholder="Écrivez votre message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 min-h-[100px]"
                      />
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button 
                        className="bg-agrimarket-orange hover:bg-orange-600 flex gap-2"
                        onClick={handleSendMessage}
                      >
                        <Send size={18} />
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[500px] text-gray-500">
                  <p>Sélectionnez une conversation pour afficher les messages</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Modèles de réponse</CardTitle>
            <CardDescription>
              Réponses prédéfinies pour une communication efficace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="justify-start h-auto py-3 px-4 text-left"
                onClick={() => setNewMessage("Bonjour, merci pour votre message. Je suis heureux de pouvoir vous aider.")}
              >
                <div>
                  <p className="font-medium">Salutation</p>
                  <p className="text-xs text-gray-500 truncate">Bonjour, merci pour votre message. Je suis heureux de pouvoir vous aider.</p>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto py-3 px-4 text-left"
                onClick={() => setNewMessage("Votre commande a bien été préparée et sera disponible pour livraison ou retrait demain comme prévu.")}
              >
                <div>
                  <p className="font-medium">Commande prête</p>
                  <p className="text-xs text-gray-500 truncate">Votre commande a bien été préparée et sera disponible pour livraison ou retrait demain comme prévu.</p>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto py-3 px-4 text-left"
                onClick={() => setNewMessage("Merci de votre intérêt pour nos produits. N'hésitez pas si vous avez d'autres questions.")}
              >
                <div>
                  <p className="font-medium">Remerciement</p>
                  <p className="text-xs text-gray-500 truncate">Merci de votre intérêt pour nos produits. N'hésitez pas si vous avez d'autres questions.</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerMessages;

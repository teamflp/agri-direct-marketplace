
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, FileText, Heart, MessageSquare, Users, User, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Mock data for messages
const conversations = [
  {
    id: 1,
    farmer: {
      id: 1,
      name: "Sophie Dubois",
      farm: "Ferme des Quatre Saisons",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
    },
    lastMessage: "Bonjour, votre commande sera prête demain comme prévu!",
    date: "Aujourd'hui, 14:32",
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
        sender: "buyer",
        text: "Bonjour Mme Dubois, tout va bien merci! Je voulais savoir si ma commande serait prête demain?",
        date: "Aujourd'hui, 14:30"
      },
      {
        id: 3,
        sender: "farmer",
        text: "Bonjour, votre commande sera prête demain comme prévu!",
        date: "Aujourd'hui, 14:32"
      }
    ]
  },
  {
    id: 2,
    farmer: {
      id: 2,
      name: "Jean Leclerc",
      farm: "Les Ruches de Marie",
      avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop"
    },
    lastMessage: "Merci pour votre commande, n'hésitez pas si vous avez des questions.",
    date: "Hier, 10:15",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "farmer",
        text: "Bonjour M. Pasquier, je vous confirme que votre commande a bien été préparée.",
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
    farmer: {
      id: 3,
      name: "Michel Blanc",
      farm: "Potager du Village",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    lastMessage: "Les tomates que vous avez commandées sont particulièrement belles cette semaine!",
    date: "Lundi, 16:20",
    unread: false,
    messages: [
      {
        id: 1,
        sender: "farmer",
        text: "Bonjour M. Pasquier, j'ai une bonne nouvelle pour vous!",
        date: "Lundi, 16:18"
      },
      {
        id: 2,
        sender: "farmer",
        text: "Les tomates que vous avez commandées sont particulièrement belles cette semaine!",
        date: "Lundi, 16:20"
      }
    ]
  }
];

const BuyerMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState<typeof conversations[0] | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
  ];
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    toast({
      title: "Message envoyé",
      description: `Votre message a été envoyé à ${selectedConversation.farmer.name}`,
    });
    
    // Dans une application réelle, on ajouterait le message à la conversation
    setNewMessage("");
  };

  return (
    <DashboardLayout
      name="Martin Pasquier"
      email="martin.p@email.com"
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          MP
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Messagerie</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <CardDescription>
                Vos échanges avec les agriculteurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversations.map((conversation) => (
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
                        <img src={conversation.farmer.avatar} alt={conversation.farmer.name} />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="font-medium truncate">{conversation.farmer.name}</p>
                          <p className="text-xs text-gray-500">{conversation.date}</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-gray-400">{conversation.farmer.farm}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="border-b">
              {selectedConversation ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={selectedConversation.farmer.avatar} alt={selectedConversation.farmer.name} />
                  </Avatar>
                  <div>
                    <CardTitle>{selectedConversation.farmer.name}</CardTitle>
                    <CardDescription>{selectedConversation.farmer.farm}</CardDescription>
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
                        className={`flex ${message.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender === 'buyer' 
                              ? 'bg-agrimarket-orange text-white' 
                              : 'bg-gray-100'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${message.sender === 'buyer' ? 'text-white/70' : 'text-gray-500'}`}>
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
      </div>
    </DashboardLayout>
  );
};

export default BuyerMessages;

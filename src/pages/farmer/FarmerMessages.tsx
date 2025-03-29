
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
import { useMessages } from '@/contexts/MessageContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const FarmerMessages = () => {
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { messageState, setActiveConversation, sendMessage } = useMessages();
  const { conversations, activeConversationId } = messageState;
  
  const selectedConversation = activeConversationId 
    ? conversations.find(c => c.id === activeConversationId) 
    : null;
  
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
    conversation.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    sendMessage(
      selectedConversation.id,
      newMessage,
      selectedConversation.farmerId,
      'farmer'
    );
    
    setNewMessage("");
  };

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Aujourd'hui, ${format(date, 'HH:mm')}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Hier, ${format(date, 'HH:mm')}`;
    } else {
      return format(date, 'dd MMMM, HH:mm', { locale: fr });
    }
  };

  // Handle keyboard shortcut for sending message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSendMessage();
    }
  };

  // Handle reply template selection
  const handleReplyTemplate = (templateText: string) => {
    setNewMessage(templateText);
  };

  const unreadCount = conversations.filter(c => c.unread).length;

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
          {unreadCount > 0 && (
            <Badge className="bg-agrimarket-green px-3 py-1 text-sm">
              {unreadCount} message{unreadCount > 1 ? 's' : ''} non lu{unreadCount > 1 ? 's' : ''}
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
                        activeConversationId === conversation.id 
                          ? 'bg-agrimarket-orange/10 border border-agrimarket-orange/20' 
                          : 'hover:bg-gray-100 border border-transparent'
                      } ${conversation.unread ? 'border-l-4 border-l-agrimarket-green' : ''}`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <img src={conversation.customerAvatar} alt={conversation.customerName} />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <p className="font-medium truncate">{conversation.customerName}</p>
                            <p className="text-xs text-gray-500">{formatMessageDate(conversation.lastMessageDate)}</p>
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
                    <img src={selectedConversation.customerAvatar} alt={selectedConversation.customerName} />
                  </Avatar>
                  <div>
                    <CardTitle>{selectedConversation.customerName}</CardTitle>
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
                        className={`flex ${message.senderType === 'farmer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.senderType === 'farmer' 
                              ? 'bg-agrimarket-orange text-white' 
                              : 'bg-gray-100'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${message.senderType === 'farmer' ? 'text-white/70' : 'text-gray-500'}`}>
                            {formatMessageDate(message.date)}
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
                        onKeyDown={handleKeyDown}
                        className="flex-1 min-h-[100px]"
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="text-xs text-gray-500 italic self-end">
                        Appuyez sur Ctrl+Entrée pour envoyer
                      </p>
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
                onClick={() => handleReplyTemplate("Bonjour, merci pour votre message. Je suis heureux de pouvoir vous aider.")}
              >
                <div>
                  <p className="font-medium">Salutation</p>
                  <p className="text-xs text-gray-500 truncate">Bonjour, merci pour votre message. Je suis heureux de pouvoir vous aider.</p>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto py-3 px-4 text-left"
                onClick={() => handleReplyTemplate("Votre commande a bien été préparée et sera disponible pour livraison ou retrait demain comme prévu.")}
              >
                <div>
                  <p className="font-medium">Commande prête</p>
                  <p className="text-xs text-gray-500 truncate">Votre commande a bien été préparée et sera disponible pour livraison ou retrait demain comme prévu.</p>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="justify-start h-auto py-3 px-4 text-left"
                onClick={() => handleReplyTemplate("Merci de votre intérêt pour nos produits. N'hésitez pas si vous avez d'autres questions.")}
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

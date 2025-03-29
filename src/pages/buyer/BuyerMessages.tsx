
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, FileText, Heart, MessageSquare, Users, User, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useMessages } from '@/contexts/MessageContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const BuyerMessages = () => {
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  const { messageState, setActiveConversation, sendMessage } = useMessages();
  const { conversations, activeConversationId } = messageState;
  
  const selectedConversation = activeConversationId 
    ? conversations.find(c => c.id === activeConversationId) 
    : null;
  
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
    
    sendMessage(
      selectedConversation.id,
      newMessage,
      selectedConversation.customerId,
      'customer'
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
                      activeConversationId === conversation.id 
                        ? 'bg-agrimarket-orange/10 border border-agrimarket-orange/20' 
                        : 'hover:bg-gray-100 border border-transparent'
                    } ${conversation.unread ? 'border-l-4 border-l-agrimarket-green' : ''}`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <img src={conversation.farmerAvatar} alt={conversation.farmerName} />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="font-medium truncate">{conversation.farmerName}</p>
                          <p className="text-xs text-gray-500">{formatMessageDate(conversation.lastMessageDate)}</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {conversations.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <p>Aucune conversation</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="border-b">
              {selectedConversation ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={selectedConversation.farmerAvatar} alt={selectedConversation.farmerName} />
                  </Avatar>
                  <div>
                    <CardTitle>{selectedConversation.farmerName}</CardTitle>
                    <CardDescription>Agriculteur</CardDescription>
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
                        className={`flex ${message.senderType === 'customer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.senderType === 'customer' 
                              ? 'bg-agrimarket-orange text-white' 
                              : 'bg-gray-100'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${message.senderType === 'customer' ? 'text-white/70' : 'text-gray-500'}`}>
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
      </div>
    </DashboardLayout>
  );
};

export default BuyerMessages;

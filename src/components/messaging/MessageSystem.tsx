import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { MessageSquare, Send, User } from 'lucide-react';

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject?: string | null;
  content: string;
  read: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  sender?: {
    email: string;
  };
  recipient?: {
    email: string;
  };
}

interface MessageSystemProps {
  recipientId?: string;
  recipientName?: string;
}

export const MessageSystem: React.FC<MessageSystemProps> = ({ recipientId, recipientName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchMessages = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('farmer_messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!user || !newMessage.trim()) return;
    if (!recipientId && !selectedConversation) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('farmer_messages')
        .insert([{
          sender_id: user.id,
          recipient_id: recipientId || selectedConversation || '',
          subject: subject || null,
          content: newMessage,
        }]);

      if (error) throw error;
      
      setNewMessage('');
      setSubject('');
      await fetchMessages();
      toast.success('Message envoyé !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast.error('Erreur lors de l\'envoi du message');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('farmer_messages')
        .update({ read: true })
        .eq('id', messageId)
        .eq('recipient_id', user?.id || '');

      if (error) throw error;
      await fetchMessages();
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user]);

  const getConversationMessages = (conversationId: string) => {
    return messages.filter(msg => 
      (msg.sender_id === user?.id && msg.recipient_id === conversationId) ||
      (msg.sender_id === conversationId && msg.recipient_id === user?.id)
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
      {/* Liste des conversations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2">
            {recipientId && (
              <div 
                className={`p-3 hover:bg-muted cursor-pointer ${
                  selectedConversation === recipientId ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedConversation(recipientId)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{recipientName}</p>
                    <p className="text-sm text-muted-foreground">Nouvelle conversation</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Afficher les conversations existantes */}
            {Array.from(new Set(messages.map(msg => 
              msg.sender_id === user?.id ? msg.recipient_id : msg.sender_id
            ))).map(conversationId => (
              <div 
                key={conversationId}
                className={`p-3 hover:bg-muted cursor-pointer ${
                  selectedConversation === conversationId ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedConversation(conversationId)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">Conversation</p>
                    <p className="text-sm text-muted-foreground">
                      {getConversationMessages(conversationId)[0]?.content.slice(0, 50)}...
                    </p>
                  </div>
                  {getConversationMessages(conversationId).some(msg => 
                    !msg.read && msg.recipient_id === user?.id
                  ) && (
                    <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center">
                      !
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Messages de la conversation */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[450px]">
          {selectedConversation ? (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {getConversationMessages(selectedConversation).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender_id === user?.id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender_id === user?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.subject && (
                        <p className="font-semibold text-sm mb-1">{message.subject}</p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.created_at ? new Date(message.created_at).toLocaleString() : 'Date inconnue'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="mt-4 space-y-2">
                <Input
                  placeholder="Sujet (optionnel)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    rows={3}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={loading || !newMessage.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold">Sélectionnez une conversation</p>
                <p className="text-muted-foreground">Choisissez une conversation pour voir les messages</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
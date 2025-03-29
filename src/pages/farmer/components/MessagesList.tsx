
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MessageType {
  id: number;
  customer: string;
  lastMessage: string;
  date: string;
  unread: boolean;
}

interface MessagesListProps {
  messages: MessageType[];
}

const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversations avec les clients</CardTitle>
        <CardDescription>
          Répondez aux questions et demandes de vos clients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`border hover:shadow-md transition-shadow ${message.unread ? 'border-l-4 border-l-agrimarket-green' : ''}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium flex items-center">
                      {message.customer} 
                      {message.unread && (
                        <span className="ml-2 bg-agrimarket-green w-2 h-2 rounded-full"></span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{message.date}</p>
                    <p className="mt-2">{message.lastMessage}</p>
                  </div>
                  <Button className="bg-agrimarket-green hover:bg-agrimarket-green/90">
                    Répondre
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesList;

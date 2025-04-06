
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data for messages
const messages = [
  {
    id: 1,
    farmer: "Ferme des Quatre Saisons",
    lastMessage: "Bonjour, votre commande sera prête demain comme prévu!",
    date: "Aujourd'hui, 14:32",
    unread: true
  },
  {
    id: 2,
    farmer: "Les Ruches de Marie",
    lastMessage: "Merci pour votre commande, n'hésitez pas si vous avez des questions.",
    date: "Hier, 10:15",
    unread: false
  },
];

const BuyerDashboardMessagesTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messagerie</CardTitle>
        <CardDescription>
          Vos conversations avec les agriculteurs
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
                      {message.farmer} 
                      {message.unread && (
                        <span className="ml-2 bg-agrimarket-green w-2 h-2 rounded-full"></span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{message.date}</p>
                    <p className="mt-2">{message.lastMessage}</p>
                  </div>
                  <Button className="bg-agrimarket-orange hover:bg-orange-600" asChild>
                    <Link to="/buyer-dashboard/messages">
                      Répondre
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline" asChild>
          <Link to="/buyer-dashboard/messages">
            Voir tous les messages
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BuyerDashboardMessagesTab;

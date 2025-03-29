
import React from 'react';
import { EventType } from '../types/blogTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar, MapPin, Users, Eye } from 'lucide-react';

interface EventsListProps {
  events: EventType[];
}

const EventsList = ({ events }: EventsListProps) => {
  // Fonction pour formater la date
  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    const startFormatted = start.toLocaleDateString('fr-FR', options);
    
    // Si c'est le même jour, afficher seulement l'heure de fin
    if (start.toDateString() === end.toDateString()) {
      return `${startFormatted} - ${end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Sinon, afficher la date et l'heure de fin complètes
    return `${startFormatted} - ${end.toLocaleDateString('fr-FR', options)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">À venir</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">En cours</Badge>;
      case 'past':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Passé</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500">Aucun événement pour le moment</p>
        </div>
      ) : (
        events.map((event) => (
          <Card key={event.id} className="overflow-hidden border-gray-200 hover:border-gray-300 transition-all">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 h-48 md:h-auto">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex-1 p-4 md:p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {getStatusBadge(event.status)}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatEventDate(event.startDate, event.endDate)}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="mr-2 h-4 w-4" />
                    {event.attendees} participants
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Voir
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default EventsList;

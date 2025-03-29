
import React, { useState } from 'react';
import { useDelivery, DeliverySlot } from '@/contexts/DeliveryContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, isToday, isThisWeek, isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from '@/components/ui/notifications';

interface DeliverySlotSelectorProps {
  orderId: string;
  onSelect?: (slotId: string) => void;
}

export function DeliverySlotSelector({ orderId, onSelect }: DeliverySlotSelectorProps) {
  const { availableSlots, scheduleDelivery } = useDelivery();
  const { toast } = useToast();
  const { showNotification } = useNotifications();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const today = new Date();
  
  // Group slots by date
  const groupedSlots: Record<string, DeliverySlot[]> = {};
  availableSlots.forEach(slot => {
    // Skip past dates
    if (!isAfter(slot.date, today)) return;
    
    const dateStr = format(slot.date, 'yyyy-MM-dd');
    if (!groupedSlots[dateStr]) {
      groupedSlots[dateStr] = [];
    }
    groupedSlots[dateStr].push(slot);
  });
  
  // Split into today, this week, and later
  const todayDateStr = format(today, 'yyyy-MM-dd');
  
  const todaySlots = groupedSlots[todayDateStr] || [];
  
  const thisWeekSlots: DeliverySlot[] = [];
  const laterSlots: DeliverySlot[] = [];
  
  Object.keys(groupedSlots).forEach(dateStr => {
    if (dateStr === todayDateStr) return;
    
    const date = new Date(dateStr);
    const slots = groupedSlots[dateStr];
    
    if (isThisWeek(date, { weekStartsOn: 1 })) {
      thisWeekSlots.push(...slots);
    } else {
      laterSlots.push(...slots);
    }
  });
  
  const handleSelect = () => {
    if (!selectedSlot) return;
    
    scheduleDelivery(orderId, selectedSlot);
    
    const slot = availableSlots.find(s => s.id === selectedSlot);
    
    if (slot) {
      toast({
        title: "Créneau de livraison programmé",
        description: `Votre livraison est programmée pour le ${format(slot.date, 'EEEE dd MMMM', { locale: fr })} entre ${slot.timeWindow}`,
        variant: "success",
      });
      
      showNotification({
        type: 'delivery',
        title: 'Livraison programmée',
        description: `Votre livraison est programmée pour le ${format(slot.date, 'dd/MM')} entre ${slot.timeWindow}`,
      });
    }
    
    onSelect && onSelect(selectedSlot);
  };
  
  const renderSlot = (slot: DeliverySlot) => (
    <div 
      key={slot.id}
      className={`border rounded-md p-3 cursor-pointer transition-colors ${
        !slot.available 
          ? 'bg-gray-100 opacity-60 cursor-not-allowed' 
          : selectedSlot === slot.id
          ? 'border-black bg-gray-50'
          : 'hover:border-gray-400 border-gray-200'
      }`}
      onClick={() => slot.available && setSelectedSlot(slot.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{slot.timeWindow}</span>
        </div>
        
        {!slot.available && (
          <span className="text-xs text-gray-500">Non disponible</span>
        )}
      </div>
    </div>
  );
  
  const renderDateGroup = (date: Date, slots: DeliverySlot[]) => {
    const availableSlots = slots.filter(slot => 
      format(slot.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && slot.available
    );
    
    if (availableSlots.length === 0) return null;
    
    return (
      <div key={format(date, 'yyyy-MM-dd')} className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <h3 className="font-medium">
            {isToday(date) ? 'Aujourd\'hui' : format(date, 'EEEE dd MMMM', { locale: fr })}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {slots
            .filter(slot => format(slot.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
            .map(renderSlot)}
        </div>
      </div>
    );
  };
  
  const renderSlotsByPeriod = (slots: DeliverySlot[]) => {
    if (slots.length === 0) {
      return <p className="text-gray-500 text-center py-4">Aucun créneau disponible</p>;
    }
    
    // Group by date
    const dateGroups: Record<string, DeliverySlot[]> = {};
    slots.forEach(slot => {
      const dateStr = format(slot.date, 'yyyy-MM-dd');
      if (!dateGroups[dateStr]) {
        dateGroups[dateStr] = [];
      }
      dateGroups[dateStr].push(slot);
    });
    
    return (
      <div className="space-y-4">
        {Object.keys(dateGroups).map(dateStr => 
          renderDateGroup(new Date(dateStr), dateGroups[dateStr])
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Choisir un créneau de livraison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
            <TabsTrigger value="this-week">Cette semaine</TabsTrigger>
            <TabsTrigger value="later">Plus tard</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-4">
            {renderSlotsByPeriod(todaySlots)}
          </TabsContent>
          <TabsContent value="this-week" className="mt-4">
            {renderSlotsByPeriod(thisWeekSlots)}
          </TabsContent>
          <TabsContent value="later" className="mt-4">
            {renderSlotsByPeriod(laterSlots)}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button 
          disabled={!selectedSlot} 
          onClick={handleSelect}
          className="w-full"
        >
          Confirmer le créneau de livraison
        </Button>
      </CardFooter>
    </Card>
  );
}

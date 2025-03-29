
import React, { useState } from 'react';
import { useDelivery, DeliveryOption } from '@/contexts/DeliveryContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, Home, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/components/ui/notifications';

interface DeliveryMethodSelectorProps {
  orderId: string;
  onSelect?: (methodId: string) => void;
}

export function DeliveryMethodSelector({ orderId, onSelect }: DeliveryMethodSelectorProps) {
  const { deliveryOptions, selectDeliveryMethod } = useDelivery();
  const { toast } = useToast();
  const { showNotification } = useNotifications();
  const [selectedMethod, setSelectedMethod] = useState<string>(deliveryOptions[0]?.id || '');

  const getMethodIcon = (method: DeliveryOption['method']) => {
    switch (method) {
      case 'standard':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'express':
        return <Package className="h-5 w-5 text-green-500" />;
      case 'pickup':
        return <Home className="h-5 w-5 text-amber-500" />;
      default:
        return <Truck className="h-5 w-5" />;
    }
  };

  const handleSelect = () => {
    if (!selectedMethod) return;
    
    selectDeliveryMethod(orderId, selectedMethod);
    
    const selectedOption = deliveryOptions.find(opt => opt.id === selectedMethod);
    
    if (selectedOption) {
      toast({
        title: "Méthode de livraison sélectionnée",
        description: `${selectedOption.name} a été sélectionnée pour votre commande`,
        variant: "success",
      });
      
      showNotification({
        type: 'delivery',
        title: 'Méthode de livraison confirmée',
        description: `Votre choix de livraison (${selectedOption.name}) a été enregistré`,
      });
    }
    
    onSelect && onSelect(selectedMethod);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Options de livraison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedMethod} 
          onValueChange={setSelectedMethod}
          className="space-y-4"
        >
          {deliveryOptions.map((option) => (
            <div 
              key={option.id}
              className={`flex items-start p-4 border rounded-md cursor-pointer hover:border-gray-400 transition-colors ${
                selectedMethod === option.id ? 'border-black bg-gray-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedMethod(option.id)}
            >
              <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor={option.id} className="font-medium text-lg cursor-pointer">
                    {option.name}
                  </Label>
                  {getMethodIcon(option.method)}
                </div>
                <p className="text-gray-500 mt-1">
                  {option.description}
                </p>
                <div className="mt-2 font-medium">
                  {option.price === 0 
                    ? <span className="text-green-600">Gratuit</span> 
                    : `${option.price.toLocaleString()} FCFA`}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button 
          disabled={!selectedMethod} 
          onClick={handleSelect}
          className="w-full"
        >
          Confirmer la méthode de livraison
        </Button>
      </CardFooter>
    </Card>
  );
}

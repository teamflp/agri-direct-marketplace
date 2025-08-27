import React, { useState, useEffect } from 'react';
import { DeliveryOption } from '@/contexts/DeliveryContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, Home, Calendar, Zap } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface DeliveryMethodSelectorProps {
  options: DeliveryOption[];
  onSelect: (methodId: string) => void;
}

export function DeliveryMethodSelector({ options, onSelect }: DeliveryMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const { formatPrice } = useCurrency();

  useEffect(() => {
    // Si les options changent et que la sélection actuelle n'est plus valide, on la réinitialise.
    if (selectedMethod && !options.find(opt => opt.id === selectedMethod)) {
      setSelectedMethod('');
      onSelect('');
    }
  }, [options, selectedMethod, onSelect]);

  const handleSelectionChange = (value: string) => {
    setSelectedMethod(value);
    onSelect(value);
  };

  const getMethodIcon = (method: DeliveryOption['method']) => {
    switch (method) {
      case 'standard':
      case 'colissimo':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'express':
      case 'chronopost':
        return <Zap className="h-5 w-5 text-purple-500" />;
      case 'pickup':
      case 'local':
        return <Home className="h-5 w-5 text-amber-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  if (!options || options.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Aucune option de livraison disponible pour cette adresse.
      </div>
    );
  }

  return (
    <>
      <CardHeader className="pt-4 px-4 pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Calendar className="h-5 w-5" />
          Options de livraison
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <RadioGroup
          value={selectedMethod}
          onValueChange={handleSelectionChange}
          className="space-y-3"
        >
          {options.map((option) => (
            <Label
              key={option.id}
              htmlFor={option.id}
              className={`flex items-start p-3 border rounded-md cursor-pointer hover:border-gray-400 transition-colors ${
                selectedMethod === option.id ? 'border-black bg-gray-50' : 'border-gray-200'
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-md">
                    {option.name}
                  </span>
                  {getMethodIcon(option.method)}
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {option.description}
                </p>
                <div className="mt-2 font-semibold">
                  {option.price === 0
                    ? <span className="text-green-600">Gratuit</span>
                    : formatPrice(option.price)}
                </div>
              </div>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </>
  );
}

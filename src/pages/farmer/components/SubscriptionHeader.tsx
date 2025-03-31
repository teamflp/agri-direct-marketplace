
import React from 'react';
import { CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface SubscriptionHeaderProps {
  plan: string;
  status: string;
}

const SubscriptionHeader = ({ plan, status }: SubscriptionHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center">
      <div>
        <CardTitle>Forfait actuel: {plan}</CardTitle>
        <CardDescription>
          Gérez votre abonnement et vos factures
        </CardDescription>
      </div>
      <div className="mt-4 md:mt-0 flex items-center">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          status === "Actif" 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {status === "Actif" ? (
            <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
          ) : (
            <AlertCircle className="w-4 h-4 mr-1 text-yellow-600" />
          )}
          {status}
        </span>
      </div>
    </div>
  );
};

export default SubscriptionHeader;

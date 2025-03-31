
import React from 'react';
import { Calendar } from 'lucide-react';
import PaymentMethodDialog from './PaymentMethodDialog';

interface BillingDetailsProps {
  subscription: {
    price: number;
    nextBilling: string;
    startDate: string;
    paymentMethod: {
      type: string;
      last4: string;
      expiry: string;
    }
  }
}

const BillingDetails = ({ subscription }: BillingDetailsProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Détails de l'abonnement</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <span className="text-gray-600">Prix mensuel</span>
          <span className="font-semibold">{subscription.price.toLocaleString()} FCFA</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <span className="text-gray-600">Prochaine facturation</span>
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
            {subscription.nextBilling}
          </span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <span className="text-gray-600">Date d'inscription</span>
          <span>{subscription.startDate}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
          <span className="text-gray-600">Moyen de paiement</span>
          <span>•••• {subscription.paymentMethod.last4} (expire {subscription.paymentMethod.expiry})</span>
        </div>
      </div>
      <div className="mt-4">
        <PaymentMethodDialog />
      </div>
    </div>
  );
};

export default BillingDetails;


import React from 'react';
import { CheckoutForm } from '@/components/payments/CheckoutForm';

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Finaliser votre commande
          </h1>
          <p className="text-gray-600">
            Vérifiez vos informations et procédez au paiement
          </p>
        </div>
        
        <CheckoutForm />
      </div>
    </div>
  );
};

export default Checkout;

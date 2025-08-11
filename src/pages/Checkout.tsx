
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckoutForm } from '@/components/payments/CheckoutForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 bg-gray-50 pb-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              className="mr-2 text-gray-600 hover:text-agrimarket-green" 
              onClick={() => navigate('/cart')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au panier
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Finaliser la commande</h1>
          </div>

          <CheckoutForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;

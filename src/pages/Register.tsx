
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EnhancedSecureRegisterForm from '@/components/auth/EnhancedSecureRegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Rejoignez AgriMarket</h1>
              <p className="text-gray-600">
                Créez votre compte pour accéder aux meilleurs produits locaux
              </p>
            </div>
            
            <EnhancedSecureRegisterForm />
            
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Vous avez déjà un compte ?{' '}
                <Link 
                  to="/login" 
                  className="text-agrimarket-orange hover:text-agrimarket-brown font-medium"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;

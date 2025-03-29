
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NotificationsDemo from '@/components/notifications/NotificationsDemo';

const NotificationsDemoPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">Démonstration des Notifications</h1>
            <p className="text-center text-gray-600 mb-8">
              Cette page vous permet de tester le système de notifications d'AgriMarket
            </p>
            
            <NotificationsDemo />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotificationsDemoPage;

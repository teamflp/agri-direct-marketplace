
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SeasonalCalendarView from '@/components/seasonal/SeasonalCalendarView';

const SeasonalCalendar = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 sm:pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Calendrier saisonnier</h1>
            <p className="text-gray-600">Découvrez les produits disponibles selon les saisons</p>
          </div>
          
          <SeasonalCalendarView />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeasonalCalendar;

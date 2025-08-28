
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SeasonalCalendarView from '@/components/seasonal/SeasonalCalendarView';
import { Leaf } from 'lucide-react';
import SeasonalAIRecommendations from '@/components/ai/SeasonalAIRecommendations';

const SeasonalCalendar = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 sm:pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">Calendrier saisonnier</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les produits disponibles selon les saisons pour manger local, 
              frais et de manière responsable <Leaf className="inline h-5 w-5 text-green-600" />
            </p>
          </div>
          
          <div className="mb-8">
            <SeasonalAIRecommendations />
          </div>
          
          <div className="mb-8">
            <SeasonalCalendarView />
          </div>
          
          <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Pourquoi manger de saison ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg bg-green-50">
                <h3 className="font-bold text-lg mb-2">Meilleur goût</h3>
                <p className="text-gray-700">Les fruits et légumes de saison sont récoltés à maturité et ont donc une saveur optimale.</p>
              </div>
              <div className="p-4 border rounded-lg bg-blue-50">
                <h3 className="font-bold text-lg mb-2">Meilleure valeur nutritive</h3>
                <p className="text-gray-700">Récoltés à maturité, ils contiennent davantage de nutriments essentiels à notre santé.</p>
              </div>
              <div className="p-4 border rounded-lg bg-yellow-50">
                <h3 className="font-bold text-lg mb-2">Plus écologique</h3>
                <p className="text-gray-700">Réduisez votre empreinte carbone en consommant des produits locaux qui n'ont pas parcouru des milliers de kilomètres.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeasonalCalendar;

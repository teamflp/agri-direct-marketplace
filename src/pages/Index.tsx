
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturesSection from "@/components/home/FeaturesSection";
import MapSection from "@/components/home/MapSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SubscriptionSection from "@/components/home/SubscriptionSection";
import SeasonalProductsRecommendations from "@/components/seasonal/SeasonalProductsRecommendations";
import MemberOnlyAdvice from "@/components/home/MemberOnlyAdvice";
import SecuritySection from "@/components/home/SecuritySection";
import MarketStats from "@/components/home/MarketStats";
import HowItWorks from "@/components/home/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <HeroBanner />
        
        {/* Statistiques du marché */}
        <MarketStats />
        
        {/* Comment ça marche */}
        <HowItWorks />
        
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Produits recommandés
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez notre sélection de produits de saison, cultivés avec passion par nos agriculteurs partenaires
              </p>
            </div>
            <SeasonalProductsRecommendations />
          </div>
        </div>
        
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Conseils personnalisés
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des idées et astuces pour vous aider à consommer et produire mieux
              </p>
            </div>
            <MemberOnlyAdvice />
          </div>
        </div>
        
        <FeaturesSection />
        <SecuritySection />
        <MapSection />
        <TestimonialsSection />
        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

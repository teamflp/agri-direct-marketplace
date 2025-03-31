
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroBanner />
        <div className="container mx-auto px-4 py-12">
          {/* Section Produits recommandés */}
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-3xl font-bold">Produits recommandés</h2>
            </div>
            <SeasonalProductsRecommendations />
          </div>
          
          {/* Section Conseils personnalisés */}
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-3xl font-bold">Conseils personnalisés</h2>
              <p className="text-gray-600">Des idées et astuces pour vous aider à consommer et produire mieux</p>
            </div>
            <MemberOnlyAdvice />
          </div>
        </div>
        <FeaturesSection />
        <MapSection />
        <TestimonialsSection />
        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

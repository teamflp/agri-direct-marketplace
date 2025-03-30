
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturesSection from "@/components/home/FeaturesSection";
import MapSection from "@/components/home/MapSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SubscriptionSection from "@/components/home/SubscriptionSection";
import ProductSuggestions from "@/components/ai/ProductSuggestions";
import SeasonalRecipesCard from "@/components/ai/SeasonalRecipesCard";
import GardeningTipsCard from "@/components/ai/GardeningTipsCard";
import ApiKeyDialog from "@/components/ai/ApiKeyDialog";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroBanner />
        <div className="container mx-auto px-4 py-12">
          {/* Section Produits recommandés */}
          <div className="mb-8">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-3xl font-bold">Produits recommandés</h2>
              <ApiKeyDialog 
                trigger={
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Config IA
                  </button>
                }
              />
            </div>
            <ProductSuggestions />
          </div>
          
          {/* Section Conseils personnalisés */}
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-3xl font-bold">Conseils personnalisés</h2>
              <p className="text-gray-600">Des idées et astuces pour vous aider à consommer et produire mieux</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <SeasonalRecipesCard />
              <GardeningTipsCard />
            </div>
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

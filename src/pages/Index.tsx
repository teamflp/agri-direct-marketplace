
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
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-3xl font-bold">Produits recommandés</h2>
            <ApiKeyDialog />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            <div className="lg:col-span-3">
              <ProductSuggestions />
            </div>
          </div>
          
          <div className="mb-4">
            <h2 className="text-3xl font-bold">Conseils personnalisés</h2>
            <p className="text-gray-600">Des idées et astuces pour vous aider à consommer et produire mieux</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <SeasonalRecipesCard />
            <GardeningTipsCard />
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

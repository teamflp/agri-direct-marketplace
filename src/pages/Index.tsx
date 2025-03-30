
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturesSection from "@/components/home/FeaturesSection";
import MapSection from "@/components/home/MapSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SubscriptionSection from "@/components/home/SubscriptionSection";
import ProductSuggestions from "@/components/ai/ProductSuggestions";
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

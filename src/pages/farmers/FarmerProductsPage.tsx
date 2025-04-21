
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, ShoppingCart } from "lucide-react";

const FarmerProductsPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Button asChild variant="ghost" className="mb-4 flex items-center text-gray-600">
            <Link to={`/farmers/${id}`}>
              <ChevronLeft className="mr-1"/> Retour au profil
            </Link>
          </Button>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-agrimarket-green" />
            <h1 className="text-2xl font-bold mb-2">Produits de l'agriculteur</h1>
            <p className="text-gray-600">Liste des produits proposés par ce producteur (à compléter prochainement).</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FarmerProductsPage;

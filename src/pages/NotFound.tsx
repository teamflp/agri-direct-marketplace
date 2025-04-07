
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-center max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle size={48} className="text-red-500" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mb-6">
              Oops! Cette page n'existe pas
            </p>
            <p className="text-gray-500 mb-8">
              La page que vous recherchez n'est pas disponible ou a été déplacée.
            </p>
            
            <div className="flex flex-col space-y-3">
              <Button asChild className="bg-agrimarket-orange hover:bg-agrimarket-brown">
                <Link to="/">
                  Retour à l'accueil
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/products">
                  Voir nos produits
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;


import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Simule une liste de produits pour affichage
const mockProducts = [
  {
    id: 1,
    name: "Tomates Bio",
    price: 3.50,
    description: "Des tomates fraîches et bio, cultivées sur place.",
    image: "https://images.unsplash.com/photo-1592924357177-333f73b4c1dd?w=300&h=300&fit=crop",
    unit: "kg",
    available: true,
  },
  {
    id: 2,
    name: "Carottes",
    price: 2.00,
    description: "Croquantes et locales !",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop",
    unit: "kg",
    available: false,
  },
  {
    id: 3,
    name: "Fraises",
    price: 5.00,
    description: "Délicieuses fraises sucrées.",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop",
    unit: "barquette",
    available: true,
  },
];

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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
              <ShoppingCart className="w-8 h-8 text-agrimarket-green" />
              Produits de l'agriculteur
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockProducts.map(product => (
                <Card key={product.id} className="flex flex-col items-center p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-28 h-28 object-cover rounded mb-3"
                  />
                  <CardContent className="flex flex-col items-center">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <Badge className="mb-2">{product.unit}</Badge>
                    <p className="text-agrimarket-green font-bold mb-2">{product.price.toFixed(2)} € / {product.unit}</p>
                    <p className="text-sm text-gray-600 mb-2 text-center">{product.description}</p>
                    <div>
                      {product.available ? (
                        <Badge variant="green">Disponible</Badge>
                      ) : (
                        <Badge variant="destructive">Indisponible</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FarmerProductsPage;

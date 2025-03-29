
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { AddToCartButton } from '@/components/products/AddToCartButton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductSocialActions } from '@/components/products/ProductSocialActions';
import { ProductReviews } from '@/components/reviews/ProductReviews';
import { Star, MapPin, Truck, Store, Leaf, ChevronLeft, Plus, Minus } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

// Données fictives pour le démo
// Dans une vraie application, ces données viendraient d'une API
const productsData = [
  {
    id: 1,
    name: "Panier de légumes bio",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    price: 24.90,
    unit: "panier",
    description: "Un assortiment de légumes bio et de saison, cultivés avec amour sur notre ferme familiale. Ce panier contient des légumes fraîchement récoltés qui varient selon les saisons pour vous garantir des produits au meilleur de leur saveur.",
    longDescription: "Notre panier de légumes bio est composé uniquement de produits cultivés selon les principes de l'agriculture biologique, sans pesticides ni engrais chimiques. Chaque semaine, nous sélectionnons avec soin les légumes les plus frais et savoureux de notre ferme. Le contenu varie selon les saisons mais peut inclure : tomates, carottes, poireaux, pommes de terre, salades, courgettes, aubergines, etc. Idéal pour une famille de 3-4 personnes pour une semaine.",
    rating: 4.8,
    reviews: 42,
    farmerName: "Ferme des Quatre Saisons",
    farmerId: 101,
    farmerProfile: "https://images.unsplash.com/photo-1599577180617-8a69b7140c6b?w=150&h=150&fit=crop",
    distance: 8,
    organic: true,
    freeDelivery: true,
    farmPickup: true,
    categories: ["Fruits & Légumes", "Paniers"],
    nutritionalInfo: "Produits frais de saison, riches en vitamines et minéraux. Valeurs nutritionnelles variables selon le contenu du panier.",
    allergens: "Peut contenir des traces de céleri et autres allergènes selon la composition du panier.",
    origin: "Cultivé en France, dans notre ferme située à 8km de chez vous.",
    stock: 15
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    price: 8.50,
    unit: "pot 500g",
    description: "Un miel délicieux et naturel, récolté de nos ruches entourées de fleurs sauvages. Sa saveur subtile et complexe reflète la richesse de notre écosystème local.",
    longDescription: "Notre miel de fleurs sauvages est récolté à partir de nos ruches placées stratégiquement au milieu de prés et forêts riches en biodiversité. Les abeilles butinent librement sur une multitude de fleurs différentes, ce qui confère à ce miel une saveur unique et complexe. Non chauffé et simplement filtré, ce miel conserve toutes ses propriétés naturelles et enzymes bénéfiques. Excellent sur des tartines, dans du thé ou du yaourt, ou comme édulcorant naturel dans vos recettes.",
    rating: 4.9,
    reviews: 38,
    farmerName: "Les Ruches de Marie",
    farmerId: 102,
    farmerProfile: "https://images.unsplash.com/photo-1545022388-9f23a465b4c9?w=150&h=150&fit=crop",
    distance: 12,
    organic: true,
    freeDelivery: false,
    farmPickup: true,
    categories: ["Miel & Confiture"],
    nutritionalInfo: "Valeur énergétique: 340 kcal/100g, Glucides: 85g/100g dont sucres: 85g/100g, Protéines: 0.5g/100g, Sel: 0g/100g",
    allergens: "Aucun",
    origin: "Récolté en France, dans notre rucher situé à 12km de chez vous.",
    stock: 30
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
    price: 4.20,
    unit: "pièce",
    description: "Un fromage de chèvre frais artisanal, crémeux et légèrement acidulé, fabriqué à partir du lait de nos chèvres élevées en plein air.",
    longDescription: "Notre fromage de chèvre frais est fabriqué de manière artisanale selon des méthodes traditionnelles. Le lait provient exclusivement de notre troupeau de chèvres alpines qui paissent librement sur nos collines verdoyantes. Après une coagulation lente et un égouttage naturel, nous obtenons ce fromage à la texture onctueuse et crémeuse, au goût légèrement acidulé caractéristique du chèvre frais. Parfait sur une salade, sur du pain ou en cuisine pour apporter une touche de fraîcheur à vos plats.",
    rating: 4.7,
    reviews: 29,
    farmerName: "Chèvrerie du Vallon",
    farmerId: 103,
    farmerProfile: "https://images.unsplash.com/photo-1539268730197-d33a989d86b1?w=150&h=150&fit=crop",
    distance: 15,
    organic: false,
    freeDelivery: true,
    farmPickup: false,
    categories: ["Produits laitiers", "Fromages"],
    nutritionalInfo: "Valeur énergétique: 250 kcal/100g, Matières grasses: 20g/100g dont acides gras saturés: 14g/100g, Glucides: 2g/100g dont sucres: 2g/100g, Protéines: 18g/100g, Sel: 1.1g/100g",
    allergens: "Lait de chèvre",
    origin: "Fabriqué en France, dans notre ferme située à 15km de chez vous.",
    stock: 20
  },
  {
    id: 4,
    name: "Œufs fermiers",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    price: 3.60,
    unit: "boîte de 6",
    description: "Des œufs fermiers pondus par nos poules élevées en plein air, nourries avec des céréales biologiques. Le jaune est orangé et le goût authentique.",
    longDescription: "Nos œufs fermiers proviennent de poules élevées en plein air, dans des conditions optimales de bien-être animal. Nos gallinacées disposent d'un grand espace extérieur où elles peuvent picorer librement, prendre des bains de poussière et exprimer leurs comportements naturels. Elles sont nourries exclusivement avec des céréales biologiques cultivées localement, sans OGM ni antibiotiques. Cette alimentation de qualité et ces conditions d'élevage se traduisent par des œufs à la coquille solide, au blanc ferme et au jaune orangé, avec une saveur incomparable.",
    rating: 4.6,
    reviews: 25,
    farmerName: "Ferme des Collines",
    farmerId: 104,
    farmerProfile: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=150&h=150&fit=crop",
    distance: 6,
    organic: true,
    freeDelivery: false,
    farmPickup: true,
    categories: ["Œufs & Produits laitiers"],
    nutritionalInfo: "Valeur énergétique: 155 kcal/100g, Matières grasses: 11g/100g dont acides gras saturés: 3g/100g, Glucides: 0.5g/100g dont sucres: 0.5g/100g, Protéines: 13g/100g, Sel: 0.4g/100g",
    allergens: "Œufs",
    origin: "Produit en France, dans notre ferme située à 6km de chez vous.",
    stock: 24
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const productId = parseInt(id || "1");
  
  // Trouver le produit correspondant à l'ID
  const product = productsData.find(p => p.id === productId) || productsData[0];
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Chemin de navigation */}
          <div className="mb-6">
            <Link to="/products" className="flex items-center text-agrimarket-green hover:text-agrimarket-orange transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Retour aux produits
            </Link>
          </div>
          
          {/* Détails du produit */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Image du produit */}
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.organic && (
                    <Badge className="bg-green-600 hover:bg-green-700 text-white px-3 py-1">
                      <Leaf className="h-3 w-3 mr-1" />
                      Bio
                    </Badge>
                  )}
                  
                  {product.freeDelivery && (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1">
                      <Truck className="h-3 w-3 mr-1" />
                      Livraison gratuite
                    </Badge>
                  )}
                  
                  {product.farmPickup && (
                    <Badge className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1">
                      <Store className="h-3 w-3 mr-1" />
                      Retrait à la ferme
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Informations du produit */}
              <div className="flex flex-col">
                <div className="mb-auto">
                  {/* Producteur */}
                  <Link to={`/farmers/${product.farmerId}`} className="inline-flex items-center mb-3 hover:text-agrimarket-orange transition-colors">
                    <img 
                      src={product.farmerProfile} 
                      alt={product.farmerName} 
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                    <span className="text-gray-600">{product.farmerName}</span>
                    {product.distance && (
                      <div className="flex items-center ml-3 text-xs text-agrimarket-green">
                        <MapPin className="w-3 h-3 mr-0.5" />
                        {product.distance} km
                      </div>
                    )}
                  </Link>
                  
                  {/* Nom et note */}
                  <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium">{product.rating}</span>
                      <Link to="#reviews" className="ml-2 text-sm text-gray-500 hover:text-agrimarket-orange">
                        ({product.reviews} avis)
                      </Link>
                    </div>
                  </div>
                  
                  {/* Description courte */}
                  <p className="mb-6 text-gray-600">{product.description}</p>
                  
                  {/* Prix et unité */}
                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-bold text-agrimarket-orange">{product.price.toFixed(2)} €</span>
                    <span className="ml-2 text-gray-500">/ {product.unit}</span>
                    <span className="ml-4 text-sm text-green-600">
                      Stock: {product.stock} {product.unit}
                    </span>
                  </div>
                  
                  {/* Quantité */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Quantité</label>
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="rounded-l-md rounded-r-none"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-12 h-9 flex items-center justify-center border-y border-gray-200">
                        {quantity}
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                        className="rounded-r-md rounded-l-none"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <AddToCartButton 
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      unit: product.unit,
                      farmerName: product.farmerName,
                      farmerId: product.farmerId
                    }}
                    className="py-6 px-8 text-lg w-full"
                    quantity={quantity}
                  />
                  <ProductSocialActions productId={product.id} />
                </div>
              </div>
            </div>
            
            {/* Onglets d'informations supplémentaires */}
            <div className="border-t mt-6">
              <Tabs defaultValue="details" className="px-6 py-4">
                <TabsList className="grid w-full md:w-2/3 grid-cols-3">
                  <TabsTrigger value="details">Description</TabsTrigger>
                  <TabsTrigger value="nutritional">Informations nutritionnelles</TabsTrigger>
                  <TabsTrigger value="reviews" id="reviews">Avis ({product.reviews})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="py-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">À propos de ce produit</h3>
                    <p className="text-gray-700">{product.longDescription}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Origine</h4>
                        <p className="text-gray-600">{product.origin}</p>
                      </div>
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Catégories</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.categories.map((category, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="nutritional" className="py-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informations nutritionnelles et allergènes</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Valeurs nutritionnelles</h4>
                        <p className="text-gray-600">{product.nutritionalInfo}</p>
                      </div>
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Allergènes</h4>
                        <p className="text-gray-600">{product.allergens}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="py-4">
                  <ProductReviews productId={product.id} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;

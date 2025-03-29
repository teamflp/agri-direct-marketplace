
import React from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { ShoppingBag, Tag, Package, Bell, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationsDemo = () => {
  const { addNotification } = useNotification();

  const addProductNotification = () => {
    addNotification({
      title: "Nouveau produit disponible",
      message: "Découvrez notre nouveau panier de fruits de saison venant d'arriver !",
      type: "product",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop",
      link: "/products"
    });
  };

  const addPromoNotification = () => {
    addNotification({
      title: "Promotion exclusive",
      message: "Profitez de -20% sur tous les produits bio jusqu'à demain !",
      type: "promo",
      link: "/products"
    });
  };

  const addStockNotification = () => {
    addNotification({
      title: "Produit de nouveau disponible",
      message: "Les tomates anciennes de la Ferme des Collines sont de retour en stock !",
      type: "stock",
      image: "https://images.unsplash.com/photo-1592924357461-a191879026f4?w=300&h=300&fit=crop",
      link: "/products"
    });
  };

  const addOrderNotification = () => {
    addNotification({
      title: "Commande confirmée",
      message: "Votre commande #12345 a été confirmée et sera livrée bientôt.",
      type: "order",
      link: "/buyer-dashboard/orders"
    });
  };

  const addSystemNotification = () => {
    addNotification({
      title: "Information importante",
      message: "Notre service sera en maintenance ce soir de 22h à 23h.",
      type: "system"
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Système de notifications</CardTitle>
        <CardDescription>
          Testez les différents types de notifications disponibles sur AgriMarket
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="products" className="flex items-center gap-1">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Produits</span>
            </TabsTrigger>
            <TabsTrigger value="promos" className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">Promos</span>
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Stock</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Commandes</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Système</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium flex items-center gap-2 text-blue-700">
                  <ShoppingBag className="h-5 w-5" /> Nouveaux produits
                </h3>
                <p className="text-sm text-blue-600 mt-2">
                  Ces notifications informent vos utilisateurs des nouveaux produits ajoutés à la plateforme, 
                  leur permettant de découvrir les dernières nouveautés.
                </p>
              </div>
              <Button 
                onClick={addProductNotification}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Simuler une notification de nouveau produit
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="promos">
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="font-medium flex items-center gap-2 text-green-700">
                  <Tag className="h-5 w-5" /> Promotions
                </h3>
                <p className="text-sm text-green-600 mt-2">
                  Ces notifications alertent vos utilisateurs des offres spéciales, réductions et promotions
                  à durée limitée disponibles sur la plateforme.
                </p>
              </div>
              <Button 
                onClick={addPromoNotification}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Simuler une notification de promotion
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="stock">
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-md">
                <h3 className="font-medium flex items-center gap-2 text-purple-700">
                  <Package className="h-5 w-5" /> Réapprovisionnement
                </h3>
                <p className="text-sm text-purple-600 mt-2">
                  Ces notifications informent vos utilisateurs quand un produit qui était en rupture de stock
                  est à nouveau disponible à l'achat.
                </p>
              </div>
              <Button 
                onClick={addStockNotification}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Simuler une notification de stock
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-md">
                <h3 className="font-medium flex items-center gap-2 text-amber-700">
                  <Calendar className="h-5 w-5" /> Commandes
                </h3>
                <p className="text-sm text-amber-600 mt-2">
                  Ces notifications permettent de tenir vos utilisateurs informés des mises à jour concernant
                  leurs commandes, comme les confirmations ou les livraisons.
                </p>
              </div>
              <Button 
                onClick={addOrderNotification}
                className="w-full bg-amber-600 hover:bg-amber-700"
              >
                Simuler une notification de commande
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="system">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium flex items-center gap-2 text-gray-700">
                  <Bell className="h-5 w-5" /> Système
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Ces notifications concernent les informations importantes liées au système, comme les périodes
                  de maintenance, les mises à jour de sécurité ou les changements de politique.
                </p>
              </div>
              <Button 
                onClick={addSystemNotification}
                className="w-full bg-gray-600 hover:bg-gray-700"
              >
                Simuler une notification système
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 text-sm text-muted-foreground">
        <p>Cliquez sur les boutons pour tester chaque type de notification.</p>
      </CardFooter>
    </Card>
  );
};

export default NotificationsDemo;

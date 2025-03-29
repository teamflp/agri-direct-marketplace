
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  ShoppingBag, 
  MessageSquare, 
  CreditCard, 
  User 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProductsHeader from './components/ProductsHeader';
import ProductsOverview from './components/ProductsOverview';
import ProductStats from './components/ProductStats';
import PopularProducts from './components/PopularProducts';
import ProductDeleteDialog, { ProductType } from './components/ProductDeleteDialog';

// Mock data for products
const products: ProductType[] = [
  {
    id: 1,
    name: "Panier de légumes bio",
    price: 16350,
    inventory: 20,
    unit: "panier",
    category: "Légumes",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
  },
  {
    id: 2,
    name: "Miel de fleurs sauvages",
    price: 5600,
    inventory: 50,
    unit: "500g",
    category: "Miel",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    id: 3,
    name: "Fromage de chèvre frais",
    price: 2750,
    inventory: 35,
    unit: "250g",
    category: "Fromage",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a"
  },
  {
    id: 4,
    name: "Tomates anciennes",
    price: 980,
    inventory: 15,
    unit: "kg",
    category: "Légumes",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1592924357461-a191879026f4"
  },
  {
    id: 5,
    name: "Œufs fermiers",
    price: 3200,
    inventory: 40,
    unit: "douzaine",
    category: "Œufs",
    organic: true,
    published: false,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03"
  },
  {
    id: 6,
    name: "Salade mesclun",
    price: 1200,
    inventory: 0,
    unit: "250g",
    category: "Légumes",
    organic: true,
    published: true,
    image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43f"
  }
];

const FarmerProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | ProductType>(null);
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User size={20} /> },
    { title: "Mes produits", path: "/farmer-dashboard/products", icon: <ShoppingBag size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <ShoppingBag size={20} /> },
    { title: "Messagerie", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mon abonnement", path: "/farmer-dashboard/subscription", icon: <CreditCard size={20} /> },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleTogglePublish = (productId: number, currentStatus: boolean) => {
    toast({
      title: currentStatus ? "Produit masqué" : "Produit publié",
      description: currentStatus 
        ? "Le produit a été retiré de la boutique" 
        : "Le produit est maintenant visible dans la boutique",
    });
    // Dans une vraie app, mise à jour de l'état
  };
  
  const confirmDelete = () => {
    if (selectedProduct) {
      toast({
        title: "Produit supprimé",
        description: `${selectedProduct.name} a été supprimé avec succès`,
        variant: "destructive",
      });
      setShowDeleteDialog(false);
      // Dans une vraie app, mise à jour de l'état
    }
  };
  
  const openDeleteDialog = (product: ProductType) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  // Calculate stats
  const publishedProducts = products.filter(p => p.published).length;
  const outOfStockProducts = products.filter(p => p.inventory === 0).length;
  const organicProducts = products.filter(p => p.organic).length;

  return (
    <DashboardLayout
      name="Sophie Dubois"
      email="sophie.d@email.com"
      avatar={
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Sophie Dubois" />
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <ProductsHeader 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <ProductsOverview 
          products={products}
          filteredProducts={filteredProducts}
          onTogglePublish={handleTogglePublish}
          onDeleteClick={openDeleteDialog}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductStats 
            totalProducts={products.length}
            publishedProducts={publishedProducts}
            outOfStockProducts={outOfStockProducts}
            organicProducts={organicProducts}
          />
          <PopularProducts />
        </div>
      </div>

      <ProductDeleteDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        product={selectedProduct}
        onConfirmDelete={confirmDelete}
      />
    </DashboardLayout>
  );
};

export default FarmerProducts;

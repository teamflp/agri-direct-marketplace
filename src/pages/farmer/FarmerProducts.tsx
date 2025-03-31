
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  ShoppingBag, 
  MessageSquare, 
  CreditCard, 
  User,
  Package,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProductsHeader from './components/ProductsHeader';
import ProductsOverview from './components/ProductsOverview';
import ProductStats from './components/ProductStats';
import PopularProducts from './components/PopularProducts';
import ProductDeleteDialog, { ProductType } from './components/ProductDeleteDialog';
import ProductViewDialog from './components/ProductViewDialog';
import ProductEditDialog from './components/ProductEditDialog';
import AddProductDialog from './components/AddProductDialog';

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
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [productsList, setProductsList] = useState<ProductType[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<null | ProductType>(null);
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User size={20} /> },
    { title: "Mes produits", path: "/farmer-dashboard/products", icon: <ShoppingBag size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer-dashboard/inventory", icon: <Package size={20} /> },
    { title: "Messagerie", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mon abonnement", path: "/farmer-dashboard/subscription", icon: <CreditCard size={20} /> },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = productsList.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleTogglePublish = (productId: number, currentStatus: boolean) => {
    setProductsList(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, published: !currentStatus } 
          : product
      )
    );
    
    toast({
      title: currentStatus ? "Produit masqué" : "Produit publié",
      description: currentStatus 
        ? "Le produit a été retiré de la boutique" 
        : "Le produit est maintenant visible dans la boutique",
    });
  };
  
  const confirmDelete = () => {
    if (selectedProduct) {
      setProductsList(prevProducts => 
        prevProducts.filter(product => product.id !== selectedProduct.id)
      );
      
      toast({
        title: "Produit supprimé",
        description: `${selectedProduct.name} a été supprimé avec succès`,
        variant: "destructive",
      });
      
      setShowDeleteDialog(false);
    }
  };
  
  const handleAddProduct = (newProduct: Omit<ProductType, "id">) => {
    const newId = Math.max(...productsList.map(p => p.id)) + 1;
    const productToAdd = {
      ...newProduct,
      id: newId
    };
    
    setProductsList(prev => [...prev, productToAdd]);
    
    toast({
      title: "Produit ajouté",
      description: `${newProduct.name} a été ajouté au catalogue`
    });
    
    setShowAddDialog(false);
  };
  
  const handleEditProduct = (updatedProduct: ProductType) => {
    setProductsList(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    
    toast({
      title: "Produit modifié",
      description: `${updatedProduct.name} a été mis à jour`
    });
    
    setShowEditDialog(false);
  };
  
  const openViewDialog = (product: ProductType) => {
    setSelectedProduct(product);
    setShowViewDialog(true);
  };
  
  const openEditDialog = (product: ProductType) => {
    setSelectedProduct(product);
    setShowEditDialog(true);
  };
  
  const openDeleteDialog = (product: ProductType) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };
  
  const openAddDialog = () => {
    setShowAddDialog(true);
  };

  // Calculate stats
  const publishedProducts = productsList.filter(p => p.published).length;
  const outOfStockProducts = productsList.filter(p => p.inventory === 0).length;
  const organicProducts = productsList.filter(p => p.organic).length;

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
          onAddClick={openAddDialog}
        />

        <ProductsOverview 
          products={productsList}
          filteredProducts={filteredProducts}
          onTogglePublish={handleTogglePublish}
          onDeleteClick={openDeleteDialog}
          onViewClick={openViewDialog}
          onEditClick={openEditDialog}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductStats 
            totalProducts={productsList.length}
            publishedProducts={publishedProducts}
            outOfStockProducts={outOfStockProducts}
            organicProducts={organicProducts}
          />
          <PopularProducts />
        </div>
      </div>

      {/* Dialogues */}
      <ProductDeleteDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        product={selectedProduct}
        onConfirmDelete={confirmDelete}
      />
      
      {selectedProduct && (
        <>
          <ProductViewDialog 
            open={showViewDialog}
            onOpenChange={setShowViewDialog}
            product={selectedProduct}
          />
          
          <ProductEditDialog 
            open={showEditDialog}
            onOpenChange={setShowEditDialog}
            product={selectedProduct}
            onSave={handleEditProduct}
          />
        </>
      )}
      
      <AddProductDialog 
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddProduct={handleAddProduct}
      />
    </DashboardLayout>
  );
};

export default FarmerProducts;

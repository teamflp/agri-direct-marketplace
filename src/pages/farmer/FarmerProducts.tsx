
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Package, BarChart2, MessageSquare, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProductsHeader from './components/ProductsHeader';
import ProductsOverview from './components/ProductsOverview';
import AddProductDialog from './components/AddProductDialog';
import { useFarmerProducts, useAddProduct, Product, adaptToProductType, ProductType } from '@/hooks/useProducts';

const FarmerProducts = () => {
  const { user, profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Dialog states for other actions
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // Data fetching using React Query hooks
  const { data: products, isLoading, error } = useFarmerProducts();
  const { mutate: addProduct, isPending: isAddingProduct } = useAddProduct();

  const menuItems = [
    { title: "Tableau de bord", path: "/farmer", icon: <BarChart2 size={20} /> },
    { title: "Produits", path: "/farmer/products", icon: <Package size={20} /> },
    { title: "Commandes", path: "/farmer/orders", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer/inventory", icon: <Package size={20} /> },
    { title: "Analytics", path: "/farmer/analytics", icon: <BarChart2 size={20} /> },
    { title: "Messages", path: "/farmer/messages", icon: <MessageSquare size={20} /> },
    { title: "Paramètres", path: "/farmer/profile", icon: <Settings size={20} /> },
  ];

  const handleAddProduct = (
    productData: any,
    variantsData: any[]
  ) => {
    addProduct({ productData, variantsData }, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
      },
      onError: (e) => {
        console.error("Error adding product from component:", e);
      }
    });
  };

  // Convertir les produits au format attendu par les composants
  const adaptedProducts = products?.map(adaptToProductType) || [];

  const filteredProducts = adaptedProducts?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Handlers adaptés pour les types
  const handleTogglePublish = (productId: number, currentStatus: boolean) => {
    console.log("Toggling publish status for", productId.toString(), !currentStatus);
  };
  
  const handleDeleteClick = (product: ProductType) => setSelectedProduct(product);
  const handleViewClick = (product: ProductType) => setSelectedProduct(product);
  const handleEditClick = (product: ProductType) => setSelectedProduct(product);
  const handleDeleteConfirm = () => console.log("Deleting", selectedProduct?.id);
  const handleEditConfirm = (updatedProduct: any) => console.log("Editing", updatedProduct);

  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Jean Dupont';
  const email = user?.email || 'jean.dupont@fermelocale.fr';

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar="https://images.unsplash.com/photo-1553787434-dd9eb4ea4d0b?w=150&h=150&fit=crop"
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <ProductsHeader 
          searchTerm={searchTerm} 
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onAddClick={() => setIsAddDialogOpen(true)}
        />
        
        {isLoading && <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /> Chargement des produits...</div>}
        {error && <div className="text-red-600 bg-red-100 p-4 rounded-md">Erreur: {error.message}</div>}

        {!isLoading && !error && adaptedProducts && (
          <ProductsOverview
            products={adaptedProducts}
            filteredProducts={filteredProducts}
            onTogglePublish={handleTogglePublish}
            onDeleteClick={handleDeleteClick}
            onViewClick={handleViewClick}
            onEditClick={handleEditClick}
          />
        )}
        
        <AddProductDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAddProduct={handleAddProduct}
        />
      </div>
    </DashboardLayout>
  );
};

export default FarmerProducts;

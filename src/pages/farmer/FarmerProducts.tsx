import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Package, BarChart2, MessageSquare, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProductsHeader from './components/ProductsHeader';
import ProductsOverview from './components/ProductsOverview';
import AddProductDialog from './components/AddProductDialog';
import { useFarmerProducts, useAddProduct } from '@/hooks/useProducts';
import { TablesInsert } from '@/integrations/supabase/types';

// NOTE: The old ProductType is now replaced by the types from useProducts.ts
// We might need to update ProductDeleteDialog etc. later.
import { Product } from '@/hooks/useProducts';
import ProductDeleteDialog from './components/ProductDeleteDialog';
import ProductEditDialog from './components/ProductEditDialog';
import ProductViewDialog from './components/ProductViewDialog';

const FarmerProducts = () => {
  const { user, profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Dialog states for other actions
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    productData: TablesInsert<'products'>,
    variantsData: Omit<TablesInsert<'product_variants'>, 'product_id'>[]
  ) => {
    addProduct({ productData, variantsData }, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
        // Optionally, show a success toast
      },
      onError: (e) => {
        console.error("Error adding product from component:", e);
        // Optionally, show an error toast
      }
    });
  };

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category_id?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // TODO: Wire these up to the backend using mutation hooks
  const handleTogglePublish = (productId: string, currentStatus: boolean) => {
    console.log("Toggling publish status for", productId, !currentStatus);
  };
  const handleDeleteClick = (product: Product) => setSelectedProduct(product);
  const handleViewClick = (product: Product) => setSelectedProduct(product);
  const handleEditClick = (product: Product) => setSelectedProduct(product);
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

        {!isLoading && !error && products && (
          <ProductsOverview
            products={products}
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

        {/* TODO: Update these dialogs to work with the new data structure and hooks */}
        {selectedProduct && (
          <>
            {/* <ProductDeleteDialog
              open={showDeleteDialog} 
              onOpenChange={setShowDeleteDialog}
              product={selectedProduct}
              onConfirm={handleDeleteConfirm}
            />
            
            <ProductEditDialog 
              open={showEditDialog} 
              onOpenChange={setShowEditDialog}
              product={selectedProduct}
              onConfirm={handleEditConfirm}
            />
            
            <ProductViewDialog 
              open={showViewDialog} 
              onOpenChange={setShowViewDialog}
              product={selected.product}
            /> */}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FarmerProducts;

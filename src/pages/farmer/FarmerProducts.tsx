
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ShoppingBag, Package, BarChart2, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProductsHeader from './components/ProductsHeader';
import ProductsOverview from './components/ProductsOverview';
import { ProductType } from './components/ProductDeleteDialog';
import ProductDeleteDialog from './components/ProductDeleteDialog';
import ProductEditDialog from './components/ProductEditDialog';
import ProductViewDialog from './components/ProductViewDialog';

const FarmerProducts = () => {
  const { user, profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [mockProducts, setMockProducts] = useState<ProductType[]>([]);

  // Menu items for the sidebar
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer", icon: <BarChart2 size={20} /> },
    { title: "Produits", path: "/farmer/products", icon: <Package size={20} /> },
    { title: "Commandes", path: "/farmer/orders", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer/inventory", icon: <Package size={20} /> },
    { title: "Analytics", path: "/farmer/analytics", icon: <BarChart2 size={20} /> },
    { title: "Messages", path: "/farmer/messages", icon: <MessageSquare size={20} /> },
    { title: "Paramètres", path: "/farmer/profile", icon: <Settings size={20} /> },
  ];

  // Mock data initialization
  useEffect(() => {
    const products: ProductType[] = [
      {
        id: 1,
        name: 'Tomates Bio',
        description: 'Tomates fraîches cultivées sans pesticides',
        price: 2.99,
        inventory: 45,
        category: 'Légumes',
        unit: 'kg',
        organic: true,
        published: true,
        image: 'https://images.unsplash.com/photo-1592924357177-333f73b4c1dd?w=500&h=500&fit=crop',
      },
      {
        id: 2,
        name: 'Carottes',
        description: 'Carottes fraîches de saison',
        price: 1.49,
        inventory: 30,
        category: 'Légumes',
        unit: 'kg',
        organic: false,
        published: true,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&h=500&fit=crop',
      },
      {
        id: 3,
        name: 'Fraises',
        description: 'Fraises sucrées et juteuses',
        price: 3.99,
        inventory: 15,
        category: 'Fruits',
        unit: 'barquette',
        organic: true,
        published: true,
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&h=500&fit=crop',
      },
      {
        id: 4,
        name: 'Lait de Ferme',
        description: 'Lait entier frais',
        price: 1.29,
        inventory: 20,
        category: 'Produits laitiers',
        unit: 'l',
        organic: false,
        published: false,
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=500&fit=crop',
      }
    ];
    setMockProducts(products);
  }, []);

  // Filtered products based on search term
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = () => {
    // This would open an add product dialog in a real app
    alert('Fonctionnalité à venir: Ajouter un nouveau produit');
  };

  const handleTogglePublish = (productId: number, currentStatus: boolean) => {
    setMockProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, published: !currentStatus } 
          : product
      )
    );
  };

  const handleDeleteClick = (product: ProductType) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      setMockProducts(prevProducts => 
        prevProducts.filter(product => product.id !== selectedProduct.id)
      );
    }
    setShowDeleteDialog(false);
  };

  const handleViewClick = (product: ProductType) => {
    setSelectedProduct(product);
    setShowViewDialog(true);
  };

  const handleEditClick = (product: ProductType) => {
    setSelectedProduct(product);
    setShowEditDialog(true);
  };

  const handleEditConfirm = (updatedProduct: ProductType) => {
    setMockProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setShowEditDialog(false);
  };

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
        {/* Header with title, search and add button */}
        <ProductsHeader 
          searchTerm={searchTerm} 
          onSearchChange={handleSearchChange} 
          onAddClick={handleAddProduct} 
        />
        
        {/* Products table */}
        <ProductsOverview 
          products={mockProducts}
          filteredProducts={filteredProducts}
          onTogglePublish={handleTogglePublish}
          onDeleteClick={handleDeleteClick}
          onViewClick={handleViewClick}
          onEditClick={handleEditClick}
        />
        
        {/* Dialogs */}
        {selectedProduct && (
          <>
            <ProductDeleteDialog 
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
              product={selectedProduct}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FarmerProducts;

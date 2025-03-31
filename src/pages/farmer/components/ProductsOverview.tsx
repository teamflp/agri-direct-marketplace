
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductType } from './ProductDeleteDialog';
import ProductsTable from './ProductsTable';

type ProductsOverviewProps = {
  products: ProductType[];
  filteredProducts: ProductType[];
  onTogglePublish: (productId: number, currentStatus: boolean) => void;
  onDeleteClick: (product: ProductType) => void;
  onViewClick: (product: ProductType) => void;
  onEditClick: (product: ProductType) => void;
};

const ProductsOverview = ({
  products,
  filteredProducts,
  onTogglePublish,
  onDeleteClick,
  onViewClick,
  onEditClick
}: ProductsOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Catalogue de produits</CardTitle>
        <CardDescription>
          Gérez vos produits, leurs prix et leur disponibilité
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductsTable 
          products={filteredProducts} 
          onTogglePublish={onTogglePublish}
          onDeleteClick={onDeleteClick}
          onViewClick={onViewClick}
          onEditClick={onEditClick}
        />
      </CardContent>
    </Card>
  );
};

export default ProductsOverview;

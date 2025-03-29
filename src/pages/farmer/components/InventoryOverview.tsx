
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InventoryProductType } from '../FarmerInventory';
import InventoryTable from './InventoryTable';

type InventoryOverviewProps = {
  products: InventoryProductType[];
  filteredProducts: InventoryProductType[];
  onUpdateClick: (product: InventoryProductType) => void;
};

const InventoryOverview = ({
  products,
  filteredProducts,
  onUpdateClick
}: InventoryOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion de l'inventaire</CardTitle>
        <CardDescription>
          Suivez et mettez à jour le stock de vos produits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InventoryTable 
          products={filteredProducts} 
          onUpdateClick={onUpdateClick}
        />
      </CardContent>
    </Card>
  );
};

export default InventoryOverview;

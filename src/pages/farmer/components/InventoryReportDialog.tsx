
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Download, Printer } from 'lucide-react';
import { InventoryProductType } from '../FarmerInventory';

type InventoryReportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: InventoryProductType[];
};

const InventoryReportDialog = ({ open, onOpenChange, products }: InventoryReportDialogProps) => {
  // Calculate inventory statistics
  const totalProducts = products.length;
  const totalStockItems = products.reduce((sum, product) => sum + product.inventory, 0);
  const lowStockProducts = products.filter(p => p.inventory > 0 && p.inventory <= p.minimumStock).length;
  const outOfStockProducts = products.filter(p => p.inventory === 0).length;
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // Cette fonction pourrait être améliorée pour générer un véritable PDF
    // Mais pour l'instant, créons un CSV simple
    let csvContent = "Nom,Catégorie,Stock,Stock Minimum,Valeur Estimée\n";
    
    products.forEach(product => {
      const estimatedValue = product.inventory * product.price / 100; // Assuming price is in cents
      csvContent += `"${product.name}","${product.category}",${product.inventory},${product.minimumStock},${estimatedValue.toFixed(2)}€\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "rapport_inventaire.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rapport d'inventaire</DialogTitle>
          <DialogDescription>
            Récapitulatif de votre stock au {currentDate}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="text-sm text-gray-500">Produits totaux</div>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="text-sm text-gray-500">Unités en stock</div>
            <div className="text-2xl font-bold">{totalStockItems}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-md">
            <div className="text-sm text-amber-500">Stock faible</div>
            <div className="text-2xl font-bold">{lowStockProducts}</div>
          </div>
          <div className="bg-red-50 p-4 rounded-md">
            <div className="text-sm text-red-500">Ruptures de stock</div>
            <div className="text-2xl font-bold">{outOfStockProducts}</div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Stock actuel</TableHead>
              <TableHead>Stock minimum</TableHead>
              <TableHead>Valeur estimée</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const estimatedValue = product.inventory * product.price / 100; // Assuming price is in cents
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <span className={`${
                      product.inventory === 0 
                        ? 'text-red-500 font-medium' 
                        : product.inventory <= product.minimumStock
                        ? 'text-amber-500 font-medium'
                        : ''
                    }`}>
                      {product.inventory} {product.unit}
                    </span>
                  </TableCell>
                  <TableCell>{product.minimumStock} {product.unit}</TableCell>
                  <TableCell>{estimatedValue.toFixed(2)} €</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <DialogFooter className="mt-6">
          <Button 
            variant="outline" 
            onClick={handlePrint}
            className="mr-2"
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button 
            onClick={handleDownload}
            className="bg-agrimarket-green hover:bg-agrimarket-green/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Télécharger CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryReportDialog;

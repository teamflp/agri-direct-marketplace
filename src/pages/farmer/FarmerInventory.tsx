import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Package, BarChart2, MessageSquare, Settings, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStockMovements } from '@/hooks/useInventory';
import StockMovementsTable from './components/StockMovementsTable';
import InventoryHeader from './components/InventoryHeader';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const FarmerInventory = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Data fetching using our hook
  const { data: movements, isLoading, error } = useStockMovements();

  const filteredMovements = movements?.filter(movement =>
    movement.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.variant_options?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleExportClick = async () => {
    setIsExporting(true);
    toast({ title: "Exportation en cours...", description: "Préparation de votre fichier d'inventaire." });

    const { data, error } = await supabase.rpc('get_farmer_inventory_for_export');

    if (error) {
      console.error("Error exporting inventory:", error);
      toast({ variant: "destructive", title: "Erreur d'exportation", description: error.message });
      setIsExporting(false);
      return;
    }

    // Convert JSON to CSV
    const headers = ['product_name', 'variant_name', 'sku', 'stock_level', 'price', 'unit'];
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header], (key, value) => value === null ? '' : value)).join(','))
    ].join('\n');

    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const date = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `inventaire_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsExporting(false);
    toast({ title: "Exportation terminée", description: "Votre fichier d'inventaire a été téléchargé." });
  };

  const menuItems = [
    { title: "Tableau de bord", path: "/farmer", icon: <BarChart2 size={20} /> },
    { title: "Produits", path: "/farmer/products", icon: <Package size={20} /> },
    { title: "Commandes", path: "/farmer/orders", icon: <ShoppingBag size={20} /> },
    { title: "Inventaire", path: "/farmer/inventory", icon: <Package size={20} /> },
    { title: "Analytics", path: "/farmer/analytics", icon: <BarChart2 size={20} /> },
    { title: "Messages", path: "/farmer/messages", icon: <MessageSquare size={20} /> },
    { title: "Paramètres", path: "/farmer/profile", icon: <Settings size={20} /> },
  ];

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
        <InventoryHeader 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onExportClick={handleExportClick}
          onImportClick={() => alert("L'importation sera bientôt disponible.")}
          onReportClick={() => alert("La génération de rapports sera bientôt disponible.")}
        />
        
        <Card>
          <CardHeader>
            <CardTitle>Historique des Mouvements de Stock</CardTitle>
            <CardDescription>
              Suivez toutes les entrées et sorties de votre inventaire pour une traçabilité complète.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" /> Chargement de l'historique...
              </div>
            )}
            {error && (
              <div className="text-red-600 bg-red-100 p-4 rounded-md">
                Erreur: {error.message}
              </div>
            )}
            {!isLoading && !error && movements && (
              <StockMovementsTable movements={filteredMovements} />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerInventory;

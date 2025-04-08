
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';
import { adminFarmers } from './data/adminData';

const AdminFarmersTab = () => {
  const [selectedFarmer, setSelectedFarmer] = useState<null | typeof adminFarmers[0]>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const { toast } = useToast();
  
  const handleView = (farmer: typeof adminFarmers[0]) => {
    setSelectedFarmer(farmer);
    setShowViewDialog(true);
  };
  
  const handleSuspend = (farmer: typeof adminFarmers[0]) => {
    setSelectedFarmer(farmer);
    setShowSuspendDialog(true);
  };
  
  const confirmSuspend = () => {
    toast({
      title: "Action effectuée",
      description: `L'agriculteur ${selectedFarmer?.name} a été suspendu avec succès.`,
      variant: "destructive",
    });
    setShowSuspendDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des agriculteurs</CardTitle>
        <CardDescription>
          Liste des agriculteurs inscrits sur la plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Exploitation</TableHead>
              <TableHead>Abonnement</TableHead>
              <TableHead>Chiffre d'affaires</TableHead>
              <TableHead>Produits</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminFarmers.map((farmer) => (
              <TableRow key={farmer.id}>
                <TableCell>{farmer.id}</TableCell>
                <TableCell>{farmer.name}</TableCell>
                <TableCell>{farmer.farm}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    farmer.subscription === "Premium" 
                      ? "bg-purple-100 text-purple-800" 
                      : farmer.subscription === "Pro"
                      ? "bg-agrimarket-orange/20 text-agrimarket-orange"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {farmer.subscription}
                  </span>
                </TableCell>
                <TableCell>{farmer.revenue.toLocaleString()} FCFA</TableCell>
                <TableCell>{farmer.products}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    farmer.status === "Vérifié" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {farmer.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => handleView(farmer)}
                  >
                    Voir
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => handleSuspend(farmer)}
                  >
                    Suspendre
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Dialog pour voir les détails d'un agriculteur */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails de l'agriculteur</DialogTitle>
            <DialogDescription>
              Informations complètes sur {selectedFarmer?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedFarmer && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Nom:</p>
                  <p className="text-sm text-gray-500">{selectedFarmer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Exploitation:</p>
                  <p className="text-sm text-gray-500">{selectedFarmer.farm}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Abonnement:</p>
                  <p className="text-sm text-gray-500">{selectedFarmer.subscription}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Chiffre d'affaires:</p>
                  <p className="text-sm text-gray-500">{selectedFarmer.revenue.toLocaleString()} FCFA</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Produits:</p>
                  <p className="text-sm text-gray-500">{selectedFarmer.products}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Statut:</p>
                  <p className="text-sm text-gray-500">{selectedFarmer.status}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewDialog(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour suspendre un agriculteur */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspendre l'agriculteur</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir suspendre {selectedFarmer?.name} ? Cette action empêchera l'agriculteur d'accéder à la plateforme et de vendre ses produits.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowSuspendDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmSuspend}
            >
              Suspendre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminFarmersTab;

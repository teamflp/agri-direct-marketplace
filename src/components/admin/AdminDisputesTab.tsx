
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
import { adminDisputes } from './data/adminData';

const AdminDisputesTab = () => {
  const [selectedDispute, setSelectedDispute] = useState<null | typeof adminDisputes[0]>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showProcessDialog, setShowProcessDialog] = useState(false);
  const { toast } = useToast();
  
  const handleDetails = (dispute: typeof adminDisputes[0]) => {
    setSelectedDispute(dispute);
    setShowDetailsDialog(true);
  };
  
  const handleProcess = (dispute: typeof adminDisputes[0]) => {
    setSelectedDispute(dispute);
    setShowProcessDialog(true);
  };
  
  const confirmProcess = () => {
    toast({
      title: "Litige traité",
      description: `Le litige entre ${selectedDispute?.customer} et ${selectedDispute?.farmer} a été traité avec succès.`,
      variant: "default",
    });
    setShowProcessDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des litiges</CardTitle>
        <CardDescription>
          Traitement des problèmes signalés par les utilisateurs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Agriculteur</TableHead>
              <TableHead>Commande</TableHead>
              <TableHead>Problème</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminDisputes.map((dispute) => (
              <TableRow key={dispute.id}>
                <TableCell>{dispute.id}</TableCell>
                <TableCell>{dispute.customer}</TableCell>
                <TableCell>{dispute.farmer}</TableCell>
                <TableCell>{dispute.order}</TableCell>
                <TableCell>{dispute.issue}</TableCell>
                <TableCell>{dispute.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    dispute.status === "Résolu" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {dispute.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => handleDetails(dispute)}
                  >
                    Détails
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-agrimarket-green text-white hover:bg-agrimarket-green/80"
                    onClick={() => handleProcess(dispute)}
                    disabled={dispute.status === "Résolu"}
                  >
                    Traiter
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Dialog pour voir les détails d'un litige */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails du litige</DialogTitle>
            <DialogDescription>
              Litige entre {selectedDispute?.customer} et {selectedDispute?.farmer}
            </DialogDescription>
          </DialogHeader>
          {selectedDispute && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Client:</p>
                  <p className="text-sm text-gray-500">{selectedDispute.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Agriculteur:</p>
                  <p className="text-sm text-gray-500">{selectedDispute.farmer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Commande:</p>
                  <p className="text-sm text-gray-500">{selectedDispute.order}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date:</p>
                  <p className="text-sm text-gray-500">{selectedDispute.date}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Problème:</p>
                <p className="text-sm text-gray-500">{selectedDispute.issue}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Description détaillée:</p>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    Le client déclare que la qualité des produits reçus ne correspond pas à celle
                    présentée sur la plateforme. Les légumes étaient abîmés à la réception et certains
                    étaient déjà pourris. Le client demande un remboursement complet de sa commande.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setShowDetailsDialog(false)}
            >
              Fermer
            </Button>
            {selectedDispute && selectedDispute.status !== "Résolu" && (
              <Button 
                className="bg-agrimarket-green hover:bg-agrimarket-green/80"
                onClick={() => {
                  setShowDetailsDialog(false);
                  handleProcess(selectedDispute);
                }}
              >
                Traiter ce litige
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour traiter un litige */}
      <Dialog open={showProcessDialog} onOpenChange={setShowProcessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Traiter le litige</DialogTitle>
            <DialogDescription>
              Choisissez comment résoudre le litige entre {selectedDispute?.customer} et {selectedDispute?.farmer}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Actions possibles:</h4>
              <div className="flex items-center space-x-2">
                <input type="radio" id="refund" name="action" className="h-4 w-4 text-agrimarket-green" />
                <label htmlFor="refund" className="text-sm">Remboursement au client</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="replacement" name="action" className="h-4 w-4 text-agrimarket-green" />
                <label htmlFor="replacement" className="text-sm">Remplacement des produits</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="partial" name="action" className="h-4 w-4 text-agrimarket-green" />
                <label htmlFor="partial" className="text-sm">Remboursement partiel</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="reject" name="action" className="h-4 w-4 text-agrimarket-green" />
                <label htmlFor="reject" className="text-sm">Rejeter la réclamation</label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowProcessDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              className="bg-agrimarket-green hover:bg-agrimarket-green/80"
              onClick={confirmProcess}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminDisputesTab;

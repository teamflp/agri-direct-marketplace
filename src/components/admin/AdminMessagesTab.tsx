
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
import { adminMessages } from './data/adminData';

const AdminMessagesTab = () => {
  const [selectedMessage, setSelectedMessage] = useState<null | typeof adminMessages[0]>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const { toast } = useToast();
  
  const handleView = (message: typeof adminMessages[0]) => {
    setSelectedMessage(message);
    setShowViewDialog(true);
  };
  
  const handleResolve = (message: typeof adminMessages[0]) => {
    setSelectedMessage(message);
    setShowResolveDialog(true);
  };
  
  const confirmResolve = () => {
    toast({
      title: "Message résolu",
      description: `Le message de ${selectedMessage?.from} à ${selectedMessage?.to} a été marqué comme résolu.`,
      variant: "default",
    });
    setShowResolveDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des messages</CardTitle>
        <CardDescription>
          Suivi des communications entre utilisateurs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Expéditeur</TableHead>
              <TableHead>Destinataire</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>{message.id}</TableCell>
                <TableCell>{message.from}</TableCell>
                <TableCell>{message.to}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>{message.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    message.status === "Résolu" 
                      ? "bg-green-100 text-green-800" 
                      : message.status === "En traitement"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {message.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => handleView(message)}
                  >
                    Voir
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-agrimarket-green text-white hover:bg-agrimarket-green/80"
                    onClick={() => handleResolve(message)}
                    disabled={message.status === "Résolu"}
                  >
                    Résoudre
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Dialog pour voir les détails d'un message */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails du message</DialogTitle>
            <DialogDescription>
              Message de {selectedMessage?.from} à {selectedMessage?.to}
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm font-medium">Sujet:</p>
                <p className="text-sm text-gray-500">{selectedMessage.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Contenu:</p>
                <div className="mt-2 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed mauris eget nunc. 
                    Proin euismod, nisl vel tincidunt aliquam, nunc nisl aliquam nisl, vitae aliquam nisl.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Date:</p>
                  <p className="text-sm text-gray-500">{selectedMessage.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Statut:</p>
                  <p className="text-sm text-gray-500">{selectedMessage.status}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              onClick={() => setShowViewDialog(false)}
            >
              Fermer
            </Button>
            {selectedMessage && selectedMessage.status !== "Résolu" && (
              <Button 
                className="bg-agrimarket-green hover:bg-agrimarket-green/80"
                onClick={() => {
                  setShowViewDialog(false);
                  handleResolve(selectedMessage);
                }}
              >
                Résoudre ce message
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour résoudre un message */}
      <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Résoudre le message</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir marquer ce message comme résolu ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowResolveDialog(false)}
            >
              Annuler
            </Button>
            <Button 
              className="bg-agrimarket-green hover:bg-agrimarket-green/80"
              onClick={confirmResolve}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminMessagesTab;

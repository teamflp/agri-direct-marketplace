
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
import { adminUsers } from './data/adminData';

const AdminUsersTab = () => {
  const [selectedUser, setSelectedUser] = useState<null | typeof adminUsers[0]>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const { toast } = useToast();
  
  const handleEdit = (user: typeof adminUsers[0]) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };
  
  const handleSuspend = (user: typeof adminUsers[0]) => {
    setSelectedUser(user);
    setShowSuspendDialog(true);
  };
  
  const confirmEdit = () => {
    toast({
      title: "Modifications enregistrées",
      description: `Les informations de ${selectedUser?.name} ont été mises à jour.`,
    });
    setShowEditDialog(false);
  };
  
  const confirmSuspend = () => {
    const action = selectedUser?.status === "Suspendu" ? "réactivé" : "suspendu";
    toast({
      title: `Utilisateur ${action}`,
      description: `${selectedUser?.name} a été ${action} avec succès.`,
      variant: selectedUser?.status === "Suspendu" ? "default" : "destructive",
    });
    setShowSuspendDialog(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des utilisateurs</CardTitle>
        <CardDescription>
          Liste des utilisateurs inscrits sur la plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.type === "Agriculteur" 
                      ? "bg-agrimarket-lightGreen text-agrimarket-green" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {user.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "Actif" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    Éditer
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 border-red-500 hover:bg-red-50"
                    onClick={() => handleSuspend(user)}
                  >
                    {user.status === "Suspendu" ? "Réactiver" : "Suspendre"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Dialog pour éditer un utilisateur */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Éditer l'utilisateur</DialogTitle>
            <DialogDescription>
              Modifier les informations de {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              Formulaire d'édition pour l'utilisateur ID: {selectedUser?.id}
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowEditDialog(false)}
            >
              Annuler
            </Button>
            <Button onClick={confirmEdit}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour suspendre/réactiver un utilisateur */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.status === "Suspendu" ? "Réactiver l'utilisateur" : "Suspendre l'utilisateur"}
            </DialogTitle>
            <DialogDescription>
              {selectedUser?.status === "Suspendu" 
                ? `Êtes-vous sûr de vouloir réactiver ${selectedUser?.name} ? Cela lui permettra d'accéder à nouveau à la plateforme.`
                : `Êtes-vous sûr de vouloir suspendre ${selectedUser?.name} ? Cela l'empêchera d'accéder à la plateforme.`
              }
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
              variant={selectedUser?.status === "Suspendu" ? "default" : "destructive"} 
              onClick={confirmSuspend}
            >
              {selectedUser?.status === "Suspendu" ? "Réactiver" : "Suspendre"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AdminUsersTab;

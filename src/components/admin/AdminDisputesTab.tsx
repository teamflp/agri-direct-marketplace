
import React from 'react';
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
import { adminDisputes } from './data/adminData';

const AdminDisputesTab = () => {
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
                  <Button variant="outline" size="sm" className="mr-2">
                    Détails
                  </Button>
                  <Button variant="outline" size="sm" className="bg-agrimarket-green text-white hover:bg-agrimarket-green/80">
                    Traiter
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminDisputesTab;

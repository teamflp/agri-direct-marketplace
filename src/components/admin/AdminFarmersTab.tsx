
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
import { adminFarmers } from './data/adminData';

const AdminFarmersTab = () => {
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
                  <Button variant="outline" size="sm" className="mr-2">
                    Voir
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50">
                    Suspendre
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

export default AdminFarmersTab;

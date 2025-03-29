
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
import { adminSubscriptions } from './data/adminData';

const AdminSubscriptionsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des abonnements</CardTitle>
        <CardDescription>
          Suivi des abonnements des agriculteurs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Agriculteur</TableHead>
              <TableHead>Formule</TableHead>
              <TableHead>Date de début</TableHead>
              <TableHead>Prochain paiement</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminSubscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell>{subscription.id}</TableCell>
                <TableCell>{subscription.farmer}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    subscription.plan === "Premium" 
                      ? "bg-purple-100 text-purple-800" 
                      : subscription.plan === "Pro"
                      ? "bg-agrimarket-orange/20 text-agrimarket-orange"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {subscription.plan}
                  </span>
                </TableCell>
                <TableCell>{subscription.startDate}</TableCell>
                <TableCell>{subscription.nextBilling}</TableCell>
                <TableCell>{subscription.amount.toLocaleString()} FCFA</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    subscription.status === "Actif" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {subscription.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2">
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50">
                    Annuler
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

export default AdminSubscriptionsTab;

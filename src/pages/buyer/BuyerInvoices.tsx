// @ts-nocheck
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoiceDownloader from '@/components/buyer/InvoiceDownloader';
import { getBuyerDashboardMenuItems } from '@/components/buyer/dashboard/BuyerDashboardMenu';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const BuyerInvoices = () => {
  const { user, profile } = useAuth();
  const { orders, loading, error } = useOrders();
  
  const menuItems = getBuyerDashboardMenuItems();
  
  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Acheteur';
    
  const email = user?.email || '';

  const renderContent = () => {
    if (loading) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Commande</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut Paiement</TableHead>
              <TableHead className="text-right">Facture</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-24" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Impossible de charger vos factures. Veuillez réessayer plus tard.
          </AlertDescription>
        </Alert>
      );
    }

    const paidOrders = orders.filter(order => order.payment_status === 'paid');

    if (paidOrders.length === 0) {
      return <p className="text-center text-muted-foreground">Vous n'avez aucune facture pour le moment.</p>;
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Commande</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paidOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{order.total.toFixed(2)}€</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Payée
                </span>
              </TableCell>
              <TableCell className="text-right">
                <InvoiceDownloader invoiceUrl={order.invoice_url} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          {profile?.first_name?.charAt(0) || 'A'}{profile?.last_name?.charAt(0) || ''}
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mes factures</h1>

        <Card>
          <CardHeader>
            <CardTitle>Historique des factures</CardTitle>
            <CardDescription>
              Consultez et téléchargez vos factures pour les commandes payées.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BuyerInvoices;

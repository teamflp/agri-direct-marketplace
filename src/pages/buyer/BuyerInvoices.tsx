
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, FileText, Heart, MessageSquare, Users, User, Download, Eye } from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';

// Mock data for invoices
const invoices = [
  {
    id: "FAC-2023-001",
    orderRef: "ORD-2023-001",
    date: "28/07/2023",
    amount: 49800,
    status: "Payée",
    farmer: "Ferme des Quatre Saisons"
  },
  {
    id: "FAC-2023-002",
    orderRef: "ORD-2023-002",
    date: "16/08/2023",
    amount: 21300,
    status: "Payée",
    farmer: "Les Ruches de Marie"
  },
  {
    id: "FAC-2023-003",
    orderRef: "ORD-2023-003",
    date: "06/09/2023",
    amount: 84500,
    status: "En attente",
    farmer: "Chèvrerie du Vallon"
  },
  {
    id: "FAC-2023-004",
    orderRef: "ORD-2023-004",
    date: "19/09/2023",
    amount: 32400,
    status: "Payée",
    farmer: "Potager du Village"
  },
  {
    id: "FAC-2023-005",
    orderRef: "ORD-2023-005",
    date: "30/09/2023",
    amount: 12700,
    status: "Payée",
    farmer: "Ferme des Collines"
  }
];

const BuyerInvoices = () => {
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
    { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
    { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
    { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
    { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
  ];
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Téléchargement de facture",
      description: `La facture ${invoiceId} a été téléchargée`,
    });
    // Dans une application réelle, téléchargement du PDF
  };
  
  const handleViewInvoice = (invoiceId: string) => {
    toast({
      title: "Visualisation de facture",
      description: `Affichage de la facture ${invoiceId}`,
    });
    // Dans une application réelle, ouvrir un modal avec le détail
  };

  return (
    <DashboardLayout
      name="Martin Pasquier"
      email="martin.p@email.com"
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          MP
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
              Consultez et téléchargez vos factures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Facture</TableHead>
                  <TableHead>N° Commande</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Agriculteur</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.orderRef}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.farmer}</TableCell>
                    <TableCell>{invoice.amount.toLocaleString()} FCFA</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        invoice.status === "Payée" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="inline-flex items-center gap-1"
                        onClick={() => handleViewInvoice(invoice.id)}
                      >
                        <Eye size={16} />
                        Voir
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="inline-flex items-center gap-1 ml-2"
                        onClick={() => handleDownloadInvoice(invoice.id)}
                      >
                        <Download size={16} />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations de facturation</CardTitle>
            <CardDescription>
              Vos informations utilisées pour la facturation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Nom complet</h4>
                  <p>Martin Pasquier</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Adresse e-mail</h4>
                  <p>martin.p@email.com</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Adresse</h4>
                  <p>123 Rue Principale, 12345 Ville</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Téléphone</h4>
                  <p>+221 77 123 45 67</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline">Modifier mes informations</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BuyerInvoices;

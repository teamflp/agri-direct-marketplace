
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Search } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import InvoiceDownloader from '@/components/buyer/InvoiceDownloader';
import { getBuyerDashboardMenuItems } from '@/components/buyer/dashboard/BuyerDashboardMenu';
import { useAuth } from '@/contexts/AuthContext';

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const { user, profile } = useAuth();
  
  const menuItems = getBuyerDashboardMenuItems();
  
  const name = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : 'Martin Pasquier';
    
  const email = user?.email || 'martin.p@email.com';
  
  const handleDownloadAllInvoices = () => {
    toast({
      title: "Téléchargement groupé",
      description: "Toutes les factures ont été téléchargées en format ZIP",
    });
    
    // Dans une application réelle, créer et télécharger un fichier ZIP
    const dummyLink = document.createElement('a');
    dummyLink.href = `data:application/zip;base64,UEsDBBQAAAAAAMVtlFYAAAAAAAAAAAAAAAALAAAAZmFjdHVyZXMvLzUvUEsDBAoAAAAAAMVtlFYAAAAAAAAAAAAAAAAVAAAAZmFjdHVyZXMvRkFDLTIwMjMtMDA`;
    dummyLink.download = "Toutes_les_factures.zip";
    document.body.appendChild(dummyLink);
    dummyLink.click();
    document.body.removeChild(dummyLink);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter(invoice => 
        invoice.id.toLowerCase().includes(term) || 
        invoice.orderRef.toLowerCase().includes(term) || 
        invoice.farmer.toLowerCase().includes(term) ||
        invoice.status.toLowerCase().includes(term)
      );
      setFilteredInvoices(filtered);
    }
  };

  return (
    <DashboardLayout
      name={name}
      email={email}
      avatar={
        <div className="bg-agrimarket-orange text-white text-xl font-semibold flex items-center justify-center h-full">
          {profile?.first_name?.charAt(0) || 'M'}{profile?.last_name?.charAt(0) || 'P'}
        </div>
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Mes factures</h1>
          <Button 
            onClick={handleDownloadAllInvoices}
            className="inline-flex items-center gap-2"
          >
            <Download size={16} />
            Télécharger toutes les factures
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historique des factures</CardTitle>
            <CardDescription>
              Consultez et téléchargez vos factures
            </CardDescription>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <Input 
                  placeholder="Rechercher une facture..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
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
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
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
                      <TableCell className="text-right">
                        <InvoiceDownloader invoiceId={invoice.id} invoiceNumber={invoice.id} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      Aucune facture trouvée avec ces critères de recherche
                    </TableCell>
                  </TableRow>
                )}
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
                <Button variant="outline" onClick={() => window.location.href = "/buyer-dashboard/profile"}>
                  Modifier mes informations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BuyerInvoices;

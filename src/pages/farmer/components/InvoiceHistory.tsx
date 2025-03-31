
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import InvoiceDownloader from './InvoiceDownloader';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: string;
  period: string;
}

interface InvoiceHistoryProps {
  invoices: Invoice[];
}

const InvoiceHistory = ({ invoices }: InvoiceHistoryProps) => {
  const { toast } = useToast();
  
  const handleDownloadAllInvoices = () => {
    toast({
      title: "Téléchargement groupé",
      description: "Toutes les factures ont été téléchargées en format ZIP",
    });
    
    // Dans une vraie app, téléchargement du ZIP
    const dummyLink = document.createElement('a');
    dummyLink.href = `data:application/zip;base64,UEsDBBQAAAAAAMVtlFYAAAAAAAAAAAAAAAALAAAAZmFjdHVyZXMvLzUvUEsDBAoAAAAAAMVtlFYAAAAAAAAAAAAAAAAVAAAAZmFjdHVyZXMvRkFDLTIwMjMtMDA`;
    dummyLink.download = "Toutes_les_factures.zip";
    document.body.appendChild(dummyLink);
    dummyLink.click();
    document.body.removeChild(dummyLink);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Facture</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Période</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.period}</TableCell>
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
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" onClick={handleDownloadAllInvoices}>
          Télécharger toutes les factures
        </Button>
      </div>
    </>
  );
};

export default InvoiceHistory;

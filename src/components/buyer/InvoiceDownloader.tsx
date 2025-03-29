
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InvoiceDownloaderProps {
  invoiceId: string;
  invoiceNumber: string;
}

const InvoiceDownloader = ({ invoiceId, invoiceNumber }: InvoiceDownloaderProps) => {
  const { toast } = useToast();

  const handleDownloadInvoice = () => {
    // Dans une application réelle, cela déclencherait un téléchargement de fichier
    // Ici, nous montrons simplement un toast pour indiquer que le téléchargement a commencé
    toast({
      title: "Téléchargement de facture",
      description: `La facture ${invoiceNumber} a été téléchargée`,
    });
    
    // Simulation d'un téléchargement de PDF
    const dummyLink = document.createElement('a');
    dummyLink.href = `data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwgL0xlbmd0aCA1IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeF4=`;
    dummyLink.download = `Facture_${invoiceNumber}.pdf`;
    document.body.appendChild(dummyLink);
    dummyLink.click();
    document.body.removeChild(dummyLink);
  };

  const handleViewInvoice = () => {
    // Dans une application réelle, cela ouvrirait un modal ou une nouvelle page avec un aperçu de la facture
    toast({
      title: "Visualisation de facture",
      description: `Affichage de la facture ${invoiceNumber}`,
    });
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="inline-flex items-center gap-1"
        onClick={handleViewInvoice}
      >
        <Eye size={16} />
        Voir
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="inline-flex items-center gap-1"
        onClick={handleDownloadInvoice}
      >
        <Download size={16} />
        PDF
      </Button>
    </div>
  );
};

export default InvoiceDownloader;

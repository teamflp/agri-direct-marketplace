
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
    toast({
      title: "Téléchargement de facture",
      description: `La facture ${invoiceNumber} a été téléchargée`,
    });
    
    // Utilisation d'un blob PDF plus robuste pour le téléchargement - dans une application réelle, 
    // cela serait un vrai fichier PDF généré côté serveur
    const pdfBlob = new Blob(
      [
        // Contenu PDF minimal mais valide
        '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Resources<<>>/Contents 4 0 R/Parent 2 0 R>>endobj 4 0 obj<</Length 21>>stream\nBT /F1 12 Tf 100 700 Td (Facture '+invoiceNumber+') Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\n0000000102 00000 n\n0000000199 00000 n\ntrailer<</Size 5/Root 1 0 R>>\nstartxref\n270\n%%EOF'
      ],
      { type: 'application/pdf' }
    );
    
    const blobUrl = URL.createObjectURL(pdfBlob);
    
    const dummyLink = document.createElement('a');
    dummyLink.href = blobUrl;
    dummyLink.download = `Facture_${invoiceNumber}.pdf`;
    document.body.appendChild(dummyLink);
    dummyLink.click();
    document.body.removeChild(dummyLink);
    
    // Libération de l'URL pour éviter les fuites de mémoire
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  };

  const handleViewInvoice = () => {
    // Dans une application réelle, cela ouvrirait un modal ou une nouvelle page avec un aperçu de la facture
    toast({
      title: "Visualisation de facture",
      description: `Affichage de la facture ${invoiceNumber}`,
    });

    // Créer et ouvrir le PDF dans un nouvel onglet
    const pdfBlob = new Blob(
      [
        // Contenu PDF minimal mais valide
        '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Resources<<>>/Contents 4 0 R/Parent 2 0 R>>endobj 4 0 obj<</Length 21>>stream\nBT /F1 12 Tf 100 700 Td (Facture '+invoiceNumber+') Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\n0000000102 00000 n\n0000000199 00000 n\ntrailer<</Size 5/Root 1 0 R>>\nstartxref\n270\n%%EOF'
      ],
      { type: 'application/pdf' }
    );
    
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, '_blank');
    
    // Libération de l'URL pour éviter les fuites de mémoire
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
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

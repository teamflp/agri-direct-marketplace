
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
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
    
    // Génération d'un PDF plus complet avec des informations de facture
    const pdfContent = `
%PDF-1.4
1 0 obj
<</Type/Catalog/Pages 2 0 R>>
endobj
2 0 obj
<</Type/Pages/Kids[3 0 R]/Count 1>>
endobj
3 0 obj
<</Type/Page/MediaBox[0 0 612 792]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R/Parent 2 0 R>>
endobj
4 0 obj
<</Length 355>>
stream
BT
/F1 24 Tf
50 700 Td
(FACTURE) Tj
/F1 12 Tf
0 -40 Td
(Numéro de facture: ${invoiceNumber}) Tj
0 -20 Td
(Date: ${new Date().toLocaleDateString('fr-FR')}) Tj
0 -20 Td
(ID Commande: ${invoiceId}) Tj
0 -40 Td
(Client: Informations du client) Tj
0 -60 Td
(Détails de la commande:) Tj
0 -20 Td
(Articles commandés avec prix unitaires et quantités) Tj
0 -40 Td
(Montant total: XXX EUR) Tj
0 -20 Td
(TVA: XXX EUR) Tj
0 -20 Td
(Total TTC: XXX EUR) Tj
ET
endstream
endobj
5 0 obj
<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000212 00000 n
0000000620 00000 n
trailer
<</Size 6/Root 1 0 R>>
startxref
685
%%EOF
`;
    
    const pdfBlob = new Blob([pdfContent], { type: 'application/pdf' });
    
    // Créer une URL pour le blob
    const blobUrl = URL.createObjectURL(pdfBlob);
    
    // Créer un lien et déclencher le téléchargement
    const dummyLink = document.createElement('a');
    dummyLink.href = blobUrl;
    dummyLink.download = `Facture_${invoiceNumber}.pdf`;
    document.body.appendChild(dummyLink);
    dummyLink.click();
    document.body.removeChild(dummyLink);
    
    // Libération de l'URL pour éviter les fuites de mémoire
    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      className="inline-flex items-center gap-1"
      onClick={handleDownloadInvoice}
    >
      <Download size={16} />
      PDF
    </Button>
  );
};

export default InvoiceDownloader;

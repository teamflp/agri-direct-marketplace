
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InvoiceDownloaderProps {
  invoiceId: string;
  invoiceNumber: string;
  order?: {
    id: string;
    customer: string;
    date: string;
    total: number;
    items: number;
    status: string;
  } | null;
}

const InvoiceDownloader = ({ invoiceId, invoiceNumber, order }: InvoiceDownloaderProps) => {
  const { toast } = useToast();

  const handleDownloadInvoice = () => {
    toast({
      title: "Téléchargement de facture",
      description: `La facture ${invoiceNumber} a été téléchargée`,
    });
    
    // Calcul des montants pour la facture
    const totalHT = order?.total || 0;
    const tva = totalHT * 0.2; // TVA à 20%
    const totalTTC = totalHT + tva;
    
    // Format de date française
    const today = new Date().toLocaleDateString('fr-FR');
    
    // Génération des détails d'articles fictifs basés sur le nombre d'articles
    let itemsDetails = '';
    if (order?.items) {
      for (let i = 1; i <= order.items; i++) {
        itemsDetails += `Article ${i} x 1 : ${Math.round(totalHT / order.items)} EUR\n`;
      }
    }
    
    // Génération d'un PDF plus complet avec des informations de facture réelles
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
<</Length 1000>>
stream
BT
/F1 24 Tf
50 700 Td
(FACTURE) Tj
/F1 12 Tf
0 -50 Td
(Num\\351ro de facture: ${invoiceNumber}) Tj
0 -20 Td
(Date: ${today}) Tj
0 -20 Td
(ID Commande: ${invoiceId}) Tj
0 -40 Td
(Client: ${order?.customer || 'Client non spécifié'}) Tj
0 -40 Td
(D\\351tails de la commande:) Tj
0 -20 Td
(${itemsDetails.replace(/\n/g, '\\n0 -20 Td (')}) Tj
0 -40 Td
(Montant total HT: ${totalHT.toFixed(2)} EUR) Tj
0 -20 Td
(TVA (20%): ${tva.toFixed(2)} EUR) Tj
0 -20 Td
(Total TTC: ${totalTTC.toFixed(2)} EUR) Tj
0 -40 Td
(Agrimarket SAS - 123 Rue de l'Agriculture - 75000 Paris) Tj
0 -20 Td
(SIRET: 123 456 789 00010 - TVA: FR 12 345 678 90) Tj
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
0000001265 00000 n
trailer
<</Size 6/Root 1 0 R>>
startxref
1330
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

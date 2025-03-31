
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
    const itemsCount = order?.items || 0;
    const itemUnitPrice = itemsCount > 0 ? Math.round(totalHT / itemsCount) : 0;
    
    // Création d'un document PDF bien formaté
    const pdfContent = `
%PDF-1.7
1 0 obj
<</Type/Catalog/Pages 2 0 R>>
endobj
2 0 obj
<</Type/Pages/Kids[3 0 R]/Count 1>>
endobj
3 0 obj
<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</Font<</F1 4 0 R/F2 5 0 R>>>>/Contents 6 0 R>>
endobj
4 0 obj
<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold>>
endobj
5 0 obj
<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>
endobj
6 0 obj
<</Length 1500>>
stream
BT
/F1 24 Tf
50 780 Td
(FACTURE) Tj

/F2 12 Tf
0 -50 Td
(Num) Tj
/F2 12 Tf
(é) Tj
/F2 12 Tf
(ro de facture: ${invoiceNumber}) Tj

0 -20 Td
(Date: ${today}) Tj

0 -20 Td
(ID Commande: ${invoiceId}) Tj

0 -40 Td
(Client: ${order?.customer || 'Client non spécifié'}) Tj

0 -40 Td
(D) Tj
/F2 12 Tf
(é) Tj
/F2 12 Tf
(tails de la commande:) Tj
ET

${generateItemsTable(itemsCount, itemUnitPrice)}

BT
/F2 12 Tf
50 350 Td
(Montant total HT: ${totalHT.toFixed(2)} EUR) Tj

0 -20 Td
(TVA (20%): ${tva.toFixed(2)} EUR) Tj

/F1 12 Tf
0 -20 Td
(Total TTC: ${totalTTC.toFixed(2)} EUR) Tj

/F2 10 Tf
0 -60 Td
(Agrimarket SAS - 123 Rue de l'Agriculture - 75000 Paris) Tj

0 -15 Td
(SIRET: 123 456 789 00010 - TVA: FR 12 345 678 90) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000056 00000 n
0000000111 00000 n
0000000223 00000 n
0000000289 00000 n
0000000350 00000 n
trailer
<</Size 7/Root 1 0 R>>
startxref
1903
%%EOF
`;
    
    // Fonction pour générer la table des articles
    function generateItemsTable(count, unitPrice) {
      if (count <= 0) return '';
      
      let tableContent = `
BT
/F2 12 Tf
50 480 Td
(Article) Tj
150 0 Td
(Quantité) Tj
250 0 Td
(Prix Unitaire) Tj
350 0 Td
(Total) Tj

/F2 10 Tf
`;

      let yOffset = 20;
      for (let i = 1; i <= count; i++) {
        const name = `Article ${i}`;
        const quantity = 1;
        const price = unitPrice;
        const total = quantity * price;
        
        tableContent += `
-350 -${yOffset} Td
(${name}) Tj
150 0 Td
(${quantity}) Tj
100 0 Td
(${price.toFixed(2)} EUR) Tj
100 0 Td
(${total.toFixed(2)} EUR) Tj
`;
        yOffset = 15; // Espacement réduit pour les lignes suivantes
      }
      
      tableContent += 'ET';
      return tableContent;
    }
    
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

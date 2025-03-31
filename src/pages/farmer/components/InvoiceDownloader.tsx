
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
    
    // Génération des détails d'articles basés sur le nombre d'articles
    const itemsCount = order?.items || 0;
    const itemUnitPrice = itemsCount > 0 ? Math.round(totalHT / itemsCount) : 0;
    
    // Document PDF avec encodage correct pour les caractères accentués
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
<</Type/Font/Subtype/Type1/BaseFont/Helvetica-Bold/Encoding/WinAnsiEncoding>>
endobj
5 0 obj
<</Type/Font/Subtype/Type1/BaseFont/Helvetica/Encoding/WinAnsiEncoding>>
endobj
6 0 obj
<</Length 2500>>
stream
BT
/F1 24 Tf
50 780 Td
(FACTURE) Tj
ET

BT
/F2 12 Tf
50 730 Td
(Numéro de facture: ${invoiceNumber}) Tj
ET

BT
/F2 12 Tf
50 710 Td
(Date: ${today}) Tj
ET

BT
/F2 12 Tf
50 690 Td
(ID Commande: ${invoiceId}) Tj
ET

BT
/F2 12 Tf
50 650 Td
(Client: ${order?.customer || 'Client non spécifié'}) Tj
ET

BT
/F2 12 Tf
50 610 Td
(Détails de la commande:) Tj
ET

${generateItemsTable(itemsCount, itemUnitPrice)}

BT
/F2 12 Tf
50 250 Td
(Montant total HT: ${totalHT.toFixed(2)} EUR) Tj
ET

BT
/F2 12 Tf
50 230 Td
(TVA (20%): ${tva.toFixed(2)} EUR) Tj
ET

BT
/F1 12 Tf
50 210 Td
(Total TTC: ${totalTTC.toFixed(2)} EUR) Tj
ET

BT
/F2 10 Tf
50 150 Td
(Agrimarket SAS - 123 Rue de l'Agriculture - 75000 Paris) Tj
ET

BT
/F2 10 Tf
50 135 Td
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
0000000308 00000 n
0000000386 00000 n
trailer
<</Size 7/Root 1 0 R>>
startxref
2939
%%EOF
`;
    
    // Fonction pour générer la table des articles avec une mise en page améliorée
    function generateItemsTable(count, unitPrice) {
      if (count <= 0) return '';
      
      // Dessiner les en-têtes du tableau
      let tableContent = `
BT
/F1 12 Tf
50 580 Td
(Article) Tj
ET

BT
/F1 12 Tf
250 580 Td
(Quantité) Tj
ET

BT
/F1 12 Tf
350 580 Td
(Prix Unitaire) Tj
ET

BT
/F1 12 Tf
450 580 Td
(Total) Tj
ET

% Ligne séparatrice après les en-têtes
0.5 w
50 570 m
520 570 l
S

`;

      // Dessiner chaque ligne du tableau
      let yPosition = 550;
      for (let i = 1; i <= count && i <= 10; i++) { // Limiter à 10 articles maximum pour éviter les débordements
        const name = `Article ${i}`;
        const quantity = 1;
        const price = unitPrice;
        const total = quantity * price;
        
        tableContent += `
BT
/F2 10 Tf
50 ${yPosition} Td
(${name}) Tj
ET

BT
/F2 10 Tf
250 ${yPosition} Td
(${quantity}) Tj
ET

BT
/F2 10 Tf
350 ${yPosition} Td
(${price.toFixed(2)} EUR) Tj
ET

BT
/F2 10 Tf
450 ${yPosition} Td
(${total.toFixed(2)} EUR) Tj
ET
`;
        
        // Ligne horizontale après chaque article
        if (i < count) {
          tableContent += `
0.2 w
50 ${yPosition - 5} m
520 ${yPosition - 5} l
S
`;
        }
        
        yPosition -= 20; // Espacement entre les lignes
      }
      
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


import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

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
    
    // Création du PDF avec jsPDF qui gère correctement les caractères accentués
    const doc = new jsPDF();
    
    // Définition des styles
    const titleFontSize = 24;
    const normalFontSize = 12;
    const smallFontSize = 10;
    
    // Marge gauche pour tout le document
    const leftMargin = 20;
    
    // Titre de la facture
    doc.setFontSize(titleFontSize);
    doc.setFont("helvetica", "bold");
    doc.text("FACTURE", leftMargin, 30);
    
    // Informations de la facture
    doc.setFontSize(normalFontSize);
    doc.setFont("helvetica", "normal");
    doc.text(`Numéro de facture: ${invoiceNumber}`, leftMargin, 50);
    doc.text(`Date: ${today}`, leftMargin, 60);
    doc.text(`ID Commande: ${invoiceId}`, leftMargin, 70);
    
    // Informations client
    doc.text(`Client: ${order?.customer || 'Client non spécifié'}`, leftMargin, 90);
    
    // En-tête des détails de commande
    doc.setFont("helvetica", "bold");
    doc.text("Détails de la commande:", leftMargin, 110);
    
    // En-têtes du tableau
    const tableTop = 120;
    const colWidth = 40;
    doc.setFontSize(normalFontSize);
    doc.text("Article", leftMargin, tableTop);
    doc.text("Quantité", leftMargin + colWidth * 2, tableTop);
    doc.text("Prix Unitaire", leftMargin + colWidth * 3, tableTop);
    doc.text("Total", leftMargin + colWidth * 4, tableTop);
    
    // Ligne sous les en-têtes
    doc.setLineWidth(0.5);
    doc.line(leftMargin, tableTop + 3, leftMargin + colWidth * 5, tableTop + 3);
    
    // Contenu du tableau
    doc.setFont("helvetica", "normal");
    let yPosition = tableTop + 10;
    const lineHeight = 10;
    
    // Limiter à 10 articles maximum pour éviter les débordements
    const maxItems = Math.min(itemsCount, 10);
    
    for (let i = 1; i <= maxItems; i++) {
      const name = `Article ${i}`;
      const quantity = 1;
      const price = itemUnitPrice;
      const total = quantity * price;
      
      doc.text(name, leftMargin, yPosition);
      doc.text(quantity.toString(), leftMargin + colWidth * 2, yPosition);
      doc.text(`${price.toFixed(2)} EUR`, leftMargin + colWidth * 3, yPosition);
      doc.text(`${total.toFixed(2)} EUR`, leftMargin + colWidth * 4, yPosition);
      
      // Ligne séparatrice entre les articles
      if (i < maxItems) {
        doc.setLineWidth(0.2);
        doc.line(leftMargin, yPosition + 3, leftMargin + colWidth * 5, yPosition + 3);
      }
      
      yPosition += lineHeight;
    }
    
    // Ligne finale sous le tableau
    doc.setLineWidth(0.5);
    yPosition += 3;
    doc.line(leftMargin, yPosition, leftMargin + colWidth * 5, yPosition);
    yPosition += 10;
    
    // Totaux
    doc.setFont("helvetica", "normal");
    doc.text(`Montant total HT: ${totalHT.toFixed(2)} EUR`, leftMargin, yPosition + 10);
    doc.text(`TVA (20%): ${tva.toFixed(2)} EUR`, leftMargin, yPosition + 20);
    
    doc.setFont("helvetica", "bold");
    doc.text(`Total TTC: ${totalTTC.toFixed(2)} EUR`, leftMargin, yPosition + 30);
    
    // Pied de page
    doc.setFontSize(smallFontSize);
    doc.setFont("helvetica", "normal");
    const footerY = yPosition + 50;
    doc.text("Agrimarket SAS - 123 Rue de l'Agriculture - 75000 Paris", leftMargin, footerY);
    doc.text("SIRET: 123 456 789 00010 - TVA: FR 12 345 678 90", leftMargin, footerY + 7);
    
    // Sauvegarde du PDF
    doc.save(`Facture_${invoiceNumber}.pdf`);
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

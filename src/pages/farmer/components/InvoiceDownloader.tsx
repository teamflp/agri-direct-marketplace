
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceDownloaderProps {
  invoiceId: string;
  invoiceNumber: string;
  amount?: number;
  period?: string;
  order?: {
    id: string;
    customer: string;
    date: string;
    total: number;
    items: number;
    status: string;
  } | null;
}

const InvoiceDownloader = ({ invoiceId, invoiceNumber, amount = 0, period }: InvoiceDownloaderProps) => {
  const { toast } = useToast();

  // Génération de fausses données d'articles basées sur le numéro de facture
  const generateItems = (): InvoiceItem[] => {
    // On fixe le nombre d'articles à 2 pour correspondre à l'exemple
    const itemCount = 2; 
    
    const items: InvoiceItem[] = [];
    
    // Pour l'exemple, on crée des items fixes comme dans l'image
    items.push({
      name: "Forfait Pro - Accès illimité",
      quantity: 1,
      unitPrice: amount / 2,
      total: amount / 2
    });
    
    items.push({
      name: "Stockage supplémentaire",
      quantity: 1,
      unitPrice: amount / 2,
      total: amount / 2
    });
    
    return items;
  };

  const handleViewInvoice = () => {
    // Générer et afficher la facture PDF
    const doc = generateInvoicePDF();
    const blobUrl = doc.output('bloburl');
    window.open(blobUrl, '_blank');
    
    toast({
      title: "Visualisation de facture",
      description: `Affichage de la facture ${invoiceNumber}`,
    });
  };

  const handleDownloadInvoice = () => {
    // Générer et télécharger la facture PDF
    const doc = generateInvoicePDF();
    doc.save(`Facture_${invoiceNumber}.pdf`);
    
    toast({
      title: "Téléchargement de facture",
      description: `La facture ${invoiceNumber} a été téléchargée`,
    });
  };

  const generateInvoicePDF = () => {
    // Générer les données des articles
    const items = generateItems();
    
    // Calculer les montants
    const totalHT = amount;
    const tva = totalHT * 0.2; // TVA à 20%
    const totalTTC = totalHT + tva;
    
    // Date au format français (pour l'exemple, on utilise une date fixe)
    const today = "31/03/2025";
    
    // Créer le document PDF
    const doc = new jsPDF();
    
    // Styles et marges
    const titleFontSize = 24;
    const normalFontSize = 12;
    const smallFontSize = 10;
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
    
    // Période de facturation
    if (period) {
      doc.text(`Période: ${period}`, leftMargin, 80);
    }
    
    // Client
    doc.text("Client: Agrimarket Sénégal", leftMargin, 95);
    
    // En-tête des détails
    doc.setFont("helvetica", "bold");
    doc.text("Détails de la commande:", leftMargin, 110);
    
    // En-têtes du tableau
    const tableTop = 120;
    const colWidth = [100, 20, 30, 30]; // Largeurs des colonnes
    const colPos = [leftMargin, leftMargin + colWidth[0], leftMargin + colWidth[0] + colWidth[1], leftMargin + colWidth[0] + colWidth[1] + colWidth[2]];
    
    doc.setFontSize(normalFontSize);
    doc.text("Article", colPos[0], tableTop);
    doc.text("Quantité", colPos[1], tableTop);
    doc.text("Prix Unitaire", colPos[2], tableTop);
    doc.text("Total", colPos[3], tableTop);
    
    // Ligne sous les en-têtes
    doc.setLineWidth(0.5);
    doc.line(leftMargin, tableTop + 3, leftMargin + 170, tableTop + 3);
    
    // Contenu du tableau
    doc.setFont("helvetica", "normal");
    let yPosition = tableTop + 12;
    const lineHeight = 10;
    
    // Ajouter les articles
    items.forEach((item, index) => {
      doc.text(item.name, colPos[0], yPosition);
      doc.text(item.quantity.toString(), colPos[1], yPosition);
      
      // Correction du format d'affichage des prix pour éviter les espaces entre caractères
      const unitPriceFormatted = Math.round(item.unitPrice).toString();
      const totalFormatted = Math.round(item.total).toString();
      
      doc.text(`${unitPriceFormatted} FCFA`, colPos[2], yPosition);
      doc.text(`${totalFormatted} FCFA`, colPos[3], yPosition);
      
      // Ligne séparatrice entre les articles
      yPosition += lineHeight;
      if (index < items.length - 1) {
        doc.setLineWidth(0.2);
        doc.line(leftMargin, yPosition - 2, leftMargin + 170, yPosition - 2);
      }
    });
    
    // Ligne finale sous le tableau
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPosition + 3, leftMargin + 170, yPosition + 3);
    yPosition += 10;
    
    // Totaux - Correction du format d'affichage des montants
    const totalHTFormatted = Math.round(totalHT).toString();
    const tvaFormatted = Math.round(tva).toString();
    const totalTTCFormatted = Math.round(totalTTC).toString();
    
    doc.setFont("helvetica", "normal");
    doc.text(`Montant total HT: ${totalHTFormatted} FCFA`, leftMargin, yPosition + 10);
    doc.text(`TVA (20%): ${tvaFormatted} FCFA`, leftMargin, yPosition + 20);
    
    doc.setFont("helvetica", "bold");
    doc.text(`Total TTC: ${totalTTCFormatted} FCFA`, leftMargin, yPosition + 30);
    
    // Pied de page
    doc.setFontSize(smallFontSize);
    doc.setFont("helvetica", "normal");
    const footerY = 270;
    doc.text("Agrimarket SAS - 123 Rue de l'Agriculture - 75000 Paris", leftMargin, footerY);
    doc.text("SIRET: 123 456 789 00010 - TVA: FR 12 345 678 90", leftMargin, footerY + 7);
    
    return doc;
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

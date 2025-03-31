
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

interface AnalyticsHeaderProps {
  periodFilter: string;
  setPeriodFilter: (value: string) => void;
  monthlySalesData: any[];
  productSalesData: any[];
  customerLocationData: any[];
  weekdaySalesData: any[];
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  periodFilter, 
  setPeriodFilter,
  monthlySalesData,
  productSalesData,
  customerLocationData,
  weekdaySalesData
}) => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState('pdf');
  
  const handleDownloadReport = () => {
    // Create the PDF document
    const doc = new jsPDF();
    
    // Set title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Rapport d'Analyses des Ventes", 20, 20);
    
    // Add period info
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    const periodLabel = periodFilter === 'week' ? 'Semaine' : periodFilter === 'month' ? 'Mois' : 'Année';
    doc.text(`Période: ${periodLabel}`, 20, 30);
    doc.text(`Date du rapport: ${new Date().toLocaleDateString('fr-FR')}`, 20, 40);
    
    // Summary section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Résumé des performances", 20, 55);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Ventes totales: 31 420 FCFA (+8.2%)", 25, 65);
    doc.text("Nombre de commandes: 128 (+12.5%)", 25, 75);
    doc.text("Panier moyen: 2 455 FCFA (-3.1%)", 25, 85);
    
    // Top products section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Produits les plus vendus", 20, 100);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const sortedProducts = [...productSalesData].sort((a, b) => b.ventes - a.ventes);
    const topProducts = sortedProducts.slice(0, 5);
    
    topProducts.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.name}: ${product.ventes} unités`, 25, 110 + (index * 10));
    });
    
    // Customer locations
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Répartition géographique des clients", 20, 170);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    customerLocationData.forEach((location, index) => {
      doc.text(`${location.location}: ${location.clients} clients`, 25, 180 + (index * 10));
    });
    
    // Footer
    doc.setFontSize(10);
    doc.text("Agrimarket - Rapport généré automatiquement", 20, 270);
    doc.text(`Ferme des Quatre Saisons - ${new Date().toISOString().split('T')[0]}`, 20, 280);
    
    // Save the PDF
    doc.save(`Rapport_Analytique_${periodFilter}_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast({
      title: `Rapport téléchargé`,
      description: `Le rapport d'analyse a été téléchargé au format PDF`,
      variant: "success",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-3xl font-bold">Analyses des ventes</h1>
      <div className="flex flex-col sm:flex-row gap-2">
        <Tabs
          value={periodFilter}
          onValueChange={setPeriodFilter}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="week">Semaine</TabsTrigger>
            <TabsTrigger value="month">Mois</TabsTrigger>
            <TabsTrigger value="year">Année</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant="outline"
          className="flex gap-2"
          onClick={handleDownloadReport}
        >
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;

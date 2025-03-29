
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalyticsHeaderProps {
  periodFilter: string;
  setPeriodFilter: (value: string) => void;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  periodFilter, 
  setPeriodFilter 
}) => {
  const { toast } = useToast();
  
  const handleDownloadReport = (format: string) => {
    toast({
      title: `Rapport ${format.toUpperCase()} téléchargé`,
      description: `Le rapport d'analyse a été téléchargé au format ${format.toUpperCase()}`,
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
          onClick={() => handleDownloadReport('pdf')}
        >
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;

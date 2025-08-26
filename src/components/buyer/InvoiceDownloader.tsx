import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface InvoiceDownloaderProps {
  invoiceUrl: string | null | undefined;
}

const InvoiceDownloader = ({ invoiceUrl }: InvoiceDownloaderProps) => {
  const handleOpenInvoice = () => {
    if (invoiceUrl) {
      window.open(invoiceUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!invoiceUrl) {
    return null; // Don't render anything if there's no URL
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="inline-flex items-center gap-1"
      onClick={handleOpenInvoice}
    >
      <FileText size={16} />
      Voir la facture
    </Button>
  );
};

export default InvoiceDownloader;

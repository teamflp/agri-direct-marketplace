
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Leaf } from 'lucide-react';

const SeasonalLegend = () => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium mb-1">Légende</h4>
      <div className="flex items-center gap-2">
        <Badge variant="default" className="bg-green-600">Produit en pleine saison</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline">Produit disponible</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Leaf className="h-4 w-4 text-green-600" />
        <span className="text-sm">Produit biologique</span>
      </div>
    </div>
  );
};

export default SeasonalLegend;

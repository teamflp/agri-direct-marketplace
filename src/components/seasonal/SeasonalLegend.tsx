
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Leaf, Calendar, Info } from 'lucide-react';

const SeasonalLegend = () => {
  return (
    <div className="space-y-3 border rounded-md p-3 bg-gray-50">
      <h4 className="text-sm font-medium flex items-center mb-2">
        <Info className="h-4 w-4 mr-1 text-gray-500" /> Légende
      </h4>
      
      <div className="flex items-center gap-2">
        <Badge variant="default" className="bg-green-600">
          <Calendar className="h-3 w-3 mr-1" />
          Produit en pleine saison
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
          <Calendar className="h-3 w-3 mr-1" />
          Produit disponible
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="border-gray-200 bg-white">
          <Leaf className="h-3 w-3 mr-1 text-green-600" />
          Produit biologique
        </Badge>
      </div>
    </div>
  );
};

export default SeasonalLegend;

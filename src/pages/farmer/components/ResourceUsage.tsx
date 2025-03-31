
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface Feature {
  name: string;
  limit?: number;
  used?: number;
  unit?: string;
  value?: string;
}

interface ResourceUsageProps {
  features: Feature[];
}

const ResourceUsage = ({ features }: ResourceUsageProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Utilisation des ressources</h3>
      <div className="space-y-5">
        {features.filter(f => f.limit).map((feature, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{feature.name}</span>
              <span className="text-sm font-medium">
                {feature.used} / {feature.limit} {feature.unit}
              </span>
            </div>
            <Progress 
              value={(feature.used! / feature.limit!) * 100} 
              className="h-2"
            />
          </div>
        ))}
      </div>
      
      <h3 className="text-lg font-medium mt-6 mb-4">Avantages inclus</h3>
      <div className="space-y-2">
        {features.filter(f => f.value).map((feature, index) => (
          <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">{feature.name}</span>
            <span className="font-medium">{feature.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceUsage;

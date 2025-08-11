
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Search, Plus } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  userName: string;
  actions?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: 'default' | 'outline' | 'secondary';
  }[];
}

const DashboardHeader = ({ title, subtitle, userName, actions }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 mt-1">{subtitle}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Bienvenue, <span className="font-medium">{userName}</span>
        </p>
      </div>
      
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant={action.variant || 'default'}
              className="flex items-center gap-2"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;

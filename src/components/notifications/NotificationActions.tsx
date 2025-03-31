
import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationActionsProps {
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const NotificationActions: React.FC<NotificationActionsProps> = ({ 
  onMarkAllAsRead, 
  onClearAll 
}) => {
  return (
    <div className="p-3 border-t flex justify-between">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onMarkAllAsRead}
        className="text-xs"
      >
        <Check className="mr-1 h-3 w-3" />
        Tout marquer comme lu
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onClearAll}
        className="text-xs text-destructive hover:text-destructive"
      >
        <Trash2 className="mr-1 h-3 w-3" />
        Effacer tout
      </Button>
    </div>
  );
};

export default NotificationActions;

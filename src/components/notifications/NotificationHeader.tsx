
import React from 'react';
import { Switch } from "@/components/ui/switch";

interface NotificationHeaderProps {
  unreadCount: number;
  showToast: boolean;
  onShowToastChange: (value: boolean) => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({ 
  unreadCount, 
  showToast, 
  onShowToastChange 
}) => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div>
        <h3 className="font-semibold">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          {unreadCount === 0 
            ? "Aucune nouvelle notification" 
            : `${unreadCount} non ${unreadCount === 1 ? 'lue' : 'lues'}`}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Switch 
            id="toast-notifications" 
            checked={showToast} 
            onCheckedChange={onShowToastChange}
          />
          <label 
            htmlFor="toast-notifications" 
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Alertes
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationHeader;

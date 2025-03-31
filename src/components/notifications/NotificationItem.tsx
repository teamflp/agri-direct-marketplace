
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Notification } from '@/contexts/NotificationContext';
import { NotificationIcon, getNotificationColor } from './NotificationIcon';

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
  isRead?: boolean;
  showTimeAgo?: boolean;
}

export const getRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return "À l'instant";
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Il y a ${diffInHours}h`;
  
  return format(date, "d MMM", { locale: fr });
};

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onClick, 
  isRead = true,
  showTimeAgo = true 
}) => {
  return (
    <div 
      className={`px-3 py-3 hover:bg-muted/50 rounded-md cursor-pointer transition-colors ${!isRead ? 'bg-muted/30' : ''}`}
      onClick={onClick}
    >
      <div className="flex gap-3">
        <div className={`flex-shrink-0 rounded-full p-2 ${getNotificationColor(notification.type)}`}>
          <NotificationIcon type={notification.type} />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h4 className={`text-sm ${!isRead ? 'font-semibold' : 'font-medium'}`}>
              {notification.title}
            </h4>
            {showTimeAgo && (
              <span className="text-xs text-muted-foreground ml-2 shrink-0">
                {getRelativeTime(notification.date)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {notification.message}
          </p>
          {notification.image && (
            <div className="mt-2">
              <img 
                src={notification.image} 
                alt={notification.title} 
                className="h-12 w-12 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;

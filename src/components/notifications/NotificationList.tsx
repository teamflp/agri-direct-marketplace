
import React from 'react';
import { Bell, Check } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from '@/contexts/NotificationContext';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (id: string, link?: string) => void;
  emptyMessage: React.ReactNode;
  emptyIcon?: React.ReactNode;
  filterFn?: (notification: Notification) => boolean;
}

const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  onNotificationClick, 
  emptyMessage,
  emptyIcon = <Bell className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />,
  filterFn = () => true
}) => {
  const filteredNotifications = notifications.filter(filterFn);

  if (filteredNotifications.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {emptyIcon}
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[350px]">
      <div className="space-y-1 p-1">
        {filteredNotifications.map((notification) => (
          <NotificationItem 
            key={notification.id}
            notification={notification}
            onClick={() => onNotificationClick(notification.id, notification.link)}
            isRead={notification.read}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationList;

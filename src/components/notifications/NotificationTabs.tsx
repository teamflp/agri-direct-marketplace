
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Notification } from '@/contexts/NotificationContext';
import NotificationList from './NotificationList';
import NotificationActions from './NotificationActions';
import { Bell, Check } from 'lucide-react';

interface NotificationTabsProps {
  notifications: Notification[];
  unreadCount: number;
  onNotificationClick: (id: string, link?: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

const NotificationTabs: React.FC<NotificationTabsProps> = ({ 
  notifications, 
  unreadCount, 
  onNotificationClick, 
  onMarkAllAsRead, 
  onClearAll 
}) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full grid grid-cols-3 rounded-none bg-muted/50">
        <TabsTrigger value="all">Toutes</TabsTrigger>
        <TabsTrigger value="unread" className="relative">
          Non lues
          {unreadCount > 0 && (
            <Badge 
              className="ml-1 px-1 py-0 h-[16px] min-w-[16px] bg-red-500 text-white text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="read">Lues</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="m-0">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <p>Aucune notification</p>
          </div>
        ) : (
          <>
            <NotificationList 
              notifications={notifications}
              onNotificationClick={onNotificationClick}
              emptyMessage="Aucune notification"
            />
            <NotificationActions 
              onMarkAllAsRead={onMarkAllAsRead} 
              onClearAll={onClearAll} 
            />
          </>
        )}
      </TabsContent>
      
      <TabsContent value="unread" className="m-0">
        <NotificationList 
          notifications={notifications}
          onNotificationClick={onNotificationClick}
          emptyMessage="Aucune notification non lue"
          emptyIcon={<Check className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />}
          filterFn={(notification) => !notification.read}
        />
      </TabsContent>
      
      <TabsContent value="read" className="m-0">
        <NotificationList 
          notifications={notifications}
          onNotificationClick={onNotificationClick}
          emptyMessage="Aucune notification lue"
          filterFn={(notification) => notification.read}
        />
      </TabsContent>
    </Tabs>
  );
};

export default NotificationTabs;

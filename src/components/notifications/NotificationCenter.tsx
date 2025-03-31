
import React, { useState } from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import NotificationHeader from './NotificationHeader';
import NotificationTabs from './NotificationTabs';

const NotificationCenter = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications,
    showToast,
    setShowToast
  } = useNotification();
  const [open, setOpen] = useState(false);

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={() => setOpen(true)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-xs" 
              variant="destructive"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-[380px] p-0"
        onInteractOutside={() => setOpen(false)}
      >
        <NotificationHeader 
          unreadCount={unreadCount} 
          showToast={showToast} 
          onShowToastChange={setShowToast} 
        />
        
        <NotificationTabs 
          notifications={notifications}
          unreadCount={unreadCount}
          onNotificationClick={handleNotificationClick}
          onMarkAllAsRead={markAllAsRead}
          onClearAll={clearNotifications}
        />
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;

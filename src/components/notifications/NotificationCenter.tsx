
import React, { useState } from 'react';
import { useNotification, NotificationType } from '@/contexts/NotificationContext';
import { Bell, ShoppingBag, Tag, Package, Info, Check, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const getNotificationIcon = (type: NotificationType) => {
  switch(type) {
    case 'product':
      return <ShoppingBag className="h-4 w-4" />;
    case 'promo':
      return <Tag className="h-4 w-4" />;
    case 'stock':
      return <Package className="h-4 w-4" />;
    case 'order':
      return <Calendar className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const getNotificationColor = (type: NotificationType) => {
  switch(type) {
    case 'product':
      return "bg-blue-100 text-blue-600";
    case 'promo':
      return "bg-green-100 text-green-600";
    case 'stock':
      return "bg-purple-100 text-purple-600";
    case 'order':
      return "bg-amber-100 text-amber-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

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

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "À l'instant";
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    
    return format(date, "d MMM", { locale: fr });
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
                onCheckedChange={setShowToast}
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
                <ScrollArea className="h-[350px]">
                  <div className="space-y-1 p-1">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`px-3 py-3 hover:bg-muted/50 rounded-md cursor-pointer transition-colors ${!notification.read ? 'bg-muted/30' : ''}`}
                        onClick={() => handleNotificationClick(notification.id, notification.link)}
                      >
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 rounded-full p-2 ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                {notification.title}
                              </h4>
                              <span className="text-xs text-muted-foreground ml-2 shrink-0">
                                {getRelativeTime(notification.date)}
                              </span>
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
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-3 border-t flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    <Check className="mr-1 h-3 w-3" />
                    Tout marquer comme lu
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearNotifications}
                    className="text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Effacer tout
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[350px]">
              {notifications.filter(n => !n.read).length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <Check className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p>Aucune notification non lue</p>
                </div>
              ) : (
                <div className="space-y-1 p-1">
                  {notifications
                    .filter(notification => !notification.read)
                    .map((notification) => (
                      <div 
                        key={notification.id}
                        className="px-3 py-3 hover:bg-muted/50 rounded-md cursor-pointer transition-colors bg-muted/30"
                        onClick={() => handleNotificationClick(notification.id, notification.link)}
                      >
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 rounded-full p-2 ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-semibold">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-muted-foreground ml-2 shrink-0">
                                {getRelativeTime(notification.date)}
                              </span>
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
                    ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="read" className="m-0">
            <ScrollArea className="h-[350px]">
              {notifications.filter(n => n.read).length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p>Aucune notification lue</p>
                </div>
              ) : (
                <div className="space-y-1 p-1">
                  {notifications
                    .filter(notification => notification.read)
                    .map((notification) => (
                      <div 
                        key={notification.id}
                        className="px-3 py-3 hover:bg-muted/50 rounded-md cursor-pointer transition-colors"
                        onClick={() => notification.link && (window.location.href = notification.link)}
                      >
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 rounded-full p-2 ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-medium">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-muted-foreground ml-2 shrink-0">
                                {getRelativeTime(notification.date)}
                              </span>
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
                    ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;


import React from 'react';
import { Bell, ShoppingBag, MessageCircle, Package, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export type NotificationType = 'order' | 'message' | 'product' | 'delivery' | 'alert';

export interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: Date;
  read: boolean;
  link?: string;
  action?: () => void;
}

export const useNotifications = () => {
  const { toast } = useToast();

  const showNotification = (notification: Omit<NotificationProps, 'id' | 'time' | 'read'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const time = new Date();
    
    let icon;
    let variant: "default" | "destructive" | "success" | "warning" | "info" | "notification" = "default";
    
    switch (notification.type) {
      case 'order':
        icon = <ShoppingBag className="h-5 w-5" />;
        variant = "success";
        break;
      case 'message':
        icon = <MessageCircle className="h-5 w-5" />;
        variant = "info";
        break;
      case 'product':
        icon = <ShoppingBag className="h-5 w-5" />;
        variant = "notification";
        break;
      case 'delivery':
        icon = <Package className="h-5 w-5" />;
        variant = "info";
        break;
      case 'alert':
        icon = <AlertTriangle className="h-5 w-5" />;
        variant = "warning";
        break;
      default:
        icon = <Bell className="h-5 w-5" />;
    }

    toast({
      title: notification.title,
      description: notification.description,
      variant: variant,
      action: notification.action && (
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => {
            notification.action && notification.action();
          }}
        >
          Voir
        </Button>
      ),
    });

    return { id, ...notification, time, read: false };
  };

  const showInlineNotification = (
    notification: Omit<NotificationProps, 'id' | 'time' | 'read'>, 
    containerRef: React.RefObject<HTMLElement>
  ) => {
    if (!containerRef.current) return;

    const alertElement = document.createElement('div');
    alertElement.className = 'mb-4 animation-fade-in';
    
    // Render the alert
    const alertContent = (
      <Alert variant={notification.type === 'alert' ? 'destructive' : 'default'}>
        <AlertTitle>{notification.title}</AlertTitle>
        <AlertDescription>{notification.description}</AlertDescription>
      </Alert>
    );
    
    // Insert at the beginning of the container
    containerRef.current.prepend(alertElement);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      alertElement.classList.add('animation-fade-out');
      setTimeout(() => {
        alertElement.remove();
      }, 300);
    }, 5000);
  };

  return {
    showNotification,
    showInlineNotification
  };
};

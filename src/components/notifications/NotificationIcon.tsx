
import React from 'react';
import { Bell, ShoppingBag, Tag, Package, Info, Calendar } from 'lucide-react';
import { NotificationType } from '@/contexts/NotificationContext';

interface NotificationIconProps {
  type: NotificationType;
  className?: string;
}

export const getNotificationColor = (type: NotificationType): string => {
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

export const NotificationIcon: React.FC<NotificationIconProps> = ({ type, className = "h-4 w-4" }) => {
  switch(type) {
    case 'product':
      return <ShoppingBag className={className} />;
    case 'promo':
      return <Tag className={className} />;
    case 'stock':
      return <Package className={className} />;
    case 'order':
      return <Calendar className={className} />;
    default:
      return <Info className={className} />;
  }
};

export default NotificationIcon;

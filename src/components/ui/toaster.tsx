
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Bell, ShoppingBag, MessageCircle, Package, AlertTriangle } from 'lucide-react';

export function Toaster() {
  const { toasts } = useToast()

  // Fonction pour déterminer l'icône basée sur la variante du toast
  const getToastIcon = (variant?: string) => {
    switch (variant) {
      case 'success':
        return <ShoppingBag className="h-5 w-5" />;
      case 'info':
        return <MessageCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'notification':
        return <Bell className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const icon = getToastIcon(variant || undefined);
        
        return (
          <Toast key={id} {...props} variant={variant || undefined}>
            <div className="flex gap-3">
              {icon && <div className="flex-shrink-0 pt-1">{icon}</div>}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

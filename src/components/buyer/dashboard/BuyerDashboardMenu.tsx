
import { Heart, User, ShoppingCart, MessageSquare, Users, FileText, CreditCard, Settings } from 'lucide-react';

export const getBuyerDashboardMenuItems = () => [
  { title: "Tableau de bord", path: "/buyer-dashboard", icon: <User size={20} /> },
  { title: "Mes commandes", path: "/buyer-dashboard/orders", icon: <ShoppingCart size={20} /> },
  { title: "Mes favoris", path: "/buyer-dashboard/favorites", icon: <Heart size={20} /> },
  { title: "Messagerie", path: "/buyer-dashboard/messages", icon: <MessageSquare size={20} /> },
  { title: "Mes agriculteurs", path: "/buyer-dashboard/farmers", icon: <Users size={20} /> },
  { title: "Factures", path: "/buyer-dashboard/invoices", icon: <FileText size={20} /> },
  { title: "Abonnements", path: "/buyer-dashboard/subscriptions", icon: <CreditCard size={20} /> },
];


import { Heart, User, ShoppingCart, MessageSquare, Users, FileText, CreditCard, Home } from 'lucide-react';

export const getBuyerDashboardMenuItems = () => [
  { title: "Tableau de bord", path: "/buyer", icon: <Home size={20} /> },
  { title: "Mes commandes", path: "/buyer/orders", icon: <ShoppingCart size={20} /> },
  { title: "Mes favoris", path: "/buyer/favorites", icon: <Heart size={20} /> },
  { title: "Messagerie", path: "/buyer/messages", icon: <MessageSquare size={20} /> },
  { title: "Mes agriculteurs", path: "/buyer/farmers", icon: <Users size={20} /> },
  { title: "Factures", path: "/buyer/invoices", icon: <FileText size={20} /> },
  { title: "Abonnements", path: "/buyer/subscriptions", icon: <CreditCard size={20} /> },
  { title: "Mon profil", path: "/buyer/profile", icon: <User size={20} /> },
];

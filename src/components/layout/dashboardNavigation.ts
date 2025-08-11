
import { 
  Home, 
  ShoppingCart, 
  Heart, 
  MessageSquare, 
  Users, 
  FileText, 
  CreditCard, 
  User,
  Package,
  BarChart2,
  Settings,
  Newspaper,
  TrendingUp,
  ShieldAlert,
  Building,
  DollarSign
} from 'lucide-react';

export interface DashboardMenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  translationKey?: string;
}

export const buyerMenuItems: DashboardMenuItem[] = [
  { title: "Tableau de bord", path: "/buyer", icon: <Home size={20} />, translationKey: "buyer.dashboard" },
  { title: "Mes commandes", path: "/buyer/orders", icon: <ShoppingCart size={20} />, translationKey: "buyer.orders" },
  { title: "Mes favoris", path: "/buyer/favorites", icon: <Heart size={20} />, translationKey: "buyer.favorites" },
  { title: "Messagerie", path: "/buyer/messages", icon: <MessageSquare size={20} />, translationKey: "buyer.messages" },
  { title: "Mes agriculteurs", path: "/buyer/farmers", icon: <Users size={20} />, translationKey: "buyer.farmers" },
  { title: "Factures", path: "/buyer/invoices", icon: <FileText size={20} />, translationKey: "buyer.invoices" },
  { title: "Abonnements", path: "/buyer/subscriptions", icon: <CreditCard size={20} />, translationKey: "buyer.subscriptions" },
  { title: "Mon profil", path: "/buyer/profile", icon: <User size={20} />, translationKey: "buyer.profile" },
];

export const farmerMenuItems: DashboardMenuItem[] = [
  { title: "Tableau de bord", path: "/farmer", icon: <BarChart2 size={20} />, translationKey: "farmer.dashboard" },
  { title: "Produits", path: "/farmer/products", icon: <Package size={20} />, translationKey: "farmer.products" },
  { title: "Commandes", path: "/farmer/orders", icon: <ShoppingCart size={20} />, translationKey: "farmer.orders" },
  { title: "Inventaire", path: "/farmer/inventory", icon: <Package size={20} />, translationKey: "farmer.inventory" },
  { title: "Analytics", path: "/farmer/analytics", icon: <TrendingUp size={20} />, translationKey: "farmer.analytics" },
  { title: "Factures", path: "/farmer/invoices", icon: <FileText size={20} />, translationKey: "farmer.invoices" },
  { title: "Blog", path: "/farmer/blog", icon: <Newspaper size={20} />, translationKey: "farmer.blog" },
  { title: "Messages", path: "/farmer/messages", icon: <MessageSquare size={20} />, translationKey: "farmer.messages" },
  { title: "Abonnement", path: "/farmer/subscription", icon: <CreditCard size={20} />, translationKey: "farmer.subscription" },
  { title: "Profil", path: "/farmer/profile", icon: <User size={20} />, translationKey: "farmer.profile" },
];

export const adminMenuItems: DashboardMenuItem[] = [
  { title: "Tableau de bord", path: "/admin", icon: <BarChart2 size={20} />, translationKey: "admin.dashboard" },
  { title: "Utilisateurs", path: "/admin/users", icon: <Users size={20} />, translationKey: "admin.users" },
  { title: "Agriculteurs", path: "/admin/farmers", icon: <User size={20} />, translationKey: "admin.farmers" },
  { title: "Messages", path: "/admin/messages", icon: <MessageSquare size={20} />, translationKey: "admin.messages" },
  { title: "Litiges", path: "/admin/disputes", icon: <ShieldAlert size={20} />, translationKey: "admin.disputes" },
  { title: "Abonnements", path: "/admin/subscriptions", icon: <CreditCard size={20} />, translationKey: "admin.subscriptions" },
  { title: "Finances", path: "/admin/finances", icon: <DollarSign size={20} />, translationKey: "admin.finances" },
  { title: "Rapports", path: "/admin/reports", icon: <FileText size={20} />, translationKey: "admin.reports" },
  { title: "Paramètres", path: "/admin/settings", icon: <Settings size={20} />, translationKey: "admin.settings" },
];

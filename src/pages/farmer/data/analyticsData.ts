
// Mock data for analytics charts
export const monthlySalesData = [
  { month: 'Jan', ventes: 12500 },
  { month: 'Fév', ventes: 18700 },
  { month: 'Mar', ventes: 15400 },
  { month: 'Avr', ventes: 21000 },
  { month: 'Mai', ventes: 24800 },
  { month: 'Juin', ventes: 22500 },
  { month: 'Juil', ventes: 28700 },
  { month: 'Août', ventes: 31200 },
  { month: 'Sep', ventes: 29800 },
];

export const productSalesData = [
  { name: 'Tomates Bio', ventes: 145 },
  { name: 'Salade', ventes: 87 },
  { name: 'Carottes', ventes: 112 },
  { name: 'Fraises', ventes: 198 },
  { name: 'Courgettes', ventes: 65 },
];

export const customerLocationData = [
  { location: 'Dakar', clients: 42 },
  { location: 'Thiès', clients: 28 },
  { location: 'Saint-Louis', clients: 15 },
  { location: 'Ziguinchor', clients: 8 },
  { location: 'Autres', clients: 12 },
];

export const weekdaySalesData = [
  { jour: 'Lun', ventes: 32 },
  { jour: 'Mar', ventes: 25 },
  { jour: 'Mer', ventes: 37 },
  { jour: 'Jeu', ventes: 45 },
  { jour: 'Ven', ventes: 52 },
  { jour: 'Sam', ventes: 78 },
  { jour: 'Dim', ventes: 15 },
];

export const dashboardMenuItems = [
  { title: "Tableau de bord", path: "/farmer-dashboard", icon: "User" },
  { title: "Produits", path: "/farmer-dashboard/products", icon: "ShoppingCart" },
  { title: "Commandes", path: "/farmer-dashboard/orders", icon: "Users" },
  { title: "Messages", path: "/farmer-dashboard/messages", icon: "MessageSquare" },
  { title: "Analyses", path: "/farmer-dashboard/analytics", icon: "FileText" },
  { title: "Abonnement", path: "/farmer-dashboard/subscription", icon: "Calendar" },
];

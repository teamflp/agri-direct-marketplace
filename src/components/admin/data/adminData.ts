
// Mock data for statistics
export const adminStatistics = {
  totalUsers: 124,
  activeFarmers: 42,
  monthlyRevenue: 2450000,
  totalOrders: 523,
  pendingDisputes: 3
};

// Mock data for users
export const adminUsers = [
  {
    id: 1,
    name: "Martin Pasquier",
    email: "martin.p@email.com",
    type: "Consommateur",
    status: "Actif",
    joinDate: "27/07/2023"
  },
  {
    id: 2,
    name: "Sophie Dubois",
    email: "sophie.d@email.com",
    type: "Agriculteur",
    status: "Actif",
    joinDate: "15/03/2023"
  },
  {
    id: 3,
    name: "Jean Leclerc",
    email: "jean.l@email.com",
    type: "Agriculteur",
    status: "Suspendu",
    joinDate: "05/09/2022"
  },
  {
    id: 4,
    name: "Lucie Martin",
    email: "lucie.m@email.com",
    type: "Consommateur",
    status: "Actif",
    joinDate: "12/11/2023"
  },
];

// Mock data for farmers
export const adminFarmers = [
  {
    id: 1,
    name: "Sophie Dubois",
    farm: "Ferme des Quatre Saisons",
    subscription: "Premium",
    revenue: 1250000,
    products: 28,
    status: "Vérifié"
  },
  {
    id: 2,
    name: "Jean Leclerc",
    farm: "Les Ruches de Marie",
    subscription: "Pro",
    revenue: 680000,
    products: 12,
    status: "En attente"
  },
  {
    id: 3,
    name: "Michel Blanc",
    farm: "Potager du Village",
    subscription: "Basic",
    revenue: 320000,
    products: 7,
    status: "Vérifié"
  },
];

// Mock data for messages
export const adminMessages = [
  {
    id: 1,
    from: "Martin Pasquier",
    to: "Sophie Dubois",
    subject: "Question sur les produits bio",
    date: "Aujourd'hui, 14:32",
    status: "Non résolu"
  },
  {
    id: 2,
    from: "Lucie Martin",
    to: "Jean Leclerc",
    subject: "Problème avec ma commande",
    date: "Hier, 10:15",
    status: "En traitement"
  },
  {
    id: 3,
    from: "Sophie Dubois",
    to: "Support AgriMarket",
    subject: "Problème de paiement",
    date: "21/09/2023",
    status: "Résolu"
  },
];

// Mock data for disputes
export const adminDisputes = [
  {
    id: 1,
    customer: "Martin Pasquier",
    farmer: "Sophie Dubois",
    order: "ORD-2023-001",
    issue: "Produit endommagé",
    date: "27/09/2023",
    status: "En attente"
  },
  {
    id: 2,
    customer: "Lucie Martin",
    farmer: "Jean Leclerc",
    order: "ORD-2023-015",
    issue: "Livraison non reçue",
    date: "15/09/2023",
    status: "Résolu"
  },
];

// Mock data for subscriptions
export const adminSubscriptions = [
  {
    id: 1,
    farmer: "Sophie Dubois",
    plan: "Premium",
    startDate: "15/03/2023",
    nextBilling: "15/10/2023",
    amount: 32700,
    status: "Actif"
  },
  {
    id: 2,
    farmer: "Jean Leclerc",
    plan: "Pro",
    startDate: "05/09/2022",
    nextBilling: "05/10/2023",
    amount: 13050,
    status: "Actif"
  },
  {
    id: 3,
    farmer: "Michel Blanc",
    plan: "Basic",
    startDate: "12/11/2023",
    nextBilling: "-",
    amount: 0,
    status: "Actif"
  },
];

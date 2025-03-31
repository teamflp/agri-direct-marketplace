
// Mock data for subscription
export const subscriptionData = {
  plan: "Pro",
  status: "Actif",
  price: 13050,
  nextBilling: "15/10/2023",
  startDate: "15/03/2023",
  features: [
    { name: "Nombre de produits", limit: 100, used: 60 },
    { name: "Espace de stockage", limit: 2, used: 0.8, unit: "GB" },
    { name: "Commission par vente", value: "5%" },
    { name: "Support client prioritaire", value: "Oui" },
    { name: "Mise en avant sur la page d'accueil", value: "Non" },
  ],
  paymentMethod: {
    type: "Carte bancaire",
    last4: "4242",
    expiry: "06/25"
  }
};

// Mock data for invoices
export const invoicesData = [
  {
    id: "FAC-SUB-2023-001",
    date: "15/09/2023",
    amount: 13050,
    status: "Payée",
    period: "15/09/2023 - 14/10/2023"
  },
  {
    id: "FAC-SUB-2023-002",
    date: "15/08/2023",
    amount: 13050,
    status: "Payée",
    period: "15/08/2023 - 14/09/2023"
  },
  {
    id: "FAC-SUB-2023-003",
    date: "15/07/2023",
    amount: 13050,
    status: "Payée",
    period: "15/07/2023 - 14/08/2023"
  }
];

// Mock data for available plans
export const plansData = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    features: [
      "Jusqu'à 10 produits",
      "100MB de stockage",
      "Commission de 10% par vente",
      "Support par email"
    ],
    popular: false
  },
  {
    id: "pro",
    name: "Pro",
    price: 13050,
    features: [
      "Jusqu'à 100 produits",
      "2GB de stockage",
      "Commission de 5% par vente",
      "Support prioritaire",
      "Statistiques avancées"
    ],
    popular: true,
    current: true
  },
  {
    id: "premium",
    name: "Premium",
    price: 32700,
    features: [
      "Produits illimités",
      "10GB de stockage",
      "Commission de 3% par vente",
      "Support prioritaire 24/7",
      "Mise en avant sur la page d'accueil",
      "Outils marketing avancés"
    ],
    popular: false
  }
];

// Common menu items for farmer dashboard
export const farmerMenuItems = [
  { title: "Tableau de bord", path: "/farmer-dashboard", icon: "User" },
  { title: "Mes produits", path: "/farmer-dashboard/products", icon: "ShoppingBag" },
  { title: "Commandes", path: "/farmer-dashboard/orders", icon: "ShoppingBag" },
  { title: "Messagerie", path: "/farmer-dashboard/messages", icon: "MessageSquare" },
  { title: "Mon abonnement", path: "/farmer-dashboard/subscription", icon: "CreditCard" },
];

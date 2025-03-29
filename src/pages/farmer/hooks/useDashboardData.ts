
import { useState } from 'react';

// Types
export interface ProductType {
  id: number;
  name: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
  sales: number;
}

export interface OrderType {
  id: string;
  customer: string;
  date: string;
  total: number;
  items: number;
  status: string;
}

export interface MessageType {
  id: number;
  customer: string;
  lastMessage: string;
  date: string;
  unread: boolean;
}

export interface SubscriptionType {
  plan: string;
  startDate: string;
  endDate: string;
  featuresUsed: {
    productsUsed: number;
    productsLimit: number;
    storageUsed: number;
    storageLimit: number;
    salesThisMonth: number;
    customersCount: number;
  }
}

// Mock data for products
const mockProducts: ProductType[] = [
  {
    id: 1,
    name: "Tomates Bio",
    price: 3.50,
    stock: 25,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1592857281548-a552a01fa532",
    sales: 42
  },
  {
    id: 2,
    name: "Salade Verte",
    price: 1.20,
    stock: 15,
    unit: "pièce",
    image: "https://images.unsplash.com/photo-1622205313162-be1d5712a43b",
    sales: 30
  },
  {
    id: 3,
    name: "Carottes",
    price: 2.80,
    stock: 18,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1582515073490-39981397c445",
    sales: 22
  },
  {
    id: 4,
    name: "Fraises",
    price: 4.50,
    stock: 10,
    unit: "barquette 250g",
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9",
    sales: 35
  }
];

// Mock data for orders
const mockOrders: OrderType[] = [
  {
    id: "ORD-2023-101",
    customer: "Martin Pasquier",
    date: "27/07/2023",
    total: 75.90,
    items: 4,
    status: "En attente",
  },
  {
    id: "ORD-2023-102",
    customer: "Sophie Durand",
    date: "15/08/2023",
    total: 32.50,
    items: 2,
    status: "Confirmée",
  },
  {
    id: "ORD-2023-103",
    customer: "Jean Dupont",
    date: "05/09/2023",
    total: 128.75,
    items: 7,
    status: "Livrée",
  },
];

// Mock data for messages
const mockMessages: MessageType[] = [
  {
    id: 1,
    customer: "Martin Pasquier",
    lastMessage: "Bonjour, est-ce que je pourrais avoir des détails sur vos méthodes de culture ?",
    date: "Aujourd'hui, 14:32",
    unread: true
  },
  {
    id: 2,
    customer: "Sophie Durand",
    lastMessage: "Avez-vous des fraises cette semaine ?",
    date: "Hier, 10:15",
    unread: false
  },
  {
    id: 3,
    customer: "Jean Dupont",
    lastMessage: "Merci pour les légumes, ils étaient délicieux !",
    date: "12/09/2023, 18:22",
    unread: false
  }
];

// Mock data for subscription
const mockSubscription: SubscriptionType = {
  plan: "Pro",
  startDate: "01/01/2023",
  endDate: "31/12/2023",
  featuresUsed: {
    productsUsed: 25,
    productsLimit: 50,
    storageUsed: 150,
    storageLimit: 500,
    salesThisMonth: 42,
    customersCount: 28
  }
};

export const useDashboardData = () => {
  const [products] = useState<ProductType[]>(mockProducts);
  const [orders] = useState<OrderType[]>(mockOrders);
  const [messages] = useState<MessageType[]>(mockMessages);
  const [subscription] = useState<SubscriptionType>(mockSubscription);

  return {
    products,
    orders,
    messages,
    subscription
  };
};


import React from 'react';
import { ShoppingCart, Heart, MessageSquare, TrendingUp } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import BuyerDashboardOrdersTab from '@/components/buyer/dashboard/BuyerDashboardOrdersTab';
import BuyerDashboardRecommendedProducts from '@/components/buyer/dashboard/BuyerDashboardRecommendedProducts';
import BuyerPersonalizedAdvice from '@/components/buyer/BuyerPersonalizedAdvice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for recent purchases
const recentPurchases = [
  {
    id: "prod-001",
    name: "Panier de légumes bio",
    category: "Légumes"
  },
  {
    id: "prod-002",
    name: "Miel de fleurs sauvages",
    category: "Miel"
  },
  {
    id: "prod-003",
    name: "Fromage de chèvre frais",
    category: "Produits laitiers"
  }
];

interface BuyerDashboardContentProps {
  userName: string;
}

const BuyerDashboardContent = ({ userName }: BuyerDashboardContentProps) => {
  const stats = [
    {
      title: "Commandes ce mois",
      value: "12",
      description: "3 en cours de livraison",
      icon: ShoppingCart,
      trend: { value: 20, isPositive: true, label: "vs mois dernier" }
    },
    {
      title: "Produits favoris",
      value: "24",
      description: "8 nouveaux cette semaine",
      icon: Heart,
      variant: 'success' as const
    },
    {
      title: "Messages non lus",
      value: "3",
      description: "2 de vos agriculteurs",
      icon: MessageSquare,
      variant: 'warning' as const
    },
    {
      title: "Économies réalisées",
      value: "45€",
      description: "Grâce aux producteurs locaux",
      icon: TrendingUp,
      trend: { value: 15, isPositive: true, label: "ce mois" }
    }
  ];

  const handleAddToCart = () => {
    // Navigation vers les produits
    window.location.href = '/products';
  };

  const handleViewFavorites = () => {
    window.location.href = '/buyer/favorites';
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Tableau de bord"
        subtitle="Gérez vos commandes et découvrez de nouveaux produits locaux"
        userName={userName}
        actions={[
          {
            label: "Parcourir les produits",
            onClick: handleAddToCart,
            icon: <ShoppingCart className="h-4 w-4" />,
            variant: 'default'
          },
          {
            label: "Mes favoris",
            onClick: handleViewFavorites,
            icon: <Heart className="h-4 w-4" />,
            variant: 'outline'
          }
        ]}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>Vos dernières commandes et leur statut</CardDescription>
          </CardHeader>
          <CardContent>
            <BuyerDashboardOrdersTab />
          </CardContent>
        </Card>

        {/* Personalized Advice */}
        <Card>
          <CardHeader>
            <CardTitle>Conseils personnalisés</CardTitle>
            <CardDescription>Recommandations basées sur vos achats</CardDescription>
          </CardHeader>
          <CardContent>
            <BuyerPersonalizedAdvice recentPurchases={recentPurchases} />
          </CardContent>
        </Card>
      </div>

      {/* Recommended Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Produits recommandés</h2>
        <BuyerDashboardRecommendedProducts />
      </div>
    </div>
  );
};

export default BuyerDashboardContent;

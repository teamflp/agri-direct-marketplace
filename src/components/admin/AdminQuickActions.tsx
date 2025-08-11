
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, User, MessageSquare, ShieldAlert, CreditCard, FileText } from 'lucide-react';

const AdminQuickActions = () => {
  const quickActions = [
    {
      title: 'Gérer les utilisateurs',
      description: 'Voir et modérer les comptes utilisateurs',
      icon: Users,
      href: '/admin/users',
      color: 'text-blue-600',
    },
    {
      title: 'Valider les agriculteurs',
      description: 'Approuver les nouveaux profils agriculteurs',
      icon: User,
      href: '/admin/farmers',
      color: 'text-green-600',
    },
    {
      title: 'Messages système',
      description: 'Envoyer des notifications importantes',
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'text-purple-600',
    },
    {
      title: 'Résoudre les litiges',
      description: 'Traiter les réclamations en attente',
      icon: ShieldAlert,
      href: '/admin/disputes',
      color: 'text-red-600',
    },
    {
      title: 'Abonnements',
      description: 'Gérer les plans et facturations',
      icon: CreditCard,
      href: '/admin/subscriptions',
      color: 'text-indigo-600',
    },
    {
      title: 'Rapports',
      description: 'Générer des rapports détaillés',
      icon: FileText,
      href: '/admin/reports',
      color: 'text-orange-600',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>
        <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.href}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-gray-50"
              asChild
            >
              <Link to={action.href}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
                <div className="text-left">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminQuickActions;

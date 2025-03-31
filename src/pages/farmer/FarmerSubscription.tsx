
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  MessageSquare, 
  CreditCard, 
  User,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Download
} from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import PaymentMethodDialog from './components/PaymentMethodDialog';
import InvoiceDownloader from './components/InvoiceDownloader';
import PlanUpgradeDialog from './components/PlanUpgradeDialog';

// Mock data for subscription
const subscription = {
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
const invoices = [
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
const plans = [
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

const FarmerSubscription = () => {
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Tableau de bord", path: "/farmer-dashboard", icon: <User size={20} /> },
    { title: "Mes produits", path: "/farmer-dashboard/products", icon: <ShoppingBag size={20} /> },
    { title: "Commandes", path: "/farmer-dashboard/orders", icon: <ShoppingBag size={20} /> },
    { title: "Messagerie", path: "/farmer-dashboard/messages", icon: <MessageSquare size={20} /> },
    { title: "Mon abonnement", path: "/farmer-dashboard/subscription", icon: <CreditCard size={20} /> },
  ];
  
  const handleDownloadAllInvoices = () => {
    toast({
      title: "Téléchargement groupé",
      description: "Toutes les factures ont été téléchargées en format ZIP",
    });
    
    // Dans une vraie app, téléchargement du ZIP
    const dummyLink = document.createElement('a');
    dummyLink.href = `data:application/zip;base64,UEsDBBQAAAAAAMVtlFYAAAAAAAAAAAAAAAALAAAAZmFjdHVyZXMvLzUvUEsDBAoAAAAAAMVtlFYAAAAAAAAAAAAAAAAVAAAAZmFjdHVyZXMvRkFDLTIwMjMtMDA`;
    dummyLink.download = "Toutes_les_factures.zip";
    document.body.appendChild(dummyLink);
    dummyLink.click();
    document.body.removeChild(dummyLink);
  };

  return (
    <DashboardLayout
      name="Sophie Dubois"
      email="sophie.d@email.com"
      avatar={
        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop" alt="Sophie Dubois" />
      }
      menuItems={menuItems}
    >
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mon abonnement</h1>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div>
                <CardTitle>Forfait actuel: {subscription.plan}</CardTitle>
                <CardDescription>
                  Gérez votre abonnement et vos factures
                </CardDescription>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  subscription.status === "Actif" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {subscription.status === "Actif" ? (
                    <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 mr-1 text-yellow-600" />
                  )}
                  {subscription.status}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Détails de l'abonnement</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Prix mensuel</span>
                    <span className="font-semibold">{subscription.price.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Prochaine facturation</span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                      {subscription.nextBilling}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Date d'inscription</span>
                    <span>{subscription.startDate}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-600">Moyen de paiement</span>
                    <span>•••• {subscription.paymentMethod.last4} (expire {subscription.paymentMethod.expiry})</span>
                  </div>
                </div>
                <div className="mt-4">
                  <PaymentMethodDialog />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Utilisation des ressources</h3>
                <div className="space-y-5">
                  {subscription.features.filter(f => f.limit).map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{feature.name}</span>
                        <span className="text-sm font-medium">
                          {feature.used} / {feature.limit} {feature.unit}
                        </span>
                      </div>
                      <Progress 
                        value={(feature.used / feature.limit) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
                
                <h3 className="text-lg font-medium mt-6 mb-4">Avantages inclus</h3>
                <div className="space-y-2">
                  {subscription.features.filter(f => f.value).map((feature, index) => (
                    <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-gray-600">{feature.name}</span>
                      <span className="font-medium">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique des factures</CardTitle>
            <CardDescription>
              Consultez et téléchargez vos factures d'abonnement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Facture</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.period}</TableCell>
                    <TableCell>{invoice.amount.toLocaleString()} FCFA</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        invoice.status === "Payée" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <InvoiceDownloader invoiceId={invoice.id} invoiceNumber={invoice.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forfaits disponibles</CardTitle>
            <CardDescription>
              Comparez les différents forfaits et choisissez celui qui vous convient
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={`overflow-hidden ${plan.popular ? 'border-agrimarket-orange' : ''} ${plan.current ? 'bg-gray-50' : ''}`}>
                  {plan.popular && (
                    <div className="bg-agrimarket-orange text-white text-xs font-bold px-3 py-1 text-center">
                      POPULAIRE
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">{plan.price.toLocaleString()} FCFA</span>
                      <span className="text-gray-500">/mois</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-agrimarket-green mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-center pb-6">
                    <PlanUpgradeDialog 
                      planName={plan.name}
                      planPrice={plan.price} 
                      planFeatures={plan.features}
                      currentPlan={plan.current || false}
                      popular={plan.popular || false}
                    />
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FarmerSubscription;

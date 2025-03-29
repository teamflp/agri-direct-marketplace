
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, User, CreditCard, FileText, ShieldAlert } from 'lucide-react';

interface StatisticsProps {
  statistics: {
    totalUsers: number;
    activeFarmers: number;
    monthlyRevenue: number;
    totalOrders: number;
    pendingDisputes: number;
  };
}

const AdminStatisticsCards: React.FC<StatisticsProps> = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Utilisateurs totaux</p>
              <h3 className="text-2xl font-bold">{statistics.totalUsers}</h3>
            </div>
            <Users className="h-8 w-8 text-agrimarket-orange" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Agriculteurs actifs</p>
              <h3 className="text-2xl font-bold">{statistics.activeFarmers}</h3>
            </div>
            <User className="h-8 w-8 text-agrimarket-green" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenus mensuels</p>
              <h3 className="text-2xl font-bold">{statistics.monthlyRevenue.toLocaleString()} FCFA</h3>
            </div>
            <CreditCard className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Commandes totales</p>
              <h3 className="text-2xl font-bold">{statistics.totalOrders}</h3>
            </div>
            <FileText className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Litiges en attente</p>
              <h3 className="text-2xl font-bold">{statistics.pendingDisputes}</h3>
            </div>
            <ShieldAlert className="h-8 w-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatisticsCards;

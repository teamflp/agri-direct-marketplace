
import React from 'react';
import { User, ShoppingBag, Package, MessageSquare, CreditCard, BarChart4 } from 'lucide-react';

interface DashboardSidebarProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ selectedTab, setSelectedTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Tableau de bord', icon: <BarChart4 className="mr-2 h-4 w-4" /> },
    { id: 'products', label: 'Mes produits', icon: <ShoppingBag className="mr-2 h-4 w-4" /> },
    { id: 'inventory', label: 'Inventaire', icon: <Package className="mr-2 h-4 w-4" /> },
    { id: 'orders', label: 'Commandes', icon: <ShoppingBag className="mr-2 h-4 w-4" /> },
    { id: 'messages', label: 'Messagerie', icon: <MessageSquare className="mr-2 h-4 w-4" /> },
    { id: 'subscription', label: 'Mon abonnement', icon: <CreditCard className="mr-2 h-4 w-4" /> },
  ];

  return (
    <div className="w-full md:w-1/4 space-y-4">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
        <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop"
            alt="Sophie Dubois"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">Sophie Dubois</h2>
        <p className="text-gray-500 mb-4">Ferme des Quatre Saisons</p>
        <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-full w-full">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-sm text-green-700">Compte vérifié</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center px-6 py-3 text-left transition-colors hover:bg-gray-50 ${
                selectedTab === item.id ? 'bg-gray-100 font-medium' : ''
              }`}
              onClick={() => setSelectedTab(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;

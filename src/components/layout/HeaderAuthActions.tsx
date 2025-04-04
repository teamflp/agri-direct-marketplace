
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, ShoppingBag, Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const HeaderAuthActions = () => {
  const { user, profile, signOut, isLoading } = useAuth();

  if (isLoading) {
    return <div className="w-[100px] h-[40px] animate-pulse bg-gray-200 rounded" />;
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button asChild variant="outline" size="sm">
          <Link to="/login">Connexion</Link>
        </Button>
        <Button asChild className="bg-agrimarket-orange hover:bg-agrimarket-brown" size="sm">
          <Link to="/register">Inscription</Link>
        </Button>
      </div>
    );
  }

  const initials = profile ? 
    `${profile.first_name?.charAt(0) || ''}${profile.last_name?.charAt(0) || ''}` : 
    user.email?.substring(0, 2).toUpperCase() || 'U';

  const userDashboardUrl = profile?.role === 'farmer' 
    ? '/farmer' 
    : profile?.role === 'admin' 
      ? '/admin'
      : '/buyer';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="" alt={profile?.first_name || user.email || "Utilisateur"} />
            <AvatarFallback className="bg-agrimarket-orange text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start p-2 mb-2">
          <div className="ml-2 space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.first_name || 'Utilisateur'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuItem asChild>
          <Link to={userDashboardUrl} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Tableau de bord</span>
          </Link>
        </DropdownMenuItem>
        {profile?.role === 'farmer' && (
          <DropdownMenuItem asChild>
            <Link to="/farmer/products" className="cursor-pointer">
              <Package className="mr-2 h-4 w-4" />
              <span>Mes produits</span>
            </Link>
          </DropdownMenuItem>
        )}
        {(profile?.role === 'buyer' || !profile?.role) && (
          <DropdownMenuItem asChild>
            <Link to="/buyer/orders" className="cursor-pointer">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Mes commandes</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to={`${userDashboardUrl}/profile`} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAuthActions;

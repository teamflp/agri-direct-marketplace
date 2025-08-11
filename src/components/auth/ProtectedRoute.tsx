
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { user, session, isLoading } = useAuth();
  const location = useLocation();

  // Afficher un loader pendant le chargement de l'authentification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-agrimarket-orange" />
      </div>
    );
  }

  // Si l'authentification est requise mais l'utilisateur n'est pas connecté
  if (requireAuth && (!user || !session)) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si l'utilisateur est connecté mais ne devrait pas être sur cette page (ex: page login)
  if (!requireAuth && user && session) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;


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
  const { user, session, isLoading, profile } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - isLoading:', isLoading, 'user:', !!user, 'profile:', !!profile);

  // Show loading spinner with timeout protection
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-agrimarket-orange" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Si l'authentification est requise mais l'utilisateur n'est pas connecté
  if (requireAuth && (!user || !session)) {
    console.log('Redirecting to login - no user or session');
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si l'utilisateur est connecté mais ne devrait pas être sur cette page (ex: page login)
  if (!requireAuth && user && session) {
    console.log('User logged in, redirecting from public page');
    // Redirect based on profile role if available
    if (profile?.role === 'farmer') {
      return <Navigate to="/farmer" replace />;
    } else if (profile?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/buyer" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;

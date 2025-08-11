
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';

type UserRole = 'buyer' | 'farmer' | 'admin';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackComponent?: React.ReactNode;
  redirectTo?: string;
}

const RoleGuard = ({ 
  children, 
  allowedRoles, 
  fallbackComponent,
  redirectTo 
}: RoleGuardProps) => {
  const { profile, user } = useAuth();

  // Si pas d'utilisateur connecté, rediriger vers login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si pas de profil, considérer comme buyer par défaut
  const userRole = profile?.role || 'buyer';

  // Vérifier si l'utilisateur a le bon rôle
  const hasPermission = allowedRoles.includes(userRole);

  if (!hasPermission) {
    // Si un composant de fallback est fourni, l'utiliser
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }

    // Si une redirection est spécifiée, rediriger
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }

    // Sinon, afficher un message d'erreur par défaut
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert className="max-w-md">
          <ShieldX className="h-4 w-4" />
          <AlertDescription>
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            Votre rôle actuel : <strong>{userRole}</strong>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;

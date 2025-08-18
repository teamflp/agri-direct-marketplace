
import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSecurityContext } from '@/hooks/useSecurityContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';

interface RoleBasedAccessProps {
  allowedRoles: string[];
  children: ReactNode;
  fallback?: ReactNode;
  logAccess?: boolean;
}

const RoleBasedAccess = ({ 
  allowedRoles, 
  children, 
  fallback,
  logAccess = true 
}: RoleBasedAccessProps) => {
  const { profile } = useAuth();
  const { checkUnauthorizedAccess } = useSecurityContext();
  
  const userRole = profile?.role || 'buyer';
  const hasAccess = allowedRoles.includes(userRole) || allowedRoles.includes('admin') && userRole === 'admin';
  
  // Log des tentatives d'accès si activé
  if (logAccess && !hasAccess) {
    checkUnauthorizedAccess(allowedRoles[0]);
  }
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  if (fallback) {
    return <>{fallback}</>;
  }
  
  return (
    <Alert className="border-red-200 bg-red-50">
      <ShieldX className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        Accès restreint - Permissions insuffisantes
        <br />
        <span className="text-sm">Rôles requis: {allowedRoles.join(', ')}</span>
      </AlertDescription>
    </Alert>
  );
};

export default RoleBasedAccess;

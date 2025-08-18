
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { logSecurityEvent } from '@/utils/securityValidation';

export const useSecurityContext = () => {
  const { user, profile } = useAuth();

  // Log des événements de sécurité contextuels
  const logUserAction = async (action: string, details: Record<string, any> = {}) => {
    if (user) {
      await logSecurityEvent(`user_${action}`, {
        user_id: user.id,
        user_email: user.email,
        user_role: profile?.role || 'unknown',
        ...details,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        url: window.location.href
      });
    }
  };

  // Log des changements de données sensibles
  const logDataChange = async (
    tableName: string, 
    recordId: string, 
    oldValues: any, 
    newValues: any,
    action: 'create' | 'update' | 'delete' = 'update'
  ) => {
    await logSecurityEvent(`data_${action}`, {
      tableName,
      recordId,
      oldValues,
      newValues,
      user_id: user?.id,
      user_email: user?.email,
      user_role: profile?.role || 'unknown'
    });
  };

  // Log des accès aux données sensibles
  const logDataAccess = async (tableName: string, filters: Record<string, any> = {}) => {
    await logSecurityEvent('data_access', {
      tableName,
      filters,
      user_id: user?.id,
      user_email: user?.email,
      user_role: profile?.role || 'unknown'
    });
  };

  // Log automatique de la session utilisateur
  useEffect(() => {
    if (user && profile) {
      logUserAction('session_active', {
        login_method: 'password',
        role: profile.role
      });
    }
  }, [user, profile]);

  // Détection des tentatives d'accès non autorisé
  const checkUnauthorizedAccess = (requiredRole: string): boolean => {
    const currentRole = profile?.role || 'buyer';
    const authorized = currentRole === requiredRole || currentRole === 'admin';
    
    if (!authorized) {
      logUserAction('unauthorized_access_attempt', {
        required_role: requiredRole,
        current_role: currentRole,
        resource: window.location.pathname
      });
    }
    
    return authorized;
  };

  return {
    logUserAction,
    logDataChange,
    logDataAccess,
    checkUnauthorizedAccess,
    currentUser: user,
    currentProfile: profile
  };
};

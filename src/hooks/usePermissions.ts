
import { useAuth } from '@/contexts/AuthContext';

type UserRole = 'buyer' | 'farmer' | 'admin';

type Permission = 
  | 'viewProducts'
  | 'createProducts'
  | 'editProducts'
  | 'deleteProducts'
  | 'viewOrders'
  | 'manageOrders'
  | 'viewAnalytics'
  | 'manageUsers'
  | 'manageFarmers'
  | 'manageSubscriptions'
  | 'viewFinances'
  | 'manageSettings';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  buyer: [
    'viewProducts',
    'viewOrders'
  ],
  farmer: [
    'viewProducts',
    'createProducts',
    'editProducts',
    'deleteProducts',
    'viewOrders',
    'manageOrders',
    'viewAnalytics'
  ],
  admin: [
    'viewProducts',
    'createProducts',
    'editProducts',
    'deleteProducts',
    'viewOrders',
    'manageOrders',
    'viewAnalytics',
    'manageUsers',
    'manageFarmers',
    'manageSubscriptions',
    'viewFinances',
    'manageSettings'
  ]
};

export const usePermissions = () => {
  const { profile } = useAuth();
  const userRole = (profile?.role as UserRole) || 'buyer';

  const hasPermission = (permission: Permission): boolean => {
    return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const getUserPermissions = (): Permission[] => {
    return ROLE_PERMISSIONS[userRole] || [];
  };

  return {
    userRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions
  };
};

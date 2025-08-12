
import React, { createContext, useContext } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSecureAuth } from '@/hooks/useSecureAuth';

interface SecureAuthContextType {
  isAdmin: () => boolean;
  canManageRoles: boolean;
  updateUserRole: (targetUserId: string, newRole: 'buyer' | 'farmer' | 'admin') => Promise<{ error: Error | null }>;
  secureUpdateProfile: (data: {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
  }) => Promise<{ error: Error | null }>;
}

const SecureAuthContext = createContext<SecureAuthContextType | undefined>(undefined);

export const SecureAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const secureAuth = useSecureAuth();

  const value = {
    ...secureAuth,
  };

  return (
    <SecureAuthContext.Provider value={value}>
      {children}
    </SecureAuthContext.Provider>
  );
};

export const useSecureAuthContext = () => {
  const context = useContext(SecureAuthContext);
  if (context === undefined) {
    throw new Error('useSecureAuthContext must be used within a SecureAuthProvider');
  }
  return context;
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { Badge } from '@/components/ui/badge';
import { Shield, User, Crown } from 'lucide-react';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'buyer' | 'farmer' | 'admin';
}

interface SecureUserManagementProps {
  users: User[];
  onUserUpdate: () => void;
}

const SecureUserManagement = ({ users, onUserUpdate }: SecureUserManagementProps) => {
  const { canManageRoles, updateUserRole } = useSecureAuth();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  if (!canManageRoles) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-gray-500">
            <Shield className="mr-2 h-5 w-5" />
            Accès restreint - Permissions administrateur requises
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleRoleUpdate = async (userId: string, newRole: 'buyer' | 'farmer' | 'admin') => {
    setIsUpdating(userId);
    
    try {
      const { error } = await updateUserRole(userId, newRole);
      if (!error) {
        onUserUpdate();
      }
    } finally {
      setIsUpdating(null);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4" />;
      case 'farmer':
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'farmer':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Gestion sécurisée des utilisateurs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="font-medium">
                  {user.first_name} {user.last_name}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center">
                  {getRoleIcon(user.role)}
                  <span className="ml-1">{user.role}</span>
                </Badge>
                
                <Select
                  value={user.role}
                  onValueChange={(newRole: 'buyer' | 'farmer' | 'admin') => 
                    handleRoleUpdate(user.id, newRole)
                  }
                  disabled={isUpdating === user.id}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Acheteur</SelectItem>
                    <SelectItem value="farmer">Agriculteur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureUserManagement;

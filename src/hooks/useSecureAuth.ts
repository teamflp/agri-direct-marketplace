
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSecureAuth = () => {
  const { profile, user } = useAuth();
  const { toast } = useToast();

  const isAdmin = () => {
    return profile?.role === 'admin';
  };

  const updateUserRole = async (targetUserId: string, newRole: 'buyer' | 'farmer' | 'admin') => {
    if (!isAdmin()) {
      toast({
        title: 'Accès refusé',
        description: 'Vous n\'avez pas les permissions pour modifier les rôles',
        variant: 'destructive',
      });
      return { error: new Error('Insufficient permissions') };
    }

    try {
      const { error } = await supabase.rpc('admin_update_user_role', {
        target_user_id: targetUserId,
        new_role: newRole
      });

      if (error) throw error;

      toast({
        title: 'Rôle mis à jour',
        description: 'Le rôle utilisateur a été modifié avec succès',
        variant: 'default',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const secureUpdateProfile = async (data: {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
  }) => {
    if (!user) return { error: new Error('Utilisateur non connecté') };

    try {
      // Only allow updating specific fields, role is excluded
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été mises à jour avec succès',
        variant: 'default',
      });

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Erreur lors de la mise à jour',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  return {
    isAdmin,
    updateUserRole,
    secureUpdateProfile,
    canManageRoles: isAdmin(),
  };
};

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Session } from '@supabase/supabase-js';

type UserRole = 'buyer' | 'farmer' | 'admin';

type UserProfile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  role: UserRole;
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signUp: (data: SignUpData) => Promise<{ error: any | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: any | null }>;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Configurer le listener pour les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(true);

        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Vérifier s'il y a une session active
    const initializeAuth = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await fetchUserProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Use RPC for profiles since it's not in the generated types yet
      const { data, error } = await supabase.rpc('get_profile_by_id', { user_id: userId });

      if (error) {
        console.error('Erreur lors du chargement du profil :', error);
        setProfile(null);
      } else {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil :', error);
      setProfile(null);
    }
  };

  const signUp = async ({ email, password, firstName, lastName, phoneNumber, userType }: SignUpData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            phoneNumber,
            userType
          },
        },
      });

      if (error) {
        toast({
          title: 'Erreur lors de l\'inscription',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }

      toast({
        title: 'Inscription réussie !',
        description: 'Veuillez vérifier votre e-mail pour confirmer votre compte.',
        variant: 'success',
      });

      // Rediriger vers la page de vérification d'email
      navigate('/email-verification', { state: { email } });
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Erreur lors de l\'inscription',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Erreur de connexion',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }

      toast({
        title: 'Connexion réussie !',
        description: 'Bienvenue sur AgriMarket',
        variant: 'success',
      });

      // Redirection vers la page appropriée selon le rôle
      if (data.user) {
        // Use custom RPC function to get profile role
        const { data: profileData, error: profileError } = await supabase.rpc('get_profile_by_id', { user_id: data.user.id });

        if (profileData && !profileError) {
          if (profileData.role === 'farmer') {
            navigate('/farmer/*');
          } else if (profileData.role === 'admin') {
            navigate('/admin/*');
          } else {
            navigate('/buyer/*');
          }
        } else {
          navigate('/');
        }
      }

      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Erreur de connexion',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    navigate('/');
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { error: new Error('Utilisateur non connecté') };

    try {
      // Use RPC for updating profile
      const { error } = await supabase.rpc('update_user_profile', { 
        user_id: user.id,
        profile_data: data
      });

      if (error) {
        toast({
          title: 'Erreur lors de la mise à jour du profil',
          description: error.message,
          variant: 'destructive',
        });
        return { error };
      }

      // Mettre à jour l'état local
      if (profile) {
        setProfile({ ...profile, ...data });
      }

      toast({
        title: 'Profil mis à jour',
        description: 'Vos informations ont été mises à jour avec succès.',
        variant: 'success',
      });
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Erreur lors de la mise à jour du profil',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

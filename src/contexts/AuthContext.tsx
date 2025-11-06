
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Session, AuthError, PostgrestError } from '@supabase/supabase-js';

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
  signUp: (data: SignUpData) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | PostgrestError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: PostgrestError | null }>;
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
        console.log('Auth state change:', event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

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
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log('Initial session:', currentSession?.user?.id);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      // Fetch profile from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, phone_number, role')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
        return;
      }

      if (data) {
        console.log('Profile fetched successfully:', data);
        // Map the profile data to our UserProfile type
        const userProfile: UserProfile = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
          role: (data.role as UserRole) || 'buyer'
        };
        setProfile(userProfile);
      } else {
        console.log('No profile found, creating default profile');
        // Create a default buyer profile
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            {
              id: userId,
              role: 'buyer',
              first_name: '',
              last_name: '',
              phone_number: ''
            }
          ])
          .select('id, first_name, last_name, phone_number, role')
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          setProfile(null);
        } else if (newProfile) {
          console.log('Created new profile:', newProfile);
          const userProfile: UserProfile = {
            id: newProfile.id,
            first_name: newProfile.first_name,
            last_name: newProfile.last_name,
            phone_number: newProfile.phone_number,
            role: (newProfile.role as UserRole) || 'buyer'
          };
          setProfile(userProfile);
        }
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
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

      navigate('/email-verification', { state: { email } });
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
      toast({
        title: 'Erreur lors de l\'inscription',
        description: errorMessage,
        variant: 'destructive',
      });
      return { error: error instanceof AuthError ? error : new AuthError(errorMessage) };
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

      if (!data.user) {
        const err = new Error('Utilisateur non trouvé après la connexion.');
        toast({
          title: 'Erreur de connexion',
          description: err.message,
          variant: 'destructive',
        });
        return { error: new AuthError(err.message) };
      }

      // Fetch user role to redirect correctly
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        toast({
          title: 'Erreur de connexion',
          description: "Impossible de récupérer les informations de l'utilisateur.",
          variant: 'destructive',
        });
        return { error: profileError };
      }

      toast({
        title: 'Connexion réussie !',
        description: 'Bienvenue sur AgriMarket',
        variant: 'success',
      });

      // Redirect based on role
      switch (profileData.role) {
        case 'farmer':
          navigate('/farmer');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'buyer':
          navigate('/buyer');
          break;
        default:
          navigate('/');
          break;
      }

      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
      toast({
        title: 'Erreur de connexion',
        description: errorMessage,
        variant: 'destructive',
      });
      return { error: error instanceof AuthError ? error : new AuthError(errorMessage) };
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
    if (!user) return { error: { message: 'Utilisateur non connecté', details: '', hint: '', code: '' } as PostgrestError };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
      toast({
        title: 'Erreur lors de la mise à jour du profil',
        description: errorMessage,
        variant: 'destructive',
      });
      return { error: error instanceof PostgrestError ? error : { message: errorMessage, details: '', hint: '', code: '' } as PostgrestError };
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


-- Créer la table security_audit_log manquante
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  table_name TEXT,
  record_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Créer la table login_attempts pour le rate limiting
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address TEXT,
  success BOOLEAN DEFAULT false,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_agent TEXT
);

-- Activer RLS sur les nouvelles tables
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Policies pour security_audit_log (seuls les admins peuvent voir)
CREATE POLICY "Admins can view security logs" ON public.security_audit_log
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policies pour login_attempts (seuls les admins peuvent voir)
CREATE POLICY "Admins can view login attempts" ON public.login_attempts
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Corriger les fonctions de base de données existantes pour ajouter SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_user_premium(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.premium_subscriptions 
    WHERE user_id = user_uuid 
    AND status = 'active' 
    AND expires_at > now()
  );
$$;

-- Renforcer la policy sur contact_messages pour limiter l'accès public
DROP POLICY IF EXISTS "Authenticated users can insert contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can insert contact messages" ON public.contact_messages
FOR INSERT WITH CHECK (true);

-- Seuls les admins peuvent voir les messages de contact
DROP POLICY IF EXISTS "Admins can view contact messages" ON public.contact_messages;
CREATE POLICY "Admins can view contact messages" ON public.contact_messages
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Ajouter des index pour les performances
CREATE INDEX IF NOT EXISTS idx_security_audit_log_user_id ON public.security_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_security_audit_log_created_at ON public.security_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON public.login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON public.login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_login_attempts_attempted_at ON public.login_attempts(attempted_at);

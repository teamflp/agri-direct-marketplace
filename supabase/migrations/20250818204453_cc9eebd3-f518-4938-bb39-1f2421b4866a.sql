
-- Phase 1: Corrections critiques des politiques RLS

-- 1. Corriger l'accès aux profils pour éviter l'exposition des données utilisateur
DROP POLICY IF EXISTS "Owners and admins can read farmers" ON public.farmers;
CREATE POLICY "Users can view their own farmer profile" ON public.farmers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all farmer profiles" ON public.farmers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 2. Sécuriser les données client (df_clients)
DROP POLICY IF EXISTS "Admins can view all clients" ON public.df_clients;
DROP POLICY IF EXISTS "Users can view their own clients" ON public.df_clients;

CREATE POLICY "Users can view only their created clients" ON public.df_clients
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Admins can view all clients" ON public.df_clients
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 3. Corriger les fonctions avec search_path non sécurisé
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_current_user_role_pz()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.pz_user_profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_current_strk_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::text FROM public.strk_profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_current_strk_institution_id()
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT institution_id FROM public.strk_profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_user_premium(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.premium_subscriptions 
    WHERE user_id = user_uuid 
    AND status = 'active' 
    AND expires_at > now()
  );
$$;

CREATE OR REPLACE FUNCTION public.user_is_member_of_club(p_club_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.club_members 
    WHERE club_id = p_club_id AND user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.strk_can_manage_students(target_institution uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r text;
BEGIN
  SELECT public.get_current_strk_role() INTO r;
  IF r = 'admin' THEN
    RETURN true;
  END IF;
  IF r = 'school_admin' AND target_institution = public.get_current_strk_institution_id() THEN
    RETURN true;
  END IF;
  RETURN false;
END;
$$;

CREATE OR REPLACE FUNCTION public.user_has_permission(permission_name text)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role text;
  user_position text;
BEGIN
  SELECT p.role INTO user_role 
  FROM public.pz_user_profiles p 
  WHERE p.id = auth.uid();
  
  SELECT s.position INTO user_position
  FROM public.pz_staff s
  JOIN public.pz_user_profiles p ON s.id = p.staff_id
  WHERE p.id = auth.uid() AND s.is_active = true;
  
  CASE permission_name
    WHEN 'canManageStaff' THEN
      RETURN user_role IN ('admin', 'rh');
    WHEN 'canManageResidents' THEN
      RETURN user_role = 'admin' OR user_position IN ('medecin', 'chef_de_service');
    WHEN 'canExportData' THEN
      RETURN user_role IN ('admin', 'rh') OR user_position IN ('medecin', 'chef_de_service');
    WHEN 'canAccessMedicalRecords' THEN
      RETURN user_role = 'admin' OR user_position IN ('medecin', 'infirmier', 'chef_de_service');
    WHEN 'canCreateAlerts' THEN
      RETURN user_role = 'admin' OR user_position IN ('medecin', 'infirmier', 'chef_de_service');
    WHEN 'canManagePlanning' THEN
      RETURN user_role IN ('admin', 'rh') OR user_position = 'chef_de_service';
    WHEN 'canManageLeaves' THEN
      RETURN user_role IN ('admin', 'rh');
    WHEN 'canViewAllSoins' THEN
      RETURN user_role = 'admin' OR user_position IN ('medecin', 'infirmier', 'chef_de_service');
    WHEN 'canCreateSoins' THEN
      RETURN user_role = 'admin' OR user_position IN ('medecin', 'infirmier', 'aide_soignant');
    WHEN 'canAccessRtp' THEN
      RETURN user_role IN ('admin', 'rh') OR user_position = 'chef_de_service';
    WHEN 'canViewSettings' THEN
      RETURN user_role IN ('admin', 'rh');
    WHEN 'canViewMeals' THEN
      RETURN user_role = 'admin' OR user_position IN ('dieteticien', 'chef_de_service', 'medecin', 'infirmier');
    WHEN 'canManageMeals' THEN
      RETURN user_role IN ('admin', 'rh') OR user_position IN ('dieteticien', 'chef_de_service');
    WHEN 'canPlanMeals' THEN
      RETURN user_role IN ('admin', 'rh') OR user_position IN ('dieteticien', 'chef_de_service');
    WHEN 'canServeMeals' THEN
      RETURN user_role = 'admin' OR user_position IN ('dieteticien', 'chef_de_service', 'medecin', 'infirmier', 'aide_soignant');
    ELSE
      RETURN false;
  END CASE;
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_role_change(target_user_id uuid, new_role text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_role text;
  current_user_position text;
BEGIN
  IF target_user_id = auth.uid() THEN
    RETURN false;
  END IF;
  
  SELECT p.role INTO current_user_role 
  FROM public.pz_user_profiles p 
  WHERE p.id = auth.uid();
  
  SELECT s.position INTO current_user_position
  FROM public.pz_staff s
  JOIN public.pz_user_profiles p ON s.id = p.staff_id
  WHERE p.id = auth.uid() AND s.is_active = true;
  
  IF current_user_role NOT IN ('admin', 'rh') THEN
    RETURN false;
  END IF;
  
  IF current_user_role = 'rh' AND new_role = 'admin' THEN
    RETURN false;
  END IF;
  
  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.user_can_access_leave(p_leave_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  requester_user uuid;
  current_position text;
BEGIN
  -- requester user (profile) linked to the leave's staff
  SELECT p.id
    INTO requester_user
  FROM public.pz_user_profiles p
  WHERE p.staff_id = (
    SELECT l.staff_id FROM public.pz_leaves l WHERE l.id = p_leave_id
  )
  LIMIT 1;

  -- If the current user is the requester
  IF requester_user IS NOT NULL AND auth.uid() = requester_user THEN
    RETURN true;
  END IF;

  -- If user has manage leaves permission (admin/rh)
  IF public.user_has_permission('canManageLeaves') THEN
    RETURN true;
  END IF;

  -- If current user is 'chef_de_service', allow read access
  SELECT s.position INTO current_position
  FROM public.pz_staff s
  JOIN public.pz_user_profiles p ON p.staff_id = s.id
  WHERE p.id = auth.uid() AND s.is_active = true
  LIMIT 1;

  IF current_position = 'chef_de_service' THEN
    RETURN true;
  END IF;

  RETURN false;
END;
$$;

-- 4. Créer une table d'audit pour les changements de rôles
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  user_email text,
  table_name text,
  record_id text,
  old_values jsonb,
  new_values jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- RLS pour l'audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs" ON public.security_audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 5. Table pour les tentatives de connexion
CREATE TABLE IF NOT EXISTS public.login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  ip_address text,
  user_agent text,
  success boolean NOT NULL DEFAULT false,
  failure_reason text,
  created_at timestamp with time zone DEFAULT now()
);

-- RLS pour les tentatives de connexion
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view login attempts" ON public.login_attempts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );


-- Phase 1: Critical Role Security Fixes

-- 1. Create a security definer function to get current user role (prevents recursion in RLS)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- 2. Create a security definer function to check if user can manage roles
CREATE OR REPLACE FUNCTION public.can_manage_user_roles()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER  
SET search_path = public
AS $$
  SELECT get_current_user_role() = 'admin';
$$;

-- 3. Drop the existing insecure policy that allows users to update their own profiles without restrictions
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 4. Create secure RLS policies for profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile (except role)"
  ON public.profiles  
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    (OLD.role = NEW.role OR can_manage_user_roles())
  );

CREATE POLICY "Admins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (can_manage_user_roles());

CREATE POLICY "Admins can update any profile"
  ON public.profiles
  FOR UPDATE  
  USING (can_manage_user_roles())
  WITH CHECK (can_manage_user_roles());

-- 5. Create audit logging trigger for role changes
CREATE OR REPLACE FUNCTION public.log_role_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log role changes for security audit
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.profiles (id, first_name, last_name, role, phone_number, created_at, updated_at) 
    VALUES (
      gen_random_uuid(),
      CONCAT('AUDIT_LOG_', extract(epoch from now())),
      CONCAT('Role changed from ', COALESCE(OLD.role, 'null'), ' to ', NEW.role, ' for user ', NEW.id),
      'audit_log',
      CONCAT('changed_by:', auth.uid(), ' at:', now()),
      now(),
      now()
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Apply the audit trigger
DROP TRIGGER IF EXISTS audit_role_changes ON public.profiles;
CREATE TRIGGER audit_role_changes
  AFTER UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.log_role_changes();

-- 6. Fix search_path on existing functions
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

-- 7. Create role management function for admins only
CREATE OR REPLACE FUNCTION public.admin_update_user_role(
  target_user_id uuid,
  new_role text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only admins can call this function
  IF NOT can_manage_user_roles() THEN
    RAISE EXCEPTION 'Insufficient permissions to change user roles';
  END IF;
  
  -- Validate role
  IF new_role NOT IN ('buyer', 'farmer', 'admin') THEN
    RAISE EXCEPTION 'Invalid role specified';
  END IF;
  
  -- Update the role
  UPDATE public.profiles 
  SET role = new_role, updated_at = now()
  WHERE id = target_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;
END;
$$;

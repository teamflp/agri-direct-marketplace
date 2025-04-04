
-- Create a stored procedure to get a user profile by ID
CREATE OR REPLACE FUNCTION public.get_profile_by_id(user_id uuid)
RETURNS public.profiles
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.profiles WHERE id = user_id;
$$;

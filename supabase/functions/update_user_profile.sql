
-- Create a stored procedure to update a user profile
CREATE OR REPLACE FUNCTION public.update_user_profile(
  user_id uuid,
  profile_data jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET
    first_name = COALESCE(profile_data->>'first_name', first_name),
    last_name = COALESCE(profile_data->>'last_name', last_name),
    phone_number = COALESCE(profile_data->>'phone_number', phone_number),
    role = COALESCE(profile_data->>'role', role)
  WHERE id = user_id;
END;
$$;

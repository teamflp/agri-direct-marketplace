-- Fix security vulnerability in df_clients table
-- Issue: All authenticated users can view all customer email addresses and phone numbers

-- Step 1: Add created_by column to track ownership
ALTER TABLE public.df_clients 
ADD COLUMN created_by UUID REFERENCES auth.users(id);

-- Step 2: Update existing records to have a created_by value (set to first user if any exist)
UPDATE public.df_clients 
SET created_by = (SELECT id FROM auth.users LIMIT 1)
WHERE created_by IS NULL;

-- Step 3: Make created_by NOT NULL after populating existing records
ALTER TABLE public.df_clients 
ALTER COLUMN created_by SET NOT NULL;

-- Step 4: Drop the insecure existing policy
DROP POLICY IF EXISTS "Users can view all clients" ON public.df_clients;

-- Step 5: Create secure RLS policies
-- Users can only view clients they created
CREATE POLICY "Users can view their own clients" 
ON public.df_clients 
FOR SELECT 
USING (auth.uid() = created_by);

-- Admins can view all clients (if admin role exists)
CREATE POLICY "Admins can view all clients" 
ON public.df_clients 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Update insert policy to automatically set created_by
DROP POLICY IF EXISTS "Users can create clients" ON public.df_clients;
CREATE POLICY "Users can create their own clients" 
ON public.df_clients 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

-- Update the update policy to only allow users to update their own clients
DROP POLICY IF EXISTS "Users can update clients" ON public.df_clients;
CREATE POLICY "Users can update their own clients" 
ON public.df_clients 
FOR UPDATE 
USING (auth.uid() = created_by OR EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() 
  AND role = 'admin'
));

-- Allow admins to update any client
CREATE POLICY "Admins can update any client" 
ON public.df_clients 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Add trigger to automatically set created_by on insert
CREATE OR REPLACE FUNCTION public.set_created_by()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_df_clients_created_by
  BEFORE INSERT ON public.df_clients
  FOR EACH ROW
  EXECUTE FUNCTION public.set_created_by();
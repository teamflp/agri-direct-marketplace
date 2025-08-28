-- Create the audit trail table
CREATE TABLE public.data_modification_audit (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  modified_table TEXT NOT NULL,
  modified_row_id UUID NOT NULL,
  modified_by UUID,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  previous_value JSONB,
  new_value JSONB,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES auth.users(id)
    ON DELETE SET NULL,
  CONSTRAINT fk_modified_by
    FOREIGN KEY(modified_by)
    REFERENCES auth.users(id)
    ON DELETE SET NULL
);

-- RLS for the audit trail table
ALTER TABLE public.data_modification_audit ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can access audit trail" ON public.data_modification_audit FOR ALL
  USING (
    (SELECT role FROM public.profiles WHERE user_id = auth.uid()) = 'admin'
  );

-- Create the trigger function to log data changes
CREATE OR REPLACE FUNCTION public.log_data_change()
RETURNS TRIGGER AS $$
DECLARE
    audit_row public.data_modification_audit;
    old_json jsonb;
    new_json jsonb;
BEGIN
    old_json := to_jsonb(OLD);
    new_json := to_jsonb(NEW);

    audit_row.modified_table := TG_TABLE_NAME;
    audit_row.modified_row_id := OLD.id;
    audit_row.previous_value := old_json;
    audit_row.new_value := new_json;

    -- Try to get user_id from the row, assuming it has a user_id or id column referencing auth.users
    IF (TG_OP = 'UPDATE' OR TG_OP = 'DELETE') THEN
      IF (jsonb_typeof(old_json->'user_id') = 'string') THEN
        audit_row.user_id := (old_json->>'user_id')::uuid;
      ELSIF (jsonb_typeof(old_json->'id') = 'string' AND TG_TABLE_NAME = 'profiles') THEN
        audit_row.user_id := (old_json->>'id')::uuid;
      END IF;
    END IF;

    -- Set the user who made the change
    audit_row.modified_by := auth.uid();

    INSERT INTO public.data_modification_audit VALUES (audit_row.*);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for tables with personal data
CREATE TRIGGER profiles_audit_trigger
AFTER UPDATE ON public.profiles
FOR EACH ROW
WHEN (OLD.* IS DISTINCT FROM NEW.*)
EXECUTE FUNCTION public.log_data_change();

CREATE TRIGGER farmers_audit_trigger
AFTER UPDATE ON public.farmers
FOR EACH ROW
WHEN (OLD.* IS DISTINCT FROM NEW.*)
EXECUTE FUNCTION public.log_data_change();

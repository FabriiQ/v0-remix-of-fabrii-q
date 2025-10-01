-- Add a role_id column to the user_profiles table
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS role_id BIGINT;

-- Add a foreign key constraint to the roles table
-- Note: We are not setting a default value here to avoid locking the table on large datasets.
-- A separate script or manual update should be used to assign roles to existing users.
ALTER TABLE public.user_profiles
ADD CONSTRAINT fk_role_id
FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE SET NULL;

-- Create an index for the new role_id column for faster lookups
CREATE INDEX IF NOT EXISTS user_profiles_role_id_idx ON public.user_profiles(role_id);

-- Update the existing RLS policy on user_profiles if needed, or add new ones.
-- For now, we assume existing policies are sufficient until the full permission system is implemented.

-- It's often useful to set a default role for new users.
-- We can do this by setting the default value on the column.
-- Let's find the ID for the 'user' role and set it as the default.
DO $$
DECLARE
    user_role_id BIGINT;
BEGIN
    SELECT id INTO user_role_id FROM public.roles WHERE name = 'user';
    IF user_role_id IS NOT NULL THEN
        EXECUTE 'ALTER TABLE public.user_profiles ALTER COLUMN role_id SET DEFAULT ' || user_role_id;
    END IF;
END $$;

-- For existing users that don't have a role, we can assign them the default 'user' role.
UPDATE public.user_profiles
SET role_id = (SELECT id FROM public.roles WHERE name = 'user')
WHERE role_id IS NULL;
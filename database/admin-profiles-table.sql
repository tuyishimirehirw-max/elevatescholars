-- ============================================
-- ADMIN PROFILES TABLE
-- The Voices Of Future Rwanda
-- ============================================
-- This table stores admin user profiles with additional metadata

CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view their own profile
CREATE POLICY "Admins can view own profile"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Super admins can view all profiles
CREATE POLICY "Super admins can view all profiles"
  ON admin_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Policy: Super admins can update profiles
CREATE POLICY "Super admins can update profiles"
  ON admin_profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Create index for faster queries
CREATE INDEX idx_admin_profiles_email ON admin_profiles(email);
CREATE INDEX idx_admin_profiles_role ON admin_profiles(role);

-- Comments for documentation
COMMENT ON TABLE admin_profiles IS 'Stores admin user profiles with roles and metadata';
COMMENT ON COLUMN admin_profiles.role IS 'Admin role: admin or super_admin';
COMMENT ON COLUMN admin_profiles.is_active IS 'Whether the admin account is active';

-- ============================================
-- INSTRUCTIONS FOR CREATING ADMIN USERS
-- ============================================
-- 
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User" or "Invite User"
-- 3. Enter email and password (or send invite email)
-- 4. After user is created, insert into admin_profiles:
--
-- INSERT INTO admin_profiles (id, email, full_name, role)
-- VALUES (
--   'USER_UUID_FROM_AUTH_USERS',
--   'admin@voicesoffuturerwanda.rw',
--   'Admin Name',
--   'super_admin'
-- );
--
-- Note: The id must match the UUID from auth.users table

-- ============================================
-- REGISTRATIONS TABLE
-- The Voices Of Future Rwanda
-- ============================================
-- This table stores all student registration submissions from the website

CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- User Type
  user_type TEXT NOT NULL CHECK (user_type IN ('parent', 'school', 'individual')),
  
  -- Student Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  school TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  
  -- Contact Information
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  
  -- Parent/Guardian Information (conditional - for parent enrollments)
  parent_name TEXT,
  parent_email TEXT,
  parent_phone TEXT,
  
  -- School Partnership Information (conditional - for school partnerships)
  school_name TEXT,
  school_size TEXT,
  school_role TEXT,
  
  -- Program Selection
  program TEXT NOT NULL,
  
  -- Goals & Experience
  goals TEXT NOT NULL,
  experience TEXT,
  how_heard TEXT,
  
  -- Payment
  payment_method TEXT NOT NULL,
  
  -- Terms & Conditions
  agreed_to_terms BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Status Tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'enrolled', 'cancelled')),
  admin_notes TEXT,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public registration form)
CREATE POLICY "Anyone can register"
  ON registrations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view registrations
CREATE POLICY "Authenticated users can view registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admins) can update registrations
CREATE POLICY "Authenticated users can update registrations"
  ON registrations FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admins) can delete registrations
CREATE POLICY "Authenticated users can delete registrations"
  ON registrations FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for faster queries
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX idx_registrations_program ON registrations(program);
CREATE INDEX idx_registrations_user_type ON registrations(user_type);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_registrations_updated_at
    BEFORE UPDATE ON registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE registrations IS 'Stores all student registration submissions from the website';
COMMENT ON COLUMN registrations.user_type IS 'Type of user registering: parent, school, or individual';
COMMENT ON COLUMN registrations.status IS 'Current status of the registration: pending, approved, rejected, enrolled, or cancelled';
COMMENT ON COLUMN registrations.admin_notes IS 'Internal notes from admin staff about this registration';

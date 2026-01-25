-- ============================================
-- CONTACTS TABLE
-- The Voices Of Future Rwanda
-- ============================================
-- This table stores all contact form submissions from the website

CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Inquiry Details
  inquiry_type TEXT NOT NULL,
  program TEXT,
  message TEXT NOT NULL,
  
  -- Status Tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  admin_notes TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID REFERENCES auth.users(id),
  
  -- Metadata
  ip_address INET,
  user_agent TEXT
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit contact form
CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view contacts
CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admins) can update contacts
CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admins) can delete contacts
CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for faster queries
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_inquiry_type ON contacts(inquiry_type);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comments for documentation
COMMENT ON TABLE contacts IS 'Stores all contact form submissions from the website';
COMMENT ON COLUMN contacts.status IS 'Current status: new, read, responded, or archived';
COMMENT ON COLUMN contacts.admin_notes IS 'Internal notes from admin staff about this inquiry';

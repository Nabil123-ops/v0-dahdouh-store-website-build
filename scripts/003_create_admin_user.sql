-- Create admin user for login
-- This creates a user through Supabase Auth
-- Email: admin@dahdouhai.live
-- Password: Admin@123

-- Note: Since we can't directly insert into auth.users via SQL,
-- we need to use the Supabase dashboard or create a signup endpoint
-- For now, we'll create a helper function to check if we need to remind admin to sign up

-- Create a simple table to track admin creation status
CREATE TABLE IF NOT EXISTS admin_setup (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email TEXT NOT NULL,
  setup_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert reminder
INSERT INTO admin_setup (admin_email, setup_instructions)
VALUES (
  'admin@dahdouhai.live',
  'Please sign up with this email at /auth/sign-up to create your admin account'
);

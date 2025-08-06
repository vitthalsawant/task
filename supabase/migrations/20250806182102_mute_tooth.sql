/*
  # Automatic Profile Creation System

  1. Database Changes
    - Add trigger to automatically create profile record when user signs up
    - Profile starts with NULL username to trigger setup flow
    - Automatic profile creation linked to auth.users

  2. Security
    - Maintain existing RLS policies
    - Ensure secure profile creation process

  3. Workflow
    - User signs up → Profile created automatically with NULL username
    - App detects NULL username → Redirects to setup-profile
    - User completes setup → Updates existing profile record
*/

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, full_name)
  VALUES (
    NEW.id,
    NULL, -- Username starts as NULL to trigger setup flow
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run function when new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update profiles table to allow NULL username initially
ALTER TABLE profiles ALTER COLUMN username DROP NOT NULL;

-- Add constraint to ensure username is set eventually (but allow NULL initially)
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS username_length;
ALTER TABLE profiles ADD CONSTRAINT username_length 
  CHECK (username IS NULL OR char_length(username) >= 3);

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS username_format;
ALTER TABLE profiles ADD CONSTRAINT username_format 
  CHECK (username IS NULL OR username ~ '^[a-z0-9_]+$');
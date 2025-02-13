/*
  # Create leads table for app discount requests

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `first_name` (text)
      - `website_url` (text)
      - `email` (text)
      - `app_id` (text)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to read their own data
    - Add policy for anyone to insert data
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  first_name text NOT NULL,
  website_url text NOT NULL,
  email text NOT NULL,
  app_id text NOT NULL
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);
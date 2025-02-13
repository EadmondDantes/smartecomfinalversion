/*
  # Agency Reviews System

  1. New Tables
    - `agency_reviews`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `agency_id` (text, references agencies)
      - `rating` (integer, 1-5)
      - `review` (text)
      - `email` (text)
      - `verification_file` (text)
      - `status` (text, enum: pending/approved/rejected)

  2. Security
    - Enable RLS on `agency_reviews` table
    - Add policies for:
      - Public can insert reviews
      - Authenticated users can read approved reviews
*/

-- Create enum for review status
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');

-- Create reviews table
CREATE TABLE IF NOT EXISTS agency_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  agency_id text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  email text NOT NULL,
  verification_file text NOT NULL,
  status review_status DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE agency_reviews ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for verification files
INSERT INTO storage.buckets (id, name, public)
VALUES ('verifications', 'verifications', false)
ON CONFLICT (id) DO NOTHING;

-- Set up storage bucket policy
CREATE POLICY "Public users can upload verification files"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'verifications');

-- Create RLS policies
CREATE POLICY "Anyone can submit reviews"
  ON agency_reviews
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read approved reviews"
  ON agency_reviews
  FOR SELECT
  TO authenticated
  USING (status = 'approved');

CREATE POLICY "Service role can update reviews"
  ON agency_reviews
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
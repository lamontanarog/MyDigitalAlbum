/*
  # Initial Schema Setup for Digital Album Platform

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (timestamp)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
    
    - `photos`
      - `id` (uuid, primary key)
      - `event_id` (uuid, references events)
      - `url` (text)
      - `created_at` (timestamp)
      - `uploaded_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own events"
  ON events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Photos policies
CREATE POLICY "Insert photos"
ON photos
FOR INSERT
TO public
USING (auth.uid() IS NOT NULL)

-- Política de lectura de fotos
CREATE POLICY "Select photos"
ON photos
FOR SELECT
TO public
USING (true);

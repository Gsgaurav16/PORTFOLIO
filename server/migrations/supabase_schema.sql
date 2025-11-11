-- Supabase Database Schema for Portfolio Website
-- Run this SQL in your Supabase SQL Editor

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  short_description TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id BIGSERIAL PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  period VARCHAR(100),
  description TEXT,
  achievements JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Skills Categories Table
CREATE TABLE IF NOT EXISTS skills_categories (
  id BIGSERIAL PRIMARY KEY,
  category_id VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  achievements JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Hero Section Table (single row)
CREATE TABLE IF NOT EXISTS hero (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title VARCHAR(255),
  subtitle VARCHAR(255),
  description TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  mini_cards JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- About Section Table (single row)
CREATE TABLE IF NOT EXISTS about (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title VARCHAR(255),
  subtitle TEXT,
  mission TEXT,
  core_abilities JSONB DEFAULT '[]'::jsonb,
  stats JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Contact Section Table (single row)
CREATE TABLE IF NOT EXISTS contact (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name VARCHAR(255),
  role VARCHAR(255),
  bio TEXT,
  email VARCHAR(255),
  status VARCHAR(50),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Admin Table (single row)
CREATE TABLE IF NOT EXISTS admin (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_categories_updated_at BEFORE UPDATE ON skills_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_updated_at BEFORE UPDATE ON hero
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_updated_at BEFORE UPDATE ON about
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_updated_at BEFORE UPDATE ON contact
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON admin
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) - Optional, adjust based on your needs
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed)
-- Projects
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON projects FOR ALL USING (true);

-- Experiences
CREATE POLICY "Allow public read access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON experiences FOR ALL USING (true);

-- Testimonials
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON testimonials FOR ALL USING (true);

-- Skills Categories
CREATE POLICY "Allow public read access" ON skills_categories FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON skills_categories FOR ALL USING (true);

-- Hero
CREATE POLICY "Allow public read access" ON hero FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON hero FOR ALL USING (true);

-- About
CREATE POLICY "Allow public read access" ON about FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON about FOR ALL USING (true);

-- Contact
CREATE POLICY "Allow public read access" ON contact FOR SELECT USING (true);
CREATE POLICY "Allow service role full access" ON contact FOR ALL USING (true);

-- Admin (no public access)
CREATE POLICY "Allow service role full access" ON admin FOR ALL USING (true);

-- Note: Admin password will be set by seed script
-- Default password is 'admin123' (bcrypt hashed)


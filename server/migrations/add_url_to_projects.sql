-- Add URL field to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS url VARCHAR(500);


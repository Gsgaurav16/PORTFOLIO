-- Add Discord field to contact table
ALTER TABLE contact ADD COLUMN IF NOT EXISTS discord VARCHAR(500);

-- Update existing row if it exists
UPDATE contact SET discord = 'https://discord.com/users/YOUR_USER_ID' WHERE id = 1 AND discord IS NULL;


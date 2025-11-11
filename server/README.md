# Portfolio Backend API with Supabase

Backend server for the portfolio website using Supabase as the database.

## Prerequisites

- Node.js (v18 or higher)
- Supabase account and project

## Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Get your Supabase credentials**:
   - Go to Project Settings → API
   - Copy Project URL, anon key, and service_role key

3. **Run the database schema**:
   - Go to SQL Editor in Supabase dashboard
   - Copy and paste contents of `migrations/supabase_schema.sql`
   - Click "Run"

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Create a `.env` file**:
   ```env
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   SUPABASE_ANON_KEY=your_anon_key

   PORT=5000
   NODE_ENV=development

   FRONTEND_URL=http://localhost:5173
   ```

6. **Seed the database**:
   ```bash
   npm run seed
   ```

7. **Start the server**:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a single project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get a single experience
- `POST /api/experiences` - Create a new experience
- `PUT /api/experiences/:id` - Update an experience
- `DELETE /api/experiences/:id` - Delete an experience

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get a single testimonial
- `POST /api/testimonials` - Create a new testimonial
- `PUT /api/testimonials/:id` - Update a testimonial
- `DELETE /api/testimonials/:id` - Delete a testimonial

### Skills
- `GET /api/skills` - Get all skills categories
- `GET /api/skills/:categoryId` - Get a single category
- `POST /api/skills` - Create a new category
- `PUT /api/skills/:categoryId` - Update a category
- `DELETE /api/skills/:categoryId` - Delete a category

### Sections
- `GET /api/sections/hero` - Get hero section data
- `PUT /api/sections/hero` - Update hero section
- `GET /api/sections/about` - Get about section data
- `PUT /api/sections/about` - Update about section
- `GET /api/sections/contact` - Get contact section data
- `PUT /api/sections/contact` - Update contact section

### Auth
- `POST /api/auth/login` - Login (body: `{ password: "..." }`)
- `PUT /api/auth/password` - Change password (body: `{ currentPassword: "...", newPassword: "..." }`)

## Default Admin Password

The default admin password is `admin123`. Change it after first login for security.

## Database Schema

See `migrations/supabase_schema.sql` for the complete database schema. Run this in your Supabase SQL Editor.

## Production Deployment

1. Set `NODE_ENV=production` in your `.env` file
2. Update `FRONTEND_URL` to your production frontend URL
3. Use a process manager like PM2 to run the server:
   ```bash
   npm install -g pm2
   pm2 start server.js --name portfolio-api
   ```

## Supabase Features

- **Managed PostgreSQL** - No database server management needed
- **Automatic Backups** - Supabase handles backups
- **Row Level Security** - Built-in security policies
- **Real-time** - Can add real-time subscriptions
- **Storage** - Can be used for file uploads

## Troubleshooting

### Connection Issues
- Verify Supabase project is active
- Check credentials in `.env` file
- Verify schema has been run in Supabase SQL Editor

### RLS Issues
- Check Row Level Security policies in Supabase dashboard
- Verify service_role key is used for admin operations

### Data Issues
- Check Supabase dashboard → Table Editor
- Verify seed script ran successfully
- Check Supabase logs

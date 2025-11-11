# Supabase Integration Guide

This document describes the Supabase integration for the portfolio website.

## Overview

The portfolio website uses Supabase (a PostgreSQL-based backend-as-a-service) for data persistence. This provides:

- **Managed PostgreSQL database** - No need to manage your own database server
- **Automatic backups** - Supabase handles database backups
- **Scalable architecture** - Scales automatically with your needs
- **Real-time capabilities** - Can add real-time subscriptions
- **Built-in security** - Row Level Security (RLS) policies
- **Easy deployment** - No database server management needed

## Architecture

### Backend (Node.js + Express + Supabase)

- **Server**: Express.js REST API
- **Database**: Supabase (PostgreSQL)
- **Client**: `@supabase/supabase-js`
- **Authentication**: bcrypt for password hashing
- **API Routes**: RESTful endpoints using Supabase client

### Frontend (React + Vite)

- **API Client**: Custom API utility (`src/utils/api.js`)
- **Context**: AdminContext uses API calls
- **State Management**: React Context API with API integration

## Supabase Setup Steps

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account

2. **Create New Project**
   - Click "New Project"
   - Enter project details
   - Save your database password

3. **Get API Credentials**
   - Go to Project Settings → API
   - Copy:
     - Project URL
     - anon/public key
     - service_role key (keep secret!)

4. **Run Database Schema**
   - Go to SQL Editor
   - Copy contents of `server/migrations/supabase_schema.sql`
   - Paste and run in SQL Editor

5. **Configure Environment Variables**
   - Create `.env` in `server/` directory
   - Add Supabase credentials

6. **Seed Database**
   - Run `npm run seed` in server directory
   - This creates admin user and default data

## Database Schema

The schema includes:

- **projects** - Portfolio projects
- **experiences** - Work experiences
- **testimonials** - Client testimonials
- **skills_categories** - Skills organized by categories
- **hero** - Hero section (single row)
- **about** - About section (single row)
- **contact** - Contact info (single row)
- **admin** - Admin authentication (single row)

### Row Level Security (RLS)

RLS policies are configured to:
- Allow public read access to portfolio data
- Restrict admin table to service role only
- Allow service role full access for admin operations

## API Endpoints

All endpoints remain the same as before:

- `/api/projects` - Projects CRUD
- `/api/experiences` - Experiences CRUD
- `/api/testimonials` - Testimonials CRUD
- `/api/skills` - Skills categories CRUD
- `/api/sections/hero` - Hero section
- `/api/sections/about` - About section
- `/api/sections/contact` - Contact section
- `/api/auth/login` - Admin login
- `/api/auth/password` - Change password

## Environment Variables

### Backend (.env in server/ directory)
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env in root directory)
```env
VITE_API_URL=http://localhost:5000/api
```

## Key Differences from Local PostgreSQL

1. **No local database server** - Everything is in the cloud
2. **Supabase client** - Uses `@supabase/supabase-js` instead of `pg`
3. **Simpler connection** - Just URL and API key
4. **Built-in features** - RLS, real-time, storage, etc.
5. **Automatic backups** - No need to set up backups

## Supabase Client Usage

The Supabase client is used in all routes:

```javascript
import supabase from '../db/connection.js'

// Select
const { data, error } = await supabase
  .from('projects')
  .select('*')

// Insert
const { data, error } = await supabase
  .from('projects')
  .insert({ title: '...' })
  .select()

// Update
const { data, error } = await supabase
  .from('projects')
  .update({ title: '...' })
  .eq('id', id)

// Delete
const { data, error } = await supabase
  .from('projects')
  .delete()
  .eq('id', id)
```

## Security Best Practices

1. **Service Role Key**: Only use in backend, never expose to frontend
2. **Anon Key**: Can be used in frontend if needed (not required for this setup)
3. **RLS Policies**: Configured to protect admin data
4. **Password Hashing**: Admin passwords are bcrypt hashed
5. **Environment Variables**: All sensitive data in .env files

## Troubleshooting

### Connection Issues
- Verify Supabase project is active
- Check credentials match dashboard
- Verify network connectivity

### RLS Issues
- Check policies in Supabase dashboard
- Verify service_role key is used for admin operations
- Check policy conditions

### Data Issues
- Check Supabase dashboard → Table Editor
- Verify schema was run correctly
- Check Supabase logs

## Production Deployment

1. **Supabase Project**: Use production project or same project
2. **Environment Variables**: Set in hosting provider
3. **CORS**: Update FRONTEND_URL for production domain
4. **Backend**: Deploy to Vercel, Railway, or similar
5. **Frontend**: Deploy to Vercel, Netlify, etc.

## Advantages of Supabase

- ✅ No database server management
- ✅ Automatic backups
- ✅ Built-in security (RLS)
- ✅ Real-time capabilities
- ✅ Storage for files
- ✅ Edge Functions support
- ✅ Free tier available
- ✅ Easy scaling

## Migration from Local PostgreSQL

If you were using local PostgreSQL:
1. Export data from local database (if needed)
2. Set up Supabase project
3. Run Supabase schema
4. Import data (if needed)
5. Update environment variables
6. Test all functionality

## Support

For issues:
1. Check Supabase dashboard logs
2. Check server terminal logs
3. Check browser console
4. Verify environment variables
5. Check Supabase documentation


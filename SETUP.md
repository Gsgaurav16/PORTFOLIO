# Portfolio Website Setup Guide with Supabase

This guide will help you set up the portfolio website with Supabase database.

## Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **Supabase Account** - [Sign up](https://supabase.com/)
3. **npm** or **yarn** package manager

## Supabase Setup

1. **Create a Supabase account** at [supabase.com](https://supabase.com)

2. **Create a new project**:
   - Click "New Project"
   - Choose your organization
   - Enter project name (e.g., "portfolio-db")
   - Enter database password (save this securely)
   - Choose a region close to you
   - Click "Create new project"

3. **Get your Supabase credentials**:
   - Go to Project Settings → API
   - Copy the following:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon/public key** (for frontend)
     - **service_role key** (for backend - keep this secret!)

4. **Run the database schema**:
   - Go to SQL Editor in your Supabase dashboard
   - Open the file `server/migrations/supabase_schema.sql`
   - Copy and paste the entire SQL into the SQL Editor
   - Click "Run" to execute the schema

## Backend Setup

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `server` directory:
   ```env
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   SUPABASE_ANON_KEY=your_anon_key_here

   PORT=5000
   NODE_ENV=development

   FRONTEND_URL=http://localhost:5173
   ```

   Replace the values with your actual Supabase credentials.

4. **Seed the database with default data**:
   ```bash
   npm run seed
   ```

   This will:
   - Create an admin user with default password: `admin123`
   - Add default portfolio data (projects, experiences, testimonials, skills, etc.)

5. **Start the backend server**:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

## Frontend Setup

1. **Navigate to the project root** (if not already there):
   ```bash
   cd ..
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## Accessing the Admin Panel

1. **Open your browser** and navigate to: `http://localhost:5173/admin`

2. **Login with default credentials**:
   - Password: `admin123`

3. **Change the password** immediately after first login for security.

## Production Deployment

### Backend

1. Set `NODE_ENV=production` in your `.env` file
2. Update `FRONTEND_URL` to your production frontend URL
3. Use a process manager like PM2 to run the server:
   ```bash
   npm install -g pm2
   pm2 start server.js --name portfolio-api
   ```

### Frontend

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider (Vercel, Netlify, etc.)

3. Update the `VITE_API_URL` environment variable in your hosting provider to point to your backend API URL.

## Troubleshooting

### Supabase Connection Issues

- Verify your Supabase project is active
- Check credentials in `.env` file match your Supabase dashboard
- Verify the schema has been run in SQL Editor
- Check Supabase project logs for errors

### API Connection Issues

- Verify backend server is running on port 5000
- Check CORS settings in `server/server.js`
- Verify `VITE_API_URL` in frontend `.env` matches backend URL

### Database Issues

- Check Supabase dashboard → Table Editor to see if tables exist
- Verify RLS (Row Level Security) policies are set correctly
- Check Supabase logs for SQL errors

## Security Notes

1. **Change the default admin password** immediately after setup
2. **Use strong passwords** for production
3. **Never commit `.env` files** to version control
4. **Keep service_role key secret** - only use in backend
5. **Use anon key** for frontend if you want direct Supabase access (optional)

## Next Steps

1. Customize your portfolio content via the admin panel
2. Update hero section, about section, and contact information
3. Add your projects, experiences, and testimonials
4. Customize skills and categories
5. Deploy to production

## Supabase Features

- **Automatic backups**: Supabase handles database backups
- **Real-time subscriptions**: Can be added for live updates
- **Storage**: Can be used for file uploads
- **Authentication**: Can be integrated for user management
- **Edge Functions**: Can be used for serverless functions

## Support

If you encounter any issues:
1. Check server logs in the terminal
2. Check browser console for frontend errors
3. Check Supabase dashboard logs
4. Verify all environment variables are set correctly

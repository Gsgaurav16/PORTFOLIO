# Next Steps - Setup Guide

Follow these steps in order to complete your Supabase setup:

## ✅ Step 1: Run Database Schema in Supabase

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**
3. **Click on "SQL Editor"** in the left sidebar
4. **Click "New query"**
5. **Open the file**: `server/migrations/supabase_schema.sql`
6. **Copy the entire contents** of the file
7. **Paste it into the SQL Editor**
8. **Click "Run"** (or press Ctrl+Enter)
9. **Wait for success message** - You should see all tables created

## ✅ Step 2: Seed the Database

After running the schema, seed your database with default data:

```bash
cd server
npm run seed
```

This will:
- Create admin user with password: `admin123`
- Add default portfolio data (projects, experiences, testimonials, skills, etc.)

**Expected output:**
```
🌱 Seeding Supabase database with default data...
✅ Admin seeded
✅ Hero seeded
✅ About seeded
✅ Contact seeded
✅ Skills categories seeded
✅ Database seeded successfully!
```

## ✅ Step 3: Start Backend Server

```bash
cd server
npm run dev
```

**Expected output:**
```
🚀 Server running on port 5000
📍 Environment: development
🌐 CORS enabled for: http://localhost:5173
✅ Connected to Supabase
```

**Keep this terminal running!**

## ✅ Step 4: Start Frontend Server

Open a **new terminal** window:

```bash
cd /home/gaurav/Desktop/AI\ AGENT
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Keep this terminal running too!**

## ✅ Step 5: Test the Setup

1. **Open your browser** and go to: `http://localhost:5173`
2. **You should see your portfolio website**
3. **Go to admin panel**: `http://localhost:5173/admin`
4. **Login with password**: `admin123`
5. **Change your password** immediately for security!

## 🎉 You're Done!

Your portfolio website is now connected to Supabase and ready to use!

## Troubleshooting

### If schema fails to run:
- Check for any error messages in Supabase SQL Editor
- Make sure you copied the entire file
- Try running sections one at a time

### If seed script fails:
- Verify your `.env` file has correct Supabase credentials
- Check that schema was run successfully
- Look at error messages in terminal

### If backend won't start:
- Check that port 5000 is not already in use
- Verify `.env` file exists in `server/` directory
- Check Supabase credentials are correct

### If frontend can't connect:
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in root `.env` file
- Check browser console for errors

## Quick Commands Reference

```bash
# Backend
cd server
npm install          # Install dependencies (already done)
npm run seed         # Seed database
npm run dev          # Start backend server

# Frontend
cd /home/gaurav/Desktop/AI\ AGENT
npm install          # Install dependencies (if needed)
npm run dev          # Start frontend server
```

## Default Credentials

- **Admin Password**: `admin123` (change after first login!)

---

**Need help?** Check the error messages in your terminal or browser console.


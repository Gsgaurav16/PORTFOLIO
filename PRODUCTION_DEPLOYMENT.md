# 🚀 Production Deployment Guide

This guide will help you deploy your portfolio website to production.

## 📋 Pre-Deployment Checklist

- [x] Database seeded with initial data
- [x] Backend API working correctly
- [x] Frontend builds successfully
- [ ] Environment variables configured
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] CORS configured correctly
- [ ] Supabase RLS policies verified

## 🏗️ Architecture Overview

Your portfolio consists of:
1. **Frontend** (React + Vite) - Static site
2. **Backend** (Express.js) - API server
3. **Database** (Supabase) - Already hosted

## 📦 Step 1: Build Frontend for Production

```bash
cd /home/gaurav/Desktop/AI\ AGENT
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

## 🔧 Step 2: Configure Environment Variables

### Frontend Environment Variables

Create `.env.production` in the root directory:

```env
VITE_API_BASE_URL=https://your-backend-url.com/api
```

**Note:** Vite requires `VITE_` prefix for environment variables.

### Backend Environment Variables

Create `server/.env.production`:

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🌐 Step 3: Choose Deployment Platform

### Option A: Vercel (Recommended for Frontend)

**Frontend Deployment:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Set environment variable: `VITE_API_BASE_URL`

**Backend Deployment:**
- Deploy backend separately (see Option B or C)

### Option B: Railway (Recommended for Full Stack)

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Deploy backend from GitHub
4. Set environment variables in Railway dashboard
5. Deploy frontend as static site

### Option C: Render

**Backend:**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Build command: `cd server && npm install`
5. Start command: `cd server && npm start`
6. Set environment variables

**Frontend:**
1. Create new Static Site
2. Build command: `npm run build`
3. Publish directory: `dist`

### Option D: Netlify (Frontend) + Railway/Render (Backend)

**Frontend:**
1. Go to [netlify.com](https://netlify.com)
2. Deploy from GitHub
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variable: `VITE_API_BASE_URL`

## 🔐 Step 4: Update API Configuration

The frontend needs to know your production backend URL. Update `src/utils/api.js` if needed, or use environment variables.

## ✅ Step 5: Verify Deployment

1. **Test Frontend:**
   - Visit your deployed frontend URL
   - Check all pages load correctly
   - Test admin login

2. **Test Backend:**
   - Check health endpoint: `https://your-backend-url.com/api/health`
   - Test API endpoints
   - Verify CORS is working

3. **Test Admin Panel:**
   - Login with `admin123`
   - Try CRUD operations
   - Verify data persists

## 🛠️ Quick Deployment Commands

### Build Frontend
```bash
npm run build
```

### Test Production Build Locally
```bash
npm run preview
```

### Start Backend in Production Mode
```bash
cd server
NODE_ENV=production npm start
```

## 📝 Environment Variables Reference

### Frontend (.env.production)
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

### Backend (server/.env.production)
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🔒 Security Checklist

- [ ] Never commit `.env` files to Git
- [ ] Use service role key only on backend (never in frontend)
- [ ] Enable HTTPS for all deployments
- [ ] Verify Supabase RLS policies are correct
- [ ] Change default admin password in production
- [ ] Use strong passwords for production

## 🐛 Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your actual frontend URL
- Check for trailing slashes

### API Not Found
- Verify `VITE_API_BASE_URL` is set correctly
- Check backend is running and accessible

### Database Connection Issues
- Verify Supabase credentials are correct
- Check Supabase project is active
- Verify RLS policies allow access

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Supabase Docs](https://supabase.com/docs)


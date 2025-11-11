# 🚀 GitHub + Vercel Deployment Guide

This guide will help you push your code to GitHub and deploy to Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Supabase project set up (already done ✅)

## Step 1: Prepare Repository

### 1.1 Initialize Git (if not already done)

```bash
cd /home/gaurav/Desktop/AI\ AGENT
git init
```

### 1.2 Check .gitignore

Make sure `.gitignore` includes:
- `.env` files (already configured ✅)
- `node_modules/` (already configured ✅)
- `dist/` (already configured ✅)

### 1.3 Create .env.example Files

✅ Already created:
- `.env.example` (frontend)
- `server/.env.example` (backend)

**Important:** These files contain placeholders, NOT real credentials.

## Step 2: Push to GitHub

### 2.1 Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **New Repository**
3. Name it: `portfolio-website` (or your preferred name)
4. **Don't** initialize with README (we already have files)
5. Click **Create repository**

### 2.2 Add Files and Push

```bash
# Navigate to project
cd /home/gaurav/Desktop/AI\ AGENT

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website with Supabase backend"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `REPO_NAME` with your repository name

## Step 3: Deploy Backend to Vercel

### 3.1 Create Vercel Project for Backend

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. **Import Git Repository** → Select your GitHub repo
4. **Configure Project:**
   - **Framework Preset:** Other
   - **Root Directory:** `server` (IMPORTANT!)
   - **Build Command:** Leave empty (or `npm install`)
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`
   - **Start Command:** `npm start`

### 3.2 Add Environment Variables (Backend)

Click **Environment Variables** and add:

```
SUPABASE_URL = https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
FRONTEND_URL = https://your-frontend.vercel.app
NODE_ENV = production
PORT = 5000
```

**Get Supabase credentials:**
- Go to [app.supabase.com](https://app.supabase.com)
- Select your project
- Settings → API
- Copy Project URL and Service Role Key

### 3.3 Deploy Backend

Click **Deploy** and wait for deployment to complete.

**Note the backend URL:** `https://your-backend.vercel.app`

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Another Vercel Project for Frontend

1. In Vercel dashboard, click **Add New** → **Project**
2. **Import Git Repository** → Select the same GitHub repo
3. **Configure Project:**
   - **Framework Preset:** Vite (auto-detected)
   - **Root Directory:** `./` (root)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `dist` (auto-filled)
   - **Install Command:** `npm install`

### 4.2 Add Environment Variables (Frontend)

Click **Environment Variables** and add:

```
VITE_API_URL = https://your-backend.vercel.app/api
```

**Replace `your-backend.vercel.app` with your actual backend URL from Step 3.3**

### 4.3 Deploy Frontend

Click **Deploy** and wait for deployment.

**Note the frontend URL:** `https://your-frontend.vercel.app`

## Step 5: Update CORS in Backend

### 5.1 Update Backend Environment Variable

1. Go to Vercel dashboard
2. Select your **backend project**
3. Go to **Settings** → **Environment Variables**
4. Update `FRONTEND_URL` to your actual frontend URL:
   ```
   FRONTEND_URL = https://your-frontend.vercel.app
   ```
5. **Redeploy** the backend (Settings → Deployments → Redeploy)

## Step 6: Test Deployment

### 6.1 Test Frontend
- Visit: `https://your-frontend.vercel.app`
- Check all pages load correctly

### 6.2 Test Backend
- Visit: `https://your-backend.vercel.app/api/health`
- Should return: `{"status":"OK","message":"Server is running"}`

### 6.3 Test Admin Panel
- Visit: `https://your-frontend.vercel.app/admin`
- Login with password: `admin123`
- Test CRUD operations

## 🔧 Vercel Configuration Files

✅ Already created:
- `vercel.json` - Vercel configuration for frontend

## 📝 Environment Variables Summary

### Backend (Vercel)
```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=5000
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.vercel.app/api
```

## 🐛 Troubleshooting

### Backend Not Starting
- Check Vercel logs: Project → Deployments → Click deployment → Logs
- Verify environment variables are set
- Check Root Directory is set to `server`

### CORS Errors
- Make sure `FRONTEND_URL` in backend matches exact frontend URL
- No trailing slashes
- Include `https://`

### API Not Found
- Verify `VITE_API_URL` includes `/api` at the end
- Check backend is deployed and running
- Test backend health endpoint

### Build Fails
- Check Vercel build logs
- Verify all dependencies in `package.json`
- Check Node.js version (18+)

## 🔄 Updating Code

After making changes:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically redeploy both frontend and backend!

## 🔒 Security Notes

- ✅ `.env` files are in `.gitignore` (never committed)
- ✅ Only `.env.example` files are in Git (with placeholders)
- ✅ Real credentials are set in Vercel dashboard
- ⚠️ Change admin password after first deployment!

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase Documentation](https://supabase.com/docs)


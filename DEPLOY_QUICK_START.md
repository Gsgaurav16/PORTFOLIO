# 🚀 Quick Start: Deploy to Production

## Option 1: Railway (Easiest - Full Stack)

### Deploy Backend

1. **Go to [railway.app](https://railway.app)** and sign up/login
2. **Create New Project** → "Deploy from GitHub repo"
3. **Select your repository**
4. **Add Service** → Select the `server` folder
5. **Set Environment Variables:**
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   FRONTEND_URL=https://your-frontend-url.com
   NODE_ENV=production
   PORT=5000
   ```
6. **Deploy!** Railway will auto-detect Node.js and deploy

### Deploy Frontend

1. **Add another service** in Railway
2. **Select root folder** (not server)
3. **Set Build Command:** `npm run build`
4. **Set Start Command:** `npm run preview` (or use static hosting)
5. **Set Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
6. **Deploy!**

**Backend URL Example:** `https://portfolio-api.railway.app`
**Frontend URL Example:** `https://portfolio-frontend.railway.app`

---

## Option 2: Vercel (Frontend) + Render (Backend)

### Deploy Backend on Render

1. **Go to [render.com](https://render.com)** and sign up
2. **New** → **Web Service**
3. **Connect GitHub** → Select your repo
4. **Settings:**
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables:**
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   FRONTEND_URL=https://your-vercel-url.vercel.app
   NODE_ENV=production
   ```
6. **Deploy!**

**Backend URL:** `https://portfolio-api.onrender.com`

### Deploy Frontend on Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign up
2. **Import Project** → Select your GitHub repo
3. **Framework Preset:** Vite
4. **Root Directory:** `./` (root)
5. **Environment Variable:**
   ```
   VITE_API_URL=https://portfolio-api.onrender.com/api
   ```
6. **Deploy!**

**Frontend URL:** `https://your-portfolio.vercel.app`

---

## Option 3: Netlify (Frontend) + Railway (Backend)

### Backend: Same as Option 1 (Railway)

### Frontend: Netlify

1. **Go to [netlify.com](https://netlify.com)** and sign up
2. **Add new site** → **Import from Git**
3. **Select repository**
4. **Build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Environment Variable:**
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
6. **Deploy!**

---

## ✅ After Deployment

1. **Update CORS in Backend:**
   - Set `FRONTEND_URL` to your actual frontend URL
   - Restart backend

2. **Test Everything:**
   - Visit frontend URL
   - Test admin login: `/admin`
   - Try CRUD operations
   - Verify data persists

3. **Change Admin Password:**
   - Login with `admin123`
   - Go to Settings → Change Password
   - Use a strong password!

---

## 🔧 Environment Variables Checklist

### Backend (.env)
- [ ] `SUPABASE_URL`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `FRONTEND_URL` (your production frontend URL)
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000`

### Frontend (.env)
- [ ] `VITE_API_URL` (your production backend URL + `/api`)

---

## 🐛 Common Issues

### CORS Error
- Make sure `FRONTEND_URL` in backend matches your actual frontend URL exactly
- Include `https://` and no trailing slash

### API Not Found
- Check `VITE_API_URL` includes `/api` at the end
- Verify backend is running and accessible
- Test backend health: `https://your-backend.com/api/health`

### Build Fails
- Make sure all dependencies are in `package.json`
- Check Node.js version (18+)
- Review build logs for errors

---

## 📝 Quick Commands

```bash
# Build frontend locally
npm run build

# Test production build
npm run preview

# Start backend in production mode
cd server
NODE_ENV=production npm start
```

---

## 🎯 Recommended Setup

**Best for beginners:** Railway (both frontend and backend)
**Best for performance:** Vercel (frontend) + Railway (backend)
**Best for free tier:** Render (backend) + Netlify (frontend)


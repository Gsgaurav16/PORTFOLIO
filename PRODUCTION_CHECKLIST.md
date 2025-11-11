# ✅ Production Deployment Checklist

## 📦 Pre-Deployment

- [x] Database seeded with initial data
- [x] Frontend builds successfully (`npm run build`)
- [x] Backend runs in production mode
- [x] All environment variables documented
- [ ] Admin password changed from default
- [ ] Tested all CRUD operations
- [ ] Tested admin login/logout
- [ ] Verified data persistence

## 🔧 Environment Setup

### Backend Environment Variables
- [ ] `SUPABASE_URL` - Your Supabase project URL
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Service role key (keep secret!)
- [ ] `FRONTEND_URL` - Your production frontend URL
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000` (or your platform's port)

### Frontend Environment Variables
- [ ] `VITE_API_URL` - Your production backend URL + `/api`

## 🚀 Deployment Steps

### Step 1: Deploy Backend
- [ ] Choose platform (Railway, Render, etc.)
- [ ] Connect GitHub repository
- [ ] Set root directory to `server`
- [ ] Configure build/start commands
- [ ] Add all environment variables
- [ ] Deploy and get backend URL
- [ ] Test health endpoint: `https://your-backend.com/api/health`

### Step 2: Deploy Frontend
- [ ] Choose platform (Vercel, Netlify, Railway, etc.)
- [ ] Connect GitHub repository
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Add `VITE_API_URL` environment variable
- [ ] Deploy and get frontend URL

### Step 3: Update CORS
- [ ] Update `FRONTEND_URL` in backend to match actual frontend URL
- [ ] Restart backend service
- [ ] Verify CORS is working

## ✅ Post-Deployment Testing

### Frontend Tests
- [ ] Homepage loads correctly
- [ ] All sections display data
- [ ] Navigation works
- [ ] Responsive design works on mobile
- [ ] No console errors

### Admin Panel Tests
- [ ] Can access `/admin` route
- [ ] Login works with password
- [ ] Dashboard loads all sections
- [ ] Can create new project
- [ ] Can edit existing project
- [ ] Can delete project
- [ ] Can create/edit/delete experiences
- [ ] Can create/edit/delete testimonials
- [ ] Can edit skills
- [ ] Can edit hero section
- [ ] Can edit about section
- [ ] Can edit contact section
- [ ] Can change password
- [ ] Logout works

### API Tests
- [ ] Health check: `GET /api/health`
- [ ] Get projects: `GET /api/projects`
- [ ] Create project: `POST /api/projects`
- [ ] Update project: `PUT /api/projects/:id`
- [ ] Delete project: `DELETE /api/projects/:id`
- [ ] Login: `POST /api/auth/login`

## 🔒 Security Checklist

- [ ] Changed default admin password
- [ ] Using strong password for admin
- [ ] `.env` files not committed to Git
- [ ] Service role key only in backend (never frontend)
- [ ] HTTPS enabled on all URLs
- [ ] CORS configured correctly
- [ ] Supabase RLS policies verified

## 📊 Performance

- [ ] Frontend build size is reasonable (< 500KB gzipped)
- [ ] Images optimized
- [ ] API response times acceptable
- [ ] No unnecessary API calls

## 📝 Documentation

- [ ] Deployment URLs documented
- [ ] Environment variables documented
- [ ] Admin credentials stored securely
- [ ] Team members have access (if applicable)

## 🎯 Quick Test URLs

After deployment, test these:

```
Frontend: https://your-frontend.com
Admin: https://your-frontend.com/admin
Backend Health: https://your-backend.com/api/health
Backend API: https://your-backend.com/api/projects
```

## 🆘 If Something Breaks

1. Check backend logs
2. Check frontend build logs
3. Verify environment variables
4. Test API endpoints directly
5. Check browser console for errors
6. Verify Supabase connection
7. Check CORS configuration

---

## 📚 Deployment Guides

- **Full Guide:** See `PRODUCTION_DEPLOYMENT.md`
- **Quick Start:** See `DEPLOY_QUICK_START.md`
- **Setup:** See `SETUP.md`


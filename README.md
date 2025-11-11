# Retro Gaming Portfolio Website

A futuristic personal portfolio website themed like a retro video game dashboard, built with React, TailwindCSS, and Framer Motion.

## 🎨 Features

- **Retro Gaming Aesthetic**: Bright contrasting colors with pixel-inspired typography
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Design**: Works on all devices
- **Interactive Components**: Hover effects, transitions, and micro-interactions
- **Multiple Sections**: Navbar, Hero, About, Skills, Projects, Experience, Testimonials, Contact, Footer

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Color Palette

- **Retro Yellow**: `#FFF7B2` - Primary background
- **Retro Green**: `#004E45` - Section backgrounds
- **Retro Orange**: `#FF8A00` - Accent color
- **Retro Dark**: `#1a1a1a` - Text color

## 📦 Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 🎮 Sections

1. **Navbar** - Fixed navigation with smooth scroll
2. **Hero** - Introduction with robot character
3. **About** - Mission and player stats
4. **Skills** - Tabbed skill showcase
5. **Projects** - Retro monitor-style project display
6. **Experience** - Interactive experience timeline
7. **Testimonials** - Arcade-style reviews
8. **Contact** - Contact form and social links
9. **Footer** - Footer with scroll to top

## 📝 Customization

You can customize the content through the Admin Panel at `/admin` or by editing the component files in `src/components/`.

## 🚀 Deployment

### Quick Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   ./PUSH_TO_GITHUB.sh
   ```
   Or manually:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - See `GITHUB_VERCEL_SETUP.md` for complete guide
   - Import repository in Vercel
   - Set environment variables (see below)

### Environment Variables

**Frontend (.env or Vercel):**
```
VITE_API_URL=https://your-backend.vercel.app/api
```

**Backend (server/.env or Vercel):**
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=5000
```

See `.env.example` and `server/.env.example` for templates.

## 🔐 Admin Panel

- Access at `/admin`
- Default password: `admin123` (change immediately!)
- Full CRUD operations for all sections

## 📚 Documentation

- `GITHUB_VERCEL_SETUP.md` - Complete GitHub + Vercel deployment guide
- `PRODUCTION_DEPLOYMENT.md` - General production deployment guide
- `DEPLOY_QUICK_START.md` - Quick deployment options
- `SETUP.md` - Development setup instructions
- `SUPABASE_SETUP.md` - Supabase configuration

## 🎯 License

This project is open source and available for personal use.


#!/bin/bash

echo "🚀 Preparing to push to GitHub..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
fi

# Check if .env files exist and warn
if [ -f ".env" ] || [ -f "server/.env" ]; then
    echo "⚠️  WARNING: .env files detected!"
    echo "   These will NOT be committed (they're in .gitignore)"
    echo "   Make sure to set environment variables in Vercel dashboard"
    echo ""
fi

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo "📝 No remote repository found."
    echo ""
    echo "Please run these commands manually:"
    echo ""
    echo "1. Create a repository on GitHub"
    echo "2. Then run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    read -p "Press Enter to continue with adding files..."
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Show status
echo ""
echo "📊 Files to be committed:"
git status --short

echo ""
read -p "Continue with commit? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Commit
    echo ""
    echo "💾 Committing files..."
    git commit -m "Initial commit: Portfolio website with Supabase backend and admin panel"
    
    echo ""
    echo "✅ Commit successful!"
    echo ""
    
    # Check if remote exists and push
    if git remote | grep -q "origin"; then
        echo "🚀 Pushing to GitHub..."
        git branch -M main
        git push -u origin main
        echo ""
        echo "✅ Pushed to GitHub!"
        echo ""
        echo "📝 Next steps:"
        echo "1. Go to https://vercel.com"
        echo "2. Import your GitHub repository"
        echo "3. Follow GITHUB_VERCEL_SETUP.md for deployment"
    else
        echo "📝 To push to GitHub, run:"
        echo "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
        echo "   git branch -M main"
        echo "   git push -u origin main"
    fi
else
    echo "❌ Cancelled"
fi


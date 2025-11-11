#!/bin/bash

echo "🚀 Starting Portfolio Backend Server..."
echo ""

# Kill any process using port 5000
echo "🔍 Checking port 5000..."
if lsof -ti:5000 > /dev/null 2>&1; then
    echo "⚠️  Port 5000 is in use. Killing existing process..."
    lsof -ti:5000 | xargs kill -9 2>/dev/null
    sleep 1
    echo "✅ Port 5000 freed"
fi

cd "$(dirname "$0")"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file with your Supabase credentials."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "✅ Starting server on port 5000..."
echo "📍 Server URL: http://localhost:5000"
echo "🌐 API URL: http://localhost:5000/api"
echo ""
echo "⚠️  Keep this terminal open!"
echo ""

npm run dev



#!/bin/bash

echo "🚀 Starting Portfolio Backend Server..."
echo ""

cd "$(dirname "$0")/server"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found in server directory!"
    echo "Please create .env file with your Supabase credentials."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Starting server..."
echo "📍 Server will run on: http://localhost:5000"
echo "🌐 Frontend should connect to: http://localhost:5000/api"
echo ""
echo "⚠️  Keep this terminal open!"
echo ""

npm run dev



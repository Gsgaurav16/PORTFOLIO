#!/bin/bash

echo "🚀 Starting Portfolio Application..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to kill process on port
kill_port() {
    local port=$1
    if lsof -ti:$port > /dev/null 2>&1; then
        echo "⚠️  Port $port is in use. Killing existing process..."
        lsof -ti:$port | xargs kill -9 2>/dev/null
        sleep 1
        echo "✅ Port $port freed"
    fi
}

# Kill processes on both ports
kill_port 5000
kill_port 5173

echo ""
echo "📦 Starting Backend Server (port 5000)..."
cd "$(dirname "$0")/server"

if [ ! -f ".env" ]; then
    echo "❌ Error: server/.env file not found!"
    exit 1
fi

# Start backend in background
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is running on http://localhost:5000${NC}"
else
    echo -e "${YELLOW}⚠️  Backend may still be starting...${NC}"
fi

echo ""
echo "📦 Starting Frontend Server (port 5173)..."
cd "$(dirname "$0")"

# Start frontend in background
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

# Wait for frontend to start
sleep 4

# Check if frontend is running
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is running on http://localhost:5173${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend may still be starting...${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✅ Both servers are starting!${NC}"
echo ""
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend API: http://localhost:5000/api"
echo ""
echo "📋 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"


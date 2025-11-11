# Fix Login Issue - Step by Step

## Problem
The backend server is not running, so the frontend cannot connect to the API.

## Solution

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd /home/gaurav/Desktop/AI\ AGENT/server
npm run dev
```

**You should see:**
```
🚀 Server running on port 5000
📍 Environment: development
🌐 CORS enabled for: http://localhost:5173
✅ Connected to Supabase
```

**Keep this terminal open and running!**

### Step 2: Verify Backend is Running

Open another terminal and test:

```bash
curl http://localhost:5000/api/health
```

You should see: `{"status":"OK","message":"Server is running"}`

### Step 3: Test Login Endpoint

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"admin123"}'
```

You should see: `{"message":"Login successful","authenticated":true}`

### Step 4: Start Frontend (if not running)

Open another terminal:

```bash
cd /home/gaurav/Desktop/AI\ AGENT
npm run dev
```

### Step 5: Try Login Again

1. Go to: `http://localhost:5173/admin`
2. Enter password: `admin123`
3. Click LOGIN

## Common Issues

### Issue: "Failed to fetch" or Network Error
- **Solution**: Backend server is not running. Start it with `npm run dev` in the server directory.

### Issue: "Invalid password" but password is correct
- **Solution**: Check browser console (F12) for actual error message
- Check backend terminal for error messages
- Verify admin exists: `cd server && node check-admin.js`

### Issue: CORS Error
- **Solution**: Make sure `FRONTEND_URL` in `server/.env` matches your frontend URL
- Restart backend server after changing .env

### Issue: Connection Refused
- **Solution**: Backend server is not running on port 5000
- Check if port 5000 is already in use: `lsof -ti:5000`
- Kill process if needed: `kill -9 $(lsof -ti:5000)`

## Quick Test Commands

```bash
# Check if backend is running
lsof -ti:5000 && echo "✅ Running" || echo "❌ Not running"

# Test health endpoint
curl http://localhost:5000/api/health

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"admin123"}'

# Check admin in database
cd server && node check-admin.js
```

## Still Not Working?

1. **Check browser console** (F12 → Console tab) for errors
2. **Check backend terminal** for error messages
3. **Verify .env file** has correct Supabase credentials
4. **Check network tab** in browser DevTools to see the actual API request/response


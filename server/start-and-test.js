import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import supabase from './db/connection.js'
import bcrypt from 'bcryptjs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Test login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { password } = req.body
    
    console.log('🔐 Login attempt received')
    console.log('   Password received:', password ? 'Yes (length: ' + password.length + ')' : 'No')
    
    if (!password) {
      return res.status(400).json({ error: 'Password is required' })
    }
    
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error) {
      console.error('❌ Database error:', error.message)
      if (error.code === 'PGRST116') {
        return res.status(500).json({ error: 'Admin not configured. Please run seed script.' })
      }
      return res.status(500).json({ error: 'Database error: ' + error.message })
    }
    
    if (!data) {
      console.error('❌ Admin not found')
      return res.status(500).json({ error: 'Admin not configured. Please run seed script.' })
    }
    
    console.log('✅ Admin found in database')
    console.log('   Comparing password...')
    
    const isValid = await bcrypt.compare(password, data.password_hash)
    
    console.log('   Password match:', isValid ? '✅ YES' : '❌ NO')
    console.log('   Input password:', JSON.stringify(password))
    console.log('   Password length:', password.length)
    
    if (isValid) {
      console.log('✅ Login successful!')
      res.json({ message: 'Login successful', authenticated: true })
    } else {
      console.log('❌ Login failed - invalid password')
      res.status(401).json({ error: 'Invalid password' })
    }
  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({ error: 'Failed to login: ' + error.message })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log('🚀 Test server running on port', PORT)
  console.log('📍 Environment:', process.env.NODE_ENV || 'development')
  console.log('🌐 CORS enabled for:', process.env.FRONTEND_URL || 'http://localhost:5173')
  console.log('')
  console.log('✅ Server ready! Try logging in now.')
  console.log('📝 Test with: curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d \'{"password":"admin123"}\'')
})



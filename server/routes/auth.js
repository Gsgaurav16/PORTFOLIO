import express from 'express'
import bcrypt from 'bcryptjs'
import supabase from '../db/connection.js'

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body
    
    if (!password) {
      return res.status(400).json({ error: 'Password is required' })
    }
    
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(500).json({ error: 'Admin not configured. Please run seed script.' })
      }
      throw error
    }
    
    if (!data) {
      return res.status(500).json({ error: 'Admin not configured. Please run seed script.' })
    }
    
    const isValid = await bcrypt.compare(password, data.password_hash)
    
    if (isValid) {
      res.json({ message: 'Login successful', authenticated: true })
    } else {
      res.status(401).json({ error: 'Invalid password' })
    }
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Failed to login' })
  }
})

// Change password
router.put('/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' })
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' })
    }
    
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Admin not found' })
    }
    
    const isValid = await bcrypt.compare(currentPassword, data.password_hash)
    
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const { error: updateError } = await supabase
      .from('admin')
      .update({ password_hash: hashedPassword })
      .eq('id', 1)
    
    if (updateError) throw updateError
    
    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Error changing password:', error)
    res.status(500).json({ error: 'Failed to change password' })
  }
})

export default router

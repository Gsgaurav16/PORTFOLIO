import supabase from './db/connection.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

async function testLogin() {
  try {
    console.log('🔐 Testing admin login...\n')
    
    // Get admin from database
    const { data, error } = await supabase
      .from('admin')
      .select('password_hash')
      .eq('id', 1)
      .single()
    
    if (error) {
      console.error('❌ Error:', error.message)
      return
    }
    
    if (!data) {
      console.error('❌ Admin not found')
      return
    }
    
    // Test password
    const testPassword = 'admin123'
    const isValid = await bcrypt.compare(testPassword, data.password_hash)
    
    if (isValid) {
      console.log('✅ Password "admin123" is CORRECT!')
      console.log('✅ You can now login to the admin panel')
    } else {
      console.log('❌ Password "admin123" is INCORRECT')
      console.log('⚠️  The password hash might be wrong')
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Test failed:', error)
    process.exit(1)
  }
}

testLogin()



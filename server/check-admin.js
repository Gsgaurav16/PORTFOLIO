import supabase from './db/connection.js'
import dotenv from 'dotenv'

dotenv.config()

async function checkAdmin() {
  try {
    console.log('🔍 Checking admin setup...\n')
    
    // Check connection
    console.log('1. Testing Supabase connection...')
    const { data: testData, error: testError } = await supabase
      .from('admin')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Connection error:', testError.message)
      console.error('Error code:', testError.code)
      console.error('Full error:', JSON.stringify(testError, null, 2))
      return
    }
    console.log('✅ Connection successful\n')
    
    // Check if admin table has data
    console.log('2. Checking admin table...')
    const { data, error } = await supabase
      .from('admin')
      .select('*')
    
    if (error) {
      console.error('❌ Error querying admin:', error.message)
      console.error('Error code:', error.code)
      if (error.code === '42P01') {
        console.error('⚠️  Admin table does not exist! Please run the schema in Supabase SQL Editor.')
      }
      return
    }
    
    if (!data || data.length === 0) {
      console.log('⚠️  Admin table is empty!')
      console.log('📝 Running seed to create admin user...\n')
      
      // Import and run seed
      const bcrypt = await import('bcryptjs')
      const hashedPassword = await bcrypt.default.hash('admin123', 10)
      
      const { data: insertData, error: insertError } = await supabase
        .from('admin')
        .insert({ 
          id: 1, 
          password_hash: hashedPassword 
        })
        .select()
      
      if (insertError) {
        console.error('❌ Error creating admin:', insertError.message)
        console.error('Full error:', JSON.stringify(insertError, null, 2))
      } else {
        console.log('✅ Admin user created successfully!')
        console.log('📝 Password: admin123')
      }
    } else {
      console.log('✅ Admin user exists in database')
      console.log('📊 Admin data:', {
        id: data[0].id,
        hasPassword: !!data[0].password_hash,
        passwordLength: data[0].password_hash?.length || 0
      })
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Check failed:', error)
    console.error('Stack:', error.stack)
    process.exit(1)
  }
}

checkAdmin()



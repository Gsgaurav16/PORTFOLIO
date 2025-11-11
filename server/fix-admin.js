import supabase from './db/connection.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

async function fixAdmin() {
  try {
    console.log('🔧 Fixing admin user...')
    
    // Check if admin exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking admin:', checkError)
      return
    }
    
    // Create or update admin with default password
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const { data, error } = await supabase
      .from('admin')
      .upsert({ 
        id: 1, 
        password_hash: hashedPassword 
      }, { 
        onConflict: 'id' 
      })
      .select()
    
    if (error) {
      console.error('❌ Error creating/updating admin:', error)
      console.error('Full error:', JSON.stringify(error, null, 2))
    } else {
      console.log('✅ Admin user created/updated successfully!')
      console.log('📝 Default password: admin123')
      console.log('⚠️  Please change this password after logging in!')
    }
    
    // Verify the password works
    console.log('\n🔍 Verifying password...')
    const { data: verifyData, error: verifyError } = await supabase
      .from('admin')
      .select('password_hash')
      .eq('id', 1)
      .single()
    
    if (verifyError) {
      console.error('❌ Error verifying:', verifyError)
    } else if (verifyData) {
      const isValid = await bcrypt.compare('admin123', verifyData.password_hash)
      if (isValid) {
        console.log('✅ Password verification successful!')
      } else {
        console.log('❌ Password verification failed!')
      }
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Fix failed:', error)
    process.exit(1)
  }
}

fixAdmin()



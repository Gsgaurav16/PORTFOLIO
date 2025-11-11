import supabase from './db/connection.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

async function debugLogin() {
  try {
    console.log('🔍 Debugging login issue...\n')
    
    // Step 1: Check connection
    console.log('1. Checking Supabase connection...')
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    
    console.log('   URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
    console.log('   Key:', supabaseKey ? '✅ Set' : '❌ Missing')
    console.log('   Key type:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Service Role' : 'Anon')
    
    // Step 2: Try to read admin
    console.log('\n2. Reading admin from database...')
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error) {
      console.error('   ❌ Error:', error.message)
      console.error('   Code:', error.code)
      console.error('   Details:', error.details)
      console.error('   Hint:', error.hint)
      
      if (error.code === 'PGRST116') {
        console.error('\n   ⚠️  Admin not found! Creating now...')
        const hashedPassword = await bcrypt.hash('admin123', 10)
        const { data: insertData, error: insertError } = await supabase
          .from('admin')
          .insert({ id: 1, password_hash: hashedPassword })
          .select()
        
        if (insertError) {
          console.error('   ❌ Failed to create:', insertError.message)
        } else {
          console.log('   ✅ Admin created!')
        }
      } else if (error.code === '42501' || error.message.includes('permission') || error.message.includes('policy')) {
        console.error('\n   ⚠️  RLS (Row Level Security) issue detected!')
        console.error('   The admin table might have RLS enabled but no policy for service role.')
        console.error('   Solution: Check RLS policies in Supabase dashboard')
      }
      return
    }
    
    if (!data) {
      console.error('   ❌ No admin data returned')
      return
    }
    
    console.log('   ✅ Admin found!')
    console.log('   ID:', data.id)
    console.log('   Has password hash:', !!data.password_hash)
    console.log('   Password hash length:', data.password_hash?.length || 0)
    
    // Step 3: Test password
    console.log('\n3. Testing password "admin123"...')
    const isValid = await bcrypt.compare('admin123', data.password_hash)
    
    if (isValid) {
      console.log('   ✅ Password is CORRECT!')
    } else {
      console.log('   ❌ Password is INCORRECT!')
      console.log('   🔧 Recreating admin with correct password...')
      
      const hashedPassword = await bcrypt.hash('admin123', 10)
      const { error: updateError } = await supabase
        .from('admin')
        .update({ password_hash: hashedPassword })
        .eq('id', 1)
      
      if (updateError) {
        console.error('   ❌ Failed to update:', updateError.message)
      } else {
        console.log('   ✅ Password updated!')
        
        // Verify again
        const { data: verifyData } = await supabase
          .from('admin')
          .select('password_hash')
          .eq('id', 1)
          .single()
        
        const verifyIsValid = await bcrypt.compare('admin123', verifyData.password_hash)
        if (verifyIsValid) {
          console.log('   ✅ Verification successful!')
        }
      }
    }
    
    // Step 4: Test what the API endpoint would see
    console.log('\n4. Simulating API login endpoint...')
    const { data: apiData, error: apiError } = await supabase
      .from('admin')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (apiError) {
      console.error('   ❌ API would fail:', apiError.message)
    } else {
      const apiIsValid = await bcrypt.compare('admin123', apiData.password_hash)
      if (apiIsValid) {
        console.log('   ✅ API login would succeed!')
      } else {
        console.log('   ❌ API login would fail!')
      }
    }
    
    console.log('\n✅ Debug complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Debug failed:', error)
    console.error('Stack:', error.stack)
    process.exit(1)
  }
}

debugLogin()



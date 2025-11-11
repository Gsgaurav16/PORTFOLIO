import express from 'express'
import supabase from './db/connection.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

// Simulate the exact login endpoint
async function testLoginEndpoint() {
  try {
    console.log('🔐 Testing login endpoint exactly as API does...\n')
    
    const password = 'admin123'
    console.log('Testing password:', password)
    
    // Step 1: Get admin from database (exactly as auth.js does)
    console.log('\n1. Fetching admin from Supabase...')
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error) {
      console.error('❌ Error fetching admin:', error.message)
      console.error('Error code:', error.code)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      
      if (error.code === 'PGRST116') {
        console.error('\n⚠️  Admin not found! Creating now...')
        const hashedPassword = await bcrypt.hash('admin123', 10)
        const { error: insertError } = await supabase
          .from('admin')
          .insert({ id: 1, password_hash: hashedPassword })
        
        if (insertError) {
          console.error('❌ Failed to create admin:', insertError.message)
        } else {
          console.log('✅ Admin created! Retrying...')
          // Retry
          const { data: retryData, error: retryError } = await supabase
            .from('admin')
            .select('*')
            .eq('id', 1)
            .single()
          
          if (retryError) {
            console.error('❌ Still error after creation:', retryError.message)
            return
          }
          
          const isValid = await bcrypt.compare(password, retryData.password_hash)
          console.log('✅ Password check:', isValid ? 'CORRECT' : 'INCORRECT')
          return
        }
      }
      return
    }
    
    if (!data) {
      console.error('❌ No admin data returned')
      return
    }
    
    console.log('✅ Admin found!')
    console.log('   ID:', data.id)
    console.log('   Has password_hash:', !!data.password_hash)
    
    // Step 2: Compare password (exactly as auth.js does)
    console.log('\n2. Comparing password...')
    console.log('   Input password:', password)
    console.log('   Stored hash:', data.password_hash.substring(0, 30) + '...')
    
    const isValid = await bcrypt.compare(password, data.password_hash)
    
    console.log('\n3. Result:')
    if (isValid) {
      console.log('   ✅ Password is CORRECT!')
      console.log('   ✅ Login should succeed!')
    } else {
      console.log('   ❌ Password is INCORRECT!')
      console.log('   🔧 Regenerating password hash...')
      
      // Try to fix it
      const newHash = await bcrypt.hash('admin123', 10)
      const { error: updateError } = await supabase
        .from('admin')
        .update({ password_hash: newHash })
        .eq('id', 1)
      
      if (updateError) {
        console.error('   ❌ Failed to update:', updateError.message)
      } else {
        console.log('   ✅ Password hash updated!')
        
        // Verify again
        const { data: verifyData } = await supabase
          .from('admin')
          .select('password_hash')
          .eq('id', 1)
          .single()
        
        const verifyIsValid = await bcrypt.compare('admin123', verifyData.password_hash)
        console.log('   ✅ Verification:', verifyIsValid ? 'SUCCESS' : 'FAILED')
      }
    }
    
    // Step 3: Test with different password variations
    console.log('\n4. Testing password variations...')
    const variations = ['admin123', 'Admin123', 'ADMIN123', ' admin123', 'admin123 ']
    for (const variant of variations) {
      const variantIsValid = await bcrypt.compare(variant, data.password_hash)
      console.log(`   "${variant}": ${variantIsValid ? '✅' : '❌'}`)
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Test failed:', error)
    console.error('Stack:', error.stack)
    process.exit(1)
  }
}

testLoginEndpoint()



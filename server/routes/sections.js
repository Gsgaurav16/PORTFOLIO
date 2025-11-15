import express from 'express'
import supabase from '../db/connection.js'

const router = express.Router()

// Hero Section
router.get('/hero', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('hero')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
    
    if (!data) {
      return res.json({
        title: '',
        subtitle: '',
        description: '',
        tags: [],
        miniCards: []
      })
    }
    
    res.json({
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      tags: data.tags || [],
      miniCards: data.mini_cards || []
    })
  } catch (error) {
    console.error('Error fetching hero:', error)
    res.status(500).json({ error: 'Failed to fetch hero' })
  }
})

router.put('/hero', async (req, res) => {
  try {
    const { title, subtitle, description, tags, miniCards } = req.body
    
    const { data, error } = await supabase
      .from('hero')
      .upsert({
        id: 1,
        title,
        subtitle,
        description,
        tags: tags || [],
        mini_cards: miniCards || []
      }, { onConflict: 'id' })
      .select()
      .single()
    
    if (error) throw error
    
    res.json({
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      tags: data.tags || [],
      miniCards: data.mini_cards || []
    })
  } catch (error) {
    console.error('Error updating hero:', error)
    res.status(500).json({ error: 'Failed to update hero' })
  }
})

// About Section
router.get('/about', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    
    if (!data) {
      return res.json({
        title: '',
        subtitle: '',
        mission: '',
        coreAbilities: [],
        stats: {}
      })
    }
    
    res.json({
      title: data.title,
      subtitle: data.subtitle,
      mission: data.mission,
      coreAbilities: data.core_abilities || [],
      stats: data.stats || {}
    })
  } catch (error) {
    console.error('Error fetching about:', error)
    res.status(500).json({ error: 'Failed to fetch about' })
  }
})

router.put('/about', async (req, res) => {
  try {
    const { title, subtitle, mission, coreAbilities, stats } = req.body
    
    const { data, error } = await supabase
      .from('about')
      .upsert({
        id: 1,
        title,
        subtitle,
        mission,
        core_abilities: coreAbilities || [],
        stats: stats || {}
      }, { onConflict: 'id' })
      .select()
      .single()
    
    if (error) throw error
    
    res.json({
      title: data.title,
      subtitle: data.subtitle,
      mission: data.mission,
      coreAbilities: data.core_abilities || [],
      stats: data.stats || {}
    })
  } catch (error) {
    console.error('Error updating about:', error)
    res.status(500).json({ error: 'Failed to update about' })
  }
})

// Contact Section
router.get('/contact', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact')
      .select('*')
      .eq('id', 1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    
    if (!data) {
      return res.json({
        name: '',
        role: '',
        bio: '',
        email: '',
        discord: '',
        status: ''
      })
    }
    
    res.json({
      name: data.name,
      role: data.role,
      bio: data.bio,
      email: data.email,
      discord: data.discord || '',
      status: data.status
    })
  } catch (error) {
    console.error('Error fetching contact:', error)
    res.status(500).json({ error: 'Failed to fetch contact' })
  }
})

router.put('/contact', async (req, res) => {
  try {
    const { name, role, bio, email, discord, status } = req.body
    
    const { data, error } = await supabase
      .from('contact')
      .upsert({
        id: 1,
        name,
        role,
        bio,
        email,
        discord: discord || null,
        status
      }, { onConflict: 'id' })
      .select()
      .single()
    
    if (error) throw error
    
    res.json({
      name: data.name,
      role: data.role,
      bio: data.bio,
      email: data.email,
      discord: data.discord || '',
      status: data.status
    })
  } catch (error) {
    console.error('Error updating contact:', error)
    res.status(500).json({ error: 'Failed to update contact' })
  }
})

export default router

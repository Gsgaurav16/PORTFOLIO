import express from 'express'
import supabase from '../db/connection.js'

const router = express.Router()

// GET all experiences
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Transform database fields to frontend format
    const experiences = data.map(row => ({
      id: row.id,
      company: row.company,
      role: row.role,
      period: row.period,
      description: row.description,
      achievements: row.achievements || [],
      tags: row.tags || []
    }))
    
    res.json(experiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    res.status(500).json({ error: 'Failed to fetch experiences' })
  }
})

// GET single experience
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Experience not found' })
    }
    
    res.json({
      id: data.id,
      company: data.company,
      role: data.role,
      period: data.period,
      description: data.description,
      achievements: data.achievements || [],
      tags: data.tags || []
    })
  } catch (error) {
    console.error('Error fetching experience:', error)
    res.status(500).json({ error: 'Failed to fetch experience' })
  }
})

// POST create experience
router.post('/', async (req, res) => {
  try {
    const { company, role, period, description, achievements, tags } = req.body
    
    const { data, error } = await supabase
      .from('experiences')
      .insert({
        company,
        role,
        period,
        description,
        achievements: achievements || [],
        tags: tags || []
      })
      .select()
      .single()
    
    if (error) throw error
    
    res.status(201).json({
      id: data.id,
      company: data.company,
      role: data.role,
      period: data.period,
      description: data.description,
      achievements: data.achievements || [],
      tags: data.tags || []
    })
  } catch (error) {
    console.error('Error creating experience:', error)
    res.status(500).json({ error: 'Failed to create experience' })
  }
})

// PUT update experience
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { company, role, period, description, achievements, tags } = req.body
    
    const { data, error } = await supabase
      .from('experiences')
      .update({
        company,
        role,
        period,
        description,
        achievements: achievements || [],
        tags: tags || []
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Experience not found' })
    }
    
    res.json({
      id: data.id,
      company: data.company,
      role: data.role,
      period: data.period,
      description: data.description,
      achievements: data.achievements || [],
      tags: data.tags || []
    })
  } catch (error) {
    console.error('Error updating experience:', error)
    res.status(500).json({ error: 'Failed to update experience' })
  }
})

// DELETE experience
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Experience not found' })
    }
    
    res.json({ message: 'Experience deleted successfully', experience: data })
  } catch (error) {
    console.error('Error deleting experience:', error)
    res.status(500).json({ error: 'Failed to delete experience' })
  }
})

export default router

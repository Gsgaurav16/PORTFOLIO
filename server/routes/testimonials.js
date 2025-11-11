import express from 'express'
import supabase from '../db/connection.js'

const router = express.Router()

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    res.json(data)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    res.status(500).json({ error: 'Failed to fetch testimonials' })
  }
})

// GET single testimonial
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    
    res.json(data)
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    res.status(500).json({ error: 'Failed to fetch testimonial' })
  }
})

// POST create testimonial
router.post('/', async (req, res) => {
  try {
    const { text, author, role, rating } = req.body
    
    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        text,
        author,
        role,
        rating: rating || 5
      })
      .select()
      .single()
    
    if (error) throw error
    
    res.status(201).json(data)
  } catch (error) {
    console.error('Error creating testimonial:', error)
    res.status(500).json({ error: 'Failed to create testimonial' })
  }
})

// PUT update testimonial
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { text, author, role, rating } = req.body
    
    const { data, error } = await supabase
      .from('testimonials')
      .update({
        text,
        author,
        role,
        rating: rating || 5
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    
    res.json(data)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    res.status(500).json({ error: 'Failed to update testimonial' })
  }
})

// DELETE testimonial
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Testimonial not found' })
    }
    
    res.json({ message: 'Testimonial deleted successfully', testimonial: data })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    res.status(500).json({ error: 'Failed to delete testimonial' })
  }
})

export default router

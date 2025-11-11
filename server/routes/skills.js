import express from 'express'
import supabase from '../db/connection.js'

const router = express.Router()

// GET all skills categories
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('skills_categories')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) throw error
    
    // Transform to object format { categoryId: { label, skills, achievements } }
    const skills = {}
    data.forEach(row => {
      skills[row.category_id] = {
        label: row.label,
        skills: row.skills || [],
        achievements: row.achievements || []
      }
    })
    
    res.json(skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    res.status(500).json({ error: 'Failed to fetch skills' })
  }
})

// GET single category
router.get('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params
    const { data, error } = await supabase
      .from('skills_categories')
      .select('*')
      .eq('category_id', categoryId)
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Category not found' })
    }
    
    res.json({
      label: data.label,
      skills: data.skills || [],
      achievements: data.achievements || []
    })
  } catch (error) {
    console.error('Error fetching category:', error)
    res.status(500).json({ error: 'Failed to fetch category' })
  }
})

// PUT update category
router.put('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params
    const { label, skills, achievements } = req.body
    
    const { data, error } = await supabase
      .from('skills_categories')
      .upsert({
        category_id: categoryId,
        label,
        skills: skills || [],
        achievements: achievements || []
      }, { onConflict: 'category_id' })
      .select()
      .single()
    
    if (error) throw error
    
    res.json({
      label: data.label,
      skills: data.skills || [],
      achievements: data.achievements || []
    })
  } catch (error) {
    console.error('Error updating category:', error)
    res.status(500).json({ error: 'Failed to update category' })
  }
})

// POST create category
router.post('/', async (req, res) => {
  try {
    const { categoryId, label, skills, achievements } = req.body
    
    if (!categoryId || !label) {
      return res.status(400).json({ error: 'categoryId and label are required' })
    }
    
    const { data, error } = await supabase
      .from('skills_categories')
      .insert({
        category_id: categoryId,
        label,
        skills: skills || [],
        achievements: achievements || []
      })
      .select()
      .single()
    
    if (error) {
      if (error.code === '23505') { // Unique violation
        return res.status(409).json({ error: 'Category already exists' })
      }
      throw error
    }
    
    res.status(201).json({
      label: data.label,
      skills: data.skills || [],
      achievements: data.achievements || []
    })
  } catch (error) {
    console.error('Error creating category:', error)
    res.status(500).json({ error: 'Failed to create category' })
  }
})

// DELETE category
router.delete('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params
    const { data, error } = await supabase
      .from('skills_categories')
      .delete()
      .eq('category_id', categoryId)
      .select()
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Category not found' })
    }
    
    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    res.status(500).json({ error: 'Failed to delete category' })
  }
})

export default router

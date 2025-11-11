import express from 'express'
import supabase from '../db/connection.js'

const router = express.Router()

// GET all projects
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    // Transform database fields to frontend format
    const projects = data.map(row => ({
      id: row.id,
      title: row.title,
      name: row.name,
      description: row.description,
      shortDescription: row.short_description,
      tags: row.tags || [],
      features: row.features || []
    }))
    
    res.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// GET single project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    res.json({
      id: data.id,
      title: data.title,
      name: data.name,
      description: data.description,
      shortDescription: data.short_description,
      tags: data.tags || [],
      features: data.features || []
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

// POST create project
router.post('/', async (req, res) => {
  try {
    const { title, name, description, shortDescription, tags, features } = req.body
    
    const { data, error } = await supabase
      .from('projects')
      .insert({
        title,
        name,
        description,
        short_description: shortDescription,
        tags: tags || [],
        features: features || []
      })
      .select()
      .single()
    
    if (error) throw error
    
    res.status(201).json({
      id: data.id,
      title: data.title,
      name: data.name,
      description: data.description,
      shortDescription: data.short_description,
      tags: data.tags || [],
      features: data.features || []
    })
  } catch (error) {
    console.error('Error creating project:', error)
    res.status(500).json({ error: 'Failed to create project' })
  }
})

// PUT update project
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, name, description, shortDescription, tags, features } = req.body
    
    const { data, error } = await supabase
      .from('projects')
      .update({
        title,
        name,
        description,
        short_description: shortDescription,
        tags: tags || [],
        features: features || []
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    res.json({
      id: data.id,
      title: data.title,
      name: data.name,
      description: data.description,
      shortDescription: data.short_description,
      tags: data.tags || [],
      features: data.features || []
    })
  } catch (error) {
    console.error('Error updating project:', error)
    res.status(500).json({ error: 'Failed to update project' })
  }
})

// DELETE project
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Project not found' })
    }
    
    res.json({ message: 'Project deleted successfully', project: data })
  } catch (error) {
    console.error('Error deleting project:', error)
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

export default router

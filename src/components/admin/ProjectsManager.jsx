import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { Plus, Edit, Trash2, X } from 'lucide-react'

const ProjectsManager = () => {
  const { projects, addProject, updateProject, deleteProject } = useAdmin()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFormOpen])

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    description: '',
    shortDescription: '',
    tags: '',
    features: '',
  })

  const handleOpenForm = (project = null) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title || '',
        name: project.name || '',
        description: project.description || '',
        shortDescription: project.shortDescription || '',
        tags: project.tags?.join(', ') || '',
        features: project.features?.join('\n') || '',
      })
    } else {
      setEditingProject(null)
      setFormData({
        title: '',
        name: '',
        description: '',
        shortDescription: '',
        tags: '',
        features: '',
      })
    }
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProject(null)
    setFormData({
      title: '',
      name: '',
      description: '',
      shortDescription: '',
      tags: '',
      features: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const projectData = {
      title: formData.title,
      name: formData.name,
      description: formData.description,
      shortDescription: formData.shortDescription,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      features: formData.features.split('\n').filter(f => f.trim()),
    }

    if (editingProject) {
      updateProject(editingProject.id, projectData)
    } else {
      addProject(projectData)
    }

    handleCloseForm()
  }

  const handleDelete = (id) => {
    deleteProject(id)
  }

  return (
    <div className="w-full" style={{ marginTop: '0', paddingTop: '0' }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-4">
        <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-retro-dark">PROJECTS Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenForm()}
          className="cursor-target retro-button bg-retro-orange text-white flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Project</span>
          <span className="sm:hidden">Add</span>
        </motion.button>
      </div>

      <div className="space-y-4 relative z-0">
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="font-body">No projects yet. Click "Add Project" to get started!</p>
          </div>
        )}
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-black rounded-lg p-3 sm:p-4 bg-gray-50 relative z-0"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-pixel text-base sm:text-lg text-retro-orange mb-1 break-words">{project.title}</h3>
                <p className="font-body text-xs sm:text-sm text-gray-600 break-words">{project.name}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleOpenForm(project)}
                  className="cursor-target p-2 bg-blue-500 text-white rounded border-2 border-black flex-shrink-0"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(project.id)}
                  className="cursor-target p-2 bg-red-600 text-white rounded border-2 border-black flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <p className="font-body text-xs sm:text-sm text-gray-700 mb-2 break-words">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-retro-yellow text-xs rounded border border-black whitespace-nowrap">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4"
            onClick={handleCloseForm}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl border-2 border-black p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-[101]"
              style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-pixel text-xl text-retro-dark">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={handleCloseForm}
                  className="cursor-target p-2 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="retro-input w-full bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="retro-input w-full bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="retro-input w-full bg-white resize-none"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Short Description</label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="retro-input w-full bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="retro-input w-full bg-white"
                    placeholder="React, TypeScript, Tailwind"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Features (one per line)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="retro-input w-full bg-white resize-none"
                    rows="4"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-target retro-button bg-retro-orange text-white flex-1"
                  >
                    {editingProject ? 'Update' : 'Add'} Project
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCloseForm}
                    className="cursor-target retro-button bg-gray-300 text-retro-dark flex-1"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectsManager


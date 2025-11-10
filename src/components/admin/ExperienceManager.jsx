import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { Plus, Edit, Trash2, X } from 'lucide-react'

const ExperienceManager = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useAdmin()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingExp, setEditingExp] = useState(null)

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
    company: '',
    role: '',
    period: '',
    description: '',
    achievements: '',
    tags: '',
  })

  const handleOpenForm = (exp = null) => {
    if (exp) {
      setEditingExp(exp)
      setFormData({
        company: exp.company || '',
        role: exp.role || '',
        period: exp.period || '',
        description: exp.description || '',
        achievements: exp.achievements?.join('\n') || '',
        tags: exp.tags?.join(', ') || '',
      })
    } else {
      setEditingExp(null)
      setFormData({
        company: '',
        role: '',
        period: '',
        description: '',
        achievements: '',
        tags: '',
      })
    }
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingExp(null)
    setFormData({
      company: '',
      role: '',
      period: '',
      description: '',
      achievements: '',
      tags: '',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const expData = {
      company: formData.company,
      role: formData.role,
      period: formData.period,
      description: formData.description,
      achievements: formData.achievements.split('\n').filter(a => a.trim()),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    }

    if (editingExp) {
      updateExperience(editingExp.id, expData)
    } else {
      addExperience(expData)
    }

    handleCloseForm()
  }

  const handleDelete = (id) => {
    deleteExperience(id)
  }

  return (
    <div className="relative z-0 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-4">
        <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-retro-dark">Experience Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenForm()}
          className="cursor-target retro-button bg-retro-orange text-white flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Experience</span>
          <span className="sm:hidden">Add</span>
        </motion.button>
      </div>

      <div className="space-y-4 relative z-0">
        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="font-body">No experience entries yet. Click "Add Experience" to get started!</p>
          </div>
        )}
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-black rounded-lg p-3 sm:p-4 bg-gray-50 relative z-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-pixel text-lg text-retro-orange mb-1">{exp.company}</h3>
                <p className="font-body text-sm font-medium">{exp.role}</p>
                <p className="font-body text-xs text-gray-600">{exp.period}</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleOpenForm(exp)}
                  className="cursor-target p-2 bg-blue-500 text-white rounded border-2 border-black"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(exp.id)}
                  className="cursor-target p-2 bg-red-600 text-white rounded border-2 border-black"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <p className="font-body text-sm text-gray-700 mb-2">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.tags?.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-retro-yellow text-xs rounded border border-black">
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
                  {editingExp ? 'Edit Experience' : 'Add New Experience'}
                </h3>
                <button onClick={handleCloseForm} className="cursor-target p-2 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="retro-input w-full bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="retro-input w-full bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Period</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="retro-input w-full bg-white"
                    placeholder="2021 - 2023"
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
                  <label className="block font-body text-sm font-medium mb-2">Achievements (one per line)</label>
                  <textarea
                    value={formData.achievements}
                    onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                    className="retro-input w-full bg-white resize-none"
                    rows="4"
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

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-target retro-button bg-retro-orange text-white flex-1"
                  >
                    {editingExp ? 'Update' : 'Add'} Experience
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

export default ExperienceManager


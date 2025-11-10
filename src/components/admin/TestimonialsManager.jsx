import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { Plus, Edit, Trash2, X } from 'lucide-react'

const TestimonialsManager = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useAdmin()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTest, setEditingTest] = useState(null)

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
    text: '',
    author: '',
    role: '',
    rating: 5,
  })

  const handleOpenForm = (test = null) => {
    if (test) {
      setEditingTest(test)
      setFormData({
        text: test.text || '',
        author: test.author || '',
        role: test.role || '',
        rating: test.rating || 5,
      })
    } else {
      setEditingTest(null)
      setFormData({
        text: '',
        author: '',
        role: '',
        rating: 5,
      })
    }
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingTest(null)
    setFormData({
      text: '',
      author: '',
      role: '',
      rating: 5,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const testData = {
      text: formData.text,
      author: formData.author,
      role: formData.role,
      rating: parseInt(formData.rating),
    }

    if (editingTest) {
      updateTestimonial(editingTest.id, testData)
    } else {
      addTestimonial(testData)
    }

    handleCloseForm()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      deleteTestimonial(id)
    }
  }

  return (
    <div className="relative z-0 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-4">
        <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-retro-dark">Testimonials Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleOpenForm()}
          className="cursor-target retro-button bg-retro-orange text-white flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Testimonial</span>
          <span className="sm:hidden">Add</span>
        </motion.button>
      </div>

      <div className="space-y-4 relative z-0">
        {testimonials.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="font-body">No testimonials yet. Click "Add Testimonial" to get started!</p>
          </div>
        )}
        {testimonials.map((test) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-black rounded-lg p-3 sm:p-4 bg-gray-50 relative z-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-body text-sm text-gray-700 mb-2 italic">"{test.text}"</p>
                <div className="flex items-center gap-2">
                  <p className="font-body text-sm font-medium">{test.author}</p>
                  <span className="text-gray-400">•</span>
                  <p className="font-body text-xs text-gray-600">{test.role}</p>
                  <div className="flex gap-1 ml-2">
                    {[...Array(test.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleOpenForm(test)}
                  className="cursor-target p-2 bg-blue-500 text-white rounded border-2 border-black"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(test.id)}
                  className="cursor-target p-2 bg-red-600 text-white rounded border-2 border-black"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
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
                  {editingTest ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h3>
                <button onClick={handleCloseForm} className="cursor-target p-2 hover:bg-gray-100 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-body text-sm font-medium mb-2">Testimonial Text</label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="retro-input w-full bg-white resize-none"
                    rows="4"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="retro-input w-full bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Role/Company</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="retro-input w-full bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm font-medium mb-2">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="retro-input w-full bg-white"
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
                    {editingTest ? 'Update' : 'Add'} Testimonial
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

export default TestimonialsManager


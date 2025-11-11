import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import { Save } from 'lucide-react'

const ContactManager = () => {
  const { contact, updateContact } = useAdmin()
  const [formData, setFormData] = useState({
    name: contact.name || '',
    role: contact.role || '',
    bio: contact.bio || '',
    email: contact.email || '',
    status: contact.status || 'available',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateContact(formData)
    } catch (error) {
      console.error('Error updating contact:', error)
    }
  }

  return (
    <div className="w-full">
      <h2 className="font-pixel text-lg sm:text-xl md:text-2xl text-retro-dark mb-4 md:mb-6">Contact Information Management</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block font-body text-sm font-medium mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="retro-input w-full bg-white resize-none"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="retro-input w-full bg-white"
            required
          />
        </div>

        <div>
          <label className="block font-body text-sm font-medium mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="retro-input w-full bg-white"
            required
          >
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="away">Away</option>
          </select>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-target retro-button bg-retro-orange text-white flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Contact Information
        </motion.button>
      </form>
    </div>
  )
}

export default ContactManager


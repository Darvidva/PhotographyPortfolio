import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Eye, LogOut, User } from 'lucide-react'
import { PortfolioStore, type PortfolioItem, type PortfolioImage } from './PortfolioData'
import { useAuth } from './AuthContext'

interface AdminDashboardProps {
  onNavigate: (page: string) => void
}

const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const [portfolioItems, setPortfolioItems] = useState(PortfolioStore.getAll())
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [, setPreviewItem] = useState<PortfolioItem | null>(null)
  const { logout } = useAuth()

  const [formData, setFormData] = useState<Partial<PortfolioItem>>({
    title: '',
    description: '',
    category: 'portrait',
    coverImage: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    client: '',
    images: []
  })

  const categories = [
    { id: 'portrait', label: 'Portrait' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'event', label: 'Event' },
    { id: 'commercial', label: 'Commercial' }
  ]

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
    setFormData(item)
    setIsCreating(false)
  }

  const handleCreate = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      description: '',
      category: 'portrait',
      coverImage: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      client: '',
      images: []
    })
    setIsCreating(true)
  }

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.coverImage) {
      alert('Please fill in all required fields')
      return
    }

    const itemData = {
      ...formData,
      id: editingItem?.id || Date.now().toString(),
      images: formData.images || []
    } as PortfolioItem

    if (editingItem) {
      PortfolioStore.update(editingItem.id, itemData)
    } else {
      PortfolioStore.add(itemData)
    }

    setPortfolioItems(PortfolioStore.getAll())
    setEditingItem(null)
    setIsCreating(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      PortfolioStore.delete(id)
      setPortfolioItems(PortfolioStore.getAll())
    }
  }

  const handleCancel = () => {
    setEditingItem(null)
    setIsCreating(false)
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
      onNavigate('home')
    }
  }

  const addImage = () => {
    const newImage: PortfolioImage = {
      id: Date.now().toString(),
      url: '',
      title: 'New Image',
      description: ''
    }
    setFormData({
      ...formData,
      images: [...(formData.images || []), newImage]
    })
  }

  const updateImage = (index: number, updates: Partial<PortfolioImage>) => {
    const updatedImages = [...(formData.images || [])]
    updatedImages[index] = { ...updatedImages[index], ...updates }
    setFormData({ ...formData, images: updatedImages })
  }

  const removeImage = (index: number) => {
    const updatedImages = [...(formData.images || [])]
    updatedImages.splice(index, 1)
    setFormData({ ...formData, images: updatedImages })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-8 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </motion.button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center mb-2">
                <h1 className="text-4xl md:text-5xl font-bold text-white mr-4">
                  Admin Dashboard
                </h1>
                <div className="flex items-center bg-green-900/30 border border-green-700/50 px-3 py-1 rounded-full text-green-300 text-sm">
                  <User className="w-4 h-4 mr-1" />
                  <span>Admin</span>
                </div>
              </div>
              <p className="text-gray-300">Manage your portfolio content</p>
            </motion.div>

            <div className="flex items-center space-x-3 mt-6 lg:mt-0">
              <motion.button
                onClick={handleCreate}
                className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Project
              </motion.button>

              <motion.button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: 'Total Projects', value: portfolioItems.length, color: 'bg-blue-600' },
            { label: 'Portraits', value: portfolioItems.filter(i => i.category === 'portrait').length, color: 'bg-green-600' },
            { label: 'Weddings', value: portfolioItems.filter(i => i.category === 'wedding').length, color: 'bg-purple-600' },
            { label: 'Events', value: portfolioItems.filter(i => i.category === 'event').length, color: 'bg-orange-600' }
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-900 rounded-lg p-6 border border-gray-700">
              <div className={`w-3 h-3 ${stat.color} rounded-full mb-3`}></div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {(editingItem || isCreating) && (
          <motion.div
            className="bg-gray-900 rounded-xl p-8 mb-8 border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingItem ? 'Edit Portfolio Item' : 'Create New Portfolio Item'}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:border-white focus:outline-none"
                    placeholder="Portfolio item title"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Description *</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:border-white focus:outline-none resize-none"
                    placeholder="Describe this portfolio item"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Category *</label>
                    <select
                      value={formData.category || 'portrait'}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:border-white focus:outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Cover Image URL *</label>
                  <input
                    type="url"
                    value={formData.coverImage || ''}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:border-white focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">Client</label>
                    <input
                      type="text"
                      value={formData.client || ''}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:border-white focus:outline-none"
                      placeholder="Client name"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:border-white focus:outline-none"
                      placeholder="Location"
                    />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-white">Images</label>
                  <button
                    onClick={addImage}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Image
                  </button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {(formData.images || []).map((image, index) => (
                    <div key={image.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-300">Image {index + 1}</span>
                        <button
                          onClick={() => removeImage(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={image.title}
                          onChange={(e) => updateImage(index, { title: e.target.value })}
                          className="w-full px-3 py-2 bg-black border border-gray-600 text-white text-sm rounded focus:border-white focus:outline-none"
                          placeholder="Image title"
                        />
                        
                        <input
                          type="url"
                          value={image.url}
                          onChange={(e) => updateImage(index, { url: e.target.value })}
                          className="w-full px-3 py-2 bg-black border border-gray-600 text-white text-sm rounded focus:border-white focus:outline-none"
                          placeholder="Image URL"
                        />
                        
                        <textarea
                          value={image.description || ''}
                          onChange={(e) => updateImage(index, { description: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2 bg-black border border-gray-600 text-white text-sm rounded focus:border-white focus:outline-none resize-none"
                          placeholder="Image description"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Portfolio Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="aspect-video bg-gray-800 relative overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {item.images.length} photos
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-yellow-600 text-white px-3 py-2 rounded text-sm hover:bg-yellow-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    const response = await fetch(url, config)
    
    // Check if response is JSON
    let data
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()
      throw new Error(text || `HTTP error! status: ${response.status}`)
    }

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('API request failed:', error)
    
    // Provide better error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on port 5000.')
    }
    
    throw error
  }
}

// Projects API
export const projectsAPI = {
  getAll: () => apiRequest('/projects'),
  getById: (id) => apiRequest(`/projects/${id}`),
  create: (project) => apiRequest('/projects', { method: 'POST', body: project }),
  update: (id, project) => apiRequest(`/projects/${id}`, { method: 'PUT', body: project }),
  delete: (id) => apiRequest(`/projects/${id}`, { method: 'DELETE' }),
}

// Experiences API
export const experiencesAPI = {
  getAll: () => apiRequest('/experiences'),
  getById: (id) => apiRequest(`/experiences/${id}`),
  create: (experience) => apiRequest('/experiences', { method: 'POST', body: experience }),
  update: (id, experience) => apiRequest(`/experiences/${id}`, { method: 'PUT', body: experience }),
  delete: (id) => apiRequest(`/experiences/${id}`, { method: 'DELETE' }),
}

// Testimonials API
export const testimonialsAPI = {
  getAll: () => apiRequest('/testimonials'),
  getById: (id) => apiRequest(`/testimonials/${id}`),
  create: (testimonial) => apiRequest('/testimonials', { method: 'POST', body: testimonial }),
  update: (id, testimonial) => apiRequest(`/testimonials/${id}`, { method: 'PUT', body: testimonial }),
  delete: (id) => apiRequest(`/testimonials/${id}`, { method: 'DELETE' }),
}

// Skills API
export const skillsAPI = {
  getAll: () => apiRequest('/skills'),
  getById: (categoryId) => apiRequest(`/skills/${categoryId}`),
  create: (categoryId, data) => apiRequest('/skills', { method: 'POST', body: { categoryId, ...data } }),
  update: (categoryId, data) => apiRequest(`/skills/${categoryId}`, { method: 'PUT', body: data }),
  delete: (categoryId) => apiRequest(`/skills/${categoryId}`, { method: 'DELETE' }),
}

// Sections API
export const sectionsAPI = {
  getHero: () => apiRequest('/sections/hero'),
  updateHero: (data) => apiRequest('/sections/hero', { method: 'PUT', body: data }),
  getAbout: () => apiRequest('/sections/about'),
  updateAbout: (data) => apiRequest('/sections/about', { method: 'PUT', body: data }),
  getContact: () => apiRequest('/sections/contact'),
  updateContact: (data) => apiRequest('/sections/contact', { method: 'PUT', body: data }),
}

// Auth API
export const authAPI = {
  login: (password) => apiRequest('/auth/login', { method: 'POST', body: { password } }),
  changePassword: (currentPassword, newPassword) =>
    apiRequest('/auth/password', {
      method: 'PUT',
      body: { currentPassword, newPassword },
    }),
}

// Get all portfolio data at once
export const getPortfolioData = async () => {
  try {
    const [projects, experiences, testimonials, skills, hero, about, contact] = await Promise.all([
      projectsAPI.getAll(),
      experiencesAPI.getAll(),
      testimonialsAPI.getAll(),
      skillsAPI.getAll(),
      sectionsAPI.getHero(),
      sectionsAPI.getAbout(),
      sectionsAPI.getContact(),
    ])

    return {
      projects,
      experiences,
      testimonials,
      skills,
      hero,
      about,
      contact,
    }
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    throw error
  }
}


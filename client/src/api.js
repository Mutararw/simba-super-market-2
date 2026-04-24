const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://simba-backend.onrender.com/api')

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  })

  let data = null
  let rawText = ''
  try {
    rawText = await response.text()
    data = JSON.parse(rawText)
  } catch (_error) {
    data = null
  }

  if (!response.ok) {
    const message = data?.error 
      ? `${data.message}: ${data.error}` 
      : (data?.message || `Request failed (${response.status}): ${rawText.substring(0, 100)}`)
    throw new Error(message)
  }

  return data
}

export const api = {
  register: ({ name, email, password, accountType, adminRole }) =>
    request('/auth/sign-up/email', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, accountType, adminRole })
    }),

  login: ({ email, password }) =>
    request('/auth/sign-in/email', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  getSession: () => request('/auth/get-session'),

  signOut: () =>
    request('/auth/sign-out', {
      method: 'POST'
    }),

  getProducts: async () => {
    const products = await request('/products')
    return products.map((product) => ({
      ...product,
      image: product.image_url,
      category: product.category || 'General'
    }))
  },

  getProductById: async (id) => {
    const product = await request(`/products/${id}`)
    return {
      ...product,
      image: product.image_url,
      category: product.category || 'General'
    }
  },

  createOrder: ({ items }) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify({ items })
    }),

  getMyOrders: () => request('/orders/me')
}

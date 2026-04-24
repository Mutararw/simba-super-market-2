const API_BASE_URL = 'https://simba-backend-1-givj.onrender.com/api'

const request = async (path, options = {}) => {
  console.log(`API Request: ${API_BASE_URL}${path}`);
  const response = await fetch(`${API_BASE_URL}${path}`, {
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
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, accountType, adminRole })
    }),

  login: ({ email, password }) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
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

  createOrder: ({ token, items }) =>
    request('/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ items })
    }),

  getMyOrders: ({ token }) =>
    request('/orders/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
}

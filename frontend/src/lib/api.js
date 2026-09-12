const BASE_URL = 'http://localhost:8000/api/v1';

export const api = {
  // Generic request handler with automatic JWT injection
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('vyapaar_token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('vyapaar_token');
          window.location.reload(); 
        }
        throw new Error(data.detail || 'An error occurred during the request.');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error.message);
      throw error;
    }
  },

  // --- Authentication ---
  auth: {
    login: async (username, password) => {
      // FastAPI OAuth2 requires form data, not JSON
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (!response.ok) throw new Error('Invalid credentials');
      
      const data = await response.json();
      localStorage.setItem('vyapaar_token', data.access_token);
      return data;
    },
    
    logout: () => {
      localStorage.removeItem('vyapaar_token');
    }
  },

  // --- Inventory ---
  inventory: {
    getAll: () => api.request('/inventory/'),
    create: (productData) => api.request('/inventory/', {
      method: 'POST',
      body: JSON.stringify(productData)
    })
  },

  // --- Customers ---
  customers: {
    getAll: () => api.request('/customers/'),
    create: (customerData) => api.request('/customers/', {
      method: 'POST',
      body: JSON.stringify(customerData)
    })
  }
};
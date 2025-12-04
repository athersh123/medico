import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('medicor_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log('API: Response interceptor - success');
    return response;
  },
  (error) => {
    console.log('API: Response interceptor - error:', error.response?.status);
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid, clear local storage
      console.log('API: Unauthorized - clearing credentials');
      localStorage.removeItem('medicor_token');
      localStorage.removeItem('medicor_user');
      
      // Only redirect if not already on login/signup page
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/signup') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // User registration
  signup: async (userData) => {
    try {
      console.log('API: Making signup request to:', `${API_BASE_URL}/auth/signup`);
      console.log('API: Request data:', { name: userData.name, email: userData.email });
      
      const response = await api.post('/auth/signup', userData);
      console.log('API: Signup response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Signup error:', error);
      console.error('API: Error response:', error.response?.data);
      
      // Return structured error
      if (error.response?.data) {
        throw error.response.data;
      } else if (error.message) {
        throw { message: error.message };
      } else {
        throw { message: 'Network error. Please check your connection.' };
      }
    }
  },

  // User login
  login: async (credentials) => {
    try {
      console.log('API: Making login request to:', `${API_BASE_URL}/auth/login`);
      console.log('API: Request data:', { email: credentials.email });
      
      const response = await api.post('/auth/login', credentials);
      console.log('API: Login response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Login error:', error);
      console.error('API: Error response:', error.response?.data);
      
      // Return structured error
      if (error.response?.data) {
        throw error.response.data;
      } else if (error.message) {
        throw { message: error.message };
      } else {
        throw { message: 'Network error. Please check your connection.' };
      }
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get profile' };
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },
};

// Medical Report API functions
export const reportAPI = {
  // Analyze medical report
  analyzeReport: async (reportData) => {
    try {
      console.log('API: Making analyze-report request to:', `${API_BASE_URL}/analyze-report`);
      console.log('API: Report data:', reportData);
      
      const response = await api.post('/analyze-report', reportData);
      console.log('API: Analysis response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Analyze report error:', error);
      console.error('API: Error response:', error.response?.data);
      console.error('API: Error status:', error.response?.status);
      
      // Return structured error
      if (error.response?.data) {
        throw error.response.data;
      } else if (error.message) {
        throw { message: error.message };
      } else {
        throw { message: 'Network error. Please check your connection.' };
      }
    }
  },

  // Get user's reports
  getReports: async () => {
    try {
      const response = await api.get('/reports');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch reports' };
    }
  },

  // Download report
  downloadReport: async (reportId) => {
    try {
      console.log('API: Downloading report:', reportId);
      const response = await api.get(`/reports/${reportId}/download`);
      console.log('API: Download response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API: Download error:', error);
      throw error.response?.data || { message: 'Failed to download report' };
    }
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Health check failed' };
  }
};

export default api;

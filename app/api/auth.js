import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const AUTH_URL = `${API_URL}/auth`;

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Register a new customer
export const registerCustomer = async (userData) => {
  try {
    const response = await api.post(`${AUTH_URL}/register/customer`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Register customer error:', error.response?.data || error.message);
    throw error;
  }
};

// Register a new restaurant manager
export const registerManager = async (userData) => {
  try {
    const response = await api.post(`${AUTH_URL}/register/manager`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Register manager error:', error.response?.data || error.message);
    throw error;
  }
};

// Send OTP to a phone number
export const sendOTP = async (phoneNumber) => {
  try {
    const response = await api.post(`${AUTH_URL}/otp/send`, { phoneNumber });
    return response.data;
  } catch (error) {
    console.error('Send OTP error:', error.response?.data || error.message);
    throw error;
  }
};

// Verify OTP for a phone number
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    const response = await api.post(`${AUTH_URL}/otp/verify`, { phoneNumber, otp });
    if (response.data.user?.token) {
      localStorage.setItem('token', response.data.user.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Verify OTP error:', error.response?.data || error.message);
    throw error;
  }
};

// Login a user
export const login = async (phoneNumber) => {
  try {
    const response = await api.post(`${AUTH_URL}/login`, { phoneNumber });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// Get current user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get(`${AUTH_URL}/profile`);
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error.response?.data || error.message);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put(`${AUTH_URL}/profile`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Update profile error:', error.response?.data || error.message);
    throw error;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Check if user is logged in
export const isLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
};

// Get current user data
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export default {
  registerCustomer,
  registerManager,
  sendOTP,
  verifyOTP,
  login,
  getUserProfile,
  updateUserProfile,
  logout,
  isLoggedIn,
  getCurrentUser
}; 
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const RESTAURANT_URL = `${API_URL}/restaurants`;

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

// Create a new restaurant
export const createRestaurant = async (restaurantData) => {
  try {
    const response = await api.post(RESTAURANT_URL, restaurantData);
    return response.data;
  } catch (error) {
    console.error('Create restaurant error:', error.response?.data || error.message);
    throw error;
  }
};

// Get manager's restaurant
export const getManagerRestaurant = async () => {
  try {
    const response = await api.get(`${RESTAURANT_URL}/manager/restaurant`);
    return response.data;
  } catch (error) {
    console.error('Get manager restaurant error:', error.response?.data || error.message);
    throw error;
  }
};

// Update restaurant
export const updateRestaurant = async (restaurantData) => {
  try {
    const response = await api.put(`${RESTAURANT_URL}/manager/restaurant`, restaurantData);
    return response.data;
  } catch (error) {
    console.error('Update restaurant error:', error.response?.data || error.message);
    throw error;
  }
};

// Manage restaurant tables
export const manageTables = async (tables) => {
  try {
    const response = await api.put(`${RESTAURANT_URL}/manager/tables`, { tables });
    return response.data;
  } catch (error) {
    console.error('Manage tables error:', error.response?.data || error.message);
    throw error;
  }
};

// Get restaurant by ID
export const getRestaurantById = async (id) => {
  try {
    const response = await api.get(`${RESTAURANT_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get restaurant error:', error.response?.data || error.message);
    throw error;
  }
};

// Search restaurants
export const searchRestaurants = async (params) => {
  try {
    const response = await api.get(RESTAURANT_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Search restaurants error:', error.response?.data || error.message);
    throw error;
  }
};

// Add restaurant to favorites
export const addToFavorites = async (restaurantId) => {
  try {
    const response = await api.post(`${RESTAURANT_URL}/favorites`, { restaurantId });
    return response.data;
  } catch (error) {
    console.error('Add to favorites error:', error.response?.data || error.message);
    throw error;
  }
};

// Remove restaurant from favorites
export const removeFromFavorites = async (restaurantId) => {
  try {
    const response = await api.delete(`${RESTAURANT_URL}/favorites/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('Remove from favorites error:', error.response?.data || error.message);
    throw error;
  }
};

// Get favorite restaurants
export const getFavoriteRestaurants = async () => {
  try {
    const response = await api.get(`${RESTAURANT_URL}/customer/favorites`);
    return response.data;
  } catch (error) {
    console.error('Get favorite restaurants error:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  createRestaurant,
  getManagerRestaurant,
  updateRestaurant,
  manageTables,
  getRestaurantById,
  searchRestaurants,
  addToFavorites,
  removeFromFavorites,
  getFavoriteRestaurants
}; 
import express from 'express';
import { 
  createRestaurant,
  getRestaurantById,
  getManagerRestaurant,
  updateRestaurant,
  getRestaurants,
  manageTables,
  addToFavorites,
  removeFromFavorites,
  getFavoriteRestaurants
} from '../controllers/restaurantController.js';
import { protect, manager, customer } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);

// Protected routes for managers
router.post('/', protect, manager, createRestaurant);
router.get('/manager/restaurant', protect, manager, getManagerRestaurant);
router.put('/manager/restaurant', protect, manager, updateRestaurant);
router.put('/manager/tables', protect, manager, manageTables);

// Protected routes for customers
router.post('/favorites', protect, customer, addToFavorites);
router.delete('/favorites/:restaurantId', protect, customer, removeFromFavorites);
router.get('/customer/favorites', protect, customer, getFavoriteRestaurants);

export default router; 
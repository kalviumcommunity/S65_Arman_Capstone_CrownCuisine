import express from 'express';
import { 
  createReservation,
  getUserReservations,
  getRestaurantReservations,
  updateReservationStatus,
  cancelReservation,
  getAvailableTables,
  getReservationDetails
} from '../controllers/reservationController.js';
import { protect, manager, customer } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/tables/available', getAvailableTables);

// Protected routes for both customers and managers
router.get('/:id', protect, getReservationDetails);

// Protected routes for customers
router.post('/', protect, customer, createReservation);
router.get('/user/reservations', protect, customer, getUserReservations);
router.put('/cancel/:id', protect, customer, cancelReservation);

// Protected routes for managers
router.get('/restaurant/reservations', protect, manager, getRestaurantReservations);
router.put('/status/:id', protect, manager, updateReservationStatus);

export default router; 
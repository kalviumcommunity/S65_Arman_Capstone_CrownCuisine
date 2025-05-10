import express from 'express';
import { 
  createOffer,
  getRestaurantOffers,
  updateOffer,
  deleteOffer,
  getActiveOffers,
  saveOffer,
  unsaveOffer,
  getSavedOffers,
  getExpiringSoonOffers
} from '../controllers/offerController.js';
import { protect, manager, customer } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/active/:restaurantId', getActiveOffers);

// Protected routes for managers
router.post('/', protect, manager, createOffer);
router.get('/manager/offers', protect, manager, getRestaurantOffers);
router.put('/:id', protect, manager, updateOffer);
router.delete('/:id', protect, manager, deleteOffer);

// Protected routes for customers
router.post('/save', protect, customer, saveOffer);
router.delete('/save/:offerId', protect, customer, unsaveOffer);
router.get('/user/saved', protect, customer, getSavedOffers);
router.get('/user/expiring', protect, customer, getExpiringSoonOffers);

export default router; 
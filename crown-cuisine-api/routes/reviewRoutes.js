import express from 'express';
import { 
  createReview,
  updateReview,
  deleteReview,
  getRestaurantReviews,
  getUserReviews,
  replyToReview,
  likeReview,
  getReviewStats
} from '../controllers/reviewController.js';
import { protect, manager, customer } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/restaurant/:restaurantId', getRestaurantReviews);
router.get('/stats/:restaurantId', getReviewStats);
router.post('/like/:id', likeReview);

// Protected routes for customers
router.post('/', protect, customer, createReview);
router.put('/:id', protect, customer, updateReview);
router.delete('/:id', protect, customer, deleteReview);
router.get('/user/reviews', protect, customer, getUserReviews);

// Protected routes for managers
router.post('/reply/:id', protect, manager, replyToReview);

export default router; 
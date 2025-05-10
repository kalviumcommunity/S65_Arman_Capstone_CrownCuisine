import express from 'express';
import { 
  registerCustomer, 
  registerManager, 
  sendOTPCode, 
  verifyOTPCode, 
  login,
  getUserProfile,
  updateUserProfile 
} from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.post('/register/customer', registerCustomer);
router.post('/register/manager', registerManager);
router.post('/login', login);
router.post('/otp/send', sendOTPCode);
router.post('/otp/verify', verifyOTPCode);

// Protected routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router; 
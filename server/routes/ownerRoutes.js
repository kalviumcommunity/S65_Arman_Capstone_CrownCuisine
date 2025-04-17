const express = require('express');
const router = express.Router();
const {
  setupRestaurant,
  getRestaurantProfile,
} = require('../controllers/ownerController');
const { protect, ownerOnly } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

// Protected routes - owner only
router.post(
  '/setup',
  protect,
  ownerOnly,
  upload.single('logo'),
  setupRestaurant
);

router.get('/restaurant', protect, ownerOnly, getRestaurantProfile);

module.exports = router; 
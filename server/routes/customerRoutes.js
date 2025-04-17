const express = require('express');
const router = express.Router();
const {
  setupCustomer,
  getCustomerProfile,
} = require('../controllers/customerController');
const { protect, customerOnly } = require('../middlewares/authMiddleware');

// Protected routes - customer only
router.post('/setup', protect, customerOnly, setupCustomer);
router.get('/profile', protect, customerOnly, getCustomerProfile);

module.exports = router; 
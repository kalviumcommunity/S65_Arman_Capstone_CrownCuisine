const express = require('express');
const customerController = require('../controllers/customer.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.post('/profile', customerController.createProfile);

// Protected routes (require authentication)
router.get('/profile', verifyToken, customerController.getProfile);
router.put('/profile', verifyToken, customerController.updateProfile);

module.exports = router; 
const Customer = require('../models/customerModel');
const User = require('../models/userModel');

// @desc    Setup customer profile
// @route   POST /api/customer/setup
// @access  Private
const setupCustomer = async (req, res) => {
  try {
    const { name, phoneNumber, favoriteCuisine } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!name || !phoneNumber || !favoriteCuisine) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if customer profile already exists
    const existingCustomer = await Customer.findOne({ user: userId });

    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer profile already exists' });
    }

    // Create customer profile
    const customer = await Customer.create({
      user: userId,
      name,
      phoneNumber,
      favoriteCuisine,
    });

    // Update user profile completion status
    await User.findByIdAndUpdate(userId, { isProfileComplete: true });

    res.status(201).json({
      customer: {
        _id: customer._id,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        favoriteCuisine: customer.favoriteCuisine,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get customer profile
// @route   GET /api/customer/profile
// @access  Private
const getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findOne({ user: req.user._id });

    if (!customer) {
      return res.status(404).json({ message: 'Customer profile not found' });
    }

    res.json({
      _id: customer._id,
      name: customer.name,
      phoneNumber: customer.phoneNumber,
      favoriteCuisine: customer.favoriteCuisine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  setupCustomer,
  getCustomerProfile,
}; 
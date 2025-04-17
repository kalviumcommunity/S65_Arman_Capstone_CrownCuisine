const Restaurant = require('../models/restaurantModel');
const User = require('../models/userModel');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Setup restaurant profile for owner
// @route   POST /api/owner/setup
// @access  Private
const setupRestaurant = async (req, res) => {
  try {
    const { name, location, speciality, description } = req.body;
    const owner = req.user._id;

    // Validate input
    if (!name || !location || !speciality || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if restaurant already exists for this owner
    const existingRestaurant = await Restaurant.findOne({ owner });

    if (existingRestaurant) {
      return res.status(400).json({ message: 'Restaurant profile already exists' });
    }

    // Upload logo if provided
    let logoData = {};
    if (req.file) {
      try {
        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'crown-cuisine/logos',
          width: 300,
          crop: 'scale',
        });

        logoData = {
          public_id: result.public_id,
          url: result.secure_url,
        };

        // Delete file from server
        fs.unlinkSync(req.file.path);
      } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ message: 'Error uploading image' });
      }
    }

    // Create restaurant
    const restaurant = await Restaurant.create({
      owner,
      name,
      location,
      speciality,
      description,
      logo: logoData,
    });

    // Update user profile completion status
    await User.findByIdAndUpdate(owner, { isProfileComplete: true });

    res.status(201).json({
      restaurant: {
        _id: restaurant._id,
        name: restaurant.name,
        location: restaurant.location,
        speciality: restaurant.speciality,
        description: restaurant.description,
        logo: restaurant.logo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get restaurant profile
// @route   GET /api/owner/restaurant
// @access  Private
const getRestaurantProfile = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({
      _id: restaurant._id,
      name: restaurant.name,
      location: restaurant.location,
      speciality: restaurant.speciality,
      description: restaurant.description,
      logo: restaurant.logo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  setupRestaurant,
  getRestaurantProfile,
}; 
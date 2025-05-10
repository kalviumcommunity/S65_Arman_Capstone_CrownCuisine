import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

// Create a new restaurant
export const createRestaurant = async (req, res) => {
  try {
    const { name, cuisineSpecialty, description, location } = req.body;
    
    // Check if user is a manager
    const user = await User.findById(req.user._id);
    if (!user || user.role !== 'manager') {
      return res.status(403).json({ message: 'Only managers can create restaurants' });
    }

    // Check if manager already has a restaurant
    const existingRestaurant = await Restaurant.findOne({ owner: req.user._id });
    if (existingRestaurant) {
      return res.status(400).json({ message: 'You already have a restaurant' });
    }

    // Create restaurant
    const restaurant = await Restaurant.create({
      name,
      owner: req.user._id,
      cuisineSpecialty,
      description,
      location
    });

    res.status(201).json(restaurant);
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get restaurant details by ID
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get manager's restaurant
export const getManagerRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error('Get manager restaurant error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update restaurant details
export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const { name, cuisineSpecialty, description, location, openingHours, images } = req.body;

    // Update fields
    if (name) restaurant.name = name;
    if (cuisineSpecialty) restaurant.cuisineSpecialty = cuisineSpecialty;
    if (description) restaurant.description = description;
    if (location) restaurant.location = location;
    if (openingHours) restaurant.openingHours = openingHours;
    if (images) restaurant.images = images;

    const updatedRestaurant = await restaurant.save();
    
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all restaurants with filtering
export const getRestaurants = async (req, res) => {
  try {
    const { cuisine, location, rating, search, page = 1, limit = 10 } = req.query;
    
    // Build filter query
    const filter = {};
    if (cuisine) filter.cuisineSpecialty = { $regex: cuisine, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (rating) filter.rating = { $gte: parseFloat(rating) };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisineSpecialty: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Only include active restaurants
    filter.isActive = true;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const restaurants = await Restaurant.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1 });
    
    // Get total count
    const total = await Restaurant.countDocuments(filter);

    res.status(200).json({
      restaurants,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add or update restaurant tables
export const manageTables = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const { tables } = req.body;
    
    if (!tables || !Array.isArray(tables)) {
      return res.status(400).json({ message: 'Tables must be an array' });
    }

    restaurant.tables = tables;
    const updatedRestaurant = await restaurant.save();
    
    res.status(200).json({ 
      message: 'Tables updated successfully',
      tables: updatedRestaurant.tables
    });
  } catch (error) {
    console.error('Manage tables error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add restaurant to favorites
export const addToFavorites = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    
    // Verify restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Add to user's favorites
    const user = await User.findById(req.user._id);
    
    // Check if already in favorites
    if (user.favorites.restaurants.includes(restaurantId)) {
      return res.status(400).json({ message: 'Restaurant already in favorites' });
    }

    user.favorites.restaurants.push(restaurantId);
    await user.save();
    
    res.status(200).json({ message: 'Restaurant added to favorites' });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Remove restaurant from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    // Remove from user's favorites
    const user = await User.findById(req.user._id);
    
    // Check if in favorites
    if (!user.favorites.restaurants.includes(restaurantId)) {
      return res.status(400).json({ message: 'Restaurant not in favorites' });
    }

    user.favorites.restaurants = user.favorites.restaurants.filter(
      id => id.toString() !== restaurantId
    );
    
    await user.save();
    
    res.status(200).json({ message: 'Restaurant removed from favorites' });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's favorite restaurants
export const getFavoriteRestaurants = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites.restaurants');
    
    res.status(200).json(user.favorites.restaurants);
  } catch (error) {
    console.error('Get favorite restaurants error:', error);
    res.status(500).json({ message: error.message });
  }
}; 
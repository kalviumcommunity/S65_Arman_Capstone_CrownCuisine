import Offer from '../models/Offer.js';
import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';

// Create a new offer
export const createOffer = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      discountType, 
      discountValue, 
      startDate, 
      endDate, 
      code, 
      usageLimit, 
      minimumOrderAmount,
      image
    } = req.body;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Check if offer code already exists
    const existingOffer = await Offer.findOne({ code });
    if (existingOffer) {
      return res.status(400).json({ message: 'Offer code already exists' });
    }

    // Create offer
    const offer = await Offer.create({
      title,
      description,
      restaurant: restaurant._id,
      discountType,
      discountValue,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      code,
      usageLimit: usageLimit || 0,
      minimumOrderAmount: minimumOrderAmount || 0,
      image
    });

    res.status(201).json(offer);
  } catch (error) {
    console.error('Create offer error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all offers for a restaurant
export const getRestaurantOffers = async (req, res) => {
  try {
    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const offers = await Offer.find({ restaurant: restaurant._id }).sort({ endDate: 1 });

    res.status(200).json(offers);
  } catch (error) {
    console.error('Get restaurant offers error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an offer
export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      discountType, 
      discountValue, 
      startDate, 
      endDate, 
      code, 
      usageLimit, 
      minimumOrderAmount,
      isActive,
      image
    } = req.body;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find offer
    const offer = await Offer.findOne({
      _id: id,
      restaurant: restaurant._id
    });

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // Check if updating to a code that already exists
    if (code && code !== offer.code) {
      const existingOffer = await Offer.findOne({ code });
      if (existingOffer) {
        return res.status(400).json({ message: 'Offer code already exists' });
      }
    }

    // Update fields
    if (title) offer.title = title;
    if (description) offer.description = description;
    if (discountType) offer.discountType = discountType;
    if (discountValue !== undefined) offer.discountValue = discountValue;
    if (startDate) offer.startDate = new Date(startDate);
    if (endDate) offer.endDate = new Date(endDate);
    if (code) offer.code = code;
    if (usageLimit !== undefined) offer.usageLimit = usageLimit;
    if (minimumOrderAmount !== undefined) offer.minimumOrderAmount = minimumOrderAmount;
    if (isActive !== undefined) offer.isActive = isActive;
    if (image) offer.image = image;

    const updatedOffer = await offer.save();

    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error('Update offer error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an offer
export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find offer
    const offer = await Offer.findOne({
      _id: id,
      restaurant: restaurant._id
    });

    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // Remove from all users who saved this offer
    await User.updateMany(
      { savedOffers: id },
      { $pull: { savedOffers: id } }
    );

    // Delete offer
    await offer.remove();

    res.status(200).json({ message: 'Offer deleted' });
  } catch (error) {
    console.error('Delete offer error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get active offers for a restaurant (public)
export const getActiveOffers = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const currentDate = new Date();
    
    const offers = await Offer.find({
      restaurant: restaurantId,
      isActive: true,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate }
    }).sort({ endDate: 1 });

    res.status(200).json(offers);
  } catch (error) {
    console.error('Get active offers error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Save an offer to user's saved offers
export const saveOffer = async (req, res) => {
  try {
    const { offerId } = req.body;

    // Check if offer exists
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // Check if offer is active
    const currentDate = new Date();
    if (
      !offer.isActive ||
      offer.startDate > currentDate ||
      offer.endDate < currentDate
    ) {
      return res.status(400).json({ message: 'Offer is not active' });
    }

    // Add to user's saved offers
    const user = await User.findById(req.user._id);
    
    // Check if already saved
    if (user.savedOffers.includes(offerId)) {
      return res.status(400).json({ message: 'Offer already saved' });
    }

    user.savedOffers.push(offerId);
    await user.save();

    res.status(200).json({ message: 'Offer saved successfully' });
  } catch (error) {
    console.error('Save offer error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Remove an offer from user's saved offers
export const unsaveOffer = async (req, res) => {
  try {
    const { offerId } = req.params;

    // Remove from user's saved offers
    const user = await User.findById(req.user._id);
    
    // Check if saved
    if (!user.savedOffers.includes(offerId)) {
      return res.status(400).json({ message: 'Offer not in saved offers' });
    }

    user.savedOffers = user.savedOffers.filter(id => id.toString() !== offerId);
    await user.save();

    res.status(200).json({ message: 'Offer removed from saved offers' });
  } catch (error) {
    console.error('Unsave offer error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's saved offers
export const getSavedOffers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedOffers');
    
    // Filter out expired offers
    const currentDate = new Date();
    const validOffers = user.savedOffers.filter(
      offer => offer.isActive && offer.endDate >= currentDate
    );
    
    // Sort by expiry date (closest first)
    validOffers.sort((a, b) => a.endDate - b.endDate);

    res.status(200).json(validOffers);
  } catch (error) {
    console.error('Get saved offers error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get offers that are expiring soon
export const getExpiringSoonOffers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedOffers');
    
    const currentDate = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(currentDate.getDate() + 3);
    
    // Filter offers expiring in the next 3 days
    const expiringOffers = user.savedOffers.filter(
      offer => offer.isActive && 
      offer.endDate >= currentDate && 
      offer.endDate <= threeDaysFromNow
    );
    
    // Sort by expiry date (closest first)
    expiringOffers.sort((a, b) => a.endDate - b.endDate);

    res.status(200).json(expiringOffers);
  } catch (error) {
    console.error('Get expiring soon offers error:', error);
    res.status(500).json({ message: error.message });
  }
}; 
import Review from '../models/Review.js';
import Restaurant from '../models/Restaurant.js';
import Reservation from '../models/Reservation.js';
import mongoose from 'mongoose';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { restaurantId, rating, comment, photos } = req.body;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Check if user already reviewed this restaurant
    const existingReview = await Review.findOne({
      user: req.user._id,
      restaurant: restaurantId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this restaurant' });
    }

    // Check if user has a completed reservation at this restaurant
    const hasReservation = await Reservation.findOne({
      user: req.user._id,
      restaurant: restaurantId,
      status: 'completed'
    });

    // Create review
    const review = await Review.create({
      user: req.user._id,
      restaurant: restaurantId,
      rating,
      comment,
      photos,
      isVerifiedVisit: !!hasReservation
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, photos } = req.body;

    // Find review
    const review = await Review.findOne({
      _id: id,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update fields
    if (rating) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (photos) review.photos = photos;

    const updatedReview = await review.save();

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    // Find review
    const review = await Review.findOne({
      _id: id,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.remove();

    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for a restaurant
export const getRestaurantReviews = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort option
    const sortOption = {};
    sortOption[sortBy] = order === 'asc' ? 1 : -1;

    // Get reviews
    const reviews = await Review.find({ restaurant: restaurantId })
      .populate('user', 'name')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count
    const total = await Review.countDocuments({ restaurant: restaurantId });

    res.status(200).json({
      reviews,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      total
    });
  } catch (error) {
    console.error('Get restaurant reviews error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get a user's reviews
export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user._id })
      .populate('restaurant', 'name location images')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Reply to a review (manager only)
export const replyToReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find review for this restaurant
    const review = await Review.findOne({
      _id: id,
      restaurant: restaurant._id
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Add reply
    review.reply = {
      text,
      date: new Date()
    };

    const updatedReview = await review.save();

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error('Reply to review error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Like a review
export const likeReview = async (req, res) => {
  try {
    const { id } = req.params;

    // Find review
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Increment likes
    review.likes = (review.likes || 0) + 1;
    await review.save();

    res.status(200).json({ message: 'Review liked', likes: review.likes });
  } catch (error) {
    console.error('Like review error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get review stats for a restaurant
export const getReviewStats = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Get rating counts
    const stats = await Review.aggregate([
      { $match: { restaurant: mongoose.Types.ObjectId(restaurantId) } },
      { 
        $group: { 
          _id: '$rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    // Format results
    const ratingDistribution = {};
    for (let i = 5; i >= 1; i--) {
      const found = stats.find(s => s._id === i);
      ratingDistribution[i] = found ? found.count : 0;
    }

    res.status(200).json({
      ratingDistribution,
      averageRating: restaurant.rating,
      totalReviews: restaurant.reviewCount
    });
  } catch (error) {
    console.error('Get review stats error:', error);
    res.status(500).json({ message: error.message });
  }
}; 
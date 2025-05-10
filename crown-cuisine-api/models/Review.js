import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    photos: [String],
    isVerifiedVisit: {
      type: Boolean,
      default: false,
    },
    reply: {
      text: String,
      date: Date
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Create compound index to prevent multiple reviews by the same user for the same restaurant
reviewSchema.index({ user: 1, restaurant: 1 }, { unique: true });

// Update restaurant rating when a review is added or updated
reviewSchema.post('save', async function() {
  const Review = this.constructor;
  const Restaurant = mongoose.model('Restaurant');
  
  const stats = await Review.aggregate([
    { $match: { restaurant: this.restaurant } },
    { 
      $group: { 
        _id: '$restaurant',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Restaurant.findByIdAndUpdate(this.restaurant, {
      rating: Math.round(stats[0].avgRating * 10) / 10, // Round to 1 decimal
      reviewCount: stats[0].count
    });
  }
});

// Update restaurant rating when a review is deleted
reviewSchema.post('remove', async function() {
  const Review = this.constructor;
  const Restaurant = mongoose.model('Restaurant');
  
  const stats = await Review.aggregate([
    { $match: { restaurant: this.restaurant } },
    { 
      $group: { 
        _id: '$restaurant',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    await Restaurant.findByIdAndUpdate(this.restaurant, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      reviewCount: stats[0].count
    });
  } else {
    await Restaurant.findByIdAndUpdate(this.restaurant, {
      rating: 0,
      reviewCount: 0
    });
  }
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review; 
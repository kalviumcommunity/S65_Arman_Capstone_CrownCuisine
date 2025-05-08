const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  preferences: {
    type: [String],
    default: []
  },
  favoriteRestaurants: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Restaurant'
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Customer', customerSchema); 
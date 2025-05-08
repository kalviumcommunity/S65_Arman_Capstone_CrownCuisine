const mongoose = require('mongoose');
const { Schema } = mongoose;
const config = require('../config');

console.log('📂 Loading OTP model...');

const otpSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // Automatically delete document after 10 minutes
  }
});

// Generate a random 6-digit OTP
otpSchema.statics.generateOTP = function() {
  console.log('🎲 Generating random OTP...');
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`🎲 Generated OTP: ${otp}`);
  return otp;
};

// Verify if OTP is still valid based on expiration time
otpSchema.methods.isValid = function() {
  console.log('⏱️ Checking OTP validity...');
  const now = new Date();
  const expirationTime = new Date(this.createdAt.getTime() + config.otpExpiration);
  const isValid = now <= expirationTime;
  console.log(`⏱️ OTP validity: ${isValid ? 'Valid' : 'Expired'}`);
  return isValid;
};

const OTP = mongoose.model('OTP', otpSchema);
console.log('✅ OTP model loaded successfully');

module.exports = OTP; 
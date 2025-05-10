import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    otp: {
      type: String,
      required: [true, 'OTP is required'],
    },
    expiresAt: {
      type: Date,
      required: true,
      default: function() {
        // Set expiry to 10 minutes from creation
        return new Date(Date.now() + 10 * 60 * 1000);
      }
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Create expiring index on expiresAt
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create unique index on phoneNumber to ensure only one active OTP per phone
otpSchema.index({ phoneNumber: 1 }, { unique: true });

// Static method to verify OTP
otpSchema.statics.verifyOTP = async function(phoneNumber, otpCode) {
  const OTP = this;
  
  const otpRecord = await OTP.findOne({ 
    phoneNumber,
    otp: otpCode,
    expiresAt: { $gt: new Date() }
  });
  
  if (!otpRecord) {
    return { verified: false, message: 'Invalid or expired OTP' };
  }
  
  // Mark OTP as verified
  otpRecord.isVerified = true;
  await otpRecord.save();
  
  return { verified: true, message: 'OTP verified successfully' };
};

// Generate a new 6-digit OTP
otpSchema.statics.generateOTP = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const OTP = mongoose.models.OTP || mongoose.model('OTP', otpSchema);

export default OTP; 
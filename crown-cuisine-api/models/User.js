import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ['customer', 'manager'],
      default: 'customer',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    favorites: {
      restaurants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Restaurant',
        },
      ],
      menus: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MenuItem',
        },
      ],
    },
    savedOffers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only run if password is modified
  if (!this.isModified('password')) return next();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 
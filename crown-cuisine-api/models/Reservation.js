import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: [true, 'Reservation date is required'],
    },
    time: {
      type: String,
      required: [true, 'Reservation time is required'],
    },
    partySize: {
      type: Number,
      required: [true, 'Party size is required'],
      min: 1,
    },
    tableNumber: {
      type: Number, 
      required: true
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'canceled', 'completed'],
      default: 'pending',
    },
    confirmationCode: {
      type: String,
      unique: true,
    }
  },
  { timestamps: true }
);

// Create a unique confirmation code before saving
reservationSchema.pre('save', function (next) {
  if (!this.confirmationCode) {
    this.confirmationCode = Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  next();
});

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);

export default Reservation; 
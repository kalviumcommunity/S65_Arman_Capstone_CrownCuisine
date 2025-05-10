import User from '../models/User.js';
import { generateToken } from '../middlewares/auth.js';
import { sendOTP, verifyOTP } from '../services/twilio.js';

// Register a new customer
export const registerCustomer = async (req, res) => {
  try {
    const { name, phoneNumber, location } = req.body;

    // Check if customer already exists
    const customerExists = await User.findOne({ phoneNumber, role: 'customer' });
    if (customerExists) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    // Create customer in the database
    const customer = await User.create({
      name,
      phoneNumber,
      location,
      role: 'customer',
      isVerified: false
    });

    // Send OTP for verification
    await sendOTP(phoneNumber);

    // Generate JWT token
    const token = generateToken(customer._id);

    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      phoneNumber: customer.phoneNumber,
      location: customer.location,
      role: customer.role,
      isVerified: customer.isVerified,
      token
    });
  } catch (error) {
    console.error('Register customer error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Register a new restaurant manager
export const registerManager = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    // Check if manager already exists
    const managerExists = await User.findOne({ phoneNumber, role: 'manager' });
    if (managerExists) {
      return res.status(400).json({ message: 'Manager already exists' });
    }

    // Create manager in the database
    const manager = await User.create({
      name,
      phoneNumber,
      role: 'manager',
      isVerified: false
    });

    // Send OTP for verification
    await sendOTP(phoneNumber);

    // Generate JWT token
    const token = generateToken(manager._id);

    res.status(201).json({
      _id: manager._id,
      name: manager.name,
      phoneNumber: manager.phoneNumber,
      role: manager.role,
      isVerified: manager.isVerified,
      token
    });
  } catch (error) {
    console.error('Register manager error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Send OTP to user's phone
export const sendOTPCode = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Check if user exists
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send OTP
    const result = await sendOTP(phoneNumber);
    
    if (result.success) {
      return res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP
export const verifyOTPCode = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // Check if user exists
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify OTP
    const result = await verifyOTP(phoneNumber, otp);
    
    if (result.verified) {
      // Update user verification status
      user.isVerified = true;
      await user.save();

      return res.status(200).json({ 
        message: 'OTP verified successfully',
        user: {
          _id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          location: user.location,
          role: user.role,
          isVerified: user.isVerified,
          token: generateToken(user._id)
        }
      });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Check if user exists
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send OTP for login verification
    await sendOTP(phoneNumber);

    res.status(200).json({ 
      message: 'OTP sent for login verification',
      user: {
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get current user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        location: user.location,
        role: user.role,
        isVerified: user.isVerified,
        favorites: user.favorites,
        savedOffers: user.savedOffers
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.location = req.body.location || user.location;
      
      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        phoneNumber: updatedUser.phoneNumber,
        location: updatedUser.location,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ message: error.message });
  }
}; 
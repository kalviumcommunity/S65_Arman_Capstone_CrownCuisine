import twilio from 'twilio';
import OTP from '../models/OTP.js';

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send OTP via SMS
export const sendOTP = async (phoneNumber) => {
  try {
    // Generate a new 6-digit OTP
    const otpCode = OTP.generateOTP();

    // Create or update OTP record in database
    await OTP.findOneAndUpdate(
      { phoneNumber },
      { 
        phoneNumber,
        otp: otpCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        isVerified: false
      },
      { upsert: true, new: true }
    );

    // Send OTP via Twilio
    const message = await client.messages.create({
      body: `Your Crown Cuisine verification code is: ${otpCode}. It will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    return {
      success: true,
      message: 'OTP sent successfully',
      sid: message.sid
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      message: error.message || 'Failed to send OTP',
      error
    };
  }
};

// Verify OTP
export const verifyOTP = async (phoneNumber, otpCode) => {
  try {
    const result = await OTP.verifyOTP(phoneNumber, otpCode);
    return result;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return {
      verified: false,
      message: error.message || 'Failed to verify OTP',
      error
    };
  }
}; 
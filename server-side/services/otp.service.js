const twilio = require("twilio");
const config = require("../config");
const OTP = require("../models/otp.model");

console.log("📂 Loading OTP service...");

// Initialize Twilio client
const twilioClient =
  config.twilioAccountSid && config.twilioAuthToken
    ? twilio(config.twilioAccountSid, config.twilioAuthToken)
    : null;

console.log(
  `🔧 Twilio client initialized: ${twilioClient ? "Yes" : "No (Development Mode)"}`,
);

/**
 * Generate and store a new OTP for a phone number
 * @param {string} phoneNumber - The phone number to send OTP to
 * @returns {string} - The generated OTP code
 */
exports.generateOTP = async (phoneNumber) => {
  console.log(`🔄 generateOTP called for phone: ${phoneNumber}`);
  try {
    // Generate a new OTP
    const otpCode = OTP.generateOTP();

    // Store the OTP in database (deleting any existing ones first)
    console.log(`🗑️ Deleting existing OTPs for phone: ${phoneNumber}`);

    try {
      const deleteResult = await OTP.deleteMany({ phoneNumber });
      console.log(`🗑️ Delete result:`, deleteResult);
    } catch (deleteError) {
      console.error(`❌ Error deleting existing OTPs: ${deleteError.message}`);
      throw deleteError;
    }

    console.log(`💾 Creating new OTP in database for phone: ${phoneNumber}`);
    try {
      const newOtp = await OTP.create({
        phoneNumber,
        otp: otpCode,
      });
      console.log(
        `💾 New OTP created in database: ${JSON.stringify({
          id: newOtp._id,
          phoneNumber: newOtp.phoneNumber,
          createdAt: newOtp.createdAt,
        })}`,
      );
    } catch (createError) {
      console.error(
        `❌ Error creating OTP in database: ${createError.message}`,
      );
      throw createError;
    }

    console.log(`✅ OTP generated and stored: ${otpCode}`);
    return otpCode;
  } catch (error) {
    console.error(`❌ Error in generateOTP: ${error.message}`);
    throw new Error(`Error generating OTP: ${error.message}`);
  }
};

/**
 * Send OTP via SMS using Twilio
 * @param {string} phoneNumber - The phone number to send OTP to
 * @param {string} otpCode - The OTP code to send
 * @returns {boolean} - Whether the SMS was sent successfully
 */
exports.sendOTPviaSMS = async (phoneNumber, otpCode) => {
  // Skip actual SMS sending in development mode
  if (config.env === "development" && !twilioClient) {
    console.log(`[DEV MODE] OTP for ${phoneNumber}: ${otpCode}`);
    return true;
  }

  try {
    if (!twilioClient) {
      throw new Error("Twilio credentials not provided");
    }

    // Format Indian phone numbers (add +91 prefix if not already present)
    const formattedNumber = phoneNumber.startsWith("+")
      ? phoneNumber
      : `+91${phoneNumber}`; // Use India country code

    // Make sure we have a valid Twilio 'from' number
    if (!config.twilioPhoneNumber) {
      console.log(
        `[DEV MODE] Using development flow since no Twilio phone number is configured`,
      );
      console.log(`[DEV MODE] OTP for ${formattedNumber}: ${otpCode}`);
      return true;
    }

    await twilioClient.messages.create({
      body: `Your Crown Cuisine verification code is: ${otpCode}. It will expire in 10 minutes.`,
      from: config.twilioPhoneNumber, // This must be YOUR Twilio number, not the user's
      to: formattedNumber,
    });

    return true;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
};

/**
 * Verify an OTP code for a phone number
 * @param {string} phoneNumber - The phone number to verify
 * @param {string} otpCode - The OTP code to verify
 * @returns {boolean} - Whether the OTP is valid
 */
exports.verifyOTP = async (phoneNumber, otpCode) => {
  console.log(`🔄 verifyOTP called for phone: ${phoneNumber}, otp: ${otpCode}`);
  try {
    // Find the OTP record for this phone number
    console.log(`🔍 Finding OTP record for phone: ${phoneNumber}`);
    const otpRecord = await OTP.findOne({ phoneNumber });

    if (!otpRecord) {
      console.log(`❌ No OTP found for phone: ${phoneNumber}`);
      throw new Error("No OTP found for this phone number");
    }

    console.log(
      `✅ OTP record found: ${JSON.stringify({
        id: otpRecord._id,
        phoneNumber: otpRecord.phoneNumber,
        otp: otpRecord.otp,
        createdAt: otpRecord.createdAt,
      })}`,
    );

    // Check if OTP matches and is still valid
    if (otpRecord.otp !== otpCode) {
      console.log(`❌ OTP mismatch: expected ${otpRecord.otp}, got ${otpCode}`);
      throw new Error("Invalid OTP code");
    }

    if (!otpRecord.isValid()) {
      console.log(`❌ OTP expired`);
      throw new Error("OTP has expired");
    }

    // Delete the OTP record after successful verification
    console.log(`🗑️ Deleting OTP record after verification`);
    await OTP.deleteOne({ _id: otpRecord._id });
    console.log(`✅ OTP verified successfully`);

    return true;
  } catch (error) {
    console.error(`❌ Error in verifyOTP: ${error.message}`);
    throw error;
  }
};

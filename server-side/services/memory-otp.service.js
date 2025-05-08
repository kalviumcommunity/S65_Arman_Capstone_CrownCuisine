/**
 * In-memory OTP service for testing without MongoDB
 * This can be used when MongoDB is not available
 */

const otpStorage = new Map(); // In-memory storage for OTPs
const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes in milliseconds

console.log("📂 Loading IN-MEMORY OTP service (for testing without MongoDB)");

/**
 * Generate and store a new OTP for a phone number
 * @param {string} phoneNumber - The phone number to send OTP to
 * @returns {string} - The generated OTP code
 */
exports.generateOTP = async (phoneNumber) => {
  console.log(`🔄 [MEMORY] generateOTP called for phone: ${phoneNumber}`);

  try {
    // Generate a new OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`🎲 [MEMORY] Generated OTP: ${otpCode}`);

    // Store in memory
    otpStorage.set(phoneNumber, {
      otp: otpCode,
      createdAt: new Date(),
    });

    console.log(`💾 [MEMORY] OTP stored for ${phoneNumber}: ${otpCode}`);
    console.log(`📊 Current OTP storage has ${otpStorage.size} entries`);

    return otpCode;
  } catch (error) {
    console.error(`❌ [MEMORY] Error in generateOTP: ${error.message}`);
    throw new Error(`Error generating OTP: ${error.message}`);
  }
};

/**
 * Send OTP via SMS (mock implementation)
 * @param {string} phoneNumber - The phone number to send OTP to
 * @param {string} otpCode - The OTP code to send
 * @returns {boolean} - Whether the SMS was sent successfully
 */
exports.sendOTPviaSMS = async (phoneNumber, otpCode) => {
  // Always log the OTP for testing
  console.log(
    `📱 [MEMORY] MOCK SMS to ${phoneNumber}: Your verification code is ${otpCode}`,
  );
  return true;
};

/**
 * Verify an OTP code for a phone number
 * @param {string} phoneNumber - The phone number to verify
 * @param {string} otpCode - The OTP code to verify
 * @returns {boolean} - Whether the OTP is valid
 */
exports.verifyOTP = async (phoneNumber, otpCode) => {
  console.log(
    `🔄 [MEMORY] verifyOTP called for phone: ${phoneNumber}, otp: ${otpCode}`,
  );

  try {
    const record = otpStorage.get(phoneNumber);

    if (!record) {
      console.log(`❌ [MEMORY] No OTP found for phone: ${phoneNumber}`);
      throw new Error("No OTP found for this phone number");
    }

    console.log(
      `✅ [MEMORY] OTP record found for ${phoneNumber}: ${record.otp}`,
    );

    // Check if OTP matches
    if (record.otp !== otpCode) {
      console.log(
        `❌ [MEMORY] OTP mismatch: expected ${record.otp}, got ${otpCode}`,
      );
      throw new Error("Invalid OTP code");
    }

    // Check if OTP is expired
    const now = new Date();
    const expirationTime = new Date(record.createdAt.getTime() + OTP_EXPIRY);
    if (now > expirationTime) {
      console.log(`❌ [MEMORY] OTP expired`);
      throw new Error("OTP has expired");
    }

    // Delete the OTP after verification
    otpStorage.delete(phoneNumber);
    console.log(`🗑️ [MEMORY] OTP deleted after verification`);
    console.log(`✅ [MEMORY] OTP verified successfully`);

    return true;
  } catch (error) {
    console.error(`❌ [MEMORY] Error in verifyOTP: ${error.message}`);
    throw error;
  }
};

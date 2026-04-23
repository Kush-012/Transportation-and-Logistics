const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const redisClient = require("../../config/redisconfig");

// Generate OTP
function generateOTP() {
    return otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true
    });
}

// Store OTP (Hashed) in Redis for 2 minutes
async function storeOTP(email, otp) {
    const hashedOTP = await bcrypt.hash(otp, 10);
    // Do not log OTP value for security
    await redisClient.set(`user:${email}`, hashedOTP, "EX", 120);

    console.log(`🔐 OTP stored for ${email} (valid 2 minutes)`); // No OTP value logged
}

// Get OTP
async function getStoredOTP(email) {
    return await redisClient.get(`user:${email}`);
}

// Delete OTP After Verify
async function deleteOTP(email) {
    await redisClient.del(`user:${email}`);
}

module.exports = {
    generateOTP,
    storeOTP,
    getStoredOTP,
    deleteOTP
};

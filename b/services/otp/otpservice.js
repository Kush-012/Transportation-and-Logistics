const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
// const redisClient = require("../../config/redisconfig");

// Generate OTP
function generateOTP() {
    return otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true
    });
}

// In-memory OTP store fallback
const otpStore = new Map();

// Generate OTP
function generateOTP() {
    return otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true
    });
}

// Store OTP (Hashed) in Memory for 2 minutes
async function storeOTP(email, otp) {
    const hashedOTP = await bcrypt.hash(otp, 10);
    console.log(`[DEBUG] Generated OTP for ${email}: ${otp}`);

    // Store in memory with expiration
    otpStore.set(`user:${email}`, hashedOTP);

    // Set timeout to delete after 2 minutes
    setTimeout(() => {
        if (otpStore.has(`user:${email}`)) {
            otpStore.delete(`user:${email}`);
            console.log(`[DEBUG] OTP expired for ${email}`);
        }
    }, 2 * 60 * 1000);

    console.log(`🔐 OTP stored for ${email} (valid 2 minutes)`);
}

// Get OTP
async function getStoredOTP(email) {
    return otpStore.get(`user:${email}`);
}

// Delete OTP After Verify
async function deleteOTP(email) {
    otpStore.delete(`user:${email}`);
}

module.exports = {
    generateOTP,
    storeOTP,
    getStoredOTP,
    deleteOTP
};

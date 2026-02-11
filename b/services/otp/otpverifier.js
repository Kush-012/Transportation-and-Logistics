const bcrypt = require("bcrypt");
const { getStoredOTP, deleteOTP } = require("./otpservice");

async function verifyOTP(email, enteredOTP) {
    try {
        const storedHashedOTP = await getStoredOTP(email);

        if (!storedHashedOTP) {
            return { success: false, message: "OTP expired or not found" };
        }

        const isMatch = await bcrypt.compare(enteredOTP, storedHashedOTP);

        if (!isMatch) {
            return { success: false, message: "Invalid OTP" };
        }

        await deleteOTP(email);

        return { success: true, message: "OTP verified successfully" };

    } catch (err) {
        console.error("OTP Verification Error:", err);
        return { success: false, message: "otp verify error" };
    }
}

module.exports = { verifyOTP };

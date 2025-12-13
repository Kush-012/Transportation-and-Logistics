const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { sendmail } = require("../../services/mail/sendmail");
const { verifyOTP } = require("../../services/otp/otpverifier");

// STEP 1 → SEND OTP
// STEP 2 → VERIFY OTP + RESET PASSWORD
async function resetPassword(req, res) {
  try {
    const { email, newPassword, otp } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "Email not registered" });
    }

    // 2️⃣ If OTP not provided → SEND OTP
    if (!otp) {

      await sendmail(email);
      return res.status(200).send({
        message: "OTP sent to your email. Enter OTP to reset password."
      });
    }

    // 3️⃣ Verify OTP
    const otpResult = await verifyOTP(email, otp);
    if (!otpResult.success) {
      return res.status(401).send({ message: otpResult.message });
    }

    // 4️⃣ Validate new password
    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).send({
        message:
          "Password must be 8+ chars including letter, number, and special character."
      });
    }

    // 5️⃣ Hash + Save Password
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashed });

    return res.status(200).send({ message: "Password reset successful" });

  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).send({ message: "Server error" });
  }
}

module.exports = { resetPassword };

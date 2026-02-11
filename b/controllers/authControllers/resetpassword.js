const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { sendmail } = require("../../services/mail/sendmail");
const { verifyOTP } = require("../../services/otp/otpverifier");

// STEP 1 → SEND OTP
// STEP 2 → VERIFY OTP + RESET PASSWORD

const { AppError, asyncHandler } = require("../../middlewares/errorHandler");

const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword, otp } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  // 1️⃣ Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Email not registered", 404));
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
    return next(new AppError(otpResult.message, 401));
  }

  // 4️⃣ Validate new password
  if (!newPassword) {
    return next(new AppError("New password is required", 400));
  }

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+]).{8,}$/;

  if (!passwordRegex.test(newPassword)) {
    return next(new AppError("Password must be 8+ chars including letter, number, and special character.", 400));
  }

  // 5️⃣ Hash + Save Password
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email }, { password: hashed });

  return res.status(200).send({ message: "Password reset successful" });
});

module.exports = { resetPassword };

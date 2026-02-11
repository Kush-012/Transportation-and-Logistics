const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { setUser } = require("../../services/auth/jwt");
const { sendmail } = require("../../services/mail/sendmail");
const { verifyOTP } = require("../../services/otp/otpverifier");


const { AppError, asyncHandler } = require("../../middlewares/errorHandler");

const signup = asyncHandler(async (req, res, next) => {
    const { name, email, password, otp, role } = req.body;

    if((name==="admin" && email==="admin@gmail.com") || (name==="tester" && email==="tester@gmail.com")) {
        return next(new AppError("You cannot use this name and email", 403));
    }

    // 1️⃣ Basic Validation
    if (!email) return next(new AppError("Email is required", 400));

    // Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) return next(new AppError("Email already exists", 409));

    // 2️⃣ If OTP not provided → First Step (Send OTP)
    if (!otp) {
        // Check other signup data only when sending OTP
        if (!name || !password) {
            return next(new AppError("Name & Password are required", 400));
        }

        // Password Validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return next(new AppError("Password must be at least 8 characters long and include one letter, one number, and one special character.", 400));
        }

        // ⏳ SEND OTP TO EMAIL
        await sendmail(email);
        return res.status(200).send({
            message: "OTP sent to your email. Please enter OTP to complete signup."
        });
    }

    // 3️⃣ If OTP Provided → Second Step (Verify + Signup)
    const otpResult = await verifyOTP(email, otp); // Verify OTP
    if (!otpResult.success) return next(new AppError(otpResult.message, 401));

    // Role Protection
    let finalRole = "shipper";
    if (role && (role === "admin" || role === "tester"))
        return next(new AppError("You cannot assign this role", 403));
    if (role && role !== "") finalRole = role;

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({ name, email, password: hashedPass, role: finalRole });

    // Generate Token
    const token = setUser({ name: user.name, email: user.email, role: user.role });

    return res.status(201).send({
        message: "Signup successful",
        token
    });
});

module.exports = { signup };

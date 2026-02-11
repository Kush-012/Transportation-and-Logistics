const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { setUser } = require("../../services/auth/jwt");
const { sendmail } = require("../../services/mail/sendmail");
const { verifyOTP } = require("../../services/otp/otpverifier");

async function signup(req, res) {
    try {
        const { name, email, password, otp, role } = req.body;
        
        if((name=="admin" && email=="admin@gmail.com") || (name=="tester" && email=="tester@gmail.com")) {
            return res.status(403).send({ message: "You cannot use this name and email" });
        } 

        // 1️⃣ Basic Validation
        if (!email) return res.status(400).send({ message: "Email is required" });

        // Check if user already exists
        const exists = await User.findOne({ email });
        if (exists) return res.status(409).send({ message: "Email already exists" });

        // 2️⃣ If OTP not provided → First Step (Send OTP)
        if (!otp) {

            // Check other signup data only when sending OTP
            if (!name || !password) {
                return res.status(400).send({ message: "Name & Password are required" });
            }

            // Password Validation
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+]).{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).send({
                    message: "Password must be at least 8 characters long and include one letter, one number, and one special character."
                });
            }

            // ⏳ SEND OTP TO EMAIL
            await sendmail(email);

            return res.status(200).send({
                message: "OTP sent to your email. Please enter OTP to complete signup."
            });
        }

        // 3️⃣ If OTP Provided → Second Step (Verify + Signup)
        const otpResult = await verifyOTP(email, otp); // Verify OTP
        if (!otpResult.success) return res.status(401).send({ message: otpResult.message });

        // Role Protection
        let finalRole = "shipper";
        if (role && (role === "admin" || role === "tester"))
            return res.status(403).send({ message: "You cannot assign this role" });
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

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).send({ message: "Server error" });
    }
}

module.exports = { signup };

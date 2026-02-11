const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { setUser } = require("../../services/auth/jwt");


const { AppError, asyncHandler } = require("../../middlewares/errorHandler");

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //  Check required fields
    if (!email || !password) {
        return next(new AppError("Email and Password are required", 400));
    }

    //  ADMIN LOGIN (No DB Check)
    if (email === "admin@gmail.com") {
        let token = setUser({
            name: "Admin",
            email,
            role: "admin"
        });
        return res.status(200).send({
            message: "Login successful",
            token
        });
    }

    // TESTER LOGIN (No DB Check)
    if (email === "tester@gmail.com") {
        let token = setUser({
            name: "Tester",
            email,
            role: "tester"
        });
        return res.status(200).send({
            message: "Login successful",
            token
        });
    }

    // Check normal user in DB
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new AppError("Invalid password", 401));
    }

    // Generate JWT
    const token = setUser({
        name: user.name,
        email: user.email,
        role: user.role
    });

    // Send response
    return res.status(200).send({
        message: "Login successful",
        token
    });
});

module.exports = { login };

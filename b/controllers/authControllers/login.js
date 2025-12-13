const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { setUser } = require("../../services/auth/jwt");

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // 🛑 Check required fields
        if (!email || !password) {
            return res.status(400).send({ message: "Email and Password are required" });
        }

        // 🔐 ADMIN LOGIN (No DB Check)
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

        // 🔐 TESTER LOGIN (No DB Check)
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

        // 2️⃣ Check normal user in DB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // 3️⃣ Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid password" });
        }

        // 4️⃣ Generate JWT
        const token = setUser({
            name: user.name,
            email: user.email,
            role: user.role
        });

        // 5️⃣ Send response
        return res.status(200).send({
            message: "Login successful",
            token
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).send({ message: "Server error" });
    }
}

module.exports = { login };

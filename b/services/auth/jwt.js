const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

function setUser(user) {
    let expireTime = process.env.JWT_EXPIRE || "2d";

    return jwt.sign(
        {
            email: user.email,
            role: user.role,
            name: user.name,
        },
        secret,
        { expiresIn: expireTime }
    );
}

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports = { setUser, getUser };

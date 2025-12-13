const express = require("express");
const router = express.Router();
const { resetPassword } = require("../../controllers/authControllers/resetpassword");

// NO auth → Forgot password does NOT require login
router.post("/", resetPassword);

module.exports = router;

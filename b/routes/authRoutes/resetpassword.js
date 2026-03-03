const express = require("express");
const router = express.Router();
const { resetPassword } = require("../../controllers/authControllers/resetpassword");
const validate = require("../../middlewares/validate");
const { resetPasswordSchema } = require("../../validators/authValidators");

// NO auth → Forgot password does NOT require login
router.post("/", validate(resetPasswordSchema), resetPassword);

module.exports = router;

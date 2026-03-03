const express = require("express");
const router = express.Router();
const {signup}=require("../../controllers/authControllers/signup");
const validate = require("../../middlewares/validate");
const { signupSchema } = require("../../validators/authValidators");

router.post("/", validate(signupSchema), signup);

module.exports = router;

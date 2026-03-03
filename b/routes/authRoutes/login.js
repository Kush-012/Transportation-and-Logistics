const express = require("express");
const router = express.Router();
const {login}=require("../../controllers/authControllers/login");
const validate = require("../../middlewares/validate");
const { loginSchema } = require("../../validators/authValidators");

router.post("/", validate(loginSchema), login);

module.exports = router;

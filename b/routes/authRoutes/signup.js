const express = require("express");
const router = express.Router();
const {signup}=require("../../controllers/authControllers/signup");

router.post("/",signup);

module.exports = router;

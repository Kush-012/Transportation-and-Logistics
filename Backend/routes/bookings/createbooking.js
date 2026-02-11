const express = require("express");
const router = express.Router();
const {createbooking}=require("../../controllers/bookings/createbooking");
const authmiddleware=require("../../middlewares/auth");

router.post("/", authmiddleware, createbooking);

module.exports = router;

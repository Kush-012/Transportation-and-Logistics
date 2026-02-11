const express = require("express");
const router = express.Router();
const {getbooking}=require("../../controllers/bookings/getbooking");
const authmiddleware=require("../../middlewares/auth");
router.get("/",authmiddleware, getbooking);

module.exports = router;

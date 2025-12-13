const express = require("express");
const router = express.Router();
const {updatebooking}=require("../../controllers/bookings/updatebooking");
const authmiddleware=require("../../middlewares/auth");
router.post("/:bookingid", authmiddleware, updatebooking);

module.exports = router;

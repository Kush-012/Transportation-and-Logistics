const express = require("express");
const router = express.Router();
const { createbooking } = require("../../controllers/bookings/createbooking");

const authmiddleware = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/userRole");
const validate = require("../../middlewares/validate");
const { createBookingSchema } = require("../../validators/bookingValidators");

router.post(
  "/",
  authmiddleware,
  authorizeRoles("shipper"),
  validate(createBookingSchema),
  createbooking
);

// Backward compatibility: POST /createbooking
router.post("/createbooking", authmiddleware, validate(createBookingSchema), createbooking);

module.exports = router;

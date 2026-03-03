const express = require("express");
const router = express.Router();
const { updatebooking } = require("../../controllers/bookings/updatebooking");

const authmiddleware = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/userRole");
const validate = require("../../middlewares/validate");
const { updateBookingSchema } = require("../../validators/bookingValidators");

router.put(
  "/:id",
  authmiddleware,
  authorizeRoles("shipper"),
  validate(updateBookingSchema),
  updatebooking
);

module.exports = router;

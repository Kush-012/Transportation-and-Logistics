const Booking = require("../../models/bookings");


const { AppError, asyncHandler } = require("../../middlewares/errorHandler");

const getbooking = asyncHandler(async (req, res, next) => {
  const email = req.email;
  const role = req.role;

  if (role === "shipper" && email) {
    const data = await Booking.find({ shipperEmail: email }).select(
      "bookingid vehicleNo totalFare status pickupLocation dropLocation createdAt"
    );
    return res.status(200).json(data);
  }

  if (role === "driver" && email) {
    const data = await Booking.find({ driverEmail: email }).select(
      "bookingid vehicleNo totalFare status pickupLocation dropLocation createdAt"
    );
    return res.status(200).json(data);
  }

  // Admin - see all data (with bookingid)
  const data = await Booking.find().select("bookingid vehicleNo totalFare status pickupLocation dropLocation createdAt");
  return res.status(200).json(data);
});

module.exports = { getbooking };

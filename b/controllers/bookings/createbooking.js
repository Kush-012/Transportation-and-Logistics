const Booking = require("../../models/bookings");

async function createbooking(req, res) {
  try {
    const {
      shipperEmail,
      driverEmail,
      vehicleNo,
      pickupLocation,
      dropLocation,
      distanceInKm,
      totalFare
    } = req.body;

    if (
      !shipperEmail ||
      !driverEmail ||
      !vehicleNo ||
      !pickupLocation ||
      !dropLocation ||
      !distanceInKm ||
      !totalFare
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await Booking.create({
      shipperEmail,
      driverEmail,
      vehicleNo,
      pickupLocation,
      dropLocation,
      distanceInKm,
      totalFare,
    });

    // Send only bookingId in response
    return res.status(201).json({
      message: "Booking created successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {createbooking};

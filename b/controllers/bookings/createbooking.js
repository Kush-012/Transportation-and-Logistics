const Booking = require("../../models/bookings");

const BASE_FARE = 50;      // ₹50 minimum fare
const RATE_PER_KM = 10;   // example rate per km (adjust if needed)

async function createbooking(req, res) {
  try {
    const {
      shipperEmail,
      driverEmail,
      vehicleNo,
      pickupLocation,
      dropLocation,
      distanceInKm
    } = req.body;

    // Basic required field validation
    if (
      !shipperEmail ||
      !driverEmail ||
      !vehicleNo ||
      !pickupLocation ||
      !dropLocation
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Distance validation
    if (distanceInKm === undefined || distanceInKm === null || isNaN(distanceInKm)) {
      return res.status(422).json({
        message: "Distance is missing or invalid. Cannot calculate fare."
      });
    }

    // Fare calculation
    let totalFare;
    if (Number(distanceInKm) === 0) {
      totalFare = BASE_FARE;
    } else {
      totalFare = Number(distanceInKm) * RATE_PER_KM;
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

    return res.status(201).json({
      message: "Booking created successfully",
      bookingId: booking._id,
      totalFare
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}

module.exports = { createbooking };

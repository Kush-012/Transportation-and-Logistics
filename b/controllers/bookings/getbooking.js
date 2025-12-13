const Booking = require("../../models/bookings");

async function getbooking(req, res) {
  try {
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

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { getbooking };

const Booking = require("../../models/bookings");

async function getbooking(req, res) {
  try {
    const email = req.email;
    const role = req.role;

    // 🔹 Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive numbers",
      });
    }

    const skip = (page - 1) * limit;

    // 🔹 Base Filter (Role Based)
    let filter = {};

    if (role === "shipper" && email) {
      filter.shipperEmail = email;
    } else if (role === "driver" && email) {
      filter.driverEmail = email;
    }

    // 🔹 Extra Filters (Optional Query Params)
    const { status, driver_email } = req.query;

    if (status) filter.status = status;
    if (driver_email && role === "admin") {
      filter.driverEmail = driver_email;
    }

    // 🔹 Query
    const data = await Booking.find(filter)
      .select("bookingid vehicleNo totalFare status pickupLocation dropLocation createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = { getbooking };

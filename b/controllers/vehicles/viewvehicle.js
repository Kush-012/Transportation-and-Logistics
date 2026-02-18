const Vehicle = require("../../models/vehicle");

async function viewVehicles(req, res) {
  try {
    // 🔹 Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive numbers",
      });
    }

    const skip = (page - 1) * limit;

    // 🔹 Filters
    const { status, vehicle_type } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (vehicle_type) filter.vehicle_type = vehicle_type;

    // 🔹 Query with filters + pagination + sorting
    const vehicles = await Vehicle.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Vehicle.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Vehicles fetched successfully",
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: vehicles,
    });

  } catch (err) {
    console.error("View Vehicles Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

module.exports = { viewVehicles };

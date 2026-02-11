const Vehicle = require("../../models/vehicle");


async function viewVehicles(req, res) {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });

    if (vehicles.length === 0) {
      return res.status(404).json({ message: "No vehicles found" });
    }

    return res.status(200).json({
      message: "Vehicles fetched successfully",
      vehicles,
    });
  } catch (err) {
    console.error("View Vehicles Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { viewVehicles };

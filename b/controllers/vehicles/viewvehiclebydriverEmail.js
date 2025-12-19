const Vehicle = require("../../models/vehicle");

async function viewvehiclebydriverEmail(req, res) {
  try {
    const { driverEmail } = req.params; 

    if (!driverEmail) {
      return res.status(400).json({ message: "Driver email is required" });
    }

    // Fetch vehicles for this driver
    const vehicles = await Vehicle.find({ driverEmail }).sort({ createdAt: -1 });

    if (vehicles.length === 0) {
      return res.status(404).json({ message: "No vehicles found for this driver" });
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

module.exports = { viewvehiclebydriverEmail };

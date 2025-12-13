const Vehicle = require("../../models/vehicle");

// DELETE /api/vehicles/:vehicleNumber
async function deleteVehicleByNumber(req, res) {
  try {
    const { vehicleNumber } = req.params;
    const driverEmail = req.email; // coming from auth middleware

    if (!vehicleNumber) {
      return res.status(400).json({ message: "Vehicle number is required" });
    }

    // Convert to uppercase because schema stores uppercase
    const normalizedNumber = vehicleNumber.toUpperCase();

    const deletedVehicle = await Vehicle.findOneAndDelete({
      vehicleNumber: normalizedNumber,
      driverEmail,
    });

    if (!deletedVehicle) {
      return res.status(404).json({
        message: "Vehicle not found or not owned by this driver",
      });
    }

    return res.status(200).json({
      message: "Vehicle deleted successfully",
      vehicleNumber: normalizedNumber,
    });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = { deleteVehicleByNumber };

const Vehicle = require("../../models/vehicle");
const {
  normalizeVehicleNumber,
  isValidIndianVehicleNumber,
} = require("../../utils/vehicleNumberValidation");


async function deleteVehicleByNumber(req, res) {
  try {
    const { vehicleNumber } = req.params;
    const driverEmail = req.email; 

    if (!vehicleNumber) {
      return res.status(400).json({ message: "Vehicle number is required" });
    }

    
    const normalizedNumber = normalizeVehicleNumber(vehicleNumber);

    if (!isValidIndianVehicleNumber(normalizedNumber)) {
      return res.status(400).json({
        message: "Invalid vehicle registration number format. Expected format like MH12AB1234",
      });
    }

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

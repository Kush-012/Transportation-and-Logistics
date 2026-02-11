
const Vehicle = require("../../models/vehicle");


async function updateVehicleByNumber(req, res) {
  try {
    let { vehicleNumber } = req.params;
    const driverEmail = req.email; 

    if (!vehicleNumber) {
      return res.status(400).json({ message: "Vehicle number is required" });
    }

  
    const normalizedNumber = vehicleNumber.trim().toUpperCase();

    
    const { location, vehicleType, capacityInKg, pricePerKm, isAvailable } = req.body;

    const updateData = {};
    if (location !== undefined) updateData.location = location.trim();
    if (vehicleType !== undefined) updateData.vehicleType = vehicleType;
    if (capacityInKg !== undefined) updateData.capacityInKg = capacityInKg;
    if (pricePerKm !== undefined) updateData.pricePerKm = pricePerKm;
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable;

    
    const updatedVehicle = await Vehicle.findOneAndUpdate(
      {
        $expr: {
          $and: [
            { $eq: [{ $trim: { input: "$vehicleNumber" } }, normalizedNumber] },
            { $eq: ["$driverEmail", driverEmail] }
          ]
        }
      },
      { $set: updateData },
      { new: true }
    );

    if (!updatedVehicle) {
      return res
        .status(404)
        .json({ message: "Vehicle not found or not owned by this driver" });
    }

    return res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });

  } catch (err) {
    console.error("Error updating vehicle:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = { updateVehicleByNumber };

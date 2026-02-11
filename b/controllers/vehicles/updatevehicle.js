
const Vehicle = require("../../models/vehicle");

/**
 * Validate price per kilometer for updates
 * @param {any} pricePerKm - Price per kilometer
 * @returns {Object} - {valid: boolean, error: string|null, value: number|null}
 */
function validatePricePerKm(pricePerKm) {
  // Convert to number if string
  const numPrice = typeof pricePerKm === 'string' ? parseFloat(pricePerKm) : pricePerKm;

  // Check if valid number
  if (isNaN(numPrice)) {
    return { valid: false, error: "Price per km must be a valid number", value: null };
  }

  // Check if positive
  if (numPrice <= 0) {
    return { valid: false, error: "Price per km must be greater than 0", value: null };
  }

  return { valid: true, error: null, value: numPrice };
}

/**
 * Validate vehicle capacity for updates
 * @param {any} capacity - Capacity in kg
 * @returns {Object} - {valid: boolean, error: string|null, value: number|null}
 */
function validateCapacity(capacity) {
  // Convert to number if string
  const numCapacity = typeof capacity === 'string' ? parseFloat(capacity) : capacity;

  // Check if valid number
  if (isNaN(numCapacity)) {
    return { valid: false, error: "Vehicle capacity must be a valid number", value: null };
  }

  // Check if positive
  if (numCapacity <= 0) {
    return { valid: false, error: "Vehicle capacity must be greater than 0 kg", value: null };
  }

  return { valid: true, error: null, value: numCapacity };
}

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

    // Validate capacity if provided
    if (capacityInKg !== undefined) {
      const capacityValidation = validateCapacity(capacityInKg);
      if (!capacityValidation.valid) {
        return res.status(400).json({ message: capacityValidation.error });
      }
      updateData.capacityInKg = capacityValidation.value;
    }

    // Validate price per km if provided
    if (pricePerKm !== undefined) {
      const priceValidation = validatePricePerKm(pricePerKm);
      if (!priceValidation.valid) {
        return res.status(400).json({ message: priceValidation.error });
      }
      updateData.pricePerKm = priceValidation.value;
    }

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

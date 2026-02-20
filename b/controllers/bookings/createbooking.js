const Booking = require("../../models/bookings");

async function createbooking(req, res) {
  try {
    const {
      shipperEmail,
      driverEmail,
      vehicleNo,
      pickupLocation,
      dropLocation,
      distanceInKm,
      totalFare
    } = req.body;

    // Validate required non-numeric fields with trimming to avoid blank-space inputs.
    const requiredTextFields = {
      shipperEmail,
      driverEmail,
      vehicleNo,
      pickupLocation,
      dropLocation,
    };

    const missingTextField = Object.entries(requiredTextFields).find(
      ([, value]) => typeof value !== "string" || value.trim() === ""
    );

    if (missingTextField) {
      return res.status(400).json({
        message: "Validation failed",
        errors: [
          {
            field: missingTextField[0],
            message: `${missingTextField[0]} is required`,
          },
        ],
      });
    }

    // Validate mandatory numeric fields (must be finite and >= 0).
    const numericFields = {
      distanceInKm,
      totalFare,
      // Future-proof optional numeric fields if provided by clients.
      quantity: req.body?.quantity,
      weight: req.body?.weight,
      fare: req.body?.fare,
      distance: req.body?.distance,
    };

    const numericValidationErrors = [];

    Object.entries(numericFields).forEach(([field, value]) => {
      if (value === undefined || value === null || value === "") {
        if (field === "distanceInKm" || field === "totalFare") {
          numericValidationErrors.push({
            field,
            message: `${field} is required`,
          });
        }
        return;
      }

      const normalized = typeof value === "string" ? value.trim() : value;
      const numericValue = Number(normalized);

      if (!Number.isFinite(numericValue)) {
        numericValidationErrors.push({
          field,
          message: `${field} must be a valid number`,
        });
        return;
      }

      if (numericValue < 0) {
        numericValidationErrors.push({
          field,
          message: `${field} cannot be negative`,
        });
      }
    });

    if (numericValidationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: numericValidationErrors,
      });
    }

    // Store normalized numeric values to avoid implicit DB casting surprises.
    const normalizedDistanceInKm = Number(distanceInKm);
    const normalizedTotalFare = Number(totalFare);

    await Booking.create({
      shipperEmail,
      driverEmail,
      vehicleNo,
      pickupLocation,
      dropLocation,
      distanceInKm: normalizedDistanceInKm,
      totalFare: normalizedTotalFare,
    });

    // Keep existing API success response structure.
    return res.status(201).json({
      message: "Booking created successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {createbooking};

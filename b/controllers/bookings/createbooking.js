const Booking = require("../../models/bookings");

/**
 * Validate distance value for fare calculation
 * @param {any} distance - Distance in kilometers
 * @returns {Object} - {valid: boolean, error: string|null, value: number|null}
 */
function validateDistance(distance) {
  // Check if it's null or undefined
  if (distance === null || distance === undefined) {
    return { valid: false, error: "Distance is required", value: null };
  }

  // Convert to number if it's a string
  const numDistance = typeof distance === 'string' ? parseFloat(distance) : distance;

  // Check if it's a valid number
  if (isNaN(numDistance)) {
    return { valid: false, error: "Distance must be a valid number", value: null };
  }

  // Check if it's positive and greater than 0
  if (numDistance <= 0) {
    return { valid: false, error: "Distance must be greater than 0 km", value: null };
  }

  return { valid: true, error: null, value: numDistance };
}

/**
 * Validate fare value
 * @param {any} fare - Total fare amount
 * @returns {Object} - {valid: boolean, error: string|null, value: number|null}
 */
function validateFare(fare) {
  // Check if it's null or undefined
  if (fare === null || fare === undefined) {
    return { valid: false, error: "Fare is required", value: null };
  }

  // Convert to number if it's a string
  const numFare = typeof fare === 'string' ? parseFloat(fare) : fare;

  // Check if it's a valid number
  if (isNaN(numFare)) {
    return { valid: false, error: "Fare must be a valid number", value: null };
  }

  // Check if it's non-negative
  if (numFare < 0) {
    return { valid: false, error: "Fare cannot be negative", value: null };
  }

  return { valid: true, error: null, value: numFare };
}

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

    // Validate required fields
    if (
      !shipperEmail ||
      !driverEmail ||
      !vehicleNo ||
      !pickupLocation ||
      !dropLocation
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate distance
    const distanceValidation = validateDistance(distanceInKm);
    if (!distanceValidation.valid) {
      return res.status(400).json({ message: distanceValidation.error });
    }

    // Validate fare
    const fareValidation = validateFare(totalFare);
    if (!fareValidation.valid) {
      return res.status(400).json({ message: fareValidation.error });
    }

    // Create booking with validated numeric values
    const booking = await Booking.create({
      shipperEmail,
      driverEmail,
      vehicleNo,
      pickupLocation,
      dropLocation,
      distanceInKm: distanceValidation.value,
      totalFare: fareValidation.value,
    });

    // Send success response
    return res.status(201).json({
      message: "Booking created successfully",
    });

  } catch (error) {
    console.error("Booking creation error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = { createbooking };

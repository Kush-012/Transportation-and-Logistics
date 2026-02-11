const Vehicle = require("../../models/vehicle");
const cloudinary = require("../../config/cloudinaryconfig");
const stream = require("stream");

/**
 * Validate price per kilometer
 * @param {any} pricePerKm - Price per kilometer
 * @returns {Object} - {valid: boolean, error: string|null, value: number|null}
 */
function validatePricePerKm(pricePerKm) {
  // Check if null or undefined
  if (pricePerKm === null || pricePerKm === undefined) {
    return { valid: false, error: "Price per km is required", value: null };
  }

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
 * Validate vehicle capacity
 * @param {any} capacity - Capacity in kg
 * @returns {Object} - {valid: boolean, error: string|null, value: number|null}
 */
function validateCapacity(capacity) {
  // Check if null or undefined
  if (capacity === null || capacity === undefined) {
    return { valid: false, error: "Vehicle capacity is required", value: null };
  }

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


const { AppError, asyncHandler } = require("../../middlewares/errorHandler");

const addvehicle = asyncHandler(async (req, res, next) => {
  // 💠 Role check (only Drivers)
  if (req.role !== "driver") {
    return next(new AppError("Access Denied! Only Drivers can add vehicles.", 403));
  }

  const driverEmail = req.email;
  const driverName = req.name;
  const { vehicleType, vehicleNumber, capacityInKg, pricePerKm, location } = req.body;

  // Validate required fields
  if (!vehicleType || !vehicleNumber || !location) {
    return next(new AppError("Vehicle type, number, and location are required!", 400));
  }

  // Validate capacity
  const capacityValidation = validateCapacity(capacityInKg);
  if (!capacityValidation.valid) {
    return next(new AppError(capacityValidation.error, 400));
  }

  // Validate price per km
  const priceValidation = validatePricePerKm(pricePerKm);
  if (!priceValidation.valid) {
    return next(new AppError(priceValidation.error, 400));
  }

  // Upload images to Cloudinary (Memory Buffer)
  let imageUrls = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      const uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "VehicleImages" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        bufferStream.pipe(uploadStream);
      });

      imageUrls.push(uploadedImage.secure_url);
    }
  }

  // 📝 Save vehicle in DB with validated values
  const vehicle = await Vehicle.create({
    driverName,
    driverEmail,
    location: location.trim(),
    vehicleType,
    vehicleNumber: vehicleNumber.trim().toUpperCase(),
    capacityInKg: capacityValidation.value,
    pricePerKm: priceValidation.value,
    isAvailable: true,
    images: imageUrls,
  });

  return res.status(201).json({
    message: "Vehicle added successfully",
    vehicle,
  });
});

module.exports = { addvehicle };

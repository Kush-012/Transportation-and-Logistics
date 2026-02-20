const Vehicle = require("../../models/vehicle");
const cloudinary = require("../../config/cloudinaryconfig");
const stream = require("stream"); 
const {
  normalizeVehicleNumber,
  isValidIndianVehicleNumber,
} = require("../../utils/vehicleNumberValidation");

async function addvehicle(req, res) {
  try {
    // 💠 Role check (only Drivers)
    if (req.role !== "driver") {
      return res.status(403).json({
        message: "Access Denied! Only Drivers can add vehicles.",
      });
    } 

    const driverEmail = req.email; 
    const driverName = req.name;
    const { vehicleType, vehicleNumber, capacityInKg, pricePerKm,location } = req.body;

  
    if (!vehicleType || !vehicleNumber || !capacityInKg || !pricePerKm || !location) {
      return res.status(400).json({ message: "All fields are required!" });
    } 

    const normalizedVehicleNumber = normalizeVehicleNumber(vehicleNumber);

    if (!isValidIndianVehicleNumber(normalizedVehicleNumber)) {
      return res.status(400).json({
        message: "Invalid vehicle registration number format. Expected format like MH12AB1234",
      });
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

    // 📝 Save vehicle in DB
    const vehicle = await Vehicle.create({
      driverName,
      driverEmail,
      location,
      vehicleType,
      vehicleNumber: normalizedVehicleNumber,
      capacityInKg,
      pricePerKm,
      isAvailable: true,
      images: imageUrls,
    });

    return res.status(201).json({
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (err) {
    console.error("Add Vehicle Error:", err);
    return res.status(500).json({ message: "Server Error!" });
  }
}

module.exports = { addvehicle };

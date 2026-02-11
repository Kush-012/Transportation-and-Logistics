const Vehicle = require("../../models/vehicle");



const { AppError, asyncHandler } = require("../../middlewares/errorHandler");

const viewVehicles = asyncHandler(async (req, res, next) => {
  const vehicles = await Vehicle.find().sort({ createdAt: -1 });

  if (vehicles.length === 0) {
    return next(new AppError("No vehicles found", 404));
  }

  return res.status(200).json({
    message: "Vehicles fetched successfully",
    vehicles,
  });
});

module.exports = { viewVehicles };

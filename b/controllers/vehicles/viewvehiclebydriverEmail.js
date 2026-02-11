const Vehicle = require("../../models/vehicle");


const { AppError, asyncHandler } = require("../../middlewares/errorHandler");

const viewvehiclebydriverEmail = asyncHandler(async (req, res, next) => {
  const { driverEmail } = req.params;

  if (!driverEmail) {
    return next(new AppError("Driver email is required", 400));
  }

  // Fetch vehicles for this driver
  const vehicles = await Vehicle.find({ driverEmail }).sort({ createdAt: -1 });

  if (vehicles.length === 0) {
    return next(new AppError("No vehicles found for this driver", 404));
  }

  return res.status(200).json({
    message: "Vehicles fetched successfully",
    vehicles,
  });
});

module.exports = { viewvehiclebydriverEmail };

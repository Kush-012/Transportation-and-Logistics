const Vehicle = require("../../models/vehicle");



const { AppError, asyncHandler } = require("../../middlewares/errorHandler");

const deleteVehicleByNumber = asyncHandler(async (req, res, next) => {
  const { vehicleNumber } = req.params;
  const driverEmail = req.email;

  if (!vehicleNumber) {
    return next(new AppError("Vehicle number is required", 400));
  }

  const normalizedNumber = vehicleNumber.toUpperCase();

  const deletedVehicle = await Vehicle.findOneAndDelete({
    vehicleNumber: normalizedNumber,
    driverEmail,
  });

  if (!deletedVehicle) {
    return next(new AppError("Vehicle not found or not owned by this driver", 404));
  }

  return res.status(200).json({
    message: "Vehicle deleted successfully",
    vehicleNumber: normalizedNumber,
  });
});

module.exports = { deleteVehicleByNumber };

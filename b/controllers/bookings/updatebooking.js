const Booking = require("../../models/bookings");


const { AppError, asyncHandler } = require("../../middlewares/errorHandler");

const updatebooking = asyncHandler(async (req, res, next) => {
  const { bookingid } = req.params;
  const { status } = req.body;

  const userEmail = req.email;
  const userRole = req.role;

  if (!bookingid) {
    return next(new AppError("Booking ID required", 400));
  }

  // Access control
  const filter = {
    bookingid,
    ...(userRole === "driver" && { driverEmail: userEmail }),
    ...(userRole === "shipper" && { shipperEmail: userEmail }),
  };

  const booking = await Booking.findOne(filter);
  if (!booking) {
    return next(new AppError("Booking not found or unauthorized", 404));
  }

  // SHIPPER → PAY
  if (status === "Paid") {
    if (userRole !== "shipper") {
      return next(new AppError("Only shipper can make payment", 403));
    }
    if (booking.status !== "Pending") {
      return next(new AppError("Payment allowed only when booking is Pending", 400));
    }
    booking.paidAt = new Date();
  }

  // DRIVER → ACCEPT BOOKING
  if (status === "Accepted") {
    if (userRole !== "driver") {
      return next(new AppError("Only driver can accept booking", 403));
    }
    if (booking.status !== "Paid") {
      return next(new AppError("Booking must be Paid before accepting", 400));
    }
    booking.acceptedAt = new Date();
  }

  // SHIPPER → CANCEL BOOKING
  if (status === "Cancelled") {
    // Only shipper can cancel
    if (userRole !== "shipper") {
      return next(new AppError("Only shipper can cancel booking", 403));
    }
    // Cannot cancel after trip starts
    if (["Ongoing", "Completed"].includes(booking.status)) {
      return next(new AppError("Cannot cancel after trip has started", 400));
    }
    await Booking.deleteOne({ bookingid });
    return res.status(200).json({
      message: "Booking cancelled successfully"
    });
  }

  // DRIVER → START TRIP
  if (status === "Ongoing") {
    if (userRole !== "driver") {
      return next(new AppError("Only driver can start trip", 403));
    }
    if (booking.status !== "Accepted") {
      return next(new AppError("Trip can start only when booking is Accepted", 400));
    }
    booking.startedAt = new Date();
  }

  // DRIVER → COMPLETE TRIP
  if (status === "Completed") {
    if (userRole !== "driver") {
      return next(new AppError("Only driver can complete trip", 403));
    }
    if (booking.status !== "Ongoing") {
      return next(new AppError("Trip must be Ongoing before completion", 400));
    }
    booking.completedAt = new Date();
  }

  // APPLY UPDATE
  booking.status = status;
  await booking.save();

  return res.status(200).json({
    message: `Booking updated → ${status}`,
    updatedBooking: booking,
  });
});

module.exports = { updatebooking };

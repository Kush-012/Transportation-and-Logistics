const Booking = require("../../models/bookings");

async function updatebooking(req, res) {
  try {
    const { bookingid } = req.params;
    const { status } = req.body;

    const userEmail = req.email;
    const userRole = req.role;

    if (!bookingid) {
      return res.status(400).json({ message: "Booking ID required" });
    }

    // Access control
    const filter = {
      bookingid,
      ...(userRole === "driver" && { driverEmail: userEmail }),
      ...(userRole === "shipper" && { shipperEmail: userEmail }),
    };

    const booking = await Booking.findOne(filter);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found or unauthorized",
      });
    }

    

    // SHIPPER → PAY
    if (status === "Paid") {
      if (userRole !== "shipper") {
        return res.status(403).json({ message: "Only shipper can make payment" });
      }
      if (booking.status !== "Pending") {
        return res.status(400).json({ message: "Payment allowed only when booking is Pending" });
      }
      booking.paidAt = new Date();
    }

    // DRIVER → ACCEPT BOOKING
    if (status === "Accepted") {
      if (userRole !== "driver") {
        return res.status(403).json({ message: "Only driver can accept booking" });
      }
      if (booking.status !== "Paid") {
        return res.status(400).json({ message: "Booking must be Paid before accepting" });
      }
      booking.acceptedAt = new Date();
    }

    // SHIPPER → CANCEL BOOKING
if (status === "Cancelled") {

  // Only shipper can cancel
  if (userRole !== "shipper") {
    return res.status(403).json({ message: "Only shipper can cancel booking" });
  }

  // Cannot cancel after trip starts
  if (["Ongoing", "Completed"].includes(booking.status)) {
    return res.status(400).json({ message: "Cannot cancel after trip has started" });
  }

  
  await Booking.deleteOne({ bookingid });

  return res.status(200).json({
    message: "Booking cancelled successfully"
  });
}


    // DRIVER → START TRIP
    if (status === "Ongoing") {
      if (userRole !== "driver") {
        return res.status(403).json({ message: "Only driver can start trip" });
      }
      if (booking.status !== "Accepted") {
        return res.status(400).json({ message: "Trip can start only when booking is Accepted" });
      }
      booking.startedAt = new Date();
    }

    // DRIVER → COMPLETE TRIP
    if (status === "Completed") {
      if (userRole !== "driver") {
        return res.status(403).json({ message: "Only driver can complete trip" });
      }
      if (booking.status !== "Ongoing") {
        return res.status(400).json({ message: "Trip must be Ongoing before completion" });
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
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = { updatebooking };

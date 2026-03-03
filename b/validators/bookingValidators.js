const { z } = require("zod");

const createBookingSchema = z.object({
  shipperEmail: z.string().email("Invalid Shipper Email"),
  driverEmail: z.string().email("Invalid Driver Email"),
  vehicleNo: z.string().min(1, "Vehicle Number is required"),
  pickupLocation: z.string().min(1, "Pickup Location is required"),
  dropLocation: z.string().min(1, "Drop Location is required"),
  distanceInKm: z.number().gt(0, "Distance must be greater than zero"),
  totalFare: z.number().gt(0, "Total Fare must be greater than zero"),
});

const updateBookingSchema = z.object({
  status: z.enum(["Pending", "Accepted", "Completed", "Cancelled", "Paid"], "Invalid Status"),
  bookingid: z.string().uuid("Invalid Booking ID").optional(), // Sometimes UUID, sometimes string.
  // The existing code uses bookingid from URL params, checking if it exists.
  // The body might contain status only.
});

module.exports = {
  createBookingSchema,
  updateBookingSchema,
};

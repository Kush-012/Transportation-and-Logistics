const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingid: {
      type: String,
      unique: true,
      default:null
    },

    shipperEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    driverEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    vehicleNo: {
      type: String,
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
      trim: true,
    },

    dropLocation: {
      type: String,
      required: true,
      trim: true,
    },

    distanceInKm: {
      type: Number,
      required: true,
      min: [0.1, "Distance must be greater than 0"],
    },

    totalFare: {
      type: Number,
      required: true,
      min: [0, "Fare cannot be negative"],
    },

    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled", "Accepted","Ongoing","Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

bookingSchema.pre("save", function () {
  if (!this.bookingid) {
    this.bookingid = "BK" + Date.now();
  }
});



module.exports = mongoose.model("Booking", bookingSchema);

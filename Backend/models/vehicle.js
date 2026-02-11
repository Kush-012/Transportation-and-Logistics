const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        driverEmail: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        driverName: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        vehicleType: {
            type: String,
            enum: [
                "Truck",
                "Lorry",
                "E-Rickshaw",
                "Van",
                "Tractor Trailer",
                "Cargo Bike",
            ],
            required: true,
        },

        vehicleNumber: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },

        capacityInKg: {
            type: Number,
            required: true,
        },

        pricePerKm: {
            type: Number,
            required: true,
            min: 1,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },

        images: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);

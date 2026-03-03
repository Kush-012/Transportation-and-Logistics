const { z } = require("zod");
const { 
  isValidIndianVehicleNumber, 
  normalizeVehicleNumber 
} = require("../utils/vehicleNumberValidation");

const addVehicleSchema = z.object({
  vehicleType: z.string().min(1, "Vehicle Type is required"),
  vehicleNumber: z.string()
    .transform((val) => normalizeVehicleNumber(val))
    .refine((val) => isValidIndianVehicleNumber(val), {
      message: "Invalid vehicle registration number format. Expected format like MH12AB1234",
    }),
  capacityInKg: z.number().min(0, "Capacity must be positive").or(z.string().transform(Number)), // Sometimes form-data sends strings
  pricePerKm: z.number().min(0, "Price must be positive").or(z.string().transform(Number)),
  location: z.string().min(1, "Location is required"),
});

const updateVehicleSchema = z.object({
  location: z.string().optional(),
  vehicleType: z.string().optional(),
  capacityInKg: z.number().min(0).optional(),
  pricePerKm: z.number().min(0).optional(),
  isAvailable: z.boolean().optional(),
});

module.exports = {
  addVehicleSchema,
  updateVehicleSchema,
};

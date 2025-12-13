const express = require("express");
const router = express.Router();
const { deleteVehicleByNumber } = require("../../controllers/vehicles/deletevehicle");
const authMiddleware = require("../../middlewares/auth");

// Delete by vehicle number
router.delete("/:vehicleNumber", authMiddleware, deleteVehicleByNumber);

module.exports = router;


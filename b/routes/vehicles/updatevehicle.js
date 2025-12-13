const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/multer");
const { updateVehicleByNumber } = require("../../controllers/vehicles/updatevehicle");
const authMiddleware = require("../../middlewares/auth");

// Update vehicle with optional image upload
router.put("/:vehicleNumber", authMiddleware, upload.single("image"), updateVehicleByNumber);

module.exports = router;

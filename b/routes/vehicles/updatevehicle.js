const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/multer");
const { updateVehicleByNumber } = require("../../controllers/vehicles/updatevehicle");
const authMiddleware = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/userRole");
const validate = require("../../middlewares/validate");
const { updateVehicleSchema } = require("../../validators/vehicleValidators");

router.put(
  "/:vehicleNumber",
  authMiddleware,
  authorizeRoles("driver"),
  upload.single("image"),
  validate(updateVehicleSchema),
  updateVehicleByNumber
);

// Backward compatibility: POST /updatevehicle/:vehicleNumber
router.post("/updatevehicle/:vehicleNumber", authMiddleware, upload.single("image"), validate(updateVehicleSchema), updateVehicleByNumber);

module.exports = router;

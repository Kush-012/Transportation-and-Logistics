
const express = require("express");
const { addvehicle } = require("../../controllers/vehicles/addvehicle");
const authVerify = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/userRole");
const upload = require("../../middlewares/multer");
const validate = require("../../middlewares/validate");
const { addVehicleSchema } = require("../../validators/vehicleValidators");

const router = express.Router();

router.post(
  "/",
  authVerify,
  authorizeRoles("driver"),
  upload.array("images", 5),
  validate(addVehicleSchema),
  addvehicle
);

module.exports = router;

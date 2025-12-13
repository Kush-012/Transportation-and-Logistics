const express = require("express");
const { viewVehicles } = require("../../controllers/vehicles/viewvehicle");
const authVerify = require("../../middlewares/auth");

const router = express.Router();

router.get("/", authVerify, viewVehicles);

module.exports = router;

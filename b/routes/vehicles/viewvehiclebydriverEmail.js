const express = require("express");
const { viewvehiclebydriverEmail } = require("../../controllers/vehicles/viewvehiclebydriverEmail");
const authVerify = require("../../middlewares/auth");

const router = express.Router();

router.get("/:driverEmail", authVerify, viewvehiclebydriverEmail);

module.exports = router;

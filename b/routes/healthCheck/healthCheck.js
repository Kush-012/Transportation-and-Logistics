const express = require("express");
const router = express.Router();
const authmiddleware = require("../../middlewares/auth");
const { authorizeRoles } = require("../../middlewares/userRole");
const { checkHealth } = require("../../controllers/healthCheck/healthCheck")


// Health check endpoint
router.get("/", checkHealth);

module.exports = router;
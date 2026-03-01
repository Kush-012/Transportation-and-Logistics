const express = require("express");
const router = express.Router();
const { checkHealth } = require("../../controllers/healthCheck/healthCheck");


// Health check endpoint
router.get("/", checkHealth);

module.exports = router;
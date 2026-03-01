const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const checkHealth = (req, res) => {
  const dbState = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
  const dbStatus = dbState === 1 ? "connected" : "disconnected";
  const payload = {
    server: "up",
    database: dbStatus,
    timestamp: new Date().toISOString(),
  };

  if (dbState === 1) return res.status(200).json(payload);
  return res.status(500).json(payload);
}


module.exports = { checkHealth };
const express = require("express");
const router = express.Router();            
require("dotenv").config(); 
const ORS_KEY = process.env.ORS_KEY;

// POST /map/route
router.post("/route", async (req, res) => {
  try {
    const { coordinates } = req.body;

    if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
      return res.status(400).json({ error: "Invalid body. Expected { coordinates: [[lng,lat],[lng,lat]] }" });
    }

  
    if (typeof fetch !== "function") {
      return res.status(500).json({ error: "fetch is not available in this Node runtime. Use Node 18+ or install node-fetch." });
    }

    const response = await fetch("https://api.openrouteservice.org/v2/directions/driving-car/geojson", {
      method: "POST",
      headers: {
        "Accept": "application/json, application/geo+json",
        "Content-Type": "application/json",
        "Authorization": ORS_KEY,
      },
      body: JSON.stringify({ coordinates }),
    });

    const data = await response.json();

   
    if (!response.ok) {
      return res.status(response.status).json({ error: data || "ORS returned an error" });
    }

    return res.json(data);
  } catch (err) {
    console.error("Map route error:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;

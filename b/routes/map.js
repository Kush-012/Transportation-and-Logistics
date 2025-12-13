// routes/map.js
const express = require("express");
const router = express.Router();

// Use environment variable for key (safer). Fallback to existing key if needed.
const ORS_KEY = process.env.ORS_KEY || "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImRiZjg3MjRhNzk2MjQyYTM4MDcwN2ZiMWMyYjU5NGE2IiwiaCI6Im11cm11cjY0In0=";

// POST /map/route
router.post("/route", async (req, res) => {
  try {
    const { coordinates } = req.body;

    if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
      return res.status(400).json({ error: "Invalid body. Expected { coordinates: [[lng,lat],[lng,lat]] }" });
    }

    // Node 18+ has global fetch. If you run older Node, install node-fetch and require it.
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

    // Surface ORS errors clearly
    if (!response.ok) {
      return res.status(response.status).json({ error: data || "ORS returned an error" });
    }

    // Return the ORS response to the frontend unchanged
    return res.json(data);
  } catch (err) {
    console.error("Map route error:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;

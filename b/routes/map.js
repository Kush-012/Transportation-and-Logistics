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


    if (!ORS_KEY) {
      console.warn("⚠️ ORS_KEY not found. Using MOCK route data.");
      return res.json(getMockRoute(coordinates));
    }

    if (typeof fetch !== "function") {
      console.warn("⚠️ Fetch not found. Using MOCK route data.");
      return res.json(getMockRoute(coordinates));
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

    if (!response.ok) {
      console.warn(`⚠️ ORS API Error: ${response.status}. Using MOCK route data.`);
      return res.json(getMockRoute(coordinates));
    }

    const data = await response.json();
    return res.json(data);

  } catch (err) {
    console.error("Map route error:", err);
    console.warn("⚠️ Error occurred. Fallback to MOCK data.");
    return res.json(getMockRoute(req.body.coordinates));
  }
});

// Mock Data Generator
function getMockRoute(coords) {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          summary: {
            distance: 15000, // 15 km
            duration: 1800   // 30 mins
          }
        },
        geometry: {
          type: "LineString",
          coordinates: coords || [[0, 0], [0, 0]] // Straight line mock
        }
      }
    ]
  };
}


module.exports = router;

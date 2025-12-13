const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Correct connection check (no ping)
cloudinary.api.resources({ max_results: 1 })
  .then(() => console.log("Cloudinary connected"))
  .catch((err) => console.error("Cloudinary Connection Failed:", err.message));

module.exports = cloudinary;

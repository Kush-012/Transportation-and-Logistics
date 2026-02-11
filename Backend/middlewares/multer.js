const multer = require("multer");
const path = require("path");

// Allowed image extensions
const allowedTypes = /jpeg|jpg|png|gif|webp/;

// Validate uploaded file type
const fileFilter = (req, file, cb) => {
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) cb(null, true);
  else cb(new Error("Only image files (jpeg, jpg, png, gif, webp) are allowed!"));
};

// Store file in memory to upload to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit 2MB
  fileFilter,
});

module.exports = upload;

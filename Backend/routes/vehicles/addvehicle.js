const express = require("express");
const { addvehicle } = require("../../controllers/vehicles/addvehicle");
const authVerify = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");

const router = express.Router();

router.post("/",
  authVerify,
  upload.array("images", 5),   
  addvehicle
);

module.exports = router;

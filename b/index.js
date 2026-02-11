const express = require("express");
const cors = require("cors");
require("./config/dbconfig");

const signupRoute = require("./routes/authRoutes/signup");
const loginRoute = require("./routes/authRoutes/login");
const resetpasswordRoute = require("./routes/authRoutes/resetpassword");

const mapRoute = require("./routes/map");
const aiRoute = require("./routes/ai");

const addvehicleRoute = require("./routes/vehicles/addvehicle");
const viewvehicleRoute = require("./routes/vehicles/viewvehicle");
const updatevehicleRoute = require("./routes/vehicles/updatevehicle");
const deletevehicleRoute = require("./routes/vehicles/deletevehicle");
const viewvehiclebydriverEmailRoute= require("./routes/vehicles/viewvehiclebydriverEmail");

const createbookingRoute = require("./routes/bookings/createbooking");
const getbookingRoute = require("./routes/bookings/getbooking");
const updatebookingRoute = require("./routes/bookings/updatebooking");

const app = express();

// Secure CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173", // Development
  "http://localhost:3000", // Alternative development port
  process.env.PRODUCTION_URL // Production URL from environment
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400, // 24 hours
};

app.use(express.json());
app.use(cors(corsOptions));


app.use("/api", aiRoute);  
app.use("/map", mapRoute);

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/resetpassword", resetpasswordRoute);

app.use("/addvehicle", addvehicleRoute); 
app.use("/viewvehicle", viewvehicleRoute); 
app.use("/updatevehicle", updatevehicleRoute);
app.use("/deletevehicle", deletevehicleRoute);
app.use("/viewvehiclebydriverEmail", viewvehiclebydriverEmailRoute);

app.use("/createbooking", createbookingRoute);
app.use("/getbooking", getbookingRoute);
app.use("/updatebooking", updatebookingRoute);





// Centralized Error Handler Middleware (should be last)
const { errorHandler } = require("./middlewares/errorHandler");
app.use(errorHandler);

app.listen(4500, () => {
  console.log("Server running on port 4500");
});

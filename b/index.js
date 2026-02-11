const express = require("express");
const cors = require("cors");
const validateEnv = require("./config/validateEnv");

// Validate Environment Variables
validateEnv();

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
const viewvehiclebydriverEmailRoute = require("./routes/vehicles/viewvehiclebydriverEmail");

const createbookingRoute = require("./routes/bookings/createbooking");
const getbookingRoute = require("./routes/bookings/getbooking");
const updatebookingRoute = require("./routes/bookings/updatebooking");




const app = express();

app.use(express.json());
app.use(cors());


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




app.listen(4500, () => {
  console.log("Server running on port 4500");
});

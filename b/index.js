const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/dbconfig");

const signupRoute = require("./routes/authRoutes/signup");
const loginRoute = require("./routes/authRoutes/login");
const resetpasswordRoute = require("./routes/authRoutes/resetpassword");

const mapRoute = require("./routes/map");
const aiRoute = require("./routes/ai");

const vehiclesAddRoute = require("./routes/vehicles/addvehicle");
const vehiclesViewRoute = require("./routes/vehicles/viewvehicle");
const vehiclesUpdateRoute = require("./routes/vehicles/updatevehicle");
const vehiclesDeleteRoute = require("./routes/vehicles/deletevehicle");
const vehiclesByDriverRoute = require("./routes/vehicles/viewvehiclebydriverEmail");

const bookingsCreateRoute = require("./routes/bookings/createbooking");
const bookingsGetRoute = require("./routes/bookings/getbooking");
const bookingsUpdateRoute = require("./routes/bookings/updatebooking");




const app = express();

app.use(express.json());
app.use(cors());


app.use("/api", aiRoute);  
app.use("/map", mapRoute);

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/resetpassword", resetpasswordRoute);

// RESTful vehicle routes
app.use("/vehicles", vehiclesAddRoute);
app.use("/vehicles", vehiclesViewRoute);
app.use("/vehicles", vehiclesUpdateRoute);
app.use("/vehicles", vehiclesDeleteRoute);
app.use("/vehicles", vehiclesByDriverRoute);

// Backward compatibility vehicle routes
app.use("/addvehicle", vehiclesAddRoute);
app.use("/viewvehicle", vehiclesViewRoute);
app.use("/updatevehicle", vehiclesUpdateRoute);
app.use("/deletevehicle", vehiclesDeleteRoute);
app.use("/viewvehiclebydriverEmail", vehiclesByDriverRoute);

// RESTful booking routes
app.use("/bookings", bookingsCreateRoute);
app.use("/bookings", bookingsGetRoute);
app.use("/bookings", bookingsUpdateRoute);

// Backward compatibility booking routes
app.use("/createbooking", bookingsCreateRoute);
app.use("/getbooking", bookingsGetRoute);
app.use("/updatebooking", bookingsUpdateRoute);





async function startServer() {
  try {
    await connectDB();
    app.listen(4500, () => {
      console.log("Server running on port 4500");
    });
  } catch (err) {
    console.error("Failed to start server due to DB error.");
    process.exit(1);
  }
}

startServer();

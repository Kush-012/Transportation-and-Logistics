const mongoose=require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.mongodburl)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB not connected", err));
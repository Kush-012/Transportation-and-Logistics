const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
	try {
		await mongoose.connect(process.env.mongodburl);
		console.log("MongoDB connected");
	} catch (err) {
		console.log("MongoDB not connected", err);
		throw err;
	}
}

module.exports = { connectDB };
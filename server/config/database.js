const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => console.log("MongoDB Connected..."))
		.catch((err) => {
			console.error("Error connecting to MongoDB");
			console.error(err);
			process.exit(1);
		});
};

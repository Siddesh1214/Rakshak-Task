const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
	try {
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Token is missing",
			});
		}

		try {
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			console.log("decoded", decode);
			req.user = decode;
		} catch (error) {
			return res.status(401).json({
				success: false,
				message: "token is invalid",
				error: error,
			});
		}
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			success: false,
			message: "Something went wrong while validating the token",
		});
	}
};

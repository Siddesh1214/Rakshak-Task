const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.signUp = async (req, res) => {
	try {
		const { firstName, lastName, email, password, contact, address } = req.body;


		console.log("RECIVED --- ",firstName, lastName, email, password, contact, address)
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!contact ||
			!address
		) {
			return res.status(400).json({
				success: false,
				msg: "Please enter all fields",
			});
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "Email id already in use, please use different email",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			contact,
			address,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			message: "User is registered Successsfully",
			newUser,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "User can not be registered. Please try again",
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(500).json({
				success: false,
				message: "Please enter all fields",
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User does not exist",
			});
		}

		if (await bcrypt.compare(password, user.password)) {
			const payload = {
				email: user.email,
				id: user._id,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "2h",
			});

			user.token = token;
			user.password = undefined;

			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // cookie will expire in 3 days
				httpOnly: true, // The cookie only accessible by the server
			};

			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: "User logged in successfully",
			});
		} else {
			return res.status(401).json({
				success: false,
				message: "Password is incorrect",
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Login Failure, please try again",
		});
	}
};

exports.editProfile = async (req, res) => {
	try {
		const { firstName, lastName, contact, address } = req.body;
		const userId = req.user.id;
		
		console.log(firstName,lastName,contact,address,userId);

		// const userDetails = await User.findById({userId});
		const userDetails = await User.findOne({_id: userId});

		if (!userDetails) {
			res.status(400).json({
				success: false,
				message: "User not found",
			});
		}
		const updatedUser = await User.findByIdAndUpdate(
			 userId ,
			{ firstName, lastName, contact, address },
			{ new: true }
		);

		// console.log(updatedUser)
		return res.status(200).json({
			success: true,
			message: "Profile details Updated",
			data: updatedUser,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: "Error in updating the profile",
			error: error.message,
		});
	}
};

exports.updatePicture = async (req,res) => {
	try {
		const userId = req.user.id;

		const displayPic = req.files.displayPic;

		if (!displayPic) {
			return res.status(500).json({
				success: false,
				message: "No Image Found",
			});
		}
		const uploadedImage = await uploadImageToCloudinary(
			displayPic,
			process.env.FOLDER_NAME,
			1000,
			1000
		);
		console.log("uploadedImage----", uploadedImage);

		const updatedUser = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: uploadedImage.secure_url },
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "Profile Picture updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

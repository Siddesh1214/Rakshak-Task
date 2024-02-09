const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		contact: {
			type: String,
			required: true,
    },
    token: {
      type: String,
		},
		attempted: {
			type: Boolean,
			default: false,
		},
		marks: {
			type: Number,
			default:0,
		},
		liscenceNo: {
			type: String,
			// required: true,
		},
		adharCard: {
      type: String,
    },
    panCard: {
      type: String,
    }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

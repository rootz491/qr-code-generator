const mongoose = require("mongoose");

const OtpSchema = mongoose.Schema(
	{
		lastRequest: {
			type: Date,
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		otp: {
			type: String,
			required: true,
		},

		createdAt: {
			type: Date,
			default: Date.now,
			expires: 300,
		},
		status: {
			type: String,
			default: "pending",
			enum: ["pending", "verified"],
		},
		sid: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
//setting upp ttl index 5 mins
OtpSchema.index({ phoneNumber: 1 }, { expireAfterSeconds: 300 });

const Otp = mongoose.model("Otp", OtpSchema);

module.exports = Otp;

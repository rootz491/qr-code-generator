const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
	{
		mobilenum: {
			type: String,
			required: true,
			unique: true,
		},
		currCTC: { type: String },
		currCompany: { type: String },
		currInHandCTC: { type: String },
		currLocation: { type: String },
		currWFHLocation: { type: String },
		email: { type: String },
		expectedSalary: { type: String },
		experience: { type: String },
		fullname: { type: String },
		jobtitle: { type: String },
		joiningDate: { type: String },
		lastWorkDay: { type: String },
		message: { type: String },
		noticePeriod: { type: String },
		offeredCTC: { type: String },
		passingYear: { type: String },
		qualification: { type: String },
		relocate: { type: String },
		resume: { type: String },
		totalexperience: { type: String },
		workingremote: { type: String },
		altmobilenum:{
			type: String,
		},
		feedback: {
			status: {
				type: String,
				enum: ["pending", "accepted", "rejected"],
				default: "pending",
			},
			comment: { type: String, default: "" },
		},
		accountType: {
			type: String,
			default: "user",
			enum: ["user", "admin", "dev"],
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
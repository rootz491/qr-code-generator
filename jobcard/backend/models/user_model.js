const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
	{
		phoneNumber: {
			type: String,
			required: true,
			unique: true,
		},

		currCTC: { type: String },
		currCompany: { type: String },
		currInHandCTC: {
			type: String,
		},

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
		mobilenum: { type: String },
		noticePeriod: { type: String },
		offeredCTC: { type: String },
		passingYear: { type: String },
		qualification: { type: String },
		relocate: { type: String },
		resume: { type: String },
		totalexperience: { type: String },
		workingremote: { type: String },
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
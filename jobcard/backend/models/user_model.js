const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
	},
	number: {
		type: String,
		required: true,
		unique: true,
	},
});

const config = require("../config");
const User = require("../models/user_model");

const jwt = require("jsonwebtoken");

module.exports = async function auth(req, res, next) {
	//getting token from auth headers

	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) return res.status(401).send({ message: "Access Denied." });
	try {
		const decoded = await jwt.verify(token, config.SECRET_KEY);
		let user = await User.findById(decoded._id);
		if (!user)
			return res.status(401).send({ message: "Access Denied. User not found" });
		req.user = decoded;

		next();
	} catch (ex) {
		console.error(ex.message, ex);
		res.status(400).send({ message: "Invalid token" });
	}
};

const express = require("express");
const User = require("../../models/user_model");
const router = express.Router();

router.get("/filter", async (req, res) => {
	try {
		const filter = req.query || {};
		if (!filter)
			throw {
				status: 400,
				message: "Bad Request",
			};
		let users = [];
		console.log(filter);
		if (filter?.jobtitle) {
			users.push(await User.find({ jobtitle: filter.jobtitle }));
		}
		if (filter?.currLocation) {
			users.push(await User.find({ currLocation: filter.currLocation }));
		}
		if (filter?.currCompany) {
			users.push(await User.find({ currCompany: filter.currCompany }));
		}
		if (filter?.currCTC) {
			users.push(await User.find({ currCTC: filter.currCTC }));
		}
		if (filter?.currInHandCTC) {
			users.push(await User.find({ currInHandCTC: filter.currInHandCTC }));
		}
		res.status(200).json(users);
	} catch (err) {
		res
			.status(err.status || 500)
			.json({ message: err.message || "Server Error" });
	}
});

module.exports = router;

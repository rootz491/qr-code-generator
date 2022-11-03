const express = require("express");
const router = express.Router();
const config = require("../../config");
const twilio = require("twilio");
const Otp = require("../../models/otp_model");
const User = require("../../models/user_model");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");

const client = new twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

//TODO :ADD rate limitng
//Login and signup means exactly same thing
router.post("/request-login-via-otp", async (req, res) => {
	try {
		const { number } = req.body;
		const otp = Math.floor(100000 + Math.random() * 900000);
		if (!number) {
			throw {
				status: 400,
				message: "Phone number is required",
			};
		}
		const savedOtp = await Otp.findOne({ phoneNumber: number });
		//checking if otp was sent less then a minute ago
		if (savedOtp && savedOtp.updatedAt > Date.now() - 30000) {
			throw {
				status: 400,
				message: `Please wait ${Math.ceil(
					(savedOtp.updatedAt - Date.now() + 30000) / 1000
				)} seconds before requesting for another OTP`,
			};
		}

		const message = await client.messages.create({
			body: `Your OTP for Yugam job portal is ${otp}. The Otp is valid for 5 minutes. Please do not share this OTP with anyone.`,
			from: config.TWILIO_PHONE_NUMBER,
			to: number,
		});
		if (savedOtp) {
			savedOtp.otp = otp;
			savedOtp.sid = message.sid;
			savedOtp.save();
			res.status(200).json({ message: "OTP sent successfully" });
		} else {
			const newOtp = new Otp({
				phoneNumber: number,
				otp: otp,
				sid: message.sid,
			});
			await newOtp.save();
			res.status(200).json({ message: "OTP sent successfully" });
		}
	} catch (err) {
		console.log(err);
		res
			.status(err?.status || 500)
			.send({ message: err.message || "Server Error" });
	}
});

router.post("/verify-login-via-otp", async (req, res) => {
	try {
		const { number, otp } = req.body;
		if (!number || !otp) {
			throw {
				status: 400,
				message: "Phone number and OTP are required",
			};
		}
		const savedOtp = await Otp.findOne({ phoneNumber: number });

		//checking if the phone number exists
		if (!savedOtp)
			throw {
				status: 400,
				message: "Phone number not found",
			};
		//checking if the last request was less then 5 seconds ago
		if (savedOtp?.lastRequest > Date.now() - 5000) {
			throw {
				status: 400,
				message: "Request too frequent",
			};
		}
		savedOtp.lastRequest = Date.now();
		await savedOtp.save();

		//checking if the doc is already verified
		if (savedOtp.status === "verified")
			throw {
				status: 400,
				message: "Otp was already used",
			};

		//checking if the otp is expired
		//The Doc is TTL but we still time check it here cause mongo db run the TTL check every 60 seconds and can be inaccurate
		if (savedOtp.createdAt < Date.now() - 300000) {
			//removing the otp document
			await savedOtp.remove();
			throw {
				status: 400,
				message: "Otp is expired",
			};
		}

		//checking if the otp is correct
		if (savedOtp.otp !== otp) {
			throw {
				status: 400,
				message: "Invalid OTP",
			};
		}
		savedOtp.status = "verified";
		await savedOtp.save();
		const user = await new User({
			phoneNumber: number,
		}).save();
		const token = jwt.sign(
			{
				_id: user._id,
				phoneNumber: user.phoneNumber,
			},
			config.SECRET_KEY
		);

		res
			.status(200)
			.json({ message: "OTP verified successfully", access_token: token })
			.send();
	} catch (err) {
		console.log(err);
		res
			.status(err.status || 500)
			.send({ message: err.message || "Server Error" });
	}
});

router.post("/save-user", auth, async (req, res) => {
	try {
		const user = req.user;
		if (!req.body)
			throw {
				status: 400,
				message: "Content can not be empty!",
			};

		const savedUser = await User.findById(user._id);
		if (!savedUser)
			throw {
				status: 400,
				message: "User not found",
			};
		await savedUser.updateOne(req.body);
		res.status(200).json({ message: "User saved successfully" });
	} catch (e) {
		console.log(e);
		res.status(e.status || 500).send({ message: e.message || "Server Error" });
	}
});

router.get("/get-user", auth, async (req, res) => {
	try {
		const user = req.user;
		const savedUser = await User.findById(user._id);
		if (!savedUser)
			throw {
				status: 400,
				message: "User not found",
			};
		res.status(200).json(savedUser);
	} catch (e) {
		console.log(e);
		res.status(e.status || 500).send({ message: e.message || "Server Error" });
	}
});

module.exports = router;

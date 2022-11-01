const express = require("express");
const router = express.Router();
const config = require("../../config");
const twilio = require("twilio");
const client = new twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
const Otp = require("../../models/otp_model");

router.post("/request-otp", async (req, res) => {
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
		if (savedOtp && savedOtp.createdAt > Date.now() - 60000) {
			throw {
				status: 400,
				message: "Otp was sent less then a minute ago",
			};
		}
		if (savedOtp && savedOtp.status === "verified") {
			throw {
				status: 400,
				message: "User already verified",
			};
		}

		const message = await client.messages.create({
			body: `Your OTP for Yugam job portal is ${otp}. The Otp is valid for 5 minutes. Please do not share this OTP with anyone.`,
			from: config.TWILIO_PHONE_NUMBER,
			to: number,
		});
		if (savedOtp) {
			savedOtp.otp = otp;
			savedOtp.save();
			res.status(200).json({ message: "OTP sent successfully" });
		} else {
			const newOtp = new Otp({
				phoneNumber: number,
				otp: otp,
			});
			await newOtp.save();
			res.status(200).json({ message: "OTP sent successfully" });
		}
	} catch (err) {
		console.log(err);
		res.status(err?.status || 500).send(err?.message || "Server Error");
	}
});

router.post("/verify-otp", async (req, res) => {
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
				message: "User not found",
			};
		//checking if the doc is already verified
		if (savedOtp.status === "verified")
			throw {
				status: 400,
				message: "Otp was already used",
			};
		//checking if the otp is expired
		if (savedOtp.createdAt < Date.now() - 300000)
			throw {
				status: 400,
				message: "Otp is expired",
			};

		//checking if the otp is correct
		if (savedOtp.otp !== otp) {
			throw {
				status: 400,
				message: "Invalid OTP",
			};
		}
		savedOtp.status = "verified";
		await savedOtp.save();
		res.status(200).json({ message: "OTP verified successfully" });
	} catch (err) {
		console.log(err);
		res.status(err.status || 500).send(err.message || "Server Error");
	}
});

module.exports = router;

const express = require("express");
const router = express.Router();
const config = require("../../config");
const twilio = require("twilio");
const Otp = require("../../models/otp_model");
const User = require("../../models/user_model");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const isAdmin = require("../../middleware/isAdmin");

const client = new twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

//TODO :ADD rate limitng
//Login and signup means exactly same thing
router.post("/request-login-via-otp", async (req, res) => {
  try {
    const { mobilenum } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    if (!mobilenum) {
      throw {
        status: 400,
        message: "Phone number is required",
      };
    }
    const savedOtp = await Otp.findOne({ mobilenum: mobilenum });
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
      to: `+91${mobilenum}`,
    });
    if (savedOtp) {
      savedOtp.otp = otp;
      savedOtp.status = "pending";
      savedOtp.sid = message.sid;
      savedOtp.save();
      res.status(200).json({ message: "OTP sent successfully" });
    } else {
      const newOtp = new Otp({
        mobilenum: mobilenum,
        otp: otp,
        sid: message.sid,
      });
      await newOtp.save();
      res.status(200).json({ message: "OTP sent successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(err?.status || 500).send({ message: err.message || "Server Error" });
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
    const savedOtp = await Otp.findOne({ mobilenum: number });

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
    const user = await User.findOne({ mobilenum: number });
    let token = "";
    if (user) {
      token = jwt.sign({ id: user._id, mobilenum: number, accountType: user.accountType }, config.SECRET_KEY, {
        expiresIn: "1d",
      });
    } else {
      const newUser = new User({
        mobilenum: number,
      });
      await newUser.save();
      token = jwt.sign({ id: newUser._id, mobilenum: number, accountType: newUser.accountType }, config.SECRET_KEY, {
        expiresIn: "1d",
      });
    }

    res.status(200).json({ message: "OTP verified successfully", access_token: token }).send();
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).send({ message: err.message || "Server Error" });
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

    if (req.body?.feedback)
      throw {
        status: 400,
        message: "Malformed request",
      };
    if (!req.body?.expectedSalary)
      throw {
        status: 400,
        message: "User must have an expected salary",
      };

    const savedUser = await User.findById(user.id);
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
    const savedUser = await User.findById(user.id);
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

router.get("/get-all-user", auth, async (req, res) => {
  try {
    //get all the user where expectedCtc is not null
    const users = await User.find({ expectedSalary: { $ne: null } }).select("-accountType -feedback -__v");
    if (!users)
      throw {
        status: 400,
        message: "User not found",
      };
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).send({ message: e.message || "Server Error" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    if (!req.params.id)
      throw {
        status: 400,
        message: "Params not found",
      };
    const user = await User.findById(req.params.id);
    if (!user)
      throw {
        status: 400,
        message: "User not found",
      };
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).send({ message: e.message || "Server Error" });
  }
});

router.post("/save-user-feedback", [auth, isAdmin], async (req, res) => {
  try {
    const user = req.user;
    if (!req.body)
      throw {
        status: 400,
        message: "Content can not be empty!",
      };

    const savedUser = await User.findById(user.id);
    if (!savedUser)
      throw {
        status: 400,
        message: "User not found",
      };
    await savedUser.updateOne({ feedback: req.body });
    res.status(200).json({ message: "Feedback saved successfully" });
  } catch (e) {
    console.log(e);
    res.status(e.status || 500).send({ message: e.message || "Server Error" });
  }
});

module.exports = router;

const User = require("../models/user_model");

module.exports = function (req, res, next) {
  console.log(req.user);
  User.findOne({ _id: req.user.id })
    .then((user) => {
      if (user.accountType === "admin") {
        next();
      } else {
        res.status(401).json({ messsage: "Not authorized" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ messsage: "Server error" });
    });
};

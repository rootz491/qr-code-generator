module.exports = function (app) {
	app.use("/api/auth", require("../routes/auth/"));
	app.use("/api/jobs", require("../routes/job_lists/"));
};

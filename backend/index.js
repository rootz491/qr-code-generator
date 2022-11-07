const express = require("express");
const app = express();
const cors = require("cors");
const winston = require("winston");
//express config here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cors Config
const CorsOptions = {
  origin: "http://localhost:3000",
  exposedHeaders: "x-auth-token",
};
app.use(cors(CorsOptions));

//initialize services
const config = require("./config");
const dbInit = require("./init/db_init");
const routesInit = require("./init/routes_init");

//For debugging

app.use((req, res, next) => {
  console.info(`METHOD: [ ${req.method}] -URL: [${req.url}] -IP [${req.socket.remoteAddress}] :`);

  res.on("finish", () => {
    console.info(
      ` METHOD: [ ${req.method}] -URL: [${req.url}] STATUS: [${res.statusCode}] -IP [${req.socket.remoteAddress}]`
    );
  });

  next();
});

dbInit();
routesInit(app);

app.listen(config.port, () => {
  console.info(`Listening on port ${config.port}...in ${process?.env.NODE_ENV} environment `);
});

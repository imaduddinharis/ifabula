const path = require("path");
require("dotenv").config({ path: path.resolve("./.env") });

const express = require("express");
const app = express();
const { PORT } = process.env;

const { log, log4js } = require("./config/log");
require("./config/middlewares")(express, app, log4js, log);

app.get("/", (req, res) => res.send("API Index"));
require("./routes")(app);

app.use("/docs", express.static("./docs"));

app.listen(PORT, () => log.info(`API Running on port ${PORT}`));

module.exports = (express, app, log4js, log) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));

  require("./cors.config")(app, log);
};

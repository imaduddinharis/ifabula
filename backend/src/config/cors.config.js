module.exports = (app, log) => {
  const cors = require("cors");
  const whitelist = ["http://localhost:8080", "http://192.168.9.104:8080", "*"];
  const whitelistMethod = [
    "GET",
    "OPTIONS",
    "HEAD",
    "PUT",
    "PATCH",
    "POST",
    "DELETE",
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      try {
        if (whitelist.includes("*")) {
          callback(null, true);
        } else {
          if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback("Not allowed by CORS Options", null);
            throw new Error();
          }
        }
      } catch (error) {
        log.error("Not allowed by CORS Options: ", origin);
      }
    },
    optionsSuccessStatus: 204,
    methods: whitelistMethod,
  };
  app.use(cors(corsOptions));
};

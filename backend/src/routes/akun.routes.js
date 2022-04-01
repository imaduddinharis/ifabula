module.exports = (app) => {
    const login = require("../controllers/login.controllers");
    const router = require("express").Router();
    
    router.post("/login", login.login);
  
    app.use("/api", router);
  };
  
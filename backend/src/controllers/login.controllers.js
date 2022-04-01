const { akun } = require("../models");
const HTTP = require("../config/http.status");
const CryptoJS = require("crypto-js");

const login = (req, res) => {
  const body = {
    username: req.body.username,
    password: CryptoJS.MD5(req.body.password).toString(),
  };

  akun
    .login(body)
    .then((result) => {
      const response = {
        success: true,
        total: result.length,
        msg: result.length > 0 ? "Login Successfully" : "Invalid Account",
      };
      res.status(HTTP.OK).send(response);
    })
    .catch((err) => {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send({
        success: false,
        msg: err.message || "Some error while retrieving data",
      });
    });
};

module.exports = {
  login,
};

module.exports = (app) => {
  const transaksi = require("../controllers/transaksi.controllers");
  const router = require("express").Router();

  router.get("/", transaksi.read);
  router.get("/:id", transaksi.readById);
  router.post("/", transaksi.create);

  app.use("/api/transaksi", router);
};

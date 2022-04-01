module.exports = (app) => {
  const barang = require("../controllers/barang.controllers");
  const router = require("express").Router();

  router.get("/", barang.read);
  router.get("/:id", barang.readById);
  router.post("/", barang.create);
  router.put("/:id", barang.updateById);

  app.use("/api/barang", router);
};

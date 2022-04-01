module.exports = (app) => {
  const perusahaan = require("../controllers/perusahaan.controllers");
  const router = require("express").Router();

  router.get("/", perusahaan.read);
  router.get("/:id", perusahaan.readById);
  router.post("/", perusahaan.create);
  router.put("/:id", perusahaan.updateById);

  app.use("/api/perusahaan", router);
};

const path = require("path");
const knexConfig = require(path.resolve("./migrations"));
const model = require("knex")(knexConfig);

model.akun = require("./akun.models")(model);
model.barang = require("./barang.models")(model);
model.perusahaan = require("./perusahaan.models")(model);
model.transaksi = require("./transaksi.models")(model);
module.exports = model;

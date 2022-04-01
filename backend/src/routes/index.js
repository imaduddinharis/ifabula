module.exports = (app) => {
  require("./barang.routes")(app);
  require("./akun.routes")(app);
  require("./perusahaan.routes")(app);
  require("./transaksi.routes")(app);
};

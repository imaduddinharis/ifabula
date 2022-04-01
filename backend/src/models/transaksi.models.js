module.exports = (table) => ({
  barang: require("./barang.models")(table),
  perusahaan: require("./perusahaan.models")(table),
  find: async function (queryParam) {
    try {
      let query;
      if (queryParam.deleted) {
        query = await table("transaksi");
      } else {
        query = await table("transaksi").where({ deleted_at: null });
      }
      return query;
    } catch (error) {
      return error;
    }
  },
  finById: async function (id) {
    try {
      let query = await table("transaksi").where("id", "=", id);
      return query;
    } catch (error) {
      return error;
    }
  },
  create: async function (body) {
    return await this.barang
      .findById(body.kode_barang)
      .then((resultBarang) => {
        if (resultBarang.length > 0) {
          return this.perusahaan
            .findById(body.kode_perusahaan)
            .then((resultPerusahaan) => {
              if (resultPerusahaan.length > 0) {
                body.nama_perusahaan = resultPerusahaan[0].nama_perusahaan;
                body.nama_barang = resultBarang[0].nama;
                body.harga_barang = resultBarang[0].harga;
                body.sisa_stock =
                  parseInt(resultBarang[0].stock) - parseInt(body.total_barang);
                if (body.sisa_stock >= 0) {
                  return this.barang
                    .update(body.kode_barang, {
                      stock: body.sisa_stock,
                    })
                    .then(() => {
                      try {
                        let query = table("transaksi").insert(body);
                        return query;
                      } catch (error) {
                        return error;
                      }
                    })
                    .catch((err) => {
                      return { err: true, msg: err };
                    });
                } else {
                  return { err: true, msg: "Stock tidak mencukupi" };
                }
              } else {
                return { err: true, msg: "Perusahaan tidak ditemukan" };
              }
            })
            .catch((err) => {
              return err;
            });
        } else {
          return { err: true, msg: "Barang tidak ditemukan" };
        }
      })
      .catch((err) => {
        return err;
      });
  },
});

const { transaksi } = require("../models");
const HTTP = require("../config/http.status");

const json2csv = require("json2csv").parse;

function convertTZ(date, tzString) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}
function getFullDate(date) {
  let datetime = new Date(date);
  datetime = convertTZ(datetime, "Asia/Jakarta");
  datetime = `${datetime.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${
    (datetime.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  }-${datetime.getFullYear()}`;
  return datetime;
}

const read = (req, res) => {
  const query = { deleted: req.query.deleted };
  transaksi
    .find(query)
    .then((result) => {
      if (result.length > 0) {
        result.map((item, index) => {
          result[index].total_harga =
            parseInt(item.total_barang) * parseInt(item.harga_barang);
        });
      }

      if (req.query.download) {
        let csvData = [];
        result.map((item) => {
          csvData.push({
            "Tanggal Input": getFullDate(item.created_at),
            "Nama Perusahaan": item.nama_perusahaan,
            "Nama Barang": item.nama_barang,
            "Total Barang": item.total_barang,
            "Harga Barang": item.harga_barang,
            "Grand Total": item.total_harga,
            "Sisa Barang": item.sisa_stock,
          });
        });
        const csvString = json2csv(csvData);
        res.setHeader(
          "Content-disposition",
          "attachment; filename=transaction-report.csv"
        );
        res.set("Content-Type", "text/csv");
        res.status(200).send(csvString);
      } else {
        const response = {
          success: true,
          total: result.length,
          result,
        };
        res.status(HTTP.OK).send(response);
      }
    })
    .catch((err) => {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send({
        success: false,
        msg: err.message || "Some error while retrieving data",
      });
    });
};

const readById = (req, res) => {
  const id = req.params.id;
  transaksi
    .finById(id)
    .then((result) => {
      const response = {
        success: true,
        total: result.length,
        result,
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

const create = (req, res) => {
  const body = {
    kode_perusahaan: req.body.kode_perusahaan,
    kode_barang: req.body.kode_barang,
    total_barang: req.body.total_barang,
  };
  transaksi
    .create(body)
    .then((result) => {
      if (result.err) {
        const response = {
          success: false,
          msg: result.msg,
        };
        res.status(HTTP.BAD_REQUEST).send(response);
      } else {
        const response = {
          success: true,
          data: body,
          result,
        };
        res.status(HTTP.CREATED).send(response);
      }
    })
    .catch((err) => {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send({
        success: false,
        msg: err.message || "Some error while inserting data",
      });
    });
};

const downloadCSV = (req, res) => {
  const query = { deleted: req.query.deleted };
  transaksi
    .find(query)
    .then((result) => {
      if (result.length > 0) {
        result.map((item, index) => {
          result[index].total_harga =
            parseInt(item.total_barang) * parseInt(item.harga_barang);
        });
      }
    })
    .catch((err) => {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send({
        success: false,
        msg: err.message || "Some error while retrieving data",
      });
    });
};

module.exports = {
  read,
  readById,
  create,
  downloadCSV,
};

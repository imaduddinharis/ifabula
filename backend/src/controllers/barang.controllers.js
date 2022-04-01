const { barang } = require("../models");
const HTTP = require("../config/http.status");

const read = (req, res) => {
  const query = { deleted: req.query.deleted };
  barang
    .find(query)
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

const readById = (req, res) => {
  const id = req.params.id;
  barang
    .findById(id)
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
    nama: req.body.nama,
    harga: req.body.harga,
    stock: req.body.stock,
  };
  barang
    .create(body)
    .then((result) => {
      body.id = result[0];
      const response = {
        success: true,
        data: body,
      };
      res.status(HTTP.CREATED).send(response);
    })
    .catch((err) => {
      res.status(HTTP.INTERNAL_SERVER_ERROR).send({
        success: false,
        msg: err.message || "Some error while inserting data",
      });
    });
};

const updateById = (req, res) => {
  const id = req.params.id;
  const body = {
    nama: req.body.nama,
    harga: req.body.harga,
    stock: req.body.stock,
  };
  barang
    .update(id, body)
    .then((result) => {
      const response = {
        success: true,
        data: {
          id,
          body,
        },
        result,
      };
      res.status(HTTP.OK).send(response);
    })
    .catch((err) => {});
};

module.exports = {
  read,
  readById,
  create,
  updateById,
};

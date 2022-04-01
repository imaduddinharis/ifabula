const { perusahaan } = require("../models");
const HTTP = require("../config/http.status");

const read = (req, res) => {
  const query = { deleted: req.query.deleted };
  perusahaan
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
  perusahaan
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
    kode_perusahaan: req.body.kode_perusahaan,
    nama_perusahaan: req.body.nama_perusahaan,
  };
  perusahaan
    .create(body)
    .then((result) => {
      if (result.errno == 1062) {
        const response = {
          success: false,
          msg: "Duplicate Kode Perusahaan",
        };
        res.status(HTTP.BAD_REQUEST).send(response);
      } else {
        const response = {
          success: true,
          data: body,
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

const updateById = (req, res) => {
  const id = req.params.id;
  const body = {
    nama_perusahaan: req.body.nama_perusahaan,
  };
  perusahaan
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

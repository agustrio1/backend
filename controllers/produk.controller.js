const db = require("../models/bundle.model");
const func = require('../libs/function')
const { v4: uuidv4 } = require("uuid");
const upload = require("../libs/handleUpload");

exports.create = async (req, res) => {
  try {
    const data = {
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      full_description: req.body.full_description,
      image: req.file.filename,
      price: req.body.price,
      category_id: req.body.category_id,
      url: func.convertToSlug(req.body.title + "" + Math.random(1000))
    };

    db.produk
      .create(data)
      .then((result) => {
        res.send({
          code: 200,
          message: "Data Berhasil di Simpan",
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          code: 500,
          message: "Data Gagal di Simpan",
        });
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

exports.findAll = async (req, res) => {
  db.produk
    .findAll()
    .then((result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          message: "ok find all data",
          data: result,
        });
      } else {
        res.status(404).send({
            code: 404,
            message: 'Data Tidak Ada'
        })
      }
    })
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  db.produk
    .findOne({ where: { id: id } })
    .then((result) => {
      res.send({
        code: 200,
        message: "ok find all data",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Data gagal di Tampilkankan",
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = {
    title: req.body.title,
    description: req.body.description,
    full_description: req.body.full_description,
    price: req.body.price,
    category_id: req.body.category_id,
  };

  if (req.file !== undefined) {
    //update dengan gambar
    data["image"] = req.file.filename;

    // console.log('DATA ???', data)
  }

  db.produk
    .update(data, {
      where: { id: id },
    })
    .then((result) => {
      res.send({
        code: 200,
        message: "Data Berhasil di Update",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Data Gagal di Update",
      });
    });
};

exports.delete = async (req, res) => {
    const id = req.params.id
    db.produk.destroy({
        where : {id : id}
    }).then(result => {
        res.send({
            code: 200,
            message: 'Data Berhasil di Hapus'
        })
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: 'Data Gagal di Hapus',
        })
    })
};

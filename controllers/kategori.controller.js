const db = require('../models/bundle.model')

exports.create = async (req, res) => {
    const data = {
        name: req.body.name,
    }

    db.kategori.create(data).then(result => {
        res.send({
            code: 200,
            message: 'Data Berhasil di Simpan',
            data: result
        })
    }).catch(err => {
        console.error("Database Error:", err);
        res.status(500).send({
            code: 500,
            message: 'Gagal Menyimpan Data',
            error: err
        })
    })
}


exports.findAll = async (req, res) => {
    db.kategori.findAll().then(result => {
        if (result.length > 0) {
            res.send ({
                code : 200,
                message : 'ok',
                data : result
            })
        } else {
            res.send({
                code: 404,
                message: "Data tidak Ada"
            })
        }
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message : 'Gagal retrive Data',
            data : err
        })
    })
}

exports.update = async (req, res) => {
    const id = req.params.id

    const data = {
        name : req.body.name,
    }

    db.kategori.update(data, {
        where : {id : id}
    }).then(result => {
        if (result [0]) {
            res.send ({
                code : 200,
                message : 'Data berhasil di Update'
            })
        } else {
            res.status(422).send({
                code : 422,
                message : "Data Gagal Diperbaharui, field error"
            })
        }
    }).catch(err => {
        res.status(500).send ({
            code : 5000,
            message : 'Gagal Update Data'
        })
    })
}

exports.delete = async (req, res) => {
    const id = req.params.id

    db.kategori.destroy({
        where: {id: id}
    }).then (result => {
        res.send({
            code : 200,
            message: "Data Berhasil di Hapus"
        })
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: 'Data Gagal di Hapus'
        })
    })
}
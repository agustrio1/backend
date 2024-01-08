const db = require("../models/bundle.model");
const Op = db.Sequelize.Op;
const func = require('../libs/function')
const { v4: uuidv4 } = require("uuid");

exports.getProdukHome = async (req, res) => {
    db.produk.findAll({
        atributes : ['id', 'title', 'image', 'price', 'url'],
        limit : 8,
    }).then ( result => {
        if (result.length > 0) {
            res.send({
                code: 200,
                message: 'ok',
                data : result,
            })
        } else {
            res.status(500).send({
                code: 500,
                message: 'Data tidak ada'
            })
        }
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: 'Gagal Menampilkan Data produk' + err
        })
    })
}

exports.produkPage = async (req, res) => {
    try {
        let keyword = '';
        const condition = [];

        if (req.query.keyword) {
            keyword = req.query.keyword;
            condition.push({
                title: {
                    [Op.like]: `%${keyword}%`
                }
            });
        }

        const result = await db.produk.findAll({
            atributes : ['id', 'title', 'image', 'price', 'url'],
            where: {
                [Op.or]: condition
            }
        });

        if (result.length > 0) {
            res.send({
                code: 200,
                message: 'ok',
                data: result
            });
        } else {
            res.status(500).send({
                code: 500,
                message: `Tidak ada data yang cocok dengan ${keyword}`
            });
        }
    } catch (err) {
        res.status(500).send({
            code: 500,
            message: 'Gagal Menampilkan Data produk' + err
        });
    }
};

exports.getProdukDetail = async (req, res) => {
    const url = req.params.url
    db.produk.findOne({
        where : {
            url : url,
        },
        atributes : ['id', 'title', 'description', 'full_description', 'image', 'price', 'url', 'category_id'],
        include : [
            {
                model : db.kategori
            }
        ]
    }).then (result => {
        if (result) {
            res.send({
                code : 200,
                message : 'ok',
                data : result
            })
        } else {
            res.status(404).send({
                code : 404,
                message : 'Produk telah dihapus'
            })
        }
    }).catch (err => {
        res.status(500).send({
            code : 500,
            message : 'Error retrive data'
        })
    })
}

exports.getDataKeranjang = async (req, res) => {
    const session_id = req.query.session_id
    db.keranjang.findAll({
        where: {session_id : session_id},
        atributes : ['id', 'qty', 'session_id', 'createdAt'],
        include : [
            {
                model : db.produk,
                atributes : ['id', 'title', 'image', 'price', 'url']
            }
        ]
    }).then (result => {
        if (result.length > 0) {
            res.send({
                code : 200,
                message : 'ok',
                data : result
            })
        } else {
            res.status(404).send({
                code : 404,
                message : 'Belum ada data di keranjang'
            })
        }
    }).catch (err => {
        res.status(500).send({
            code : 500,
            message : 'Error retrive data' + err
        })
    })
}

exports.tambahDataKeranjang = async (req, res) => {

  const cekKeranjang = await db.keranjang.findOne({
        where : [
            {
                produk_id : req.body.produk_id
            },
            {
                session_id : req.body.session_id
            }
        ]
    })

    if (cekKeranjang !== null) {
        const data = {
            // produk_id : req.body.produk_id,
            qty : cekKeranjang.qty + 1,
            // session_id : req.body.session_id || "default-session-id",
        }

       await db.keranjang.update(data, {
            where: {id : cekKeranjang.id}
        }).then (result  => {
            res.send({
                code : 200,
                message : 'Berhasil mengubah keranjang'
            })
        }).catch(err => {
            res.status(500).send({
                code : 500,
                message : 'Error mengubah keranjang' + err
            })
        })


    } else {
        const data = {
            produk_id : req.body.produk_id,
            qty : req.body.qty,
            session_id : req.body.session_id || "default-session-id",
        }
    
      await  db.keranjang.create(data).then(result => {
            res.send({
                code : 200,
                message : 'ok',
                data : result
            })
        }).catch(err => {
            res.status(500).send({
                code: 500,
                message : 'Error menambahkan data keranjang' + err
            })
        })
    }    
}

exports.ubahDataKeranjang = async (req, res) => {
    const id = req.params.id
    const qty = req.body.qty

    db.keranjang.update({qty : qty}, {
        where: {id : id}
    }).then (result => {
        if (result[0]) {
            res.send({
                code : 200,
                message : 'Sukses mengubah data Keranjang',
                data : result
            })
        } else {
            res.status(422).send({
                code : 422,
                message : 'Data keranjang tidak ditemukan'
            })
        }
    }).catch (err => {
        res.status(500).send({
            code : 500,
            message : 'Error mengubah data keranjang' + err
        })
    })
}

exports.hapusDataKeranjang = async (req, res) => {
     const id = req.params.id
     db.keranjang.destroy({where : {id : id}}).then(result => {
        res.send({
            code : 200,
            message : 'Data keranjang di hapus'
        })
     }).catch (err => {
        res.status(500).send({
            code : 500,
            message : 'Error menghapus data keranjang' + err
        })
     })
}

exports.checkout = async (req, res) => {
    const session_id = req.query.session_id

     const data = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        alamat : req.body.alamat,
        phone : req.body.phone,
     }

   const dataKeranjang =  await db.keranjang.findAll({
        where : { session_id : session_id}
     })

     if (dataKeranjang.length > 0) {
        const trs_number = 'TRS_' + Date.now()
        const trs_id = uuidv4()

        const dataTransaksi = {
           id : trs_id,
           trs_number : trs_number
        }

        await db.transaksi.create(dataTransaksi)

        await dataKeranjang.map((item, index) => {
            const dataTrsDetail = {
                qty : item.qty,
                produk_id : item.produk_id,
                trs_id : trs_id
            }

            db.transaksi_detail.create(dataTrsDetail)
            db.keranjang.destroy({where : {id : item.id}})
        })

        await db.customer.create(data)

        await res.status(200).send({
            code : 200,
            message : 'Sukses melakukan transaksi'
        })
     }

}
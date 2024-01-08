const express = require('express');
const router = express.Router();
const frontend = require('../controllers/frontend.controller');

router.get ('/produkHome', frontend.getProdukHome);
router.get('/produkPage', frontend.produkPage);
router.get('/produkDetail/:url', frontend.getProdukDetail);

//@Params : handle keranjang
router.get('/keranjang', frontend.getDataKeranjang);
router.post('/keranjang', frontend.tambahDataKeranjang);
router.put('/keranjang/:id', frontend.ubahDataKeranjang);
router.delete('/keranjang/:id', frontend.hapusDataKeranjang);

router.post('/checkout', frontend.checkout);

module.exports = router
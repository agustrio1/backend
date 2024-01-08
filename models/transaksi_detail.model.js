module.exports = (sequelize, Sequelize) => {
    const Transaksi_datail = sequelize.define('transaksi_detail', {
        qty : {
            type: Sequelize.INTEGER,
        },
    })

    return Transaksi_datail
}
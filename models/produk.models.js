module.exports = (sequelize, Sequelize) => {
    const Produk = sequelize.define('produk', {
        id : {
            type : Sequelize.STRING,
            primaryKey : true,
        },
        title : {
            type: Sequelize.STRING,
        },
        description : {
            type : Sequelize.STRING,
        },
        full_description : {
            type : Sequelize.STRING,
        },
        image : {
            type : Sequelize.STRING,
        },
        category_id : {
            type : Sequelize.INTEGER,
        },
        price : {
            type : Sequelize.INTEGER,
        },
        url : {
            type : Sequelize.STRING,
        }
    })

    return Produk
}
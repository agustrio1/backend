module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define('customer', {
        email : {
            type: Sequelize.STRING,
        },
        first_name : {
            type : Sequelize.STRING,
        },
        last_name : {
            type : Sequelize.STRING,
        },
        alamat : {
            type : Sequelize.STRING,
        },
        phone : {
            type : Sequelize.STRING,
        },
    })

    return Model
}
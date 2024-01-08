const schema = require('./produk.schema')

module.exports = {
    createProduk: async (req, res, next) => {
        const { error, value } = schema.create.validate(req.body)
        if (error) {
            res.status(422).send({
                code: 422,
                success: false,
                message: error.details[0].message
            })
        } else {
            next()
        }
    }
}

const schema = require('./kategori.schema')

module.exports = {
    createKategori : async (req, res, next) => {
        const {error, value} = schema.create.validate(req.body)
        if (error) {
            res.status(422).send({
                code: 422,
                succes : false,
                message : error.details[0].message
            })
        } else {
            next()
        }
    }
}
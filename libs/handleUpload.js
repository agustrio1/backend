const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './public')
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer ({
    storage : storage,
    limits : {
        fileSize: 1024 * 1024 * 3,
    },
    fileFilter : fileFilter
})

module.exports = upload
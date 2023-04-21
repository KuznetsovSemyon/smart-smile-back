const multer = require('multer');

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/');
    },

    filename: async (req, file, cb) => {
        if (!file) throw new Error('The file does not exist');

        const fileExtension = file.originalname.split('.').slice(-1)[0];
        const filename = `img_${file.fieldname}_${Date.now()}.${fileExtension}`;
        req.filename = filename;
        cb(null, filename);
    },
});

const imageFilter = (req, file, cb) => {
    const fileSize = +req.headers['content-length'];
    if (fileSize > 10 * 1024 * 1024) {
        const err = { error: true, message: 'max picture size is 10 mb' };
        return cb(new Error(err.message));
    }

    if (file.mimetype == 'image/png' || file.mimetype == 'image/webp') {
        cb(null, true);
    }
    else {
        const err = { error: true, message: 'only .png, .webp formats allowed' };
        return cb(new Error(err.message));
    }
};

const imageUpload = multer({
    storage: imageStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: imageFilter,
});

const handleUploadErrorCreator = (upload) => (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: true, message: err.message });
        }
        next();
    });
};

exports.imageUpload = handleUploadErrorCreator(imageUpload.any())

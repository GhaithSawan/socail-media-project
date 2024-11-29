const multer = require("multer");
const path = require("path");

const storageDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,"../images"));
    },
    filename: (req, file, cb) => {
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // تصحيح في تهجئة originalname
        } else {
            cb(new Error("file type is not correct"), false);
        }
    },
});

const upload = multer({
    storage: storageDisk,
    limits: { fileSize: 2 * 1024 * 1024 }, // الحجم 5 ميجابايت
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb(new Error("file type not supported"), false);
        }
    },
});

module.exports = {upload};

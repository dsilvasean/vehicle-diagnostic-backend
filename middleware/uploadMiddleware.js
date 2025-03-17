const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            if (!req.query.type) {
                return cb(new Error("Missing 'type' query parameter"));
            }

            const userId = req.user?.id; 
            if (!userId) {
                return cb(new Error("User ID not found"));
            }

            let uploadDir = "uploads";
            if (req.query.type === "avatar") {
                uploadDir = "uploads/avatar";
            }

            fs.mkdirSync(uploadDir, { recursive: true });

            cb(null, uploadDir);
        } catch (error) {
            cb(error);
        }
    },

    filename: (req, file, cb) => {
        try {
            const userId = req.user?.id || "anonymous";
            const timestamp = Date.now();
            const ext = path.extname(file.originalname); 
            req.filename = `u${userId}_${timestamp}${ext}`;
            cb(null, `u${userId}_${timestamp}${ext}`); 
        } catch (error) {
            cb(error);
        }
    },
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only images are allowed!"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = upload;

const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs"); // 🔥 ADD THIS

const mimetypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
};

// CREATE PATH
const uploadPath = path.join(__dirname, "../../uploads/images");

// CREATE FOLDER IF NOT EXISTS
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const ext = mimetypes[file.mimetype];
    cb(null, crypto.randomBytes(8).toString("hex") + Date.now() + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (!(file.mimetype in mimetypes)) {
      req.fileValidationError = true;
      return cb(null, false);
    }
    cb(null, true);
  },
});

module.exports = upload;

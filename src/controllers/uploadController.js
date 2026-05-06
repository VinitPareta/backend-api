const upload = require("../config/multer");

class UploadController {
  static uploadImage(req, res) {
    upload.single("file")(req, res, function (err) {
      if (req.fileValidationError) {
        return res.status(400).json({ message: "Invalid file type" });
      }

      if (err) {
        return res.status(500).json({ message: "Upload error" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const file = req.file;

      const response = {
        filename: file.filename,
        url: `http://localhost:5000/uploads/${file.filename}`,
      };

      return res.json({ file: response });
    });
  }
}

module.exports = UploadController;

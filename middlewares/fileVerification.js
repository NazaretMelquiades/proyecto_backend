const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage, // Carpeta donde se guardan los ficheros
  limits: { fileSize: 2 * 1024 * 1024 }, // Límite de 2MB por archivo
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; // Formato
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos JPG o PNG'));
    }
  },
});

const errorFileHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message === 'Image must be in JPG or PNG format') {
    return res.status(400).json({ success: false, error: err.message });
  }
  next(err);
};

module.exports = { upload, errorFileHandler };

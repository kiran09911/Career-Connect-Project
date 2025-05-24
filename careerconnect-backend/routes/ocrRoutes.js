const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { processOCR } = require('../controllers/ocrController');

console.log('Imported processOCR:', processOCR);
if (!processOCR) {
  throw new Error('processOCR is undefined. Check ocrController.js export.');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/ocr', upload.single('document'), processOCR);

module.exports = router;
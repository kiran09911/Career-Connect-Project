const axios = require('axios');
const fsPromises = require('fs').promises; // For promise-based operations
const fs = require('fs'); // For createReadStream
const path = require('path');
const FormData = require('form-data');
const db = require('../models/db'); // Import the database connection

const processOCR = async (req, res) => {
  try {
    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath)); // Use core fs for createReadStream
    formData.append('apikey', 'K83851798288957'); //  OCR.Space API key
    formData.append('language', 'eng');

    // Send request to OCR.Space API
    const response = await axios.post('https://api.ocr.space/parse/image', formData, {
      headers: formData.getHeaders(),
    });

    // Check for OCR.Space errors
    if (response.data.IsErroredOnProcessing) {
      throw new Error(response.data.ErrorMessage || 'OCR processing failed');
    }

    const text = response.data.ParsedResults[0]?.ParsedText || 'No text detected';

    // Save to MySQL
    const sql = 'INSERT INTO ocr_results (file_name, extracted_text, created_at) VALUES (?, ?, NOW())';
    db.query(sql, [req.file.originalname, text], (err) => {
      if (err) {
        console.error('Database Insert Error:', err);
        throw err;
      }
      console.log('OCR result saved to database');
    });

    // Clean up the uploaded file
    await fsPromises.unlink(filePath); // Use fs.promises for unlink

    // Send response to frontend
    res.status(200).json({ success: true, text });
  } catch (error) {
    console.error('OCR Error:', error);
    // Clean up file in case of error
    if (req.file && req.file.path) {
      await fsPromises.unlink(req.file.path).catch(err => console.log('Cleanup failed:', err));
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { processOCR };
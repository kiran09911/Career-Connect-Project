// const pool = require('../models/db');

// exports.getJobs = async (req, res) => {
//   try {
//     const connection = await pool.getConnection();
//     const [jobs] = await connection.query(
//       `SELECT j.id, j.title, j.company, j.location, j.description, j.salary, 
//               u.id AS recruiterId, u.name AS recruiterName
//        FROM jobs j
//        JOIN users u ON j.posted_by = u.id`
//     );
//     connection.release();
//     res.json(jobs);
//   } catch (err) {
//     console.error('Error fetching jobs:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// };

// exports.postJob = async (req, res) => {
//   try {
//     const { title, company, location, description, salary } = req.body;
//     const recruiterId = req.user.id;

//     const connection = await pool.getConnection();
//     const [result] = await connection.query(
//       `INSERT INTO jobs (title, company, location, description, salary, posted_by) 
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [title, company, location, description, salary, recruiterId]
//     );

//     connection.release();
//     res.status(201).json({ message: 'Job posted successfully', jobId: result.insertId });
//   } catch (err) {
//     console.error('Error posting job:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// };


// exports.getRecruiterJobs = async (req, res) => {
//   try {
//     const recruiterId = req.user.id; // Assuming the recruiter ID is stored in the token

//     const connection = await pool.getConnection();
//     const [jobs] = await connection.query(
//       'SELECT * FROM jobs WHERE posted_by = ?',
//       [recruiterId]
//     );

//     connection.release();

//     res.json(jobs);
//   } catch (err) {
//     console.error('Error fetching recruiter jobs:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// };

// exports.updateJob = async (req, res) => {
//   try {
//     const { id } = req.params; // Job ID from the URL
//     const { title, company, location, description, salary, jobType, skills } = req.body; // Job details from the request body
//     const recruiterId = req.user.id; // Recruiter ID from the token

//     const connection = await pool.getConnection();
//     const [result] = await connection.query(
//       `UPDATE jobs 
//        SET title = ?, company = ?, location = ?, description = ?, salary = ?, job_type = ?, skills = ? 
//        WHERE id = ? AND posted_by = ?`,
//       [title, company, location, description, salary, jobType, skills, id, recruiterId]
//     );

//     connection.release();

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Job not found or unauthorized' });
//     }

//     res.json({ message: 'Job updated successfully' });
//   } catch (err) {
//     console.error('Error updating job:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// };

// exports.deleteJob = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const recruiterId = req.user.id;

//     const connection = await pool.getConnection();
//     const [result] = await connection.query(
//       'DELETE FROM jobs WHERE id = ? AND posted_by = ?',
//       [id, recruiterId]
//     );

//     connection.release();

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'Job not found or unauthorized' });
//     }

//     res.json({ message: 'Job deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting job:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// };


const pool = require("../models/db"); // Adjusted to match your import path
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File type validation
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Only image files (JPEG, PNG, GIF) are allowed"));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
}).single("photo");

exports.getJobs = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [jobs] = await connection.query(
      `SELECT j.id, j.title, j.company, j.location, j.description, j.salary, 
              j.job_type, j.skills, j.posted_by, j.photo, j.created_at,
              u.id AS recruiterId, u.name AS recruiterName
       FROM jobs j
       JOIN users u ON j.posted_by = u.id`
    );
    connection.release();
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.postJob = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { title, company, location, description, salary, jobType, skills, posted_by } = req.body;
      const recruiterId = req.user.id;

      // Validate required fields
      if (!title || !company || !location || !description || !jobType || !posted_by) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }

      // Ensure the posted_by matches the authenticated user
      if (posted_by != recruiterId) {
        return res.status(403).json({ message: "Unauthorized to post job on behalf of another user" });
      }

      // Validate role
      if (req.user.role !== "recruiter" && !req.user.is_admin) {
        return res.status(403).json({ message: "Only recruiters can post jobs" });
      }

      const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

      const connection = await pool.getConnection();
      const [result] = await connection.query(
        `INSERT INTO jobs (title, company, location, description, salary, job_type, skills, posted_by, photo) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, company, location, description, salary, jobType, skills, posted_by, photoPath]
      );

      connection.release();
      res.status(201).json({ message: "Job posted successfully", jobId: result.insertId });
    } catch (err) {
      console.error("Error posting job:", err);
      // Clean up uploaded file if an error occurs
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: "Database error" });
    }
  });
};

exports.getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const connection = await pool.getConnection();
    const [jobs] = await connection.query(
      'SELECT id, title, company, location, description, salary, job_type, skills, posted_by, photo, created_at FROM jobs WHERE posted_by = ?',
      [recruiterId]
    );

    connection.release();
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching recruiter jobs:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.updateJob = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { id } = req.params;
      const { title, company, location, description, salary, jobType, skills } = req.body;
      const recruiterId = req.user.id;

      // Fetch the existing job to get the current photo path
      const connection = await pool.getConnection();
      const [existingJob] = await connection.query(
        'SELECT photo FROM jobs WHERE id = ? AND posted_by = ?',
        [id, recruiterId]
      );

      if (existingJob.length === 0) {
        connection.release();
        return res.status(404).json({ message: 'Job not found or unauthorized' });
      }

      const oldPhotoPath = existingJob[0].photo;
      const newPhotoPath = req.file ? `/uploads/${req.file.filename}` : oldPhotoPath;

      const [result] = await connection.query(
        `UPDATE jobs 
         SET title = ?, company = ?, location = ?, description = ?, salary = ?, job_type = ?, skills = ?, photo = ? 
         WHERE id = ? AND posted_by = ?`,
        [title, company, location, description, salary, jobType, skills, newPhotoPath, id, recruiterId]
      );

      // Delete the old photo if a new one was uploaded
      if (req.file && oldPhotoPath) {
        const fullPath = path.join(__dirname, "..", oldPhotoPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }

      connection.release();

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Job not found or unauthorized' });
      }

      res.json({ message: 'Job updated successfully' });
    } catch (err) {
      console.error('Error updating job:', err);
      // Clean up uploaded file if an error occurs
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: 'Database error' });
    }
  });
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const recruiterId = req.user.id;

    // Fetch the job to get the photo path
    const connection = await pool.getConnection();
    const [job] = await connection.query(
      'SELECT photo FROM jobs WHERE id = ? AND posted_by = ?',
      [id, recruiterId]
    );

    if (job.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    const photoPath = job[0].photo;

    const [result] = await connection.query(
      'DELETE FROM jobs WHERE id = ? AND posted_by = ?',
      [id, recruiterId]
    );

    // Delete the photo file if it exists
    if (photoPath) {
      const fullPath = path.join(__dirname, "..", photoPath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ error: 'Database error' });
  }
};


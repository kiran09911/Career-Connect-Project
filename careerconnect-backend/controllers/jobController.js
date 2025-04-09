const pool = require('../models/db');

exports.getJobs = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [jobs] = await connection.query(
      `SELECT j.id, j.title, j.company, j.location, j.description, j.salary, 
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
  try {
    const { title, company, location, description, salary } = req.body;
    const recruiterId = req.user.id;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `INSERT INTO jobs (title, company, location, description, salary, posted_by) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, company, location, description, salary, recruiterId]
    );

    connection.release();
    res.status(201).json({ message: 'Job posted successfully', jobId: result.insertId });
  } catch (err) {
    console.error('Error posting job:', err);
    res.status(500).json({ error: 'Database error' });
  }
};


exports.getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id; // Assuming the recruiter ID is stored in the token

    const connection = await pool.getConnection();
    const [jobs] = await connection.query(
      'SELECT * FROM jobs WHERE posted_by = ?',
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
  try {
    const { id } = req.params; // Job ID from the URL
    const { title, company, location, description, salary, jobType, skills } = req.body; // Job details from the request body
    const recruiterId = req.user.id; // Recruiter ID from the token

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `UPDATE jobs 
       SET title = ?, company = ?, location = ?, description = ?, salary = ?, job_type = ?, skills = ? 
       WHERE id = ? AND posted_by = ?`,
      [title, company, location, description, salary, jobType, skills, id, recruiterId]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.json({ message: 'Job updated successfully' });
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const recruiterId = req.user.id;

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'DELETE FROM jobs WHERE id = ? AND posted_by = ?',
      [id, recruiterId]
    );

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

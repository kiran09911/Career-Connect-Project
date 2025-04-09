const pool = require('../models/db');

exports.submitApplication = async (req, res) => {
  try {
    const { jobId, candidateId, recruiterId } = req.body;

    const connection = await pool.getConnection();

    // Verify that the job exists
    const [job] = await connection.query('SELECT id FROM jobs WHERE id = ?', [jobId]);
    if (job.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Job not found' });
    }

    // Verify that the recruiter exists
    const [recruiter] = await connection.query('SELECT id FROM users WHERE id = ?', [recruiterId]);
    if (recruiter.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Recruiter not found' });
    }

    // Insert the application
    const [result] = await connection.query(
      'INSERT INTO applications (job_id, candidate_id, recruiter_id) VALUES (?, ?, ?)',
      [jobId, candidateId, recruiterId]
    );

    connection.release();
    res.status(201).json({ message: 'Application submitted successfully', applicationId: result.insertId });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getApplicationsForRecruiter = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const connection = await pool.getConnection();

    // Fetch applications for jobs posted by the recruiter
    const [applications] = await connection.query(
      `SELECT a.id AS application_id, a.job_id, a.candidate_id, u.name AS candidate_name, 
              u.email AS candidate_email, j.title AS job_title, j.company AS job_company
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN users u ON a.candidate_id = u.id
       WHERE j.posted_by = ?`,
      [recruiterId]
    );

    connection.release();
    res.status(200).json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Database error' });
  }
};
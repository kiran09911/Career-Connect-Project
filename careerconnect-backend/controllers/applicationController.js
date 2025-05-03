
// const pool = require('../models/db');

// exports.submitApplication = async (req, res) => {
//   try {
//     const { jobId, recruiterId } = req.body; // Extract jobId and recruiterId from the request body
//     const candidateId = req.user.id; // Extract candidateId from the authenticated user's token

//     // Validate required fields
//     if (!jobId || !recruiterId) {
//       return res.status(400).json({ error: 'Job ID and Recruiter ID are required' });
//     }

//     const connection = await pool.getConnection();

//     // Verify that the job exists
//     const [job] = await connection.query('SELECT id FROM jobs WHERE id = ?', [jobId]);
//     if (job.length === 0) {
//       connection.release();
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     // Verify that the recruiter exists
//     const [recruiter] = await connection.query('SELECT id FROM users WHERE id = ?', [recruiterId]);
//     if (recruiter.length === 0) {
//       connection.release();
//       return res.status(404).json({ error: 'Recruiter not found' });
//     }

//     // Check if the candidate has already applied for the job
//     const [existingApplication] = await connection.query(
//       'SELECT id FROM applications WHERE job_id = ? AND candidate_id = ?',
//       [jobId, candidateId]
//     );
//     if (existingApplication.length > 0) {
//       connection.release();
//       return res.status(409).json({ error: 'You have already applied for this job' });
//     }

//     // Insert the application
//     const [result] = await connection.query(
//       'INSERT INTO applications (job_id, candidate_id, recruiter_id) VALUES (?, ?, ?)',
//       [jobId, candidateId, recruiterId]
//     );

//     connection.release();
//     res.status(201).json({ message: 'Application submitted successfully', applicationId: result.insertId });
//   } catch (err) {
//     console.error('Error submitting application:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// };

// exports.getApplicationsForRecruiter = async (req, res) => {
//   try {
//     const recruiterId = req.user.id;
    
//     const connection = await pool.getConnection();

//     // Fetch applications for jobs posted by the recruiter
//     const [applications] = await connection.query(
//       `SELECT a.id AS application_id, a.job_id, a.candidate_id, a.created_at AS applied_date, u.name AS candidate_name, 
//               u.email AS candidate_email, j.title AS job_title, j.company AS job_company
//        FROM applications a
//        JOIN jobs j ON a.job_id = j.id
//        JOIN users u ON a.candidate_id = u.id
//        WHERE j.posted_by = ?`,
//       [recruiterId]
//     );

//     console.log('Applications fetched:', applications.length); // Debugging

//     connection.release();
//     res.status(200).json(applications);
//   } catch (err) {
//     console.error('Error fetching applications:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// };

// exports.getAppliedJobsByCandidate = async (req, res) => {
//   try {
//     const candidateId = req.user.id; // Extract candidate ID from the token

//     const connection = await pool.getConnection();

//     // Fetch jobs applied by the candidate
//     const [appliedJobs] = await connection.query(
//       `SELECT a.id AS application_id, j.id AS job_id, j.title, j.company, j.location, j.job_type, j.salary, a.created_at
//        FROM applications a
//        JOIN jobs j ON a.job_id = j.id
//        WHERE a.candidate_id = ?`,
//       [candidateId]
//     );

//     connection.release();
//     res.status(200).json(appliedJobs);
//   } catch (err) {
//     console.error('Error fetching applied jobs:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// };

// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     if (!req.user) {
//       console.error('req.user is undefined in updateApplicationStatus', { reqUser: req.user });
//       return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
//     }

//     const { status } = req.body;
//     const applicationId = req.params.id;
//     const recruiterId = req.user.id;

//     if (!['accepted', 'rejected', 'pending'].includes(status)) {
//       console.error('Invalid status provided', { status });
//       return res.status(400).json({ error: 'Invalid status. Must be "accepted", "rejected", or "pending"' });
//     }

//     const connection = await pool.getConnection();

//     try {
//       const [result] = await connection.query(
//         'UPDATE applications SET status = ? WHERE id = ? AND recruiter_id = ?',
//         [status, applicationId, recruiterId]
//       );

//       if (result.affectedRows === 0) {
//         console.error('Application not found or unauthorized', { applicationId, recruiterId });
//         return res.status(403).json({ error: 'Application not found or unauthorized' });
//       }

//       res.status(200).json({ message: 'Application status updated successfully' });
//     } finally {
//       connection.release();
//     }
//   } catch (err) {
//     console.error('Error updating application status:', {
//       message: err.message,
//       stack: err.stack,
//       sqlMessage: err.sqlMessage,
//       sqlState: err.sqlState,
//       code: err.code
//     });
//     res.status(500).json({ error: 'Database error', details: err.message });
//   }
// };

const pool = require('../models/db');

exports.submitApplication = async (req, res) => {
  try {
    const { jobId, recruiterId } = req.body; // Extract jobId and recruiterId from the request body
    const candidateId = req.user.id; // Extract candidateId from the authenticated user's token

    // Validate required fields
    if (!jobId || !recruiterId) {
      return res.status(400).json({ error: 'Job ID and Recruiter ID are required' });
    }

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

    // Check if the candidate has already applied for the job
    const [existingApplication] = await connection.query(
      'SELECT id FROM applications WHERE job_id = ? AND candidate_id = ?',
      [jobId, candidateId]
    );
    if (existingApplication.length > 0) {
      connection.release();
      return res.status(409).json({ error: 'You have already applied for this job' });
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
      `SELECT a.id AS application_id, a.job_id, a.candidate_id, a.status, a.created_at AS applied_date, 
              COALESCE(u.name, 'Unknown') AS candidate_name, 
              u.email AS candidate_email, j.title AS job_title, j.company AS job_company
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN users u ON a.candidate_id = u.id
       WHERE j.posted_by = ?`,
      [recruiterId]
    );

    console.log('Applications fetched:', applications.length); // Debugging

    connection.release();
    res.status(200).json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getAppliedJobsByCandidate = async (req, res) => {
  try {
    const candidateId = req.user.id; // Extract candidate ID from the token

    const connection = await pool.getConnection();

    // Fetch jobs applied by the candidate
    const [appliedJobs] = await connection.query(
      `SELECT a.id AS application_id, a.job_id, a.recruiter_id, a.status, a.created_at,
              j.title, j.company, j.location, j.job_type, j.salary,
              COALESCE(u.name, 'Unknown') AS recruiter_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN users u ON a.recruiter_id = u.id
       WHERE a.candidate_id = ?`,
      [candidateId]
    );

    connection.release();
    res.status(200).json(appliedJobs);
  } catch (err) {
    console.error('Error fetching applied jobs:', err);
    res.status(500).json({ error: 'Database error' });
  }
};


exports.updateApplicationStatus = async (req, res) => {
  try {
    if (!req.user) {
      console.error('req.user is undefined in updateApplicationStatus', { reqUser: req.user });
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    const { status } = req.body;
    const applicationId = req.params.id;
    const recruiterId = req.user.id;

    if (!['accepted', 'rejected', 'pending'].includes(status)) {
      console.error('Invalid status provided', { status });
      return res.status(400).json({ error: 'Invalid status. Must be "accepted", "rejected", or "pending"' });
    }

    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(
        'UPDATE applications SET status = ? WHERE id = ? AND recruiter_id = ?',
        [status, applicationId, recruiterId]
      );

      if (result.affectedRows === 0) {
        console.error('Application not found or unauthorized', { applicationId, recruiterId });
        return res.status(403).json({ error: 'Application not found or unauthorized' });
      }

      res.status(200).json({ message: 'Application status updated successfully' });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Error updating application status:', {
      message: err.message,
      stack: err.stack,
      sqlMessage: err.sqlMessage,
      sqlState: err.sqlState,
      code: err.code
    });
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  const { jobId } = req.params
  const candidateId = req.user.id // From authMiddleware

  try {
    // Verify the application exists for this candidate
    const [applications] = await pool.query(
      "SELECT * FROM applications WHERE job_id = ? AND candidate_id = ?",
      [jobId, candidateId]
    )

    if (applications.length === 0) {
      return res.status(404).json({ error: "Application not found or you don't have permission to delete it" })
    }

    // Delete the application
    await pool.query(
      "DELETE FROM applications WHERE job_id = ? AND candidate_id = ?",
      [jobId, candidateId]
    )

    res.json({ message: "Application deleted successfully" })
  } catch (err) {
    console.error("Error deleting application:", err)
    res.status(500).json({ error: "Server error", details: err.message, code: err.code })
  }
}
const pool = require("../models/db");
const jwt = require("jsonwebtoken");

exports.isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.is_admin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.user = decoded; // Attach decoded token to request
    next();
  } catch (err) {
    console.error("Error checking admin status:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [users] = await connection.query(
        "SELECT id, name, email, role, COALESCE(status, 'active') AS status, created_at FROM users WHERE status != 'deleted' OR status IS NULL ORDER BY created_at DESC"
      );
      res.json(users);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "DELETE FROM users WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// Update user (e.g., suspend)
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  if (!status || !['active', 'suspended', 'deleted'].includes(status)) {
    return res.status(400).json({ message: "Invalid status value. Must be 'active', 'suspended', or 'deleted'" });
  }

  try {
    const connection = await pool.getConnection();
    try {
      const updates = { status };

      const [result] = await connection.query(
        "UPDATE users SET ? WHERE id = ?",
        [updates, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      // Fetch the updated user
      const [updatedUser] = await connection.query(
        "SELECT id, name, email, role, status, created_at FROM users WHERE id = ?",
        [id]
      );

      if (updatedUser.length === 0) {
        return res.status(404).json({ message: "User not found after update" });
      }

      res.json({ message: "User updated successfully", user: updatedUser[0] });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [jobs] = await connection.query(
        "SELECT j.*, u.name AS recruiter_name " +
        "FROM jobs j " +
        "LEFT JOIN users u ON j.posted_by = u.id " +
        "ORDER BY j.created_at DESC"
      );
      res.json(jobs);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// Delete a job
exports.deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "DELETE FROM jobs WHERE id = ?",
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json({ message: "Job deleted successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ message: "Failed to delete job" });
  }
};



// Get all applications
exports.getApplications = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [applications] = await connection.query(
        "SELECT a.*, j.title AS job_title, u1.name AS candidate_name, u2.name AS recruiter_name " +
        "FROM applications a " +
        "JOIN jobs j ON a.job_id = j.id " +
        "JOIN users u1 ON a.candidate_id = u1.id " +
        "JOIN users u2 ON a.recruiter_id = u2.id " +
        "ORDER BY a.created_at DESC"
      );
      res.json(applications);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

// Update application status
exports.updateApplication = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.query(
        "UPDATE applications SET status = ? WHERE id = ?",
        [status, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Application not found" });
      }

      res.json({ message: "Application updated successfully" });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error updating application:", err);
    res.status(500).json({ message: "Failed to update application" });
  }
};

// Get platform analytics
exports.getAnalytics = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [userCount] = await connection.query("SELECT COUNT(*) AS count FROM users");
      const [jobCount] = await connection.query("SELECT COUNT(*) AS count FROM jobs");
      const [applicationCount] = await connection.query("SELECT COUNT(*) AS count FROM applications");
      const [messageCount] = await connection.query("SELECT COUNT(*) AS count FROM messages");

      const analytics = {
        totalUsers: userCount[0].count,
        totalJobs: jobCount[0].count,
        totalApplications: applicationCount[0].count,
        totalMessages: messageCount[0].count,
      };

      res.json(analytics);
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};



// Submit feedback from Contact Us form
exports.submitFeedback = (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = "INSERT INTO feedback (first_name, last_name, email, message) VALUES (?, ?, ?, ?)";
    pool.query(query, [firstName, lastName, email, message], (err, result) => {
        if (err) {
            console.error("Error inserting feedback:", err);
            return res.status(500).json({ error: "Failed to submit feedback" });
        }
        res.status(200).json({ message: "Feedback submitted successfully" });
    });
};

exports.getFeedback = async (req, res) => {
    const query = "SELECT * FROM feedback ORDER BY submitted_at DESC";
    try {
        const [results] = await pool.query(query);
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching feedback:", err);
        res.status(500).json({ error: "Failed to fetch feedback", details: err.message });
    }
};

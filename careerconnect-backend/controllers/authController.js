
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const pool = require("../models/db");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Prevent registering as admin via this endpoint
//     if (role === "admin") {
//       return res.status(403).json({ message: "Admin registration is not allowed" });
//     }

//     if (!["candidate", "recruiter"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const connection = await pool.getConnection();

//     const [result] = await connection.query(
//       "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
//       [name, email, hashedPassword, role]
//     );

//     const token = jwt.sign({ id: result.insertId, role, is_admin: false }, JWT_SECRET, { expiresIn: "30d" });

//     connection.release();
//     res.status(201).json({ 
//       message: "User registered successfully", 
//       token, 
//       userId: result.insertId, 
//       role,
//       name,
//       is_admin: false 
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     if (error.code === "ER_DUP_ENTRY") {
//       return res.status(400).json({ message: "Email already exists" });
//     }
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // Admin login
//     if (role === "admin") {
//       const admins = [
//         { email: process.env.ADMIN1_EMAIL, password: process.env.ADMIN1_PASSWORD },
//         { email: process.env.ADMIN2_EMAIL, password: process.env.ADMIN2_PASSWORD },
//         { email: process.env.ADMIN3_EMAIL, password: process.env.ADMIN3_PASSWORD }
//       ];

//       const admin = admins.find((a) => a.email === email);
//       if (!admin) {
//         return res.status(401).json({ message: "Invalid admin email" });
//       }

//       // For plaintext passwords
//       if (admin.password !== password) {
//         return res.status(401).json({ message: "Invalid admin password" });
//       }

     

//       const token = jwt.sign({ email: admin.email, role: "admin", is_admin: true }, JWT_SECRET, { expiresIn: "30d" });

//       return res.json({
//         message: "Login successful",
//         token,
//         userId: null, // Admins don't have a database ID
//         role: "admin",
//         name: "Admin",
//         is_admin: true
//       });
//     }

//     // Non-admin login
//     const connection = await pool.getConnection();
//     const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
//     if (rows.length === 0) {
//       connection.release();
//       return res.status(400).json({ message: "User not found" });
//     }

//     const user = rows[0];
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       connection.release();
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const token = jwt.sign({ id: user.id, role: user.role, is_admin: false }, JWT_SECRET, { expiresIn: "30d" });

//     connection.release();
//     res.json({
//       message: "Login successful",
//       token,
//       userId: user.id,
//       role: user.role,
//       name: user.name,
//       is_admin: false
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     console.log("Received forgot password request for email:", email);

//     // Prevent password reset for admin accounts
//     const admins = [
//       process.env.ADMIN1_EMAIL,
//       process.env.ADMIN2_EMAIL,
//       process.env.ADMIN3_EMAIL
//     ];
//     if (admins.includes(email)) {
//       return res.status(403).json({ message: "Password reset is not allowed for admin accounts" });
//     }

//     const connection = await pool.getConnection();
//     console.log("Database connection established.");

//     const [user] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
//     console.log("User query result:", user);

//     if (user.length === 0) {
//       connection.release();
//       console.log("User not found.");
//       return res.status(404).json({ message: "User with this email does not exist." });
//     }

//     const resetToken = Math.random().toString(36).substring(2, 15);
//     console.log("Generated reset token:", resetToken);

//     await connection.query("UPDATE users SET reset_token = ? WHERE email = ?", [resetToken, email]);
//     connection.release();
//     console.log("Reset token saved to database.");

//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
//     console.log("Reset link:", resetLink);

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset Request",
//       html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`
//     });
//     console.log("Reset email sent.");

//     res.json({ message: "Password reset link has been sent to your email." });
//   } catch (err) {
//     console.error("Error handling forgot password:", err);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     if (!password) {
//       return res.status(400).json({ message: "New password is required" });
//     }

//     const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
//     if (!passwordRegex.test(password)) {
//       return res.status(400).json({ message: "Password must contain at least one capital letter and one number" });
//     }

//     const connection = await pool.getConnection();

//     // Verify the reset token
//     const [user] = await connection.query("SELECT * FROM users WHERE reset_token = ?", [token]);
//     if (user.length === 0) {
//       connection.release();
//       return res.status(400).json({ message: "Invalid or expired reset token." });
//     }

//     // Hash the new password
//     const hashedPassword = bcrypt.hashSync(password, 10);

//     // Update the user's password and clear the reset token
//     await connection.query("UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?", [
//       hashedPassword,
//       token
//     ]);
//     connection.release();

//     res.status(200).json({ message: "Password reset successfully." });
//   } catch (err) {
//     console.error("Error resetting password:", err);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../models/db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent registering as admin via this endpoint
    if (role === "admin") {
      return res.status(403).json({ message: "Admin registration is not allowed" });
    }

    if (!["candidate", "recruiter"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      "INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, role, 'active'] // Default status to 'active'
    );

    const token = jwt.sign({ id: result.insertId, role, is_admin: false }, JWT_SECRET, { expiresIn: "30d" });

    connection.release();
    res.status(201).json({ 
      message: "User registered successfully", 
      token, 
      userId: result.insertId, 
      role,
      name,
      is_admin: false,
      status: 'active' // Include status in response
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Admin login
    if (role === "admin") {
      const admins = [
        { email: process.env.ADMIN1_EMAIL, password: process.env.ADMIN1_PASSWORD },
        { email: process.env.ADMIN2_EMAIL, password: process.env.ADMIN2_PASSWORD },
        { email: process.env.ADMIN3_EMAIL, password: process.env.ADMIN3_PASSWORD }
      ];

      const admin = admins.find((a) => a.email === email);
      if (!admin) {
        return res.status(401).json({ message: "Invalid admin email" });
      }

      // For plaintext passwords
      if (admin.password !== password) {
        return res.status(401).json({ message: "Invalid admin password" });
      }

      const token = jwt.sign({ email: admin.email, role: "admin", is_admin: true }, JWT_SECRET, { expiresIn: "30d" });

      return res.json({
        message: "Login successful",
        token,
        userId: null, // Admins don't have a database ID
        role: "admin",
        name: "Admin",
        is_admin: true,
        status: 'active' // Assume admin status is always active
      });
    }

    // Non-admin login
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      connection.release();
      return res.status(400).json({ message: "User not found" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Check user status
    if (user.status === 'suspended') {
      connection.release();
      return res.status(403).json({ message: 'Your account is suspended. Please contact support.' });
    }
    if (user.status === 'deleted') {
      connection.release();
      return res.status(403).json({ message: 'Your account has been deleted.' });
    }
    if (user.status !== 'active') {
      connection.release();
      return res.status(403).json({ message: 'Your account is not active.' });
    }

    const token = jwt.sign({ id: user.id, role: user.role, is_admin: false }, JWT_SECRET, { expiresIn: "30d" });

    connection.release();
    res.json({
      message: "Login successful",
      token,
      userId: user.id,
      role: user.role,
      name: user.name,
      is_admin: false,
      status: user.status // Include status in response
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("Received forgot password request for email:", email);

    // Prevent password reset for admin accounts
    const admins = [
      process.env.ADMIN1_EMAIL,
      process.env.ADMIN2_EMAIL,
      process.env.ADMIN3_EMAIL
    ];
    if (admins.includes(email)) {
      return res.status(403).json({ message: "Password reset is not allowed for admin accounts" });
    }

    const connection = await pool.getConnection();
    console.log("Database connection established.");

    const [user] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log("User query result:", user);

    if (user.length === 0) {
      connection.release();
      console.log("User not found.");
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    const resetToken = Math.random().toString(36).substring(2, 15);
    console.log("Generated reset token:", resetToken);

    await connection.query("UPDATE users SET reset_token = ? WHERE email = ?", [resetToken, email]);
    connection.release();
    console.log("Reset token saved to database.");

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    console.log("Reset link:", resetLink);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`
    });
    console.log("Reset email sent.");

    res.json({ message: "Password reset link has been sent to your email." });
  } catch (err) {
    console.error("Error handling forgot password:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ message: "New password is required" });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least one capital letter and one number" });
    }

    const connection = await pool.getConnection();

    // Verify the reset token
    const [user] = await connection.query("SELECT * FROM users WHERE reset_token = ?", [token]);
    if (user.length === 0) {
      connection.release();
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Update the user's password and clear the reset token
    await connection.query("UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?", [
      hashedPassword,
      token
    ]);
    connection.release();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
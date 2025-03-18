const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads")); // Serve uploaded profile images

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "career_connect",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error:" ,err);
    return;
  }
  console.log("MySQL Connected..." );
});


// ✅ Set up Multer for profile picture uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// **1️⃣ Fetch User Profile Data**
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT name, email, role, profile_picture, about, location, skills FROM users WHERE id = ?", [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(result[0]);
  });
});

// **2️⃣ Update User Profile Data**
app.post("/profile/update/:id", upload.single("profile_picture"), (req, res) => {
  const { id } = req.params;
  const { name, about, location, skills } = req.body;
  const profile_picture = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = "UPDATE users SET name=?, about=?, location=?, skills=? " + (profile_picture ? ", profile_picture=? " : "") + "WHERE id=?";
  const values = profile_picture ? [name, about, location, skills, profile_picture, id] : [name, about, location, skills, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ message: "Profile updated successfully!" });
  });
});

//  Correctly define the transporter before using it
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kirantimalsina16@gmail.com", 
    pass: "uksf qjta wvcg lvfr",   
  },
});

//  Forgot Password Route**
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: "User not found" });

    const token = crypto.randomBytes(20).toString("hex"); // ✅ Generate reset token
    const expireTime = Date.now() + 3600000; // Token expires in 1 hour

    // Store token & expiry in the database
    db.query(
      "UPDATE users SET reset_token=?, reset_expires=? WHERE email=?",
      [token, expireTime, email],
      (err) => {
        if (err) return res.status(500).json({ message: "Database error" });

        // ✅ Use the defined `transporter` for sending email
        const resetUrl = `http://localhost:3000/reset-password/${token}`;
        const mailOptions = {
          from: "your-email@gmail.com",
          to: email,
          subject: "CareerConnect Password Reset",
          html: `<p>You requested a password reset.</p><p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) return res.status(500).json({ message: "Error sending email" });
          res.json({ message: "Password reset link sent to your email" });
        });
      }
    );
  });
});

// **2️⃣ Reset Password Route**
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  db.query("SELECT * FROM users WHERE reset_token = ?", [token], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: "Invalid token" });

    const user = results[0];
    if (Date.now() > user.reset_expires) return res.status(400).json({ message: "Token expired" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password & clear reset token
    db.query(
      "UPDATE users SET password=?, reset_token=NULL, reset_expires=NULL WHERE email=?",
      [hashedPassword, user.email],
      (err) => {
        if (err) return res.status(500).json({ message: "Error updating password" });
        res.json({ message: "Password reset successful! You can now log in." });
      }
    );
  });
});


// Register Route
// User Registration Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
      if (err) {
        console.error("Error saving user:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.json({ message: "User registered successfully!" });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Login Route

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: "User not found" });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user.id, role: user.role }, "your_secret_key", { expiresIn: "2h" });

    res.json({ message: "Login successful", token, role: user.role });
  });
});

// POST route to create a new job
app.post('/post-job', (req, res) => {
  const { title, company, location, description, salary } = req.body;
  const sql = 'INSERT INTO jobs (title, company, location, description, salary) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, company, location, description, salary], (err, _result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error posting job' });
    } else {
      res.status(200).json({ message: 'Job posted successfully' });
    }
  });
});

// Fetch all posted jobs
app.get("/api/jobs", (req, res) => {
  db.query("SELECT * FROM jobs", (err, results) => { 
    if (err) {
      console.error("Database error:", err);
      res.status(500).send("Database error");
    } else {
      res.json(results);
    }
  });
});

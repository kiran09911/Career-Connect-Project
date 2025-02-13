const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Connection } = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

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

// Utility to wrap MySQL query in a Promise

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to database
    db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err, _result) => {
      if (err) {
        console.error("Error saving user:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Login Route

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Query user from MySQL database
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, rows) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Server error" });
      }

      // Ensure user exists
      if (rows.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = rows[0]; // Extract the first user

      // Compare password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, "your_secret_key", { expiresIn: "1h" });

      // Return success message and token
      res.status(200).json({ message: "Login successful", token });
    });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
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
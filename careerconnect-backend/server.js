// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto"); 
// const nodemailer = require("nodemailer");
// const http = require("http");




// require("dotenv").config();
// require("mongoose");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// const server = http.createServer(app);

// app.use("/uploads", express.static("uploads")); // Serve uploaded profile images

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

// // Database Connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "career_connect",
// });

// db.connect((err) => {
//   if (err) {
//     console.error("MySQL Connection Error:" ,err);
//     return;
//   }
//   console.log("MySQL Connected..." );
// });
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); 
const nodemailer = require("nodemailer");
const http = require("http");
const socketIo = require("socket.io");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"]
  }
});

app.use("/uploads", express.static("uploads"));

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "career_connect",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Connection Error:", err);
    return;
  }
  console.log("MySQL Connected...");
});



// Change app.listen to server.listen
server.listen(5000, () => {
  console.log("Server running on port 5000 with Socket.IO");
});
// Add authentication middleware for Socket.io
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));
  
  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) return next(new Error('Authentication error'));
    socket.userId = decoded.id;
    next();
  });
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.userId);

  // Join user's personal room
  socket.join(`user_${socket.userId}`);

  // Handle message sending with conversation tracking
  socket.on('sendMessage', async (messageData) => {
    try {
      const { receiver_id, content, job_id } = messageData;
      const sender_id = socket.userId;

      // Find or create conversation
      const [conversation] = await new Promise((resolve, reject) => {
        db.query(`
          SELECT id FROM conversations 
          WHERE (user1_id = ? AND user2_id = ?) 
          OR (user1_id = ? AND user2_id = ?)
          LIMIT 1
        `, [sender_id, receiver_id, receiver_id, sender_id], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      let conversation_id;
      if (conversation && conversation.length > 0) {
        conversation_id = conversation[0].id;
      } else {
        // Create new conversation
        const [newConv] = await new Promise((resolve, reject) => {
          db.query(`
            INSERT INTO conversations (user1_id, user2_id, job_id)
            VALUES (?, ?, ?)
          `, [sender_id, receiver_id, job_id || null], (err, results) => {
            if (err) reject(err);
            else resolve(results);
          });
        });
        conversation_id = newConv.insertId;
      }

      // Insert message
      const [messageResult] = await new Promise((resolve, reject) => {
        db.query(`
          INSERT INTO messages (sender_id, receiver_id, content, conversation_id)
          VALUES (?, ?, ?, ?)
        `, [sender_id, receiver_id, content, conversation_id], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      // Update conversation's last message
      await new Promise((resolve, reject) => {
        db.query(`
          UPDATE conversations 
          SET last_message_id = ?
          WHERE id = ?
        `, [messageResult.insertId, conversation_id], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      // Get full message details
      const [message] = await new Promise((resolve, reject) => {
        db.query(`
          SELECT m.*, u.name as sender_name, u.id as sender_id
          FROM messages m
          JOIN users u ON m.sender_id = u.id
          WHERE m.id = ?
        `, [messageResult.insertId], (err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
      });

      // Emit to both participants
      io.to(`user_${receiver_id}`).to(`user_${sender_id}`).emit('receiveMessage', message[0]);

    } catch (err) {
      console.error('Error handling message:', err);
      socket.emit('messageError', { error: 'Failed to send message' });
    }
  });

  // Handle typing indicator
  socket.on('typing', ({ receiver_id, isTyping }) => {
    io.to(`user_${receiver_id}`).emit('typing', {
      sender_id: socket.userId,
      isTyping
    });
  });

  // Handle message read status
  socket.on('markAsRead', async (messageIds) => {
    try {
      await new Promise((resolve, reject) => {
        db.query(`
          UPDATE messages 
          SET is_read = TRUE 
          WHERE id IN (?) AND receiver_id = ?
        `, [messageIds, socket.userId], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.userId);
  });
});

// Get all conversations for a user
app.get('/api/conversations/:userId', (req, res) => {
  const { userId } = req.params;
  
  db.query(`
    SELECT 
      c.id,
      c.job_id,
      CASE 
        WHEN c.user1_id = ? THEN u2.id
        ELSE u1.id
      END as other_user_id,
      CASE 
        WHEN c.user1_id = ? THEN u2.name
        ELSE u1.name
      END as other_user_name,
      m.content as last_message,
      m.created_at as last_message_time,
      SUM(CASE WHEN m.receiver_id = ? AND m.is_read = FALSE THEN 1 ELSE 0 END) as unread_count
    FROM conversations c
    JOIN users u1 ON c.user1_id = u1.id
    JOIN users u2 ON c.user2_id = u2.id
    LEFT JOIN messages m ON c.last_message_id = m.id
    WHERE c.user1_id = ? OR c.user2_id = ?
    GROUP BY c.id
    ORDER BY last_message_time DESC
  `, [userId, userId, userId, userId, userId], (err, results) => {
    if (err) {
      console.error('Error fetching conversations:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Get messages for a conversation
app.get('/api/messages/conversation/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  
  db.query(`
    SELECT m.*, u.name as sender_name
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.conversation_id = ?
    ORDER BY m.created_at ASC
  `, [conversationId], (err, results) => {
    if (err) {
      console.error('Error fetching messages:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// API route to fetch user data
app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
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

        transporter.sendMail(mailOptions, (err) => {
          if (err) return res.status(500).json({ message: "Error sending email" });
          res.json({ message: "Password reset link sent to your email" });
        });
      }
    );
  });
});

//  Reset Password Route**
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
    db.query(sql, [name, email, hashedPassword, role], (err) => {
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
// Apply for a job
app.post('/api/applications', (req, res) => {
  const { jobId, candidateId, recruiterId } = req.body;
  
  db.query(
    'INSERT INTO applications (job_id, candidate_id, recruiter_id, status) VALUES (?, ?, ?, "pending")',
    [jobId, candidateId, recruiterId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ 
          message: 'Application submitted successfully',
          applicationId: result.insertId
        });
      }
    }
  );
});

// Get job details including recruiter ID
app.get('/api/jobs', (req, res) => {
  db.query(`
    SELECT j.*, u.id as posted_by 
    FROM jobs j
    JOIN users u ON j.posted_by = u.id
  `, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// In your backend (server.js)
app.get('/api/jobs/recruiter', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    db.query(
      'SELECT * FROM jobs WHERE posted_by = ?',
      [decoded.id],
      (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(results);
      }
    );
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.delete('/api/jobs/:id', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    db.query(
      'DELETE FROM jobs WHERE id = ? AND posted_by = ?',
      [req.params.id, decoded.id],
      (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Job not found or not authorized' });
        }
        res.json({ message: 'Job deleted successfully' });
      }
    );
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});
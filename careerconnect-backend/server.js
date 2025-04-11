// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const http = require('http');
// const multer = require('multer');
// const socketIo = require('socket.io');
// const path = require('path');
// const authenticateToken = require('./middleware/authMiddleware');

// // Initialize Express app
// const app = express();
// const server = http.createServer(app);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
// // Configuration
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// const PORT = process.env.PORT || 5000;

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Directory to store uploaded images
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });


// // Endpoint to upload profile image
// app.post('/api/recruiter/upload-image', authenticateToken, upload.single('image'), async (req, res) => {
//   try {
//     const recruiterId = req.user.id;
//     const imagePath = req.file.path;

//     const connection = await pool.getConnection();

//     // Update the recruiter's profile with the image path
//     const [result] = await connection.query(
//       `UPDATE users SET profile_picture = ? WHERE id = ?`,
//       [imagePath, recruiterId]
//     );

//     connection.release();

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Recruiter not found' });
//     }

//     res.json({ message: 'Image uploaded successfully', imagePath });
//   } catch (err) {
//     console.error('Error uploading image:', err);
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// });


// // Middleware
// app.use(cors());
// app.use(express.json());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // MySQL Connection Pool
// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'career_connect',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Test database connection
// pool.getConnection()
//   .then(connection => {
//     console.log('MySQL connected successfully');
//     connection.release();
//   })
//   .catch(err => {
//     console.error('MySQL connection error:', err);
//     process.exit(1);
//   });



// const io = require('socket.io')(server, {
//   cors: {
//     origin: "http://localhost:3000", // or your frontend URL
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// // Socket.IO Authentication
// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   if (!token) return next(new Error('Authentication error'));
  
//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) return next(new Error('Authentication error'));
//     socket.userId = decoded.id;
//     next();
//   });
// });

// // Socket.IO Events
// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.userId}`);
//   socket.join(`user_${socket.userId}`);

//   socket.on('sendMessage', async (messageData) => {
//     try {
//       const { receiver_id, content, job_id } = messageData;
//       const sender_id = socket.userId;
//       const connection = await pool.getConnection();

//       try {
//         // Find or create conversation
//         const [conversations] = await connection.query(
//           `SELECT id FROM conversations 
//           WHERE (user1_id = ? AND user2_id = ?) 
//           OR (user1_id = ? AND user2_id = ?) 
//           LIMIT 1`,
//           [sender_id, receiver_id, receiver_id, sender_id]
//         );

//         let conversation_id;
//         if (conversations.length > 0) {
//           conversation_id = conversations[0].id;
//         } else {
//           const [result] = await connection.query(
//             `INSERT INTO conversations (user1_id, user2_id, job_id)
//             VALUES (?, ?, ?)`,
//             [sender_id, receiver_id, job_id || null]
//           );
//           conversation_id = result.insertId;
//         }

//         // Insert message
//         const [messageResult] = await connection.query(
//           `INSERT INTO messages (sender_id, receiver_id, content, conversation_id)
//           VALUES (?, ?, ?, ?)`,
//           [sender_id, receiver_id, content, conversation_id]
//         );

//         // Update conversation's last message
//         await connection.query(
//           `UPDATE conversations 
//           SET last_message_id = ?
//           WHERE id = ?`,
//           [messageResult.insertId, conversation_id]
//         );

//         // Get full message details
//         const [messages] = await connection.query(
//           `SELECT m.*, u.name as sender_name, u.id as sender_id
//           FROM messages m
//           JOIN users u ON m.sender_id = u.id
//           WHERE m.id = ?`,
//           [messageResult.insertId]
//         );

//         // Emit to both participants
//         io.to(`user_${receiver_id}`).to(`user_${sender_id}`).emit('receiveMessage', messages[0]);
//       } finally {
//         connection.release();
//       }
//     } catch (err) {
//       console.error('Error handling message:', err);
//       socket.emit('messageError', { error: 'Failed to send message' });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.userId}`);
//   });
// });

// // API Routes

// // Get authenticated user
// app.get('/api/user', async (req, res) => {
//   let connection;
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ error: 'No token provided' });

//     const decoded = jwt.verify(token, JWT_SECRET);
//     connection = await pool.getConnection();
    
//     const [rows] = await connection.query(
//       'SELECT id, name, email, role FROM users WHERE id = ?',
//       [decoded.id]
//     );
    
//     if (rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }
    
//     res.json(rows[0]);
//   } catch (err) {
//     console.error('API Error:', err);
//     if (err.name === 'JsonWebTokenError') {
//       return res.status(401).json({ error: 'Invalid token' });
//     }
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) connection.release();
//   }
// });



// // User Registration
// app.post('/register', async (req, res) => {
//   let connection;
//   try {
//     const { name, email, password, role } = req.body;
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     connection = await pool.getConnection();
    
//     const [result] = await connection.query(
//       'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
//       [name, email, hashedPassword, role]
//     );
    
//     const token = jwt.sign(
//       { id: result.insertId, role },
//       JWT_SECRET,
//       { expiresIn: '30d' }
//     );

//     res.status(201).json({ 
//       message: 'User registered successfully',
//       token,
//       userId: result.insertId,
//       role
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     if (error.code === 'ER_DUP_ENTRY') {
//       return res.status(400).json({ message: 'Email already exists' });
//     }
//     res.status(500).json({ message: 'Server error' });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// // User Login
// app.post('/login', async (req, res) => {
//   let connection;
//   try {
//     const { email, password } = req.body;
//     connection = await pool.getConnection();
    
//     const [rows] = await connection.query(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );
    
//     if (rows.length === 0) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const user = rows[0];
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Incorrect password' });
//     }

//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       JWT_SECRET,
//       { expiresIn: '30d' }
//     );

//     res.json({ 
//       message: 'Login successful', 
//       token, 
//       userId: user.id,
//       role: user.role,
//       name: user.name
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// // Password Reset
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

// app.post('/forgot-password', async (req, res) => {
//   let connection;
//   try {
//     const { email } = req.body;
//     connection = await pool.getConnection();
    
//     const [rows] = await connection.query(
//       'SELECT * FROM users WHERE email = ?',
//       [email]
//     );
    
//     if (rows.length === 0) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const token = crypto.randomBytes(20).toString('hex');
//     const expireTime = Date.now() + 3600000; // 1 hour

//     await connection.query(
//       'UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?',
//       [token, expireTime, email]
//     );

//     const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`;
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Password Reset',
//       html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ message: 'Password reset link sent to your email' });
//   } catch (err) {
//     console.error('Password reset error:', err);
//     res.status(500).json({ message: 'Server error' });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// app.post('/reset-password/:token', async (req, res) => {
//   let connection;
//   try {
//     const { token } = req.params;
//     const { password } = req.body;
//     connection = await pool.getConnection();
    
//     const [rows] = await connection.query(
//       'SELECT * FROM users WHERE reset_token = ? AND reset_expires > ?',
//       [token, Date.now()]
//     );
    
//     if (rows.length === 0) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await connection.query(
//       'UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?',
//       [hashedPassword, rows[0].id]
//     );

//     res.json({ message: 'Password reset successful' });
//   } catch (err) {
//     console.error('Password reset error:', err);
//     res.status(500).json({ message: 'Server error' });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// // Job Routes
// // app.get('/api/jobs', async (req, res) => {
// //   let connection;
// //   try {
// //     connection = await pool.getConnection();
// //     const [jobs] = await connection.query(`
// //       SELECT j.*, u.name as posted_by_name 
// //       FROM jobs j
// //       JOIN users u ON j.posted_by = u.id
// //     `);
// //     res.json(jobs);
// //   } catch (err) {
// //     console.error('Error fetching jobs:', err);
// //     res.status(500).json({ error: 'Database error' });
// //   } finally {
// //     if (connection) connection.release();
// //   }
// // });

// app.get('/api/jobs', async (req, res) => {
//   let connection;
//   try {
//     connection = await pool.getConnection();
//     const [jobs] = await connection.query(
//       `SELECT j.id, j.title, j.company, j.location, j.description, j.salary, 
//               u.id AS recruiterId, u.name AS recruiterName
//        FROM jobs j
//        JOIN users u ON j.posted_by = u.id`
//     );
//     res.json(jobs);
//   } catch (err) {
//     console.error('Error fetching jobs:', err);
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// app.post('/post-job', async (req, res) => {
//   let connection;
//   try {
//     const { title, company, location, description, salary } = req.body;
//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) return res.status(401).json({ error: 'No token provided' });
    
//     const decoded = jwt.verify(token, JWT_SECRET);
//     connection = await pool.getConnection();
    
//     const [result] = await connection.query(
//       `INSERT INTO jobs 
//       (title, company, location, description, salary, posted_by) 
//       VALUES (?, ?, ?, ?, ?, ?)`,
//       [title, company, location, description, salary, decoded.id]
//     );
    
//     res.status(201).json({ 
//       message: 'Job posted successfully',
//       jobId: result.insertId
//     });
//   } catch (err) {
//     console.error('Error posting job:', err);
//     if (err.name === 'JsonWebTokenError') {
//       return res.status(401).json({ error: 'Invalid token' });
//     }
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// // Get applications for a job
// // app.get('/api/applications', authenticateToken, async (req, res) => {
// //   let connection;
// //   try {
// //     connection = await pool.getConnection();
    
// //     const [applications] = await connection.query(
// //       `SELECT a.*, u.name as candidate_name 
// //        FROM applications a
// //        JOIN users u ON a.candidate_id = u.id
// //        WHERE a.job_id = ?`,
// //       [req.query.jobId]
// //     );
    
// //     res.json(applications);
// //   } catch (err) {
// //     console.error('Error fetching applications:', err);
// //     res.status(500).json({ error: 'Database error' });
// //   } finally {
// //     if (connection) connection.release();
// //   }
// // });

// // Get messages between users
// // app.get('/api/messages', authenticateToken, async (req, res) => {
// //   let connection;
// //   try {
// //     const { userId, recruiterId } = req.query;
// //     connection = await pool.getConnection();
    
// //     const [messages] = await connection.query(
// //       `SELECT m.*, u.name as sender_name
// //        FROM messages m
// //        JOIN users u ON m.sender_id = u.id
// //        WHERE (m.sender_id = ? AND m.receiver_id = ?)
// //        OR (m.sender_id = ? AND m.receiver_id = ?)
// //        ORDER BY m.created_at ASC`,
// //       [userId, recruiterId, recruiterId, userId]
// //     );
    
// //     res.json(messages);
// //   } catch (err) {
// //     console.error('Error fetching messages:', err);
// //     res.status(500).json({ error: 'Database error' });
// //   } finally {
// //     if (connection) connection.release();
// //   }
// // });
// app.get('/api/messages/:conversationId', authenticateToken, async (req, res) => {
//   let connection;
//   try {
//     const { conversationId } = req.params;
//     connection = await pool.getConnection();

//     const [messages] = await connection.query(
//       `SELECT m.*, u.name as sender_name
//        FROM messages m
//        JOIN users u ON m.sender_id = u.id
//        WHERE m.conversation_id = ?
//        ORDER BY m.created_at ASC`,
//       [conversationId]
//     );

//     res.json(messages);
//   } catch (err) {
//     console.error('Error fetching messages:', err);
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) connection.release();
//   }
// });

// // // Post a new message
// // app.post('/api/messages', authenticateToken, async (req, res) => {
// //   let connection;
// //   try {
// //     const { receiver_id, content, job_id } = req.body;
// //     const sender_id = req.user.id;
// //     connection = await pool.getConnection();
    
// //     // Find or create conversation
// //     const [conversations] = await connection.query(
// //       `SELECT id FROM conversations 
// //        WHERE (user1_id = ? AND user2_id = ?) 
// //        OR (user1_id = ? AND user2_id = ?)
// //        LIMIT 1`,
// //       [sender_id, receiver_id, receiver_id, sender_id]
// //     );

// //     let conversation_id;
// //     if (conversations.length > 0) {
// //       conversation_id = conversations[0].id;
// //     } else {
// //       const [result] = await connection.query(
// //         `INSERT INTO conversations (user1_id, user2_id, job_id)
// //          VALUES (?, ?, ?)`,
// //         [sender_id, receiver_id, job_id || null]
// //       );
// //       conversation_id = result.insertId;
// //     }

// //     // Insert message
// //     const [messageResult] = await connection.query(
// //       `INSERT INTO messages (sender_id, receiver_id, content, conversation_id)
// //        VALUES (?, ?, ?, ?)`,
// //       [sender_id, receiver_id, content, conversation_id]
// //     );

// //     // Update conversation's last message
// //     await connection.query(
// //       `UPDATE conversations 
// //        SET last_message_id = ?
// //        WHERE id = ?`,
// //       [messageResult.insertId, conversation_id]
// //     );

// //     // Get full message details
// //     const [messages] = await connection.query(
// //       `SELECT m.*, u.name as sender_name
// //        FROM messages m
// //        JOIN users u ON m.sender_id = u.id
// //        WHERE m.id = ?`,
// //       [messageResult.insertId]
// //     );

// //     res.json(messages[0]);
// //   } catch (err) {
// //     console.error('Error sending message:', err);
// //     res.status(500).json({ error: 'Database error' });
// //   } finally {
// //     if (connection) connection.release();
// //   }
// // });
// app.post('/api/messages', authenticateToken, async (req, res) => {
//   try {
//     const { conversationId, content } = req.body;
//     const senderId = req.user.id;

//     const connection = await pool.getConnection();

//     // Fetch the receiver_id from the conversation
//     const [conversation] = await connection.query(
//       'SELECT user1_id, user2_id FROM conversations WHERE id = ?',
//       [conversationId]
//     );

//     if (conversation.length === 0) {
//       connection.release();
//       return res.status(404).json({ error: 'Conversation not found' });
//     }

//     const receiverId =
//       conversation[0].user1_id === senderId
//         ? conversation[0].user2_id
//         : conversation[0].user1_id;

//     // Verify that the receiver exists in the users table
//     const [receiver] = await connection.query(
//       'SELECT id FROM users WHERE id = ?',
//       [receiverId]
//     );

//     if (receiver.length === 0) {
//       connection.release();
//       return res.status(400).json({ error: 'Receiver does not exist' });
//     }

//      // Insert the message
//      const [result] = await connection.query(
//       'INSERT INTO messages (conversation_id, sender_id, receiver_id, content) VALUES (?, ?, ?, ?)',
//       [conversationId, senderId, receiverId, content]
//     );

//     connection.release();
//     res.status(201).json({
//       id: result.insertId,
//       conversation_id: conversationId,
//       sender_id: senderId,
//       receiver_id: receiverId,
//       content,
//     });
//   } catch (err) {
//     console.error('Error sending message:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// app.get('/api/conversations/:userId', authenticateToken, async (req, res) => {
//   let connection;
//   try {
//     const { userId } = req.params.userId;
//     connection = await pool.getConnection();

//     const [conversations] = await connection.query(
//       `SELECT c.id, c.job_id, c.user1_id, c.user2_id, c.last_message_id, 
//               m.content AS last_message, m.created_at AS last_message_time,
//               u1.name AS user1_name, u2.name AS user2_name
//        FROM conversations c
//        LEFT JOIN messages m ON c.last_message_id = m.id
//        LEFT JOIN users u1 ON c.user1_id = u1.id
//        LEFT JOIN users u2 ON c.user2_id = u2.id
//        WHERE c.user1_id = ? OR c.user2_id = ?
//        ORDER BY m.created_at DESC`,
//       [userId, userId]
//     );

//     if (conversations.length === 0) {
//       return res.status(404).json({ error: 'No conversations found' });
//     }

//     res.json(conversations);
//   } catch (err) {
//     console.error('Error fetching conversations:', err);
//     res.status(500).json({ error: 'Database error' });
//   } finally {
//     if (connection) connection.release();
//   }
// });



// // // POST route to create a new job
// // app.post('/post-job', (req, res) => {
// //   const { title, company, location, description, salary } = req.body;
// //   const sql = 'INSERT INTO jobs (title, company, location, description, salary) VALUES (?, ?, ?, ?, ?)';
// //   pool.query(sql, [title, company, location, description, salary], (err, _result) => {
// //     if (err) {
// //       console.error(err);
// //       res.status(500).json({ message: 'Error posting job' });
// //     } else {
// //       res.status(200).json({ message: 'Job posted successfully' });
// //     }
// //   });
// // });

// // Fetch all posted jobs
// app.get("/api/jobs", (req, res) => {
//   pool.query("SELECT * FROM jobs", (err, results) => { 
//     if (err) {
//       console.error("Database error:", err);
//       res.status(500).send("Database error");
//     } else {
//       res.json(results);
//     }
//   });
// });
// // Apply for a job
// app.post('/api/applications', authenticateToken, async (req, res) => {
//   console.log(req.body)
//   try {
//     const { jobId, candidateId, recruiterId } = req.body;

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

//     // Insert the application
//    const appliedData =  await connection.query(
//       'INSERT INTO applications (job_id, candidate_id, recruiter_id) VALUES (?, ?, ?)',
//       [jobId, candidateId, recruiterId]
//     );

//     connection.release();
//     res.status(201).json({ message: 'Application submitted successfully', appliedData  });
//   } catch (err) {
//     console.error('Error submitting application:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });
// // Get job details including recruiter ID
// app.get('/api/jobs', (req, res) => {
//   pool.query(`
//     SELECT j.*, u.id as posted_by 
//     FROM jobs j
//     JOIN users u ON j.posted_by = u.id
//   `, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json(results);
//     }
//   });
// });

// // In your backend (server.js)
// // app.get('/api/jobs/recruiter', (req, res) => {
// //   const token = req.headers.authorization?.split(' ')[1];
// //   if (!token) return res.status(401).json({ message: 'Unauthorized' });

// //   try {
// //     const decoded = jwt.verify(token, 'your_secret_key');
// //     pool.query(
// //       'SELECT * FROM jobs WHERE posted_by = ?',
// //       [decoded.id],
// //       (err, results) => {
// //         if (err) return res.status(500).json({ message: 'Database error' });
// //         res.json(results);
// //       }
// //     );
// //   } catch (err) {
// //     res.status(401).json({ message: 'Invalid token' });
// //   }
// // });

// app.get('/api/jobs/recruiter', authenticateToken, async (req, res) => {
//   try {
//     const recruiterId = req.user.id; // Extract recruiter ID from the token
//     const connection = await pool.getConnection();

//     const [jobs] = await connection.query(
//       'SELECT * FROM jobs WHERE posted_by = ?',
//       [recruiterId]
//     );

//     connection.release(); // Release the connection after use
//     res.json(jobs);
//   } catch (err) {
//     console.error('Error fetching recruiter jobs:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// app.delete('/api/jobs/:id', authenticateToken, async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const recruiterId = req.user.id;

//     const connection = await pool.getConnection();

//     const [job] = await connection.query(
//       'SELECT * FROM jobs WHERE id = ? AND posted_by = ?',
//       [jobId, recruiterId]
//     );

//     if (job.length === 0) {
//       connection.release();
//       return res.status(404).json({ error: 'Job not found or unauthorized' });
//     }

//     await connection.query('DELETE FROM jobs WHERE id = ?', [jobId]);

//     connection.release();
//     res.json({ message: 'Job deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting job:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });
// app.put('/api/jobs/:id', authenticateToken, async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const recruiterId = req.user.id;
//     const { title, company, location, description, salary, jobType, skills } = req.body;

//     const connection = await pool.getConnection();

//     const [job] = await connection.query(
//       'SELECT * FROM jobs WHERE id = ? AND posted_by = ?',
//       [jobId, recruiterId]
//     );

//     if (job.length === 0) {
//       connection.release();
//       return res.status(404).json({ error: 'Job not found or unauthorized' });
//     }

//     await connection.query(
//       'UPDATE jobs SET title = ?, company = ?, location = ?, description = ?, salary = ?, jobType = ?, skills = ? WHERE id = ?',
//       [title, company, location, description, salary, jobType, skills, jobId]
//     );

//     connection.release();
//     res.json({ message: 'Job updated successfully' });
//   } catch (err) {
//     console.error('Error updating job:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// app.get('/api/applications/recruiter', authenticateToken, async (req, res) => {
//   try {
//     const recruiterId = req.user.id;
//     console.log('Fetching applications for recruiter ID:', recruiterId);

//     const connection = await pool.getConnection();

//     // Fetch applications for jobs posted by the recruiter
//     const [applications] = await connection.query(
//       `SELECT a.id AS application_id, a.job_id, a.candidate_id, u.name AS candidate_name, 
//               u.email AS candidate_email, j.title AS job_title, j.company AS job_company
//        FROM applications a
//        JOIN jobs j ON a.job_id = j.id
//        JOIN users u ON a.candidate_id = u.id
//        WHERE j.recruiter_id = ?`,
//       [recruiterId]
//     );
//     console.log('Applications fetched:', applications);

//     connection.release();
//     res.status(200).json(applications);
//   } catch (err) {
//     console.error('Error fetching applications:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// app.put('/api/recruiter/profile', authenticateToken, async (req, res) => {
//   try {
//     const recruiterId = req.user.id; // Extract recruiter ID from the token
//     const { name, email, company, location } = req.body;

//     const connection = await pool.getConnection();

//     // Update the recruiter's profile
//     const [result] = await connection.query(
//       `UPDATE users 
//        SET name = ?, email = ?, company = ?, location = ? 
//        WHERE id = ?`,
//       [name, email, company, location, recruiterId]
//     );

//     connection.release();

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Recruiter not found' });
//     }

//     res.json({ message: 'Profile updated successfully' });
//   } catch (err) {
//     console.error('Error updating recruiter profile:', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });


// // Start Server
// server.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const profileRoutes = require('./routes/profileRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api', applicationRoutes);
app.use('/api', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/user', userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
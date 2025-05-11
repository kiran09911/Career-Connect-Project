"use client"

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {
  Box, Tabs, Tab, Typography, Table, TableBody, TableCell, TableHead, TableRow,
  Button, TextField, Select, MenuItem, Container, Paper, Grid, Snackbar, Alert
} from "@mui/material";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [applications, setApplications] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [settings, setSettings] = useState({ allowedFileTypes: [".pdf", ".doc", ".docx"], maxFileSize: 5 * 1024 * 1024 });
  const [conversationId, setConversationId] = useState("");
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!token) {
        setError("Please log in to access the admin dashboard");
        navigate("/login");
        return;
      }

      try {
        await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Admin check failed:", err.response?.data);
        setError("You are not authorized to access the admin dashboard");
        navigate("/login");
      }
    };
    checkAdmin();
  }, [navigate, token]);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data);
      setError("Failed to fetch users");
    }
  };

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err.response?.data);
      setError("Failed to fetch jobs");
    }
  };

  // Fetch Messages for a Conversation
  const fetchMessages = async () => {
    if (!conversationId) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages:", err.response?.data);
      setError("Failed to fetch messages");
    }
  };

  // Fetch Applications
  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err.response?.data);
      setError("Failed to fetch applications");
    }
  };

  // Fetch Analytics
  
  const fetchAnalytics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(response.data);
    } catch (err) {
      console.error("Error fetching analytics:", err.response?.data);
      setError("Failed to fetch analytics");
    }
  };

  // Fetch Settings (Placeholder)
  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSettings(response.data.settings);
    } catch (err) {
      console.error("Error fetching settings:", err.response?.data);
      setError("Failed to fetch settings");
    }
  };

  useEffect(() => {
    if (tab === 0) fetchUsers();
    if (tab === 1) fetchJobs();
    if (tab === 2) fetchMessages();
    if (tab === 3) fetchApplications();
    if (tab === 4) fetchAnalytics();
    if (tab === 5) fetchSettings();
  }, [tab, conversationId]);

  // Update User
  const handleUpdateUser = async (id, updates) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err.response?.data);
      setError("Failed to update user");
    }
  };

  // Delete Job
  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err.response?.data);
      setError("Failed to delete job");
    }
  };

  // Update Application
  const handleUpdateApplication = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/applications/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchApplications();
    } catch (err) {
      console.error("Error updating application:", err.response?.data);
      setError("Failed to update application");
    }
  };

  // Update Settings
  const handleUpdateSettings = async () => {
    try {
      await axios.put("http://localhost:5000/api/admin/settings", settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSettings();
    } catch (err) {
      console.error("Error updating settings:", err.response?.data);
      setError("Failed to update settings");
    }
  };

  // Handle Snackbar Close
  const handleCloseError = () => {
    setError(null);
  };

  if (!token) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Users" />
        <Tab label="Jobs" />
        <Tab label="Chats" />
        <Tab label="Applications" />
        <Tab label="Analytics" />
        <Tab label="Settings" />
      </Tabs>

      {/* Users Tab */}
      {tab === 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">User Management</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Select
                      value={user.status || "active"}
                      onChange={(e) => handleUpdateUser(user.id, { status: e.target.value })}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="suspended">Suspended</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleUpdateUser(user.id, { status: "deleted" })}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Jobs Tab */}
      {tab === 1 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Job Management</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Recruiter</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.id}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.recruiter_name}</TableCell>
                  <TableCell>{new Date(job.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleDeleteJob(job.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Chats Tab */}
      {tab === 2 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Chat Moderation</Typography>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Conversation ID"
              value={conversationId}
              onChange={(e) => setConversationId(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={fetchMessages} sx={{ mt: 1 }}>
              Fetch Messages
            </Button>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sender</TableCell>
                <TableCell>Receiver</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Document</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell>{msg.sender_name}</TableCell>
                  <TableCell>{msg.receiver_name}</TableCell>
                  <TableCell>{msg.content || "-"}</TableCell>
                  <TableCell>
                    {msg.document_url ? (
                      <Button href={`http://localhost:5000${msg.document_url}`} download>
                        Download
                      </Button>
                    ) : "-"}
                  </TableCell>
                  <TableCell>{new Date(msg.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Applications Tab */}
      {tab === 3 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Application Oversight</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Candidate</TableCell>
                <TableCell>Recruiter</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.job_title}</TableCell>
                  <TableCell>{app.candidate_name}</TableCell>
                  <TableCell>{app.recruiter_name}</TableCell>
                  <TableCell>
                    <Select
                      value={app.status}
                      onChange={(e) => handleUpdateApplication(app.id, e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="accepted">Accepted</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => handleUpdateApplication(app.id, "deleted")}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
     {/* Analytics Tab */}
     {tab === 4 && (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>Platform Analytics</Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <PieChart>
            <Pie
              data={[
                { name: "Users", value: analytics?.totalUsers || 0 },
                { name: "Jobs", value: analytics?.totalJobs || 0 },
                { name: "Applications", value: analytics?.totalApplications || 0 },
                { name: "Messages", value: analytics?.totalMessages || 0 },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={true}
              dataKey="value"
              nameKey="name"
            >
              {[
                { name: "Users", value: analytics?.totalUsers || 0 },
                { name: "Jobs", value: analytics?.totalJobs || 0 },
                { name: "Applications", value: analytics?.totalApplications || 0 },
                { name: "Messages", value: analytics?.totalMessages || 0 },
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography>Total Users: {analytics?.totalUsers || 0}</Typography>
        <Typography>Total Jobs: {analytics?.totalJobs || 0}</Typography>
        <Typography>Total Applications: {analytics?.totalApplications || 0}</Typography>
        <Typography>Total Messages: {analytics?.totalMessages || 0}</Typography>
      </Grid>
    </Grid>
  </Paper>
)}
      {/* Settings Tab */}
      {tab === 5 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Platform Settings</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Allowed File Types (comma-separated)"
              value={settings.allowedFileTypes.join(",")}
              onChange={(e) => setSettings({ ...settings, allowedFileTypes: e.target.value.split(",") })}
            />
            <TextField
              label="Max File Size (MB)"
              type="number"
              value={settings.maxFileSize / (1024 * 1024)}
              onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value * 1024 * 1024 })}
            />
            <Button variant="contained" onClick={handleUpdateSettings}>
              Save Settings
            </Button>
          </Box>
        </Paper>
      )}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard;

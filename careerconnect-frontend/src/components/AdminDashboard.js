import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Tabs, Tab, Typography, Table, TableBody, TableCell, TableHead, TableRow,
  Button, Container, Paper, Grid, Snackbar, Alert, FormControl, Select, MenuItem,
  CircularProgress
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [tab, setTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalMessages: 0
  });
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const token = localStorage.getItem("token");

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!token) {
        setError("Please log in to access the admin dashboard");
        setOpenSnackbar(true);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Admin check response:", response.data);
      } catch (err) {
        console.error("Admin check failed:", err.response?.data);
        setError("You are not authorized to access the admin dashboard");
        setOpenSnackbar(true);
      }
    };
    checkAdmin();
  }, [token]);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched users:", response.data);
      setUsers([...response.data]);
    } catch (err) {
      console.error("Error fetching users:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(`Failed to fetch users: ${err.response?.data?.message || err.message}`);
      setOpenSnackbar(true);
    }
  };

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched jobs:", response.data);
      setJobs([...response.data]);
    } catch (err) {
      console.error("Error fetching jobs:", err.response?.data);
      setError("Failed to fetch jobs");
      setOpenSnackbar(true);
    }
  };

  // Fetch Applications
  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched applications:", response.data);
      setApplications([...response.data]);
    } catch (err) {
      console.error("Error fetching applications:", err.response?.data);
      setError("Failed to fetch applications");
      setOpenSnackbar(true);
    }
  };

  // Fetch Feedback Messages
  const fetchFeedback = async () => {
    setLoadingFeedback(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched feedback:", response.data);
      setFeedbackMessages([...response.data]);
    } catch (err) {
      console.error("Error fetching feedback:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config?.url,
      });
      setError(`Failed to fetch feedback messages: ${err.response?.data?.details || err.response?.data?.message || err.message}`);
      setOpenSnackbar(true);
    } finally {
      setLoadingFeedback(false);
    }
  };

  // Fetch Analytics
  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const response = await axios.get("http://localhost:5000/api/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched analytics:", response.data);
      setAnalytics(response.data);
    } catch (err) {
      console.error("Error fetching analytics:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(`Failed to fetch analytics: ${err.response?.data?.message || err.message}`);
      setOpenSnackbar(true);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  // Load data based on active tab
  useEffect(() => {
    if (tab === 0) fetchUsers();
    if (tab === 1) fetchJobs();
    if (tab === 2) fetchApplications();
    if (tab === 3) fetchAnalytics();
    if (tab === 4) fetchFeedback();
  }, [tab, token]);

  // Update User
  const handleUpdateUser = async (id, updates) => {
    console.log("Updating user:", { id, updates });
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/users/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("PUT response:", response.data);

      if (response.data.user) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, ...response.data.user } : user
          )
        );
      } else {
        console.warn("No user data in response, fetching users...");
        await fetchUsers();
      }
    } catch (err) {
      console.error("Error updating user:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      setError(`Failed to update user: ${err.response?.data?.message || err.message}`);
      setOpenSnackbar(true);
      await fetchUsers();
    }
  };

  // Delete Job
  const handleDeleteJob = async (id) => {
    try {
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      await axios.delete(`http://localhost:5000/api/admin/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchJobs();
    } catch (err) {
      console.error("Error deleting job:", err.response?.data);
      setError("Failed to delete job");
      setOpenSnackbar(true);
      await fetchJobs();
    }
  };

  // Update Application
  const handleUpdateApplication = async (id, status) => {
    try {
      setApplications((prevApps) =>
        prevApps.map((app) => (app.id === id ? { ...app, status } : app))
      );
      await axios.put(`http://localhost:5000/api/admin/applications/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchApplications();
    } catch (err) {
      console.error("Error updating application:", err.response?.data);
      setError("Failed to update application");
      setOpenSnackbar(true);
      await fetchApplications();
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Handle Snackbar Close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Data for bar graph
  const chartData = [
    { name: "Users", value: analytics?.totalUsers || 0 },
    { name: "Jobs", value: analytics?.totalJobs || 0 },
    { name: "Applications", value: analytics?.totalApplications || 0 },
    { name: "Messages", value: analytics?.totalMessages || 0 },
  ];

  console.log("Chart data:", chartData);

  if (!token) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Users" />
        <Tab label="Jobs" />
        <Tab label="Applications" />
        <Tab label="Analytics" />
        <Tab label="Feedback" />
      </Tabs>

      {/* Users Tab */}
      {tab === 0 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>User Management</Typography>
          <Box sx={{ overflowX: "auto" }}>
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
                      <FormControl size="small" fullWidth>
                        <Select
                          value={user.status || "active"}
                          onChange={(e) => handleUpdateUser(user.id, { status: e.target.value })}
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="suspended">Suspended</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleUpdateUser(user.id, { status: "deleted" })}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}

      {/* Jobs Tab */}
      {tab === 1 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Job Management</Typography>
          <Box sx={{ overflowX: "auto" }}>
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
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}

      {/* Applications Tab */}
      {tab === 2 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Application Oversight</Typography>
          <Box sx={{ overflowX: "auto" }}>
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
                      <FormControl size="small" fullWidth>
                        <Select
                          value={app.status ?? "pending"}
                          onChange={(e) => handleUpdateApplication(app.id, e.target.value)}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="accepted">Accepted</MenuItem>
                          <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleUpdateApplication(app.id, "deleted")}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}

      {/* Analytics Tab */}
      {tab === 3 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Platform Analytics</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  height: 300, 
                  width: '100%', 
                  minWidth: 300, 
                  backgroundColor: '#f5f5f5',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                {loadingAnalytics ? (
                  <CircularProgress />
                ) : chartData.every(item => item.value === 0) ? (
                  <Typography variant="body1" color="textSecondary">
                    No data available to display
                  </Typography>
                ) : (
                  <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
                    <BarChart 
                      data={chartData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#0088FE" name="Count" barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4">{analytics?.totalUsers || 0}</Typography>
                    <Typography variant="body2" color="textSecondary">Total Users</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4">{analytics?.totalJobs || 0}</Typography>
                    <Typography variant="body2" color="textSecondary">Total Jobs</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4">{analytics?.totalApplications || 0}</Typography>
                    <Typography variant="body2" color="textSecondary">Total Applications</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4">{analytics?.totalMessages || 0}</Typography>
                    <Typography variant="body2" color="textSecondary">Total Messages</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Feedback Tab */}
      {tab === 4 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Feedback Messages</Typography>
          <Box sx={{ overflowX: "auto" }}>
            {loadingFeedback ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
                <CircularProgress />
              </Box>
            ) : feedbackMessages.length === 0 ? (
              <Typography variant="body1" color="textSecondary" sx={{ p: 2, textAlign: "center" }}>
                No feedback messages available.
              </Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Submitted At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feedbackMessages.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell>{feedback.id}</TableCell>
                      <TableCell>{feedback.first_name}</TableCell>
                      <TableCell>{feedback.last_name}</TableCell>
                      <TableCell>{feedback.email}</TableCell>
                      <TableCell>{feedback.message}</TableCell>
                      <TableCell>{new Date(feedback.submitted_at).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Paper>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard;
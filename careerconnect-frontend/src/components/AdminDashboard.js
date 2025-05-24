// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box, Tabs, Tab, Typography, Table, TableBody, TableCell, TableHead, TableRow,
//   Button, Container, Paper, Grid, Snackbar, Alert, FormControl, Select, MenuItem,
//   CircularProgress
// } from "@mui/material";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const AdminDashboard = () => {
//   const [tab, setTab] = useState(0);
//   const [users, setUsers] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);
//   const [feedbackMessages, setFeedbackMessages] = useState([]);
//   const [analytics, setAnalytics] = useState({
//     totalUsers: 0,
//     totalJobs: 0,
//     totalApplications: 0,
//     totalMessages: 0
//   });
//   const [error, setError] = useState(null);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [loadingAnalytics, setLoadingAnalytics] = useState(false);
//   const [loadingFeedback, setLoadingFeedback] = useState(false);

//   const token = localStorage.getItem("token");

//   // Check if user is admin
//   useEffect(() => {
//     const checkAdmin = async () => {
//       if (!token) {
//         setError("Please log in to access the admin dashboard");
//         setOpenSnackbar(true);
//         return;
//       }

//       try {
//         const response = await axios.get("http://localhost:5000/api/admin/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log("Admin check response:", response.data);
//       } catch (err) {
//         console.error("Admin check failed:", err.response?.data);
//         setError("You are not authorized to access the admin dashboard");
//         setOpenSnackbar(true);
//       }
//     };
//     checkAdmin();
//   }, [token]);

//   // Fetch Users
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Fetched users:", response.data);
//       setUsers([...response.data]);
//     } catch (err) {
//       console.error("Error fetching users:", {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//       });
//       setError(`Failed to fetch users: ${err.response?.data?.message || err.message}`);
//       setOpenSnackbar(true);
//     }
//   };

//   // Fetch Jobs
//   const fetchJobs = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/jobs", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Fetched jobs:", response.data);
//       setJobs([...response.data]);
//     } catch (err) {
//       console.error("Error fetching jobs:", err.response?.data);
//       setError("Failed to fetch jobs");
//       setOpenSnackbar(true);
//     }
//   };

//   // Fetch Applications
//   const fetchApplications = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/applications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Fetched applications:", response.data);
//       setApplications([...response.data]);
//     } catch (err) {
//       console.error("Error fetching applications:", err.response?.data);
//       setError("Failed to fetch applications");
//       setOpenSnackbar(true);
//     }
//   };

//   // Fetch Feedback Messages
//   const fetchFeedback = async () => {
//     setLoadingFeedback(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/feedback", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Fetched feedback:", response.data);
//       setFeedbackMessages([...response.data]);
//     } catch (err) {
//       console.error("Error fetching feedback:", {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//         config: err.config?.url,
//       });
//       setError(`Failed to fetch feedback messages: ${err.response?.data?.details || err.response?.data?.message || err.message}`);
//       setOpenSnackbar(true);
//     } finally {
//       setLoadingFeedback(false);
//     }
//   };

//   // Fetch Analytics
//   const fetchAnalytics = async () => {
//     setLoadingAnalytics(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/analytics", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Fetched analytics:", response.data);
//       setAnalytics(response.data);
//     } catch (err) {
//       console.error("Error fetching analytics:", {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//       });
//       setError(`Failed to fetch analytics: ${err.response?.data?.message || err.message}`);
//       setOpenSnackbar(true);
//     } finally {
//       setLoadingAnalytics(false);
//     }
//   };

//   // Load data based on active tab
//   useEffect(() => {
//     if (tab === 0) fetchUsers();
//     if (tab === 1) fetchJobs();
//     if (tab === 2) fetchApplications();
//     if (tab === 3) fetchAnalytics();
//     if (tab === 4) fetchFeedback();
//   }, [tab, token]);

//   // Update User
//   const handleUpdateUser = async (id, updates) => {
//     console.log("Updating user:", { id, updates });
//     try {
//       const response = await axios.put(`http://localhost:5000/api/admin/users/${id}`, updates, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("PUT response:", response.data);

//       if (response.data.user) {
//         setUsers((prevUsers) =>
//           prevUsers.map((user) =>
//             user.id === id ? { ...user, ...response.data.user } : user
//           )
//         );
//       } else {
//         console.warn("No user data in response, fetching users...");
//         await fetchUsers();
//       }
//     } catch (err) {
//       console.error("Error updating user:", {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//       });
//       setError(`Failed to update user: ${err.response?.data?.message || err.message}`);
//       setOpenSnackbar(true);
//       await fetchUsers();
//     }
//   };

//   // Delete Job
//   const handleDeleteJob = async (id) => {
//     try {
//       setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
//       await axios.delete(`http://localhost:5000/api/admin/jobs/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       await fetchJobs();
//     } catch (err) {
//       console.error("Error deleting job:", err.response?.data);
//       setError("Failed to delete job");
//       setOpenSnackbar(true);
//       await fetchJobs();
//     }
//   };

//   // Update Application
//   const handleUpdateApplication = async (id, status) => {
//     try {
//       setApplications((prevApps) =>
//         prevApps.map((app) => (app.id === id ? { ...app, status } : app))
//       );
//       await axios.put(`http://localhost:5000/api/admin/applications/${id}`, { status }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       await fetchApplications();
//     } catch (err) {
//       console.error("Error updating application:", err.response?.data);
//       setError("Failed to update application");
//       setOpenSnackbar(true);
//       await fetchApplications();
//     }
//   };

//   // Handle tab change
//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//   };

//   // Handle Snackbar Close
//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   // Data for bar graph
//   const chartData = [
//     { name: "Users", value: analytics?.totalUsers || 0 },
//     { name: "Jobs", value: analytics?.totalJobs || 0 },
//     { name: "Applications", value: analytics?.totalApplications || 0 },
//     { name: "Messages", value: analytics?.totalMessages || 0 },
//   ];

//   console.log("Chart data:", chartData);

//   if (!token) return null;

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
//       <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
//         <Tab label="Users" />
//         <Tab label="Jobs" />
//         <Tab label="Applications" />
//         <Tab label="Analytics" />
//         <Tab label="Feedback" />
//       </Tabs>

//       {/* Users Tab */}
//       {tab === 0 && (
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>User Management</Typography>
//           <Box sx={{ overflowX: "auto" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Role</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.id}</TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>
//                       <FormControl size="small" fullWidth>
//                         <Select
//                           value={user.status || "active"}
//                           onChange={(e) => handleUpdateUser(user.id, { status: e.target.value })}
//                         >
//                           <MenuItem value="active">Active</MenuItem>
//                           <MenuItem value="suspended">Suspended</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleUpdateUser(user.id, { status: "deleted" })}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         </Paper>
//       )}

//       {/* Jobs Tab */}
//       {tab === 1 && (
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>Job Management</Typography>
//           <Box sx={{ overflowX: "auto" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Title</TableCell>
//                   <TableCell>Recruiter</TableCell>
//                   <TableCell>Created At</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {jobs.map((job) => (
//                   <TableRow key={job.id}>
//                     <TableCell>{job.id}</TableCell>
//                     <TableCell>{job.title}</TableCell>
//                     <TableCell>{job.recruiter_name}</TableCell>
//                     <TableCell>{new Date(job.created_at).toLocaleDateString()}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleDeleteJob(job.id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         </Paper>
//       )}

//       {/* Applications Tab */}
//       {tab === 2 && (
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>Application Oversight</Typography>
//           <Box sx={{ overflowX: "auto" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Job Title</TableCell>
//                   <TableCell>Candidate</TableCell>
//                   <TableCell>Recruiter</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {applications.map((app) => (
//                   <TableRow key={app.id}>
//                     <TableCell>{app.id}</TableCell>
//                     <TableCell>{app.job_title}</TableCell>
//                     <TableCell>{app.candidate_name}</TableCell>
//                     <TableCell>{app.recruiter_name}</TableCell>
//                     <TableCell>
//                       <FormControl size="small" fullWidth>
//                         <Select
//                           value={app.status ?? "pending"}
//                           onChange={(e) => handleUpdateApplication(app.id, e.target.value)}
//                         >
//                           <MenuItem value="pending">Pending</MenuItem>
//                           <MenuItem value="accepted">Accepted</MenuItem>
//                           <MenuItem value="rejected">Rejected</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleUpdateApplication(app.id, "deleted")}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         </Paper>
//       )}

//       {/* Analytics Tab */}
//       {tab === 3 && (
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>Platform Analytics</Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <Box 
//                 sx={{ 
//                   height: 300, 
//                   width: '100%', 
//                   minWidth: 300, 
//                   backgroundColor: '#f5f5f5',
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: 'center' 
//                 }}
//               >
//                 {loadingAnalytics ? (
//                   <CircularProgress />
//                 ) : chartData.every(item => item.value === 0) ? (
//                   <Typography variant="body1" color="textSecondary">
//                     No data available to display
//                   </Typography>
//                 ) : (
//                   <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={300}>
//                     <BarChart 
//                       data={chartData} 
//                       margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
//                     >
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="value" fill="#0088FE" name="Count" barSize={30} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <Paper sx={{ p: 2, textAlign: "center" }}>
//                     <Typography variant="h4">{analytics?.totalUsers || 0}</Typography>
//                     <Typography variant="body2" color="textSecondary">Total Users</Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Paper sx={{ p: 2, textAlign: "center" }}>
//                     <Typography variant="h4">{analytics?.totalJobs || 0}</Typography>
//                     <Typography variant="body2" color="textSecondary">Total Jobs</Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Paper sx={{ p: 2, textAlign: "center" }}>
//                     <Typography variant="h4">{analytics?.totalApplications || 0}</Typography>
//                     <Typography variant="body2" color="textSecondary">Total Applications</Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Paper sx={{ p: 2, textAlign: "center" }}>
//                     <Typography variant="h4">{analytics?.totalMessages || 0}</Typography>
//                     <Typography variant="body2" color="textSecondary">Total Messages</Typography>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Paper>
//       )}

//       {/* Feedback Tab */}
//       {tab === 4 && (
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6" gutterBottom>Feedback Messages</Typography>
//           <Box sx={{ overflowX: "auto" }}>
//             {loadingFeedback ? (
//               <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
//                 <CircularProgress />
//               </Box>
//             ) : feedbackMessages.length === 0 ? (
//               <Typography variant="body1" color="textSecondary" sx={{ p: 2, textAlign: "center" }}>
//                 No feedback messages available.
//               </Typography>
//             ) : (
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ID</TableCell>
//                     <TableCell>First Name</TableCell>
//                     <TableCell>Last Name</TableCell>
//                     <TableCell>Email</TableCell>
//                     <TableCell>Message</TableCell>
//                     <TableCell>Submitted At</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {feedbackMessages.map((feedback) => (
//                     <TableRow key={feedback.id}>
//                       <TableCell>{feedback.id}</TableCell>
//                       <TableCell>{feedback.first_name}</TableCell>
//                       <TableCell>{feedback.last_name}</TableCell>
//                       <TableCell>{feedback.email}</TableCell>
//                       <TableCell>{feedback.message}</TableCell>
//                       <TableCell>{new Date(feedback.submitted_at).toLocaleString()}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </Box>
//         </Paper>
//       )}

//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default AdminDashboard;

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
  Paper,
  Grid,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  TableContainer,
  Tooltip,
  Badge,
  Fade,
  Skeleton,
} from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Analytics as AnalyticsIcon,
  Feedback as FeedbackIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material"

const AdminDashboard = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"))

  const [tab, setTab] = useState(0)
  const [users, setUsers] = useState([])
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [feedbackMessages, setFeedbackMessages] = useState([])
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalMessages: 0,
  })
  const [error, setError] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [loadingAnalytics, setLoadingAnalytics] = useState(false)
  const [loadingFeedback, setLoadingFeedback] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [loadingJobs, setLoadingJobs] = useState(false)
  const [loadingApplications, setLoadingApplications] = useState(false)

  // Search and filter states
  const token = localStorage.getItem("token")

  // Color palette for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      if (!token) {
        setError("Please log in to access the admin dashboard")
        setOpenSnackbar(true)
        return
      }

      try {
        const response = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("Admin check response:", response.data)
      } catch (err) {
        console.error("Admin check failed:", err.response?.data)
        setError("You are not authorized to access the admin dashboard")
        setOpenSnackbar(true)
      }
    }
    checkAdmin()
  }, [token])

  // Fetch Users
  const fetchUsers = async () => {
    setLoadingUsers(true)
    try {
      const response = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("Fetched users:", response.data)
      setUsers([...response.data])
    } catch (err) {
      console.error("Error fetching users:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })
      setError(`Failed to fetch users: ${err.response?.data?.message || err.message}`)
      setOpenSnackbar(true)
    } finally {
      setLoadingUsers(false)
    }
  }

  // Fetch Jobs
  const fetchJobs = async () => {
    setLoadingJobs(true)
    try {
      const response = await axios.get("http://localhost:5000/api/admin/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("Fetched jobs:", response.data)
      setJobs([...response.data])
    } catch (err) {
      console.error("Error fetching jobs:", err.response?.data)
      setError("Failed to fetch jobs")
      setOpenSnackbar(true)
    } finally {
      setLoadingJobs(false)
    }
  }

  // Fetch Applications
  const fetchApplications = async () => {
    setLoadingApplications(true)
    try {
      const response = await axios.get("http://localhost:5000/api/admin/applications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("Fetched applications:", response.data)
      setApplications([...response.data])
    } catch (err) {
      console.error("Error fetching applications:", err.response?.data)
      setError("Failed to fetch applications")
      setOpenSnackbar(true)
    } finally {
      setLoadingApplications(false)
    }
  }

  // Fetch Feedback Messages
  const fetchFeedback = async () => {
    setLoadingFeedback(true)
    try {
      const response = await axios.get("http://localhost:5000/api/admin/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("Fetched feedback:", response.data)
      setFeedbackMessages([...response.data])
    } catch (err) {
      console.error("Error fetching feedback:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config?.url,
      })
      setError(
        `Failed to fetch feedback messages: ${err.response?.data?.details || err.response?.data?.message || err.message}`,
      )
      setOpenSnackbar(true)
    } finally {
      setLoadingFeedback(false)
    }
  }

  // Fetch Analytics
  const fetchAnalytics = async () => {
    setLoadingAnalytics(true)
    try {
      const response = await axios.get("http://localhost:5000/api/admin/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("Fetched analytics:", response.data)
      setAnalytics(response.data)
    } catch (err) {
      console.error("Error fetching analytics:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })
      setError(`Failed to fetch analytics: ${err.response?.data?.message || err.message}`)
      setOpenSnackbar(true)
    } finally {
      setLoadingAnalytics(false)
    }
  }

  // Load data based on active tab
  useEffect(() => {
    if (tab === 0) fetchUsers()
    if (tab === 1) fetchJobs()
    if (tab === 2) fetchApplications()
    if (tab === 3) fetchAnalytics()
    if (tab === 4) fetchFeedback()
  }, [tab, token])

  // Update User
  const handleUpdateUser = async (id, updates) => {
    console.log("Updating user:", { id, updates })
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/users/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log("PUT response:", response.data)

      if (response.data.user) {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, ...response.data.user } : user)))
      } else {
        console.warn("No user data in response, fetching users...")
        await fetchUsers()
      }
    } catch (err) {
      console.error("Error updating user:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })
      setError(`Failed to update user: ${err.response?.data?.message || err.message}`)
      setOpenSnackbar(true)
      await fetchUsers()
    }
  }

  // Delete Job
  const handleDeleteJob = async (id) => {
    try {
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id))
      await axios.delete(`http://localhost:5000/api/admin/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      await fetchJobs()
    } catch (err) {
      console.error("Error deleting job:", err.response?.data)
      setError("Failed to delete job")
      setOpenSnackbar(true)
      await fetchJobs()
    }
  }

  // Update Application
  const handleUpdateApplication = async (id, status) => {
    try {
      setApplications((prevApps) => prevApps.map((app) => (app.id === id ? { ...app, status } : app)))
      await axios.put(
        `http://localhost:5000/api/admin/applications/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      await fetchApplications()
    } catch (err) {
      console.error("Error updating application:", err.response?.data)
      setError("Failed to update application")
      setOpenSnackbar(true)
      await fetchApplications()
    }
  }

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTab(newValue)
  }

  // Handle Snackbar Close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  // Filter data based on search and status
  const getFilteredData = (data, type) => {
    if (!data) return []

    return data
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success"
      case "suspended":
        return "warning"
      case "deleted":
        return "error"
      case "accepted":
        return "success"
      case "rejected":
        return "error"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "accepted":
        return <CheckCircleIcon fontSize="small" />
      case "suspended":
      case "pending":
        return <ScheduleIcon fontSize="small" />
      case "deleted":
      case "rejected":
        return <CancelIcon fontSize="small" />
      default:
        return null
    }
  }

  // Data for charts
  const chartData = [
    { name: "Users", value: analytics?.totalUsers || 0, color: COLORS[0] },
    { name: "Jobs", value: analytics?.totalJobs || 0, color: COLORS[1] },
    { name: "Applications", value: analytics?.totalApplications || 0, color: COLORS[2] },
    { name: "Messages", value: analytics?.totalMessages || 0, color: COLORS[3] },
  ]

  // Application status distribution
  const applicationStatusData = applications.reduce((acc, app) => {
    const status = app.status || "pending"
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  const pieData = Object.entries(applicationStatusData).map(([status, count], index) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: COLORS[index % COLORS.length],
  }))

  // Tab configuration
  const tabs = [
    { label: "Users", icon: <PeopleIcon />, count: users.length },
    { label: "Jobs", icon: <WorkIcon />, count: jobs.length },
    { label: "Applications", icon: <AssignmentIcon />, count: applications.length },
    { label: "Analytics", icon: <AnalyticsIcon /> },
    { label: "Feedback", icon: <FeedbackIcon />, count: feedbackMessages.length },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  if (!token) return null

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        backgroundAttachment: "fixed",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(131, 137, 143, 0.95)",
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  width: { xs: 48, md: 56 },
                  height: { xs: 48, md: 56 },
                }}
              >
                <DashboardIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
              </Avatar>
              <Box>
                <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 700, mb: 0.5 }}>
                  Admin Dashboard
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Manage your platform with comprehensive controls
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Refresh Data">
                <IconButton
                  sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}
                  onClick={() => {
                    if (tab === 0) fetchUsers()
                    if (tab === 1) fetchJobs()
                    if (tab === 2) fetchApplications()
                    if (tab === 3) fetchAnalytics()
                    if (tab === 4) fetchFeedback()
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export Data">
                <IconButton sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton sx={{ color: "white", bgcolor: "rgba(255,255,255,0.1)" }} onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Paper>

        {/* Navigation Tabs */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: { xs: "0.875rem", md: "1rem" },
                py: { xs: 2, md: 3 },
                minHeight: { xs: 64, md: 72 },
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            {tabs.map((tabItem, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {tabItem.icon}
                    <span>{tabItem.label}</span>
                    {tabItem.count !== undefined && (
                      <Badge
                        badgeContent={tabItem.count}
                        color="primary"
                        sx={{
                          "& .MuiBadge-badge": {
                            fontSize: "0.75rem",
                            minWidth: "18px",
                            height: "18px",
                          },
                        }}
                      />
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Paper>

        {/* Content */}
        <Fade in={true} timeout={300}>
          <Box>
            {/* Users Tab */}
            {tab === 0 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "primary.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <PeopleIcon />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    User Management
                  </Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 600 }}>
                  {loadingUsers ? (
                    <Box sx={{ p: 4 }}>
                      {[...Array(5)].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" height={60} sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  ) : (
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>User</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Email</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Role</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getFilteredData(users, 0).map((user) => (
                          <TableRow key={user.id} hover>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "primary.main" }}>
                                  <PersonIcon />
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {user.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    ID: {user.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <EmailIcon fontSize="small" color="action" />
                                {user.email}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={user.role}
                                size="small"
                                color={user.role === "admin" ? "error" : user.role === "recruiter" ? "warning" : "info"}
                                sx={{ fontWeight: 600 }}
                              />
                            </TableCell>
                            <TableCell>
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                  value={user.status || "active"}
                                  onChange={(e) => handleUpdateUser(user.id, { status: e.target.value })}
                                  sx={{ borderRadius: 2 }}
                                >
                                  <MenuItem value="active">
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <CheckCircleIcon fontSize="small" color="success" />
                                      Active
                                    </Box>
                                  </MenuItem>
                                  <MenuItem value="suspended">
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <ScheduleIcon fontSize="small" color="warning" />
                                      Suspended
                                    </Box>
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Tooltip title="Delete User">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleUpdateUser(user.id, { status: "deleted" })}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </Paper>
            )}

            {/* Jobs Tab */}
            {tab === 1 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "success.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <WorkIcon />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Job Management
                  </Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 600 }}>
                  {loadingJobs ? (
                    <Box sx={{ p: 4 }}>
                      {[...Array(5)].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" height={60} sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  ) : (
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Job</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Recruiter</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Created</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getFilteredData(jobs, 1).map((job) => (
                          <TableRow key={job.id} hover>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "success.main" }}>
                                  <WorkIcon />
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {job.title}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    ID: {job.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <BusinessIcon fontSize="small" color="action" />
                                {job.recruiter_name || "Unknown"}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CalendarIcon fontSize="small" color="action" />
                                {new Date(job.created_at).toLocaleDateString()}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Tooltip title="Delete Job">
                                  <IconButton size="small" color="error" onClick={() => handleDeleteJob(job.id)}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </Paper>
            )}

            {/* Applications Tab */}
            {tab === 2 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "warning.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <AssignmentIcon />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Application Oversight
                  </Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 600 }}>
                  {loadingApplications ? (
                    <Box sx={{ p: 4 }}>
                      {[...Array(5)].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" height={60} sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  ) : (
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Application</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Candidate</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Recruiter</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Status</TableCell>
                         
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getFilteredData(applications, 2).map((app) => (
                          <TableRow key={app.id} hover>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "warning.main" }}>
                                  <AssignmentIcon />
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {app.job_title}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    ID: {app.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>{app.candidate_name}</TableCell>
                            <TableCell>{app.recruiter_name}</TableCell>
                            <TableCell>
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                  value={app.status ?? "pending"}
                                  onChange={(e) => handleUpdateApplication(app.id, e.target.value)}
                                  sx={{ borderRadius: 2 }}
                                >
                                  <MenuItem value="pending">
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <ScheduleIcon fontSize="small" color="warning" />
                                      Pending
                                    </Box>
                                  </MenuItem>
                                  <MenuItem value="accepted">
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <CheckCircleIcon fontSize="small" color="success" />
                                      Accepted
                                    </Box>
                                  </MenuItem>
                                  <MenuItem value="rejected">
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <CancelIcon fontSize="small" color="error" />
                                      Rejected
                                    </Box>
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                          
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </Paper>
            )}

            {/* Analytics Tab */}
            {tab === 3 && (
              <Grid container spacing={3}>
                {/* Overview Cards */}
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    {chartData.map((item, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                          elevation={0}
                          sx={{
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                            border: `1px solid ${item.color}30`,
                            transition: "transform 0.2s",
                            "&:hover": { transform: "translateY(-4px)" },
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                              <Avatar sx={{ bgcolor: item.color, width: 48, height: 48 }}>
                                {index === 0 && <PeopleIcon />}
                                {index === 1 && <WorkIcon />}
                                {index === 2 && <AssignmentIcon />}
                                {index === 3 && <FeedbackIcon />}
                              </Avatar>
                              <TrendingUpIcon sx={{ color: "success.main" }} />
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: item.color }}>
                              {loadingAnalytics ? <Skeleton width={60} /> : item.value.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                              Total {item.name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/* Charts */}
                <Grid item xs={12} lg={8}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      height: 400,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                      Platform Overview
                    </Typography>
                    {loadingAnalytics ? (
                      <Skeleton variant="rectangular" height={300} />
                    ) : chartData.every((item) => item.value === 0) ? (
                      <Box
                        sx={{
                          height: 300,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <AnalyticsIcon sx={{ fontSize: 64, color: "text.disabled" }} />
                        <Typography variant="body1" color="text.secondary">
                          No data available to display
                        </Typography>
                      </Box>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </Paper>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      height: 400,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                      Application Status
                    </Typography>
                    {loadingApplications ? (
                      <Skeleton variant="circular" width={250} height={250} />
                    ) : pieData.length === 0 ? (
                      <Box
                        sx={{
                          height: 300,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <AssignmentIcon sx={{ fontSize: 64, color: "text.disabled" }} />
                        <Typography variant="body1" color="text.secondary">
                          No applications to display
                        </Typography>
                      </Box>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            )}

            {/* Feedback Tab */}
            {tab === 4 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "info.main",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <FeedbackIcon />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Feedback Messages
                  </Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 600 }}>
                  {loadingFeedback ? (
                    <Box sx={{ p: 4 }}>
                      {[...Array(5)].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" height={60} sx={{ mb: 1 }} />
                      ))}
                    </Box>
                  ) : feedbackMessages.length === 0 ? (
                    <Box
                      sx={{
                        p: 6,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <FeedbackIcon sx={{ fontSize: 64, color: "text.disabled" }} />
                      <Typography variant="h6" color="text.secondary">
                        No feedback messages available
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Feedback messages from users will appear here
                      </Typography>
                    </Box>
                  ) : (
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Contact</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Message</TableCell>
                          <TableCell sx={{ fontWeight: 600, bgcolor: "#f8fafc" }}>Submitted</TableCell>
                        
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getFilteredData(feedbackMessages, 4).map((feedback) => (
                          <TableRow key={feedback.id} hover>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar sx={{ bgcolor: "info.main" }}>
                                  <FeedbackIcon />
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {feedback.first_name} {feedback.last_name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {feedback.email}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{
                                  maxWidth: 300,
                                  whiteSpace: "noraml",
                                  wordBreak: "break-word",
                                }}
                              >
                                {feedback.message}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CalendarIcon fontSize="small" color="action" />
                                {new Date(feedback.submitted_at).toLocaleString()}
                              </Box>
                            </TableCell>
                            <TableCell>
                             
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TableContainer>
              </Paper>
            )}
          </Box>
        </Fade>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}

export default AdminDashboard

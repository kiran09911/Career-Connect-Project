"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import Message from "../../components/chat/Message"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Drawer,
  Divider,
  ListItemIcon,
  Paper,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Snackbar,
  Alert,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"
import {
  Chat as ChatIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Dashboard,
  Work,
  Person,
  Search,
  BusinessCenter,
  Description,
  Settings,
  LocationOn,
  AttachMoney,
  AccessTime,
} from "@mui/icons-material"

const CandidateDashboard = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [applications, setApplications] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)

  // Verify authentication and fetch user data
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login");
          return
        }

        const response = await axios.get("http://localhost:5000/api/candidate/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched currentUser:", response.data);
        setCurrentUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Auth verification failed:", error)
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setLoading(false);
        }
      }
    }

    verifyAuth();
  }, [navigate]);

  // Fetch available jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs")
        setJobs(response.data)
        setFilteredJobs(response.data)
      } catch (err) {
        console.error("Error fetching jobs:", err)
      }
    }

    fetchJobs()
  }, [])

  // Fetch user applications
  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser?.id) return

      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/api/applications/candidate", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setApplications(response.data)
      } catch (err) {
        console.error("Error fetching applications:", err)
      }
    }

    fetchApplications()
  }, [currentUser])

  // Filter jobs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredJobs(jobs)
    } else {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredJobs(filtered)
    }
  }, [searchTerm, jobs])

  const handleApply = async (jobId, recruiterId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "http://localhost:5000/api/applications",
        { jobId, recruiterId },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setSnackbar({
        open: true,
        message: "Application submitted successfully!",
        severity: "success",
      })

      const response = await axios.get("http://localhost:5000/api/applications/candidate", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setApplications(response.data)
    } catch (err) {
      console.error("Error applying for job:", err)
      setSnackbar({
        open: true,
        message: err.response?.data?.error || "Failed to apply for the job.",
        severity: "error",
      })
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  // Open chat for a specific recruiter and job
  const handleChatOpen = async (recruiterId, recruiterName, jobId, jobTitle) => {
    console.log("handleChatOpen called with:", { recruiterId, recruiterName, jobId, jobTitle });

    if (!recruiterId || !currentUser?.id || !jobId) {
      console.error("Missing recruiterId, currentUser.id, or jobId:", { recruiterId, currentUserId: currentUser?.id, jobId });
      setSnackbar({
        open: true,
        message: "Unable to start chat. Please try again.",
        severity: "error",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/conversations",
        {
          user1Id: currentUser.id,
          user2Id: recruiterId,
          jobId: jobId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const conversationId = response.data.conversationId;
      console.log("Fetched conversationId:", conversationId);

      setSelectedConversation({
        id: conversationId,
        name: recruiterName || "Recruiter",
        receiverId: recruiterId,
        jobTitle: jobTitle || "Job",
      });
      setShowChat(true);
    } catch (err) {
      console.error("Error fetching conversation ID:", err.response?.data || err.message);
      setSnackbar({
        open: true,
        message: "Failed to start chat. Please try again.",
        severity: "error",
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  const hasApplied = (jobId) => {
    return applications.some((app) => app.job_id === jobId)
  }

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mb: 2,
            bgcolor: theme.palette.primary.main,
          }}
        >
          {currentUser?.name?.charAt(0) || "C"}
        </Avatar>
        <Typography variant="h6" noWrap component="div">
          Candidate Portal
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentUser?.email || "candidate@example.com"}
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => setTabValue(0)} selected={tabValue === 0}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => setTabValue(0)} selected={tabValue === 0}>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary="Browse Jobs" />
        </ListItem>
        <ListItem button onClick={() => setTabValue(1)} selected={tabValue === 1}>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary="Applied Jobs" />
        </ListItem>
        <ListItem button component={Link} to="/candidate/profile">
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/candidate/profile/edit">
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>
        <ListItem button component={Link} to="/candidate/settings">
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          background: "linear-gradient(90deg, #1976d2, #2196f3)",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <BusinessCenter sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CareerConnect
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <Button
              color="inherit"
              onClick={handleProfileMenuOpen}
              startIcon={
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.light",
                  }}
                >
                  {currentUser?.name?.charAt(0) || "C"}
                </Avatar>
              }
            >
              Profile
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/candidate/profile">
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/candidate/settings">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: 250,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 250,
            boxSizing: "border-box",
            mt: "64px",
            height: "calc(100% - 64px)",
          },
          display: { xs: isMobile && !drawerOpen ? "none" : "block", md: "block" },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 250px)` },
          mt: "64px",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Available Jobs" icon={<Work />} iconPosition="start" />
            <Tab
              label={`Applied Jobs${applications.length > 0 ? ` (${applications.length})` : ""}`}
              icon={<Description />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Explore Job Opportunities
              </Typography>

              <TextField
                placeholder="Search jobs..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm("")}>
                        ×
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: "300px" },
                  bgcolor: "background.paper",
                  borderRadius: 1,
                }}
              />
            </Box>

            {filteredJobs.length === 0 ? (
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  background: "linear-gradient(to bottom right, #f5f5f5, #ffffff)",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Work sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5 }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  No jobs found
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {searchTerm
                    ? "Try adjusting your search criteria."
                    : "There are no job postings available at the moment."}
                </Typography>
                {searchTerm && (
                  <Button variant="outlined" onClick={() => setSearchTerm("")} sx={{ mt: 2 }}>
                    Clear Search
                  </Button>
                )}
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredJobs.map((job) => (
                  <Grid item xs={12} md={6} lg={4} key={job.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                          {job.title}
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                          {job.company && (
                            <Chip size="small" label={job.company} icon={<BusinessCenter fontSize="small" />} />
                          )}
                          {job.location && (
                            <Chip size="small" label={job.location} icon={<LocationOn fontSize="small" />} />
                          )}
                          {job.salary && (
                            <Chip size="small" label={`$${job.salary}`} icon={<AttachMoney fontSize="small" />} />
                          )}
                        </Box>

                        <Typography variant="body2" color="text.secondary" paragraph>
                          {job.description && job.description.length > 150
                            ? `${job.description.substring(0, 150)}...`
                            : job.description}
                        </Typography>
                      </CardContent>

                      <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleApply(job.id, job.recruiterId)}
                          disabled={hasApplied(job.id)}
                          sx={{
                            borderRadius: 2,
                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                          }}
                        >
                          {hasApplied(job.id) ? "Applied" : "Apply Now"}
                        </Button>

                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<ChatIcon />}
                          onClick={() => handleChatOpen(job.recruiterId, job.recruiterName, job.id, job.title)}
                          sx={{ borderRadius: 2 }}
                        >
                          Chat
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {tabValue === 1 && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Applied Jobs
              </Typography>
            </Box>

            {applications.length === 0 ? (
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  background: "linear-gradient(to bottom right, #f5f5f5, #ffffff)",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Description sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5 }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  No applications yet
                </Typography>
                <Typography color="text.secondary" paragraph>
                  You haven't applied to any jobs yet. Browse available jobs and submit your first application.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setTabValue(0)}
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Browse Jobs
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {applications.map((application) => {
                  const job = jobs.find((j) => j.id === application.job_id) || {
                    title: "Unknown Position",
                    company: "Unknown Company",
                    location: "Unknown Location",
                    job_type: "Unknown Type",
                  }

                  return (
                    <Grid item xs={12} md={6} lg={4} key={application.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: 2,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h5" component="h2" gutterBottom>
                            {job.title}
                          </Typography>

                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                            {job.company && (
                              <Chip size="small" label={job.company} icon={<BusinessCenter fontSize="small" />} />
                            )}
                            {job.location && (
                              <Chip size="small" label={job.location} icon={<LocationOn fontSize="small" />} />
                            )}
                            {job.job_type && (
                              <Chip
                                size="small"
                                label={job.job_type}
                                color="primary"
                                variant="outlined"
                                icon={<AccessTime fontSize="small" />}
                              />
                            )}
                            {job.salary && (
                              <Chip size="small" label={job.salary} icon={<AttachMoney fontSize="small" />} />
                            )}
                          </Box>

                          <Box sx={{ mt: 2 }}>
                            <Chip
                              label={application.status || "Applied"}
                              color={
                                application.status === "Rejected"
                                  ? "error"
                                  : application.status === "Accepted"
                                    ? "success"
                                    : "primary"
                              }
                              sx={{ fontWeight: "bold" }}
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              Applied on: {new Date(application.created_at || Date.now()).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </CardContent>
                        <CardActions sx={{ p: 2, pt: 0 }}></CardActions>
                      </Card>
                    </Grid>
                  )
                })}
              </Grid>
            )}
          </>
        )}

        <Dialog open={showChat} onClose={() => setShowChat(false)} fullWidth maxWidth="md">
          <DialogTitle>
            Chat with {selectedConversation?.name || "Recruiter"} about {selectedConversation?.jobTitle}
          </DialogTitle>
          <DialogContent>
            {selectedConversation && (
              <Message
                currentUser={currentUser}
                conversationId={selectedConversation.id}
                receiverId={selectedConversation.receiverId}
                receiverName={selectedConversation.name}
              />
            )}
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}

export default CandidateDashboard
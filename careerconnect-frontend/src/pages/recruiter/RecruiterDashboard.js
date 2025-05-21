// // "use client"

// // import { useState, useEffect } from "react"
// // import axios from "axios"
// // import { useNavigate, Link } from "react-router-dom"
// // import {
// //   Paper,
// //   Typography,
// //   Button,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   IconButton,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Snackbar,
// //   Alert,
// //   CircularProgress,
// //   AppBar,
// //   Toolbar,
// //   Box,
// //   Drawer,
// //   Divider,
// //   ListItemIcon,
// //   Avatar,
// //   Chip,
// //   Grid,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Badge,
// //   Menu,
// //   MenuItem,
// //   useTheme,
// //   useMediaQuery,
// //   Tab,
// //   Tabs,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem as SelectMenuItem,
// // } from "@mui/material"
// // import {
// //   Delete,
// //   Edit,
// //   Logout,
// //   Dashboard,
// //   Work,
// //   Person,
// //   Add,
// //   Menu as MenuIcon,
// //   Notifications,
// //   BusinessCenter,
// //   Description,
// //   Mail,
// //   Settings,
// //   ArrowForward,
// //   Chat as ChatIcon,
// // } from "@mui/icons-material"
// // import PostJob from "./PostJob"
// // import EditJob from "./EditJob"
// // import Message from "../../components/chat/Message"

// // const RecruiterDashboard = () => {
// //   const [jobs, setJobs] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState(null)
// //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
// //   const [jobToDelete, setJobToDelete] = useState(null)
// //   const [editJob, setEditJob] = useState(null)
// //   const [showPostJob, setShowPostJob] = useState(false)
// //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
// //   const [applications, setApplications] = useState([])
// //   const [drawerOpen, setDrawerOpen] = useState(false)
// //   const [anchorEl, setAnchorEl] = useState(null)
// //   const [tabValue, setTabValue] = useState(0)
// //   const [userLoading, setUserLoading] = useState(true)
// //   const [user, setUser] = useState({ name: "", email: "" })
// //   const [showChat, setShowChat] = useState(false)
// //   const [selectedConversation, setSelectedConversation] = useState(null)

// //   const theme = useTheme()
// //   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
// //   const navigate = useNavigate()

// //   const fetchApplications = async () => {
// //     try {
// //       const token = localStorage.getItem("token")
// //       if (!token) {
// //         console.error("No token found in localStorage")
// //         navigate("/login")
// //         return
// //       }

// //       const response = await axios.get("http://localhost:5000/api/applications/recruiter", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       setApplications(response.data)
// //     } catch (err) {
// //       console.error("Error fetching applications:", err)
// //     }
// //   }

// //   const fetchJobs = async () => {
// //     try {
// //       const token = localStorage.getItem("token")
// //       if (!token) {
// //         console.error("No token found in localStorage")
// //         navigate("/login")
// //         return
// //       }

// //       const response = await axios.get("http://localhost:5000/api/jobs/recruiter", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       setJobs(response.data)
// //     } catch (err) {
// //       if (err.response?.status === 403) {
// //         console.error("Forbidden: Invalid or expired token")
// //         localStorage.removeItem("token")
// //         navigate("/login")
// //       } else {
// //         console.error("Error fetching jobs:", err)
// //       }
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const fetchUserProfile = async () => {
// //     try {
// //       const token = localStorage.getItem("token")
// //       if (!token) {
// //         console.error("No token found in localStorage")
// //         navigate("/login")
// //         return
// //       }

// //       const response = await axios.get("http://localhost:5000/api/user", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })

// //       setUser(response.data)
// //     } catch (err) {
// //       console.error("Error fetching user profile:", err)
// //       if (err.response?.status === 401) {
// //         localStorage.removeItem("token")
// //         navigate("/login")
// //       }
// //     } finally {
// //       setUserLoading(false)
// //     }
// //   }

// //   const handleStatusChange = async (applicationId, newStatus) => {
// //     try {
// //       const token = localStorage.getItem("token")
// //       if (!token) {
// //         console.error("No token found in localStorage")
// //         navigate("/login")
// //         return
// //       }

// //       await axios.put(
// //         `http://localhost:5000/api/applications/${applicationId}/status`,
// //         { status: newStatus },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       )

// //       setApplications((prev) =>
// //         prev.map((app) =>
// //           app.application_id === applicationId ? { ...app, status: newStatus } : app
// //         )
// //       )
// //       setSnackbar({ open: true, message: "Application status updated", severity: "success" })
// //     } catch (err) {
// //       console.error("Error updating application status:", err)
// //       if (err.response?.status === 401) {
// //         localStorage.removeItem("token")
// //         navigate("/login")
// //       } else {
// //         setSnackbar({
// //           open: true,
// //           message: err.response?.data?.error || "Failed to update status",
// //           severity: "error",
// //         })
// //       }
// //     }
// //   }

// //   useEffect(() => {
// //     fetchJobs()
// //     fetchApplications()
// //     fetchUserProfile()
// //   }, [])

// //   const handleDeleteClick = (job) => {
// //     setJobToDelete(job)
// //     setDeleteDialogOpen(true)
// //   }

// //   const handleDeleteConfirm = async () => {
// //     try {
// //       const token = localStorage.getItem("token")
// //       if (!token) {
// //         console.error("No token found in localStorage")
// //         setSnackbar({ open: true, message: "Unauthorized: Please log in again", severity: "error" })
// //         navigate("/login")
// //         return
// //       }

// //       await axios.delete(`http://localhost:5000/api/jobs/${jobToDelete.id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })

// //       setSnackbar({ open: true, message: "Job deleted successfully", severity: "success" })
// //       fetchJobs()
// //     } catch (err) {
// //       if (err.response?.status === 401) {
// //         console.error("Unauthorized: Invalid or expired token")
// //         localStorage.removeItem("token")
// //         navigate("/login")
// //       } else {
// //         setSnackbar({ open: true, message: "Failed to delete job", severity: "error" })
// //       }
// //     } finally {
// //       setDeleteDialogOpen(false)
// //     }
// //   }

// //   const handleEditClick = (job) => {
// //     setEditJob(job)
// //   }

// //   const handleJobUpdated = () => {
// //     setEditJob(null)
// //     fetchJobs()
// //     setSnackbar({ open: true, message: "Job updated successfully", severity: "success" })
// //   }

// //   const handleLogout = () => {
// //     localStorage.removeItem("token")
// //     localStorage.removeItem("userRole")
// //     localStorage.removeItem("userId")
// //     setUser({ name: "", email: "" })
// //     navigate("/login")
// //   }

// //   const handleProfileMenuOpen = (event) => {
// //     setAnchorEl(event.currentTarget)
// //   }

// //   const handleProfileMenuClose = () => {
// //     setAnchorEl(null)
// //   }

// //   const handleTabChange = (event, newValue) => {
// //     setTabValue(newValue)
// //   }

// //   const toggleDrawer = () => {
// //     setDrawerOpen(!drawerOpen)
// //   }

// //   const handleChatOpen = async (candidateId, candidateName, jobId, jobTitle) => {
// //     console.log("handleChatOpen called with:", { candidateId, candidateName, jobId, jobTitle });

// //     if (!candidateId || !user?.id || !jobId) {
// //       console.error("Missing candidateId, user.id, or jobId:", { userId: user?.id, jobId });
// //       setSnackbar({
// //         open: true,
// //         message: "Unable to start chat. Please try again.",
// //         severity: "error",
// //       });
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.post(
// //         "http://localhost:5000/api/conversations",
// //         {
// //           user1Id: user.id,
// //           user2Id: candidateId,
// //           jobId: jobId,
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       const conversationId = response.data.conversationId;
// //       console.log("Fetched conversationId:", conversationId);

// //       setSelectedConversation({
// //         id: conversationId,
// //         name: candidateName || "Candidate",
// //         receiverId: candidateId,
// //         jobTitle: jobTitle || "Job",
// //       });
// //       setShowChat(true);
// //     } catch (err) {
// //       console.error("Error fetching conversation ID:", err.response?.data || err.message);
// //       setSnackbar({
// //         open: true,
// //         message: "Failed to start chat. Please try again.",
// //         severity: "error",
// //       });
// //     }
// //   };

// //   if (loading)
// //     return (
// //       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
// //         <CircularProgress />
// //       </Box>
// //     )

// //   if (error)
// //     return (
// //       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
// //         <Alert severity="error" sx={{ width: "80%", maxWidth: "600px" }}>
// //           {error}
// //         </Alert>
// //       </Box>
// //     )

// //    const drawerContent = (
// //     <Box sx={{ width: 250 }}>
// //       <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
// //         <Avatar
// //           sx={{
// //             width: 80,
// //             height: 80,
// //             mb: 2,
// //             bgcolor: theme.palette.primary.main,
// //             color: "white",
// //             fontSize: "2rem",
// //             fontWeight: "bold",
// //           }}
// //           src={user?.profile_photo ? `http://localhost:5000${user.profile_photo}` : undefined}
// //           onError={(e) => {
// //             e.target.src = undefined; // Fallback to the initial if the image fails to load
// //           }}
// //         >
// //           {user.name ? user.name.charAt(0).toUpperCase() : "R"}
// //         </Avatar>
// //         <Typography variant="h6" noWrap component="div">
// //           {user.name || "Recruiter Portal"}
// //         </Typography>
// //         <Typography variant="body2" color="text.secondary">
// //           {user.email || "recruiter@example.com"}
// //         </Typography>
// //       </Box>
// //       <Divider />
// //       <List>
// //         <ListItem button component={Link} to="/recruiter-dashboard" selected>
// //           <ListItemIcon>
// //             <Dashboard />
// //           </ListItemIcon>
// //           <ListItemText primary="Dashboard" />
// //         </ListItem>
// //         <ListItem button onClick={() => setShowPostJob(true)}>
// //           <ListItemIcon>
// //             <Add />
// //           </ListItemIcon>
// //           <ListItemText primary="Post New Job" />
// //         </ListItem>
// //         <ListItem button component={Link} to="/recruiter/profile-edit">
// //           <ListItemIcon>
// //             <Person />
// //           </ListItemIcon>
// //           <ListItemText primary="Profile" />
// //         </ListItem>
// //         <ListItem button component={Link} to="/recruiter/settings">
// //           <ListItemIcon>
// //             <Settings />
// //           </ListItemIcon>
// //           <ListItemText primary="Settings" />
// //         </ListItem>
// //       </List>
// //       <Divider />
// //       <List>
// //         <ListItem button onClick={handleLogout}>
// //           <ListItemIcon>
// //             <Logout />
// //           </ListItemIcon>
// //           <ListItemText primary="Logout" />
// //         </ListItem>
// //       </List>
// //     </Box>
// //   )

// //   return (
// //     <Box sx={{ display: "flex" }}>
// //       <AppBar
// //         position="fixed"
// //         sx={{
// //           zIndex: (theme) => theme.zIndex.drawer + 1,
// //           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
// //           background: "linear-gradient(90deg, #1976d2, #2196f3)",
// //         }}
// //       >
// //         <Toolbar>
// //           <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2, display: { md: "none" } }}>
// //             <MenuIcon />
// //           </IconButton>
// //           <BusinessCenter sx={{ mr: 1 }} />
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //             CareerConnect
// //           </Typography>

// //           <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
// //             <IconButton color="inherit" sx={{ mr: 1 }}>
// //               <Badge badgeContent={applications.length} color="error">
// //                 <Notifications />
// //               </Badge>
// //             </IconButton>
// //             <Button
// //               color="inherit"
// //               onClick={handleProfileMenuOpen}
// //               startIcon={
// //                 <Avatar
// //                   sx={{
// //                     width: 32,
// //                     height: 32,
// //                     bgcolor: "primary.light",
// //                   }}
// //                 >
// //                   {localStorage.getItem("userName")?.charAt(0) || "R"}
// //                 </Avatar>
// //               }
// //             >
// //               Profile
// //             </Button>
// //           </Box>
// //         </Toolbar>
// //       </AppBar>

// //       <Menu
// //         anchorEl={anchorEl}
// //         open={Boolean(anchorEl)}
// //         onClose={handleProfileMenuClose}
// //         transformOrigin={{ horizontal: "right", vertical: "top" }}
// //         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
// //       >
// //         <MenuItem component={Link} to="/recruiter/profile-edit">
// //           <ListItemIcon>
// //             <Person fontSize="small" />
// //           </ListItemIcon>
// //           <ListItemText>Profile</ListItemText>
// //         </MenuItem>
// //         <MenuItem component={Link} to="/recruiter/settings">
// //           <ListItemIcon>
// //             <Settings fontSize="small" />
// //           </ListItemIcon>
// //           <ListItemText>Settings</ListItemText>
// //         </MenuItem>
// //         <Divider />
// //         <MenuItem onClick={handleLogout}>
// //           <ListItemIcon>
// //             <Logout fontSize="small" />
// //           </ListItemIcon>
// //           <ListItemText>Logout</ListItemText>
// //         </MenuItem>
// //       </Menu>

// //       <Drawer
// //         variant={isMobile ? "temporary" : "permanent"}
// //         open={isMobile ? drawerOpen : true}
// //         onClose={toggleDrawer}
// //         sx={{
// //           width: 250,
// //           flexShrink: 0,
// //           [`& .MuiDrawer-paper`]: {
// //             width: 250,
// //             boxSizing: "border-box",
// //             mt: "64px",
// //             height: "calc(100% - 64px)",
// //           },
// //           display: { xs: isMobile && !drawerOpen ? "none" : "block", md: "block" },
// //         }}
// //       >
// //         {drawerContent}
// //       </Drawer>

// //       <Box
// //         component="main"
// //         sx={{
// //           flexGrow: 1,
// //           p: 3,
// //           width: { md: `calc(100% - 250px)` },
// //           mt: "64px",
// //         }}
// //       >
// //         <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
// //           <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
// //             <Tab label="Job Postings" icon={<Work />} iconPosition="start" />
// //             <Tab label={`Applications (${applications.length})`} icon={<Description />} iconPosition="start" />
// //           </Tabs>
// //         </Box>

// //         {tabValue === 0 && (
// //           <>
// //             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// //               <Typography variant="h4" sx={{ fontWeight: "bold" }}>
// //                 Your Job Postings
// //               </Typography>
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 startIcon={<Add />}
// //                 onClick={() => setShowPostJob(true)}
// //                 sx={{
// //                   borderRadius: 2,
// //                   px: 3,
// //                   py: 1,
// //                   boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
// //                 }}
// //               >
// //                 Post New Job
// //               </Button>
// //             </Box>

// //             {jobs.length === 0 ? (
// //               <Paper
// //                 sx={{
// //                   p: 4,
// //                   textAlign: "center",
// //                   borderRadius: 2,
// //                   boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
// //                   background: "linear-gradient(to bottom right, #f5f5f5, #ffffff)",
// //                 }}
// //               >
// //                 <Box sx={{ mb: 2 }}>
// //                   <Work sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5 }} />
// //                 </Box>
// //                 <Typography variant="h6" gutterBottom>
// //                   You haven't posted any jobs yet
// //                 </Typography>
// //                 <Typography color="text.secondary" paragraph>
// //                   Create your first job posting to start receiving applications from qualified candidates.
// //                 </Typography>
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   startIcon={<Add />}
// //                   onClick={() => setShowPostJob(true)}
// //                   sx={{ mt: 2, borderRadius: 2 }}
// //                 >
// //                   Post Your First Job
// //                 </Button>
// //               </Paper>
// //             ) : (
// //               <Grid container spacing={3}>
// //                 {jobs.map((job) => (
// //                   <Grid item xs={12} key={job.id}>
// //                     <Card
// //                       sx={{
// //                         borderRadius: 2,
// //                         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// //                         transition: "transform 0.2s, box-shadow 0.2s",
// //                         "&:hover": {
// //                           transform: "translateY(-4px)",
// //                           boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
// //                         },
// //                       }}
// //                     >
// //                       <CardContent>
// //                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
// //                           <Box>
// //                             <Typography variant="h5" component="h2" gutterBottom>
// //                               {job.title}
// //                             </Typography>
// //                             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
// //                               <Chip size="small" label={job.company} icon={<BusinessCenter fontSize="small" />} />
// //                               <Chip size="small" label={job.location} />
// //                               <Chip size="small" label={job.job_type} color="primary" variant="outlined" />
// //                               {job.salary && <Chip size="small" label={job.salary} />}
// //                             </Box>
// //                           </Box>
// //                           <Box>
// //                             <Chip
// //                               label={`${applications.filter((app) => app.job_id === job.id).length} Applications`}
// //                               color="primary"
// //                               sx={{ fontWeight: "bold" }}
// //                             />
// //                           </Box>
// //                         </Box>

// //                         <Typography variant="body2" color="text.secondary" paragraph>
// //                           {job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}
// //                         </Typography>
// //                       </CardContent>
// //                       <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
// //                         <Button size="small" startIcon={<Edit />} onClick={() => handleEditClick(job)}>
// //                           Edit
// //                         </Button>
// //                         <Button
// //                           size="small"
// //                           color="error"
// //                           startIcon={<Delete />}
// //                           onClick={() => handleDeleteClick(job)}
// //                         >
// //                           Delete
// //                         </Button>
// //                       </CardActions>
// //                     </Card>
// //                   </Grid>
// //                 ))}
// //               </Grid>
// //             )}
// //           </>
// //         )}

// //         {tabValue === 1 && (
// //           <>
// //             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
// //               <Typography variant="h4" sx={{ fontWeight: "bold" }}>
// //                 Applications
// //               </Typography>
// //             </Box>

// //             {applications.length === 0 ? (
// //               <Paper
// //                 sx={{
// //                   p: 4,
// //                   textAlign: "center",
// //                   borderRadius: 2,
// //                   boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
// //                   background: "linear-gradient(to bottom right, #f5f5f5, #ffffff)",
// //                 }}
// //               >
// //                 <Box sx={{ mb: 2 }}>
// //                   <Description sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5 }} />
// //                 </Box>
// //                 <Typography variant="h6" gutterBottom>
// //                   No applications received yet
// //                 </Typography>
// //                 <Typography color="text.secondary" paragraph>
// //                   When candidates apply to your job postings, their applications will appear here.
// //                 </Typography>
// //               </Paper>
// //             ) : (
// //               <Grid container spacing={3}>
// //                 {applications.map((app) => (
// //                   <Grid item xs={12} md={6} key={app.application_id}>
// //                     <Card
// //                       sx={{
// //                         borderRadius: 2,
// //                         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
// //                         height: "100%",
// //                         display: "flex",
// //                         flexDirection: "column",
// //                       }}
// //                     >
// //                       <CardContent sx={{ flexGrow: 1 }}>
// //                         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
// //                           <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
// //                             {(app.candidate_name || app.candidate_email || 'C').charAt(0)}
// //                           </Avatar>
// //                           <Box>
// //                             <Typography variant="h6">
// //                               {app.candidate_name || 'Unknown Candidate'}
// //                             </Typography>
// //                             <Typography variant="body2" color="text.secondary">
// //                               <Mail fontSize="small" sx={{ mr: 0.5, verticalAlign: "text-bottom" }} />
// //                               {app.candidate_email || 'No email available'}
// //                             </Typography>
// //                           </Box>
// //                         </Box>
// //                         <Divider sx={{ my: 1.5 }} />
// //                         <Typography variant="subtitle1" gutterBottom>
// //                           Applied for: <strong>{app.job_title}</strong>
// //                         </Typography>
// //                         <Typography variant="body2" color="text.secondary">
// //                           Company: {app.job_company}
// //                         </Typography>
// //                         <Typography variant="body2" color="text.secondary">
// //                           {app.applied_date
// //                             ? new Date(app.applied_date).toLocaleDateString("en-US", {
// //                                 year: "numeric",
// //                                 month: "long",
// //                                 day: "numeric",
// //                               })
// //                             : "Date not available"}
// //                         </Typography>
// //                         <Typography variant="body2" sx={{ mt: 1 }}>
// //                           <strong>Status:</strong> {(app.status || 'Pending').charAt(0).toUpperCase() + (app.status || 'Pending').slice(1)}
// //                         </Typography>
// //                       </CardContent>
// //                       <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
// //                         <Button
// //                           variant="outlined"
// //                           color="secondary"
// //                           startIcon={<ChatIcon />}
// //                           onClick={() => handleChatOpen(app.candidate_id, app.candidate_name || 'Unknown Candidate', app.job_id, app.job_title)}
// //                         >
// //                           Chat
// //                         </Button>
// //                         <Button
// //                           size="small"
// //                           endIcon={<ArrowForward />}
// //                           component={Link}
// //                           to={`/recruiter/applications/${app.application_id}`}
// //                         >
// //                           View Details
// //                         </Button>
// //                         <FormControl sx={{ minWidth: 120 }}>
// //                           <InputLabel>Status</InputLabel>
// //                           <Select
// //                             value={app.status || 'pending'}
// //                             label="Status"
// //                             onChange={(e) => handleStatusChange(app.application_id, e.target.value)}
// //                           >
// //                             <SelectMenuItem value="pending">Pending</SelectMenuItem>
// //                             <SelectMenuItem value="accepted">Accepted</SelectMenuItem>
// //                             <SelectMenuItem value="rejected">Rejected</SelectMenuItem>
// //                           </Select>
// //                         </FormControl>
// //                       </CardActions>
// //                     </Card>
// //                   </Grid>
// //                 ))}
// //               </Grid>
// //             )}
// //           </>
// //         )}

// //         <Dialog
// //           open={showPostJob}
// //           onClose={() => setShowPostJob(false)}
// //           fullWidth
// //           maxWidth="md"
// //           PaperProps={{
// //             sx: {
// //               borderRadius: 2,
// //               boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
// //             },
// //           }}
// //         >
// //           <DialogTitle sx={{ pb: 1 }}>
// //             <Typography variant="h5" component="div" fontWeight="bold">
// //               Post New Job
// //             </Typography>
// //           </DialogTitle>
// //           <DialogContent dividers>
// //             <PostJob
// //               onSuccess={() => {
// //                 setShowPostJob(false)
// //                 fetchJobs()
// //                 setSnackbar({ open: true, message: "Job posted successfully", severity: "success" })
// //               }}
// //             />
// //           </DialogContent>
// //         </Dialog>

// //         <Dialog
// //           open={Boolean(editJob)}
// //           onClose={() => setEditJob(null)}
// //           fullWidth
// //           maxWidth="md"
// //           PaperProps={{
// //             sx: {
// //               borderRadius: 2,
// //               boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
// //             },
// //           }}
// //         >
// //           <DialogTitle sx={{ pb: 1 }}>
// //             <Typography variant="h5" component="div" fontWeight="bold">
// //               Edit Job
// //             </Typography>
// //           </DialogTitle>
// //           <DialogContent dividers>
// //             {editJob ? (
// //               <EditJob
// //                 job={editJob}
// //                 onSuccess={() => {
// //                   setEditJob(null)
// //                   fetchJobs()
// //                   setSnackbar({
// //                     open: true,
// //                     message: "Job updated successfully",
// //                     severity: "success",
// //                   })
// //                 }}
// //                 onCancel={() => setEditJob(null)}
// //               />
// //             ) : (
// //               <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
// //                 <CircularProgress />
// //               </Box>
// //             )}
// //           </DialogContent>
// //         </Dialog>

// //         <Dialog
// //           open={deleteDialogOpen}
// //           onClose={() => setDeleteDialogOpen(false)}
// //           PaperProps={{
// //             sx: {
// //               borderRadius: 2,
// //               boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
// //             },
// //           }}
// //         >
// //           <DialogTitle>
// //             <Typography variant="h6" component="div" fontWeight="bold">
// //               Confirm Delete
// //             </Typography>
// //           </DialogTitle>
// //           <DialogContent>
// //             <Typography>
// //               Are you sure you want to delete "{jobToDelete?.title}" position at {jobToDelete?.company}?
// //             </Typography>
// //             <Typography variant="body2" color="error" sx={{ mt: 2 }}>
// //               This action cannot be undone.
// //             </Typography>
// //           </DialogContent>
// //           <DialogActions sx={{ p: 2 }}>
// //             <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined">
// //               Cancel
// //             </Button>
// //             <Button onClick={handleDeleteConfirm} color="error" variant="contained" startIcon={<Delete />}>
// //               Delete
// //             </Button>
// //           </DialogActions>
// //         </Dialog>

// //         <Dialog open={showChat} onClose={() => setShowChat(false)} fullWidth maxWidth="md">
// //           <DialogTitle>
// //             Chat with {selectedConversation?.name || "Candidate"} about {selectedConversation?.jobTitle}
// //           </DialogTitle>
// //           <DialogContent>
// //             {selectedConversation && (
// //               <Message
// //                 currentUser={{
// //                   id: user.id || localStorage.getItem("userId"),
// //                   name: user.name,
// //                   email: user.email,
// //                 }}
// //                 conversationId={selectedConversation.id}
// //                 receiverId={selectedConversation.receiverId}
// //                 receiverName={selectedConversation.name}
// //               />
// //             )}
// //           </DialogContent>
// //         </Dialog>

// //         <Snackbar
// //           open={snackbar.open}
// //           autoHideDuration={6000}
// //           onClose={() => setSnackbar({ ...snackbar, open: false })}
// //           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //         >
// //           <Alert
// //             severity={snackbar.severity}
// //             onClose={() => setSnackbar({ ...snackbar, open: false })}
// //             variant="filled"
// //             sx={{ width: "100%" }}
// //           >
// //             {snackbar.message}
// //           </Alert>
// //         </Snackbar>
// //       </Box>
// //     </Box>
// //   )
// // }

// // export default RecruiterDashboard
// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"
// import {
//   Paper,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   CircularProgress,
//   AppBar,
//   Toolbar,
//   Box,
//   Drawer,
//   Divider,
//   ListItemIcon,
//   Avatar,
//   Chip,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   Badge,
//   Menu,
//   MenuItem,
//   useTheme,
//   useMediaQuery,
//   Tab,
//   Tabs,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem as SelectMenuItem,
//   TextField,
//   InputAdornment,
//   Container,
//   Tooltip,
// } from "@mui/material"
// import {
//   Delete,
//   Edit,
//   Logout,
//   Dashboard,
//   Work,
//   Person,
//   Add,
//   Menu as MenuIcon,
//   Notifications,
//   BusinessCenter,
//   Description,
//   Mail,
//   Settings,
//   ArrowForward,
//   Chat as ChatIcon,
//   Search,
//   LocationOn,
//   AccessTime,
//   AttachMoney,
//   Close,
//   KeyboardArrowDown,
//   Refresh,
// } from "@mui/icons-material"
// import PostJob from "./PostJob"
// import EditJob from "./EditJob"
// import Message from "../../components/chat/Message"

// const RecruiterDashboard = () => {
//   const [jobs, setJobs] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [jobToDelete, setJobToDelete] = useState(null)
//   const [editJob, setEditJob] = useState(null)
//   const [showPostJob, setShowPostJob] = useState(false)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
//   const [applications, setApplications] = useState([])
//   const [drawerOpen, setDrawerOpen] = useState(false)
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [tabValue, setTabValue] = useState(0)
//   const [userLoading, setUserLoading] = useState(true)
//   const [user, setUser] = useState({ name: "", email: "" })
//   const [showChat, setShowChat] = useState(false)
//   const [selectedConversation, setSelectedConversation] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filteredJobs, setFilteredJobs] = useState([])
//   const [filteredApplications, setFilteredApplications] = useState([])
//   const [statusFilter, setStatusFilter] = useState("all")

//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))
//   const navigate = useNavigate()

//   const fetchApplications = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         console.error("No token found in localStorage")
//         navigate("/login")
//         return
//       }

//       const response = await axios.get("http://localhost:5000/api/applications/recruiter", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       setApplications(response.data)
//       setFilteredApplications(response.data)
//     } catch (err) {
//       console.error("Error fetching applications:", err)
//     }
//   }

//   const fetchJobs = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         console.error("No token found in localStorage")
//         navigate("/login")
//         return
//       }

//       const response = await axios.get("http://localhost:5000/api/jobs/recruiter", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       setJobs(response.data)
//       setFilteredJobs(response.data)
//     } catch (err) {
//       if (err.response?.status === 403) {
//         console.error("Forbidden: Invalid or expired token")
//         localStorage.removeItem("token")
//         navigate("/login")
//       } else {
//         console.error("Error fetching jobs:", err)
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchUserProfile = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         console.error("No token found in localStorage")
//         navigate("/login")
//         return
//       }

//       const response = await axios.get("http://localhost:5000/api/user", {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       setUser(response.data)
//     } catch (err) {
//       console.error("Error fetching user profile:", err)
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token")
//         navigate("/login")
//       }
//     } finally {
//       setUserLoading(false)
//     }
//   }

//   const handleStatusChange = async (applicationId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         console.error("No token found in localStorage")
//         navigate("/login")
//         return
//       }

//       await axios.put(
//         `http://localhost:5000/api/applications/${applicationId}/status`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       setApplications((prev) =>
//         prev.map((app) => (app.application_id === applicationId ? { ...app, status: newStatus } : app)),
//       )

//       setFilteredApplications((prev) =>
//         prev.map((app) => (app.application_id === applicationId ? { ...app, status: newStatus } : app)),
//       )

//       setSnackbar({ open: true, message: "Application status updated", severity: "success" })
//     } catch (err) {
//       console.error("Error updating application status:", err)
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token")
//         navigate("/login")
//       } else {
//         setSnackbar({
//           open: true,
//           message: err.response?.data?.error || "Failed to update status",
//           severity: "error",
//         })
//       }
//     }
//   }

//   useEffect(() => {
//     fetchJobs()
//     fetchApplications()
//     fetchUserProfile()
//   }, [])

//   // Filter jobs based on search term
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredJobs(jobs)
//     } else {
//       const filtered = jobs.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           job.description?.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//       setFilteredJobs(filtered)
//     }
//   }, [searchTerm, jobs])

//   // Filter applications based on search term and status
//   useEffect(() => {
//     let filtered = applications

//     if (searchTerm.trim() !== "") {
//       filtered = filtered.filter(
//         (app) =>
//           app.candidate_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           app.candidate_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           app.job_title?.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//     }

//     if (statusFilter !== "all") {
//       filtered = filtered.filter((app) => app.status === statusFilter)
//     }

//     setFilteredApplications(filtered)
//   }, [searchTerm, statusFilter, applications])

//   const handleDeleteClick = (job) => {
//     setJobToDelete(job)
//     setDeleteDialogOpen(true)
//   }

//   const handleDeleteConfirm = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         console.error("No token found in localStorage")
//         setSnackbar({ open: true, message: "Unauthorized: Please log in again", severity: "error" })
//         navigate("/login")
//         return
//       }

//       await axios.delete(`http://localhost:5000/api/jobs/${jobToDelete.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       setSnackbar({ open: true, message: "Job deleted successfully", severity: "success" })
//       fetchJobs()
//     } catch (err) {
//       if (err.response?.status === 401) {
//         console.error("Unauthorized: Invalid or expired token")
//         localStorage.removeItem("token")
//         navigate("/login")
//       } else {
//         setSnackbar({ open: true, message: "Failed to delete job", severity: "error" })
//       }
//     } finally {
//       setDeleteDialogOpen(false)
//     }
//   }

//   const handleEditClick = (job) => {
//     setEditJob(job)
//   }

//   const handleJobUpdated = () => {
//     setEditJob(null)
//     fetchJobs()
//     setSnackbar({ open: true, message: "Job updated successfully", severity: "success" })
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("userRole")
//     localStorage.removeItem("userId")
//     setUser({ name: "", email: "" })
//     navigate("/login")
//   }

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue)
//     setSearchTerm("")
//     setStatusFilter("all")
//   }

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen)
//   }

//   const handleChatOpen = async (candidateId, candidateName, jobId, jobTitle) => {
//     console.log("handleChatOpen called with:", { candidateId, candidateName, jobId, jobTitle })

//     if (!candidateId || !user?.id || !jobId) {
//       console.error("Missing candidateId, user.id, or jobId:", { userId: user?.id, jobId })
//       setSnackbar({
//         open: true,
//         message: "Unable to start chat. Please try again.",
//         severity: "error",
//       })
//       return
//     }

//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.post(
//         "http://localhost:5000/api/conversations",
//         {
//           user1Id: user.id,
//           user2Id: candidateId,
//           jobId: jobId,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )

//       const conversationId = response.data.conversationId
//       console.log("Fetched conversationId:", conversationId)

//       setSelectedConversation({
//         id: conversationId,
//         name: candidateName || "Candidate",
//         receiverId: candidateId,
//         jobTitle: jobTitle || "Job",
//       })
//       setShowChat(true)
//     } catch (err) {
//       console.error("Error fetching conversation ID:", err.response?.data || err.message)
//       setSnackbar({
//         open: true,
//         message: "Failed to start chat. Please try again.",
//         severity: "error",
//       })
//     }
//   }

//   if (loading)
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
//         }}
//       >
//         <CircularProgress size={60} sx={{ color: "#1976d2", mb: 3 }} />
//         <Typography variant="h6" sx={{ color: "#1565c0", fontWeight: 500 }}>
//           Loading your dashboard...
//         </Typography>
//       </Box>
//     )

//   if (error)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <Alert severity="error" sx={{ width: "80%", maxWidth: "600px" }}>
//           {error}
//         </Alert>
//       </Box>
//     )

//   const drawerContent = (
//     <Box sx={{ width: 260, height: "100%", display: "flex", flexDirection: "column" }}>
//       <Box
//         sx={{
//           p: 3,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           background: "linear-gradient(135deg, #1976d2, #2196f3)",
//           color: "white",
//         }}
//       >
//         <Avatar
//           sx={{
//             width: 80,
//             height: 80,
//             mb: 2,
//             bgcolor: "white",
//             color: "#1976d2",
//             fontSize: "1.8rem",
//             fontWeight: "bold",
//             border: "3px solid rgba(255,255,255,0.8)",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//           }}
//           src={user?.profile_photo ? `http://localhost:5000${user.profile_photo}` : undefined}
//           onError={(e) => {
//             e.target.src = undefined // Fallback to the initial if the image fails to load
//           }}
//         >
//           {user.name ? user.name.charAt(0).toUpperCase() : "R"}
//         </Avatar>
//         <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
//           {user.name || "Recruiter Portal"}
//         </Typography>
//         <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.9rem" }}>
//           {user.email || "recruiter@example.com"}
//         </Typography>
//       </Box>
//       <Divider />
//       <List sx={{ flexGrow: 1, py: 1 }}>
//         <ListItem
//           button
//           component={Link}
//           to="/recruiter-dashboard"
//           selected
//           sx={{
//             py: 1.2,
//             px: 2,
//             borderRadius: "0 24px 24px 0",
//             mr: 1,
//             mb: 0.5,
//             "&.Mui-selected": {
//               bgcolor: "rgba(25, 118, 210, 0.12)",
//               "&:hover": { bgcolor: "rgba(25, 118, 210, 0.18)" },
//             },
//             "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: 40, color: "#1976d2" }}>
//             <Dashboard />
//           </ListItemIcon>
//           <ListItemText
//             primary="Dashboard"
//             primaryTypographyProps={{
//               fontSize: "0.95rem",
//               fontWeight: 600,
//               color: "#1976d2",
//             }}
//           />
//         </ListItem>
//         <ListItem
//           button
//           onClick={() => setShowPostJob(true)}
//           sx={{
//             py: 1.2,
//             px: 2,
//             borderRadius: "0 24px 24px 0",
//             mr: 1,
//             mb: 0.5,
//             "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: 40 }}>
//             <Add />
//           </ListItemIcon>
//           <ListItemText
//             primary="Post New Job"
//             primaryTypographyProps={{
//               fontSize: "0.95rem",
//               fontWeight: 500,
//             }}
//           />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/recruiter/profile-edit"
//           sx={{
//             py: 1.2,
//             px: 2,
//             borderRadius: "0 24px 24px 0",
//             mr: 1,
//             mb: 0.5,
//             "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: 40 }}>
//             <Person />
//           </ListItemIcon>
//           <ListItemText
//             primary="Profile"
//             primaryTypographyProps={{
//               fontSize: "0.95rem",
//               fontWeight: 500,
//             }}
//           />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/recruiter/settings"
//           sx={{
//             py: 1.2,
//             px: 2,
//             borderRadius: "0 24px 24px 0",
//             mr: 1,
//             mb: 0.5,
//             "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
//           }}
//         >
//           <ListItemIcon sx={{ minWidth: 40 }}>
//             <Settings />
//           </ListItemIcon>
//           <ListItemText
//             primary="Settings"
//             primaryTypographyProps={{
//               fontSize: "0.95rem",
//               fontWeight: 500,
//             }}
//           />
//         </ListItem>
//       </List>
//       <Divider />
//       <Box sx={{ p: 2 }}>
//         <Button
//           fullWidth
//           variant="outlined"
//           color="error"
//           startIcon={<Logout />}
//           onClick={handleLogout}
//           sx={{
//             py: 1,
//             textTransform: "none",
//             borderRadius: 2,
//             fontWeight: 500,
//             borderColor: "rgba(211, 47, 47, 0.5)",
//             "&:hover": { borderColor: "#d32f2f", bgcolor: "rgba(211, 47, 47, 0.04)" },
//           }}
//         >
//           Logout
//         </Button>
//       </Box>
//     </Box>
//   )

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         minHeight: "100vh",
//         bgcolor: "#f5f7fa",
//         backgroundImage: "url('/images/recruiter-bg.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         "&::before": {
//           content: '""',
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           bgcolor: "rgba(245, 247, 250, 0.85)",
//           zIndex: -1,
//         },
//       }}
//     >
//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           background: "linear-gradient(90deg, #1976d2, #2196f3)",
//         }}
//       >
//         <Toolbar sx={{ minHeight: 64 }}>
//           <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2, display: { md: "none" } }}>
//             <MenuIcon />
//           </IconButton>
//           <BusinessCenter sx={{ mr: 1.5, fontSize: "1.8rem" }} />
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, fontSize: "1.25rem" }}>
//             CareerConnect
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Tooltip title="Notifications">
//               <IconButton color="inherit" sx={{ mr: 1 }}>
//                 <Badge badgeContent={applications.length} color="error">
//                   <Notifications />
//                 </Badge>
//               </IconButton>
//             </Tooltip>

//             <Button
//               color="inherit"
//               onClick={handleProfileMenuOpen}
//               startIcon={
//                 <Avatar
//                   sx={{
//                     width: 32,
//                     height: 32,
//                     bgcolor: "white",
//                     color: "#1976d2",
//                     fontSize: "1rem",
//                     border: "2px solid rgba(255,255,255,0.6)",
//                   }}
//                   src={user?.profile_photo ? `http://localhost:5000${user.profile_photo}` : undefined}
//                 >
//                   {user.name ? user.name.charAt(0).toUpperCase() : "R"}
//                 </Avatar>
//               }
//               endIcon={<KeyboardArrowDown />}
//               sx={{
//                 textTransform: "none",
//                 fontSize: "0.95rem",
//                 fontWeight: 500,
//                 borderRadius: 2,
//                 px: 1.5,
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
//               }}
//             >
//               <Box sx={{ display: { xs: "none", sm: "block" } }}>{user.name || "Profile"}</Box>
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleProfileMenuClose}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//         PaperProps={{
//           elevation: 3,
//           sx: {
//             mt: 1.5,
//             borderRadius: 2,
//             minWidth: 200,
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//           },
//         }}
//       >
//         <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//             {user.name || "User"}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
//             {user.email || "user@example.com"}
//           </Typography>
//         </Box>

//         <MenuItem component={Link} to="/recruiter/profile-edit" onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
//           <ListItemIcon>
//             <Person fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Profile</ListItemText>
//         </MenuItem>
//         <MenuItem component={Link} to="/recruiter/settings" onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
//           <ListItemIcon>
//             <Settings fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Settings</ListItemText>
//         </MenuItem>
//         <Divider />
//         <MenuItem
//           onClick={() => {
//             handleLogout()
//             handleProfileMenuClose()
//           }}
//           sx={{ py: 1.5, color: "#d32f2f" }}
//         >
//           <ListItemIcon sx={{ color: "#d32f2f" }}>
//             <Logout fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Logout</ListItemText>
//         </MenuItem>
//       </Menu>

//       <Drawer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={isMobile ? drawerOpen : true}
//         onClose={toggleDrawer}
//         sx={{
//           width: 260,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: 260,
//             boxSizing: "border-box",
//             mt: "64px",
//             height: "calc(100% - 64px)",
//             borderRight: "none",
//             boxShadow: isMobile ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
//           },
//           display: { xs: isMobile && !drawerOpen ? "none" : "block", md: "block" },
//         }}
//       >
//         {drawerContent}
//       </Drawer>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: { xs: 2, sm: 3, md: 4 },
//           width: { md: `calc(100% - 260px)` },
//           mt: "64px",
//           minHeight: "calc(100vh - 64px)",
//         }}
//       >
//         <Container maxWidth="xl" disableGutters>
//           <Paper
//             elevation={0}
//             sx={{
//               mb: 3,
//               p: { xs: 2, sm: 3 },
//               borderRadius: 3,
//               bgcolor: "white",
//               boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
//             }}
//           >
//             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//               <Tabs
//                 value={tabValue}
//                 onChange={handleTabChange}
//                 variant={isMobile ? "fullWidth" : "standard"}
//                 sx={{
//                   "& .MuiTab-root": {
//                     textTransform: "none",
//                     fontWeight: 600,
//                     fontSize: "1rem",
//                     px: { xs: 2, sm: 3 },
//                     py: 1.5,
//                     minHeight: 48,
//                   },
//                   "& .MuiTabs-indicator": {
//                     height: 3,
//                     borderRadius: "3px 3px 0 0",
//                     bgcolor: "#1976d2",
//                   },
//                 }}
//               >
//                 <Tab
//                   label="Job Postings"
//                   icon={<Work />}
//                   iconPosition="start"
//                   sx={{
//                     color: tabValue === 0 ? "#1976d2" : "text.secondary",
//                     "&.Mui-selected": { color: "#1976d2" },
//                   }}
//                 />
//                 <Tab
//                   label={`Applications (${applications.length})`}
//                   icon={<Description />}
//                   iconPosition="start"
//                   sx={{
//                     color: tabValue === 1 ? "#1976d2" : "text.secondary",
//                     "&.Mui-selected": { color: "#1976d2" },
//                   }}
//                 />
//               </Tabs>
//             </Box>
//           </Paper>

//           {tabValue === 0 && (
//             <>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: { xs: "column", sm: "row" },
//                   justifyContent: "space-between",
//                   alignItems: { xs: "stretch", sm: "center" },
//                   mb: 3,
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="h4" sx={{ fontWeight: 700, color: "#1565c0" }}>
//                   Your Job Postings
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" } }}>
//                   <TextField
//                     placeholder="Search jobs..."
//                     variant="outlined"
//                     size="small"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Search sx={{ color: "text.secondary" }} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: searchTerm && (
//                         <InputAdornment position="end">
//                           <IconButton size="small" onClick={() => setSearchTerm("")}>
//                             <Close fontSize="small" />
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                       sx: {
//                         borderRadius: 2,
//                         bgcolor: "white",
//                         "&:hover .MuiOutlinedInput-notchedOutline": {
//                           borderColor: "#90caf9",
//                         },
//                         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                           borderColor: "#1976d2",
//                         },
//                       },
//                     }}
//                     sx={{
//                       width: { xs: "100%", sm: "300px" },
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": { borderColor: "#e0e0e0" },
//                       },
//                     }}
//                   />

//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<Add />}
//                     onClick={() => setShowPostJob(true)}
//                     sx={{
//                       borderRadius: 2,
//                       px: 3,
//                       py: 1,
//                       boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//                       whiteSpace: "nowrap",
//                       bgcolor: "#1976d2",
//                       "&:hover": { bgcolor: "#1565c0" },
//                     }}
//                   >
//                     Post Job
//                   </Button>
//                 </Box>
//               </Box>

//               {filteredJobs.length === 0 ? (
//                 <Paper
//                   sx={{
//                     p: 6,
//                     textAlign: "center",
//                     borderRadius: 4,
//                     boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//                     bgcolor: "white",
//                   }}
//                 >
//                   <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
//                     <Avatar sx={{ width: 80, height: 80, bgcolor: "#e3f2fd" }}>
//                       <Work sx={{ fontSize: 40, color: "#1976d2" }} />
//                     </Avatar>
//                   </Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "#1565c0" }}>
//                     {searchTerm ? "No matching jobs found" : "You haven't posted any jobs yet"}
//                   </Typography>
//                   <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
//                     {searchTerm
//                       ? "Try adjusting your search criteria or check back later for new opportunities."
//                       : "Create your first job posting to start receiving applications from qualified candidates."}
//                   </Typography>
//                   {searchTerm ? (
//                     <Button
//                       variant="outlined"
//                       onClick={() => setSearchTerm("")}
//                       sx={{
//                         textTransform: "none",
//                         borderRadius: 2,
//                         px: 3,
//                         py: 1,
//                         fontWeight: 600,
//                         borderColor: "#1976d2",
//                         color: "#1976d2",
//                         "&:hover": {
//                           borderColor: "#1565c0",
//                           bgcolor: "rgba(25, 118, 210, 0.04)",
//                         },
//                       }}
//                     >
//                       Clear Search
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       startIcon={<Add />}
//                       onClick={() => setShowPostJob(true)}
//                       sx={{
//                         textTransform: "none",
//                         borderRadius: 2,
//                         px: 3,
//                         py: 1,
//                         fontWeight: 600,
//                         boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//                         bgcolor: "#1976d2",
//                         "&:hover": {
//                           bgcolor: "#1565c0",
//                           boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
//                         },
//                       }}
//                     >
//                       Post Your First Job
//                     </Button>
//                   )}
//                 </Paper>
//               ) : (
//                 <Grid container spacing={3}>
//                   {filteredJobs.map((job) => (
//                     <Grid item xs={12} md={6} key={job.id}>
//                       <Card
//                         sx={{
//                           height: "100%",
//                           display: "flex",
//                           flexDirection: "column",
//                           borderRadius: 3,
//                           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                           transition: "transform 0.2s, box-shadow 0.2s",
//                           overflow: "visible",
//                           position: "relative",
//                           "&:hover": {
//                             transform: "translateY(-4px)",
//                             boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//                           },
//                         }}
//                       >
//                         <Box sx={{ height: 4, bgcolor: "#1976d2", borderRadius: "3px 3px 0 0" }} />

//                         <CardContent sx={{ flexGrow: 1, pt: 2.5, pb: 1 }}>
//                           <Box
//                             sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}
//                           >
//                             <Typography
//                               variant="h6"
//                               component="h2"
//                               gutterBottom
//                               sx={{
//                                 fontWeight: 600,
//                                 color: "#1565c0",
//                                 fontSize: "1.1rem",
//                                 lineHeight: 1.3,
//                                 mb: 0.5,
//                                 display: "-webkit-box",
//                                 WebkitLineClamp: 2,
//                                 WebkitBoxOrient: "vertical",
//                                 overflow: "hidden",
//                                 height: 46,
//                               }}
//                             >
//                               {job.title}
//                             </Typography>

//                             <Chip
//                               label={`${applications.filter((app) => app.job_id === job.id).length} Applications`}
//                               color="primary"
//                               size="small"
//                               sx={{ fontWeight: 500, ml: 1 }}
//                             />
//                           </Box>

//                           <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
//                             <BusinessCenter fontSize="small" sx={{ color: "#1976d2", mr: 1, fontSize: "1rem" }} />
//                             <Typography variant="body2" sx={{ fontWeight: 500, color: "#424242" }}>
//                               {job.company || "Unknown Company"}
//                             </Typography>
//                           </Box>

//                           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//                             {job.location && (
//                               <Chip
//                                 size="small"
//                                 icon={<LocationOn fontSize="small" />}
//                                 label={job.location}
//                                 sx={{
//                                   bgcolor: "#e3f2fd",
//                                   color: "#1565c0",
//                                   fontWeight: 500,
//                                   fontSize: "0.8rem",
//                                   borderRadius: 1,
//                                   "& .MuiChip-icon": { color: "#1976d2" },
//                                 }}
//                               />
//                             )}
//                             {job.job_type && (
//                               <Chip
//                                 size="small"
//                                 icon={<AccessTime fontSize="small" />}
//                                 label={job.job_type}
//                                 sx={{
//                                   bgcolor: "#e3f2fd",
//                                   color: "#1565c0",
//                                   fontWeight: 500,
//                                   fontSize: "0.8rem",
//                                   borderRadius: 1,
//                                   "& .MuiChip-icon": { color: "#1976d2" },
//                                 }}
//                               />
//                             )}
//                             {job.salary && (
//                               <Chip
//                                 size="small"
//                                 icon={<AttachMoney fontSize="small" />}
//                                 label={job.salary}
//                                 sx={{
//                                   bgcolor: "#e3f2fd",
//                                   color: "#1565c0",
//                                   fontWeight: 500,
//                                   fontSize: "0.8rem",
//                                   borderRadius: 1,
//                                   "& .MuiChip-icon": { color: "#1976d2" },
//                                 }}
//                               />
//                             )}
//                           </Box>

//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             sx={{
//                               lineHeight: 1.6,
//                               display: "-webkit-box",
//                               WebkitLineClamp: 3,
//                               WebkitBoxOrient: "vertical",
//                               overflow: "hidden",
//                               height: 60,
//                               mb: 1,
//                             }}
//                           >
//                             {job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}
//                           </Typography>
//                         </CardContent>
//                         <Divider sx={{ my: 1 }} />
//                         <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
//                           <Button
//                             size="small"
//                             startIcon={<Edit />}
//                             onClick={() => handleEditClick(job)}
//                             sx={{
//                               textTransform: "none",
//                               borderRadius: 2,
//                               fontWeight: 500,
//                               color: "#1976d2",
//                               "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
//                             }}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             size="small"
//                             color="error"
//                             startIcon={<Delete />}
//                             onClick={() => handleDeleteClick(job)}
//                             sx={{
//                               textTransform: "none",
//                               borderRadius: 2,
//                               fontWeight: 500,
//                               color: "#d32f2f",
//                               "&:hover": { bgcolor: "rgba(211, 47, 47, 0.04)" },
//                             }}
//                           >
//                             Delete
//                           </Button>
//                         </CardActions>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//             </>
//           )}

//           {tabValue === 1 && (
//             <>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: { xs: "column", sm: "row" },
//                   justifyContent: "space-between",
//                   alignItems: { xs: "stretch", sm: "center" },
//                   mb: 3,
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="h4" sx={{ fontWeight: 700, color: "#1565c0" }}>
//                   Applications
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" } }}>
//                   <TextField
//                     placeholder="Search applications..."
//                     variant="outlined"
//                     size="small"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <Search sx={{ color: "text.secondary" }} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: searchTerm && (
//                         <InputAdornment position="end">
//                           <IconButton size="small" onClick={() => setSearchTerm("")}>
//                             <Close fontSize="small" />
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                       sx: {
//                         borderRadius: 2,
//                         bgcolor: "white",
//                         "&:hover .MuiOutlinedInput-notchedOutline": {
//                           borderColor: "#90caf9",
//                         },
//                         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                           borderColor: "#1976d2",
//                         },
//                       },
//                     }}
//                     sx={{
//                       width: { xs: "100%", sm: "250px" },
//                       "& .MuiOutlinedInput-root": {
//                         "& fieldset": { borderColor: "#e0e0e0" },
//                       },
//                     }}
//                   />

//                   <FormControl
//                     size="small"
//                     sx={{
//                       minWidth: 120,
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: 2,
//                         bgcolor: "white",
//                         "& fieldset": { borderColor: "#e0e0e0" },
//                       },
//                     }}
//                   >
//                     <InputLabel>Status</InputLabel>
//                     <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
//                       <SelectMenuItem value="all">All</SelectMenuItem>
//                       <SelectMenuItem value="pending">Pending</SelectMenuItem>
//                       <SelectMenuItem value="accepted">Accepted</SelectMenuItem>
//                       <SelectMenuItem value="rejected">Rejected</SelectMenuItem>
//                     </Select>
//                   </FormControl>

//                   <Button
//                     variant="outlined"
//                     startIcon={<Refresh />}
//                     onClick={fetchApplications}
//                     sx={{
//                       borderRadius: 2,
//                       px: { xs: 1, sm: 2 },
//                       minWidth: { xs: "auto", sm: "auto" },
//                       textTransform: "none",
//                       fontWeight: 500,
//                       borderColor: "#90caf9",
//                       color: "#1976d2",
//                       "&:hover": {
//                         borderColor: "#1976d2",
//                         bgcolor: "rgba(25, 118, 210, 0.04)",
//                       },
//                     }}
//                   >
//                     <Box sx={{ display: { xs: "none", sm: "block" } }}>Refresh</Box>
//                   </Button>
//                 </Box>
//               </Box>

//               {filteredApplications.length === 0 ? (
//                 <Paper
//                   sx={{
//                     p: 6,
//                     textAlign: "center",
//                     borderRadius: 4,
//                     boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//                     bgcolor: "white",
//                   }}
//                 >
//                   <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
//                     <Avatar sx={{ width: 80, height: 80, bgcolor: "#e3f2fd" }}>
//                       <Description sx={{ fontSize: 40, color: "#1976d2" }} />
//                     </Avatar>
//                   </Box>
//                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "#1565c0" }}>
//                     {searchTerm || statusFilter !== "all"
//                       ? "No matching applications found"
//                       : "No applications received yet"}
//                   </Typography>
//                   <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
//                     {searchTerm || statusFilter !== "all"
//                       ? "Try adjusting your search criteria or filters."
//                       : "When candidates apply to your job postings, their applications will appear here."}
//                   </Typography>
//                   {(searchTerm || statusFilter !== "all") && (
//                     <Button
//                       variant="outlined"
//                       onClick={() => {
//                         setSearchTerm("")
//                         setStatusFilter("all")
//                       }}
//                       sx={{
//                         textTransform: "none",
//                         borderRadius: 2,
//                         px: 3,
//                         py: 1,
//                         fontWeight: 600,
//                         borderColor: "#1976d2",
//                         color: "#1976d2",
//                         "&:hover": {
//                           borderColor: "#1565c0",
//                           bgcolor: "rgba(25, 118, 210, 0.04)",
//                         },
//                       }}
//                     >
//                       Clear Filters
//                     </Button>
//                   )}
//                 </Paper>
//               ) : (
//                 <Grid container spacing={3}>
//                   {filteredApplications.map((app) => {
//                     const getStatusColor = (status) => {
//                       if (!status) return { bg: "#fff8e1", color: "#ffa000", border: "#ffe082" }

//                       switch (status.toLowerCase()) {
//                         case "rejected":
//                           return { bg: "#ffebee", color: "#d32f2f", border: "#ef9a9a" }
//                         case "accepted":
//                           return { bg: "#e8f5e9", color: "#2e7d32", border: "#a5d6a7" }
//                         default:
//                           return { bg: "#fff8e1", color: "#ffa000", border: "#ffe082" }
//                       }
//                     }

//                     const statusColors = getStatusColor(app.status)

//                     return (
//                       <Grid item xs={12} md={6} lg={4} key={app.application_id}>
//                         <Card
//                           sx={{
//                             height: "100%",
//                             display: "flex",
//                             flexDirection: "column",
//                             borderRadius: 3,
//                             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                             transition: "transform 0.2s, box-shadow 0.2s",
//                             overflow: "visible",
//                             position: "relative",
//                             "&:hover": {
//                               transform: "translateY(-4px)",
//                               boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
//                             },
//                           }}
//                         >
//                           <Box sx={{ height: 4, bgcolor: statusColors.color, borderRadius: "3px 3px 0 0" }} />

//                           <CardContent sx={{ flexGrow: 1, pt: 2.5, pb: 1 }}>
//                             <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                               <Avatar
//                                 sx={{
//                                   mr: 2,
//                                   bgcolor: "#1976d2",
//                                   width: 50,
//                                   height: 50,
//                                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                                 }}
//                               >
//                                 {(app.candidate_name || app.candidate_email || "C").charAt(0).toUpperCase()}
//                               </Avatar>
//                               <Box>
//                                 <Typography
//                                   variant="h6"
//                                   sx={{
//                                     fontWeight: 600,
//                                     fontSize: "1.1rem",
//                                     lineHeight: 1.3,
//                                   }}
//                                 >
//                                   {app.candidate_name || "Unknown Candidate"}
//                                 </Typography>
//                                 <Typography
//                                   variant="body2"
//                                   color="text.secondary"
//                                   sx={{ display: "flex", alignItems: "center" }}
//                                 >
//                                   <Mail fontSize="small" sx={{ mr: 0.5, fontSize: "0.9rem" }} />
//                                   {app.candidate_email || "No email available"}
//                                 </Typography>
//                               </Box>
//                             </Box>

//                             <Divider sx={{ my: 1.5 }} />

//                             <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1565c0" }}>
//                               Applied for: {app.job_title}
//                             </Typography>

//                             <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
//                               Company: {app.job_company || "Unknown Company"}
//                             </Typography>

//                             <Typography variant="body2" color="text.secondary">
//                               {app.applied_date
//                                 ? new Date(app.applied_date).toLocaleDateString("en-US", {
//                                     year: "numeric",
//                                     month: "long",
//                                     day: "numeric",
//                                   })
//                                 : "Date not available"}
//                             </Typography>

//                             <Box
//                               sx={{
//                                 mt: 2,
//                                 p: 1.5,
//                                 borderRadius: 2,
//                                 bgcolor: statusColors.bg,
//                                 border: `1px solid ${statusColors.border}`,
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                               }}
//                             >
//                               <Typography variant="body2" sx={{ fontWeight: 600, color: statusColors.color }}>
//                                 Status:{" "}
//                                 {(app.status || "Pending").charAt(0).toUpperCase() + (app.status || "Pending").slice(1)}
//                               </Typography>

//                               <FormControl size="small" sx={{ minWidth: 110 }}>
//                                 <Select
//                                   value={app.status || "pending"}
//                                   onChange={(e) => handleStatusChange(app.application_id, e.target.value)}
//                                   displayEmpty
//                                   variant="outlined"
//                                   sx={{
//                                     height: 32,
//                                     fontSize: "0.875rem",
//                                     bgcolor: "white",
//                                     borderRadius: 1,
//                                     "& .MuiOutlinedInput-notchedOutline": {
//                                       borderColor: statusColors.border,
//                                     },
//                                     "&:hover .MuiOutlinedInput-notchedOutline": {
//                                       borderColor: statusColors.color,
//                                     },
//                                     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                                       borderColor: statusColors.color,
//                                     },
//                                   }}
//                                 >
//                                   <SelectMenuItem value="pending">Pending</SelectMenuItem>
//                                   <SelectMenuItem value="accepted">Accepted</SelectMenuItem>
//                                   <SelectMenuItem value="rejected">Rejected</SelectMenuItem>
//                                 </Select>
//                               </FormControl>
//                             </Box>
//                           </CardContent>

//                           <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between" }}>
//                             <Button
//                               variant="outlined"
//                               size="small"
//                               startIcon={<ChatIcon />}
//                               onClick={() =>
//                                 handleChatOpen(
//                                   app.candidate_id,
//                                   app.candidate_name || "Unknown Candidate",
//                                   app.job_id,
//                                   app.job_title,
//                                 )
//                               }
//                               sx={{
//                                 textTransform: "none",
//                                 borderRadius: 2,
//                                 fontWeight: 500,
//                                 borderColor: "#90caf9",
//                                 color: "#1976d2",
//                                 "&:hover": {
//                                   borderColor: "#1976d2",
//                                   bgcolor: "rgba(25, 118, 210, 0.04)",
//                                 },
//                               }}
//                             >
//                               Chat
//                             </Button>

//                             {/* <Button
//                               size="small"
//                               endIcon={<ArrowForward />}
//                               component={Link}
//                               to={`/recruiter/applications/${app.application_id}`}
//                               sx={{
//                                 textTransform: "none",
//                                 borderRadius: 2,
//                                 fontWeight: 500,
//                                 color: "#1976d2",
//                                 "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
//                               }}
//                             >
//                               View Details
//                             </Button> */}
//                           </CardActions>
//                         </Card>
//                       </Grid>
//                     )
//                   })}
//                 </Grid>
//               )}
//             </>
//           )}

//           <Dialog
//             open={showPostJob}
//             onClose={() => setShowPostJob(false)}
//             fullWidth
//             maxWidth="md"
//             PaperProps={{
//               sx: {
//                 borderRadius: 3,
//                 boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//               },
//             }}
//           >
//             <DialogTitle sx={{ pb: 1 }}>
//               <Typography variant="h5" component="div" fontWeight="bold">
//                 Post New Job
//               </Typography>
//             </DialogTitle>
//             <DialogContent dividers>
//               <PostJob
//                 onSuccess={() => {
//                   setShowPostJob(false)
//                   fetchJobs()
//                   setSnackbar({ open: true, message: "Job posted successfully", severity: "success" })
//                 }}
//               />
//             </DialogContent>
//           </Dialog>

//           <Dialog
//             open={Boolean(editJob)}
//             onClose={() => setEditJob(null)}
//             fullWidth
//             maxWidth="md"
//             PaperProps={{
//               sx: {
//                 borderRadius: 3,
//                 boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//               },
//             }}
//           >
//             <DialogTitle sx={{ pb: 1 }}>
//               <Typography variant="h5" component="div" fontWeight="bold">
//                 Edit Job
//               </Typography>
//             </DialogTitle>
//             <DialogContent dividers>
//               {editJob ? (
//                 <EditJob
//                   job={editJob}
//                   onSuccess={() => {
//                     setEditJob(null)
//                     fetchJobs()
//                     setSnackbar({
//                       open: true,
//                       message: "Job updated successfully",
//                       severity: "success",
//                     })
//                   }}
//                   onCancel={() => setEditJob(null)}
//                 />
//               ) : (
//                 <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//                   <CircularProgress />
//                 </Box>
//               )}
//             </DialogContent>
//           </Dialog>

//           <Dialog
//             open={deleteDialogOpen}
//             onClose={() => setDeleteDialogOpen(false)}
//             PaperProps={{
//               sx: {
//                 borderRadius: 3,
//                 boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//               },
//             }}
//           >
//             <DialogTitle>
//               <Typography variant="h6" component="div" fontWeight="bold">
//                 Confirm Delete
//               </Typography>
//             </DialogTitle>
//             <DialogContent>
//               <Typography>
//                 Are you sure you want to delete "{jobToDelete?.title}" position at {jobToDelete?.company}?
//               </Typography>
//               <Typography variant="body2" color="error" sx={{ mt: 2 }}>
//                 This action cannot be undone.
//               </Typography>
//             </DialogContent>
//             <DialogActions sx={{ p: 2 }}>
//               <Button
//                 onClick={() => setDeleteDialogOpen(false)}
//                 variant="outlined"
//                 sx={{
//                   textTransform: "none",
//                   borderRadius: 2,
//                   fontWeight: 500,
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleDeleteConfirm}
//                 color="error"
//                 variant="contained"
//                 startIcon={<Delete />}
//                 sx={{
//                   textTransform: "none",
//                   borderRadius: 2,
//                   fontWeight: 500,
//                   boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)",
//                 }}
//               >
//                 Delete
//               </Button>
//             </DialogActions>
//           </Dialog>

//           <Dialog
//             open={showChat}
//             onClose={() => setShowChat(false)}
//             fullWidth
//             maxWidth="md"
//             PaperProps={{
//               sx: {
//                 borderRadius: 3,
//                 boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//               },
//             }}
//           >
//             <DialogTitle
//               sx={{
//                 bgcolor: "#1976d2",
//                 color: "white",
//                 py: 2,
//                 fontWeight: 600,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Box>
//                 Chat with {selectedConversation?.name || "Candidate"} about {selectedConversation?.jobTitle}
//               </Box>
//               <IconButton onClick={() => setShowChat(false)} sx={{ color: "white" }}>
//                 <Close />
//               </IconButton>
//             </DialogTitle>
//             <DialogContent sx={{ p: 0 }}>
//               {selectedConversation && (
//                 <Message
//                   currentUser={{
//                     id: user.id || localStorage.getItem("userId"),
//                     name: user.name,
//                     email: user.email,
//                   }}
//                   conversationId={selectedConversation.id}
//                   receiverId={selectedConversation.receiverId}
//                   receiverName={selectedConversation.name}
//                 />
//               )}
//             </DialogContent>
//           </Dialog>

//           <Snackbar
//             open={snackbar.open}
//             autoHideDuration={6000}
//             onClose={() => setSnackbar({ ...snackbar, open: false })}
//             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           >
//             <Alert
//               severity={snackbar.severity}
//               onClose={() => setSnackbar({ ...snackbar, open: false })}
//               variant="filled"
//               sx={{ width: "100%", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
//             >
//               {snackbar.message}
//             </Alert>
//           </Snackbar>
//         </Container>
//       </Box>
//     </Box>
//   )
// }

// export default RecruiterDashboard


"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import {
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  AppBar,
  Toolbar,
  Box,
  Drawer,
  Divider,
  ListItemIcon,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Badge,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem as SelectMenuItem,
  TextField,
  InputAdornment,
  Container,
  Tooltip,
} from "@mui/material"
import {
  Delete,
  Edit,
  Logout,
  Dashboard,
  Work,
  Person,
  Add,
  Menu as MenuIcon,
  Notifications,
  BusinessCenter,
  Description,
  Mail,
  Settings,
  Chat as ChatIcon,
   ContactMail as ContactMailIcon,
  Search,
  LocationOn,
  AccessTime,
  AttachMoney,
  Close,
  KeyboardArrowDown,
  Refresh,
} from "@mui/icons-material"
import PostJob from "./PostJob"
import EditJob from "./EditJob"
import Message from "../../components/chat/Message"



const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState(null)
  const [editJob, setEditJob] = useState(null)
  const [showPostJob, setShowPostJob] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [applications, setApplications] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [userLoading, setUserLoading] = useState(true)
  const [user, setUser] = useState({ name: "", email: "" })
  const [showChat, setShowChat] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredJobs, setFilteredJobs] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [statusFilter, setStatusFilter] = useState("all")

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token found in localStorage")
        navigate("/login")
        return
      }

      const response = await axios.get("http://localhost:5000/api/applications/recruiter", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setApplications(response.data)
      setFilteredApplications(response.data)
    } catch (err) {
      console.error("Error fetching applications:", err)
    }
  }

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token found in localStorage")
        navigate("/login")
        return
      }

      const response = await axios.get("http://localhost:5000/api/jobs/recruiter", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setJobs(response.data)
      setFilteredJobs(response.data)
    } catch (err) {
      if (err.response?.status === 403) {
        console.error("Forbidden: Invalid or expired token")
        localStorage.removeItem("token")
        navigate("/login")
      } else {
        console.error("Error fetching jobs:", err)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token found in localStorage")
        navigate("/login")
        return
      }

      const response = await axios.get("http://localhost:5000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setUser(response.data)
    } catch (err) {
      console.error("Error fetching user profile:", err)
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        navigate("/login")
      }
    } finally {
      setUserLoading(false)
    }
  }

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token found in localStorage")
        navigate("/login")
        return
      }

      await axios.put(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setApplications((prev) =>
        prev.map((app) => (app.application_id === applicationId ? { ...app, status: newStatus } : app)),
      )

      setFilteredApplications((prev) =>
        prev.map((app) => (app.application_id === applicationId ? { ...app, status: newStatus } : app)),
      )

      setSnackbar({ open: true, message: "Application status updated", severity: "success" })
    } catch (err) {
      console.error("Error updating application status:", err)
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        navigate("/login")
      } else {
        setSnackbar({
          open: true,
          message: err.response?.data?.error || "Failed to update status",
          severity: "error",
        })
      }
    }
  }

  useEffect(() => {
    fetchJobs()
    fetchApplications()
    fetchUserProfile()
  }, [])

  // Filter jobs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredJobs(jobs)
    } else {
      const filtered = jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredJobs(filtered)
    }
  }, [searchTerm, jobs])

  // Filter applications based on search term and status
  useEffect(() => {
    let filtered = applications

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (app) =>
          app.candidate_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.candidate_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.job_title?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter)
    }

    setFilteredApplications(filtered)
  }, [searchTerm, statusFilter, applications])

  const handleDeleteClick = (job) => {
    setJobToDelete(job)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No token found in localStorage")
        setSnackbar({ open: true, message: "Unauthorized: Please log in again", severity: "error" })
        navigate("/login")
        return
      }

      await axios.delete(`http://localhost:5000/api/jobs/${jobToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setSnackbar({ open: true, message: "Job deleted successfully", severity: "success" })
      fetchJobs()
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("Unauthorized: Invalid or expired token")
        localStorage.removeItem("token")
        navigate("/login")
      } else {
        setSnackbar({ open: true, message: "Failed to delete job", severity: "error" })
      }
    } finally {
      setDeleteDialogOpen(false)
    }
  }

  const handleEditClick = (job) => {
    setEditJob(job)
  }

  const handleJobUpdated = () => {
    setEditJob(null)
    fetchJobs()
    setSnackbar({ open: true, message: "Job updated successfully", severity: "success" })
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userId")
    setUser({ name: "", email: "" })
    navigate("/login")
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    setSearchTerm("")
    setStatusFilter("all")
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleChatOpen = async (candidateId, candidateName, jobId, jobTitle) => {
    console.log("handleChatOpen called with:", { candidateId, candidateName, jobId, jobTitle })

    if (!candidateId || !user?.id || !jobId) {
      console.error("Missing candidateId, user.id, or jobId:", { userId: user?.id, jobId })
      setSnackbar({
        open: true,
        message: "Unable to start chat. Please try again.",
        severity: "error",
      })
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:5000/api/conversations",
        {
          user1Id: user.id,
          user2Id: candidateId,
          jobId: jobId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const conversationId = response.data.conversationId
      console.log("Fetched conversationId:", conversationId)

      setSelectedConversation({
        id: conversationId,
        name: candidateName || "Candidate",
        receiverId: candidateId,
        jobTitle: jobTitle || "Job",
      })
      setShowChat(true)
    } catch (err) {
      console.error("Error fetching conversation ID:", err.response?.data || err.message)
      setSnackbar({
        open: true,
        message: "Failed to start chat. Please try again.",
        severity: "error",
      })
    }
  }

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#1976d2", mb: 3 }} />
        <Typography variant="h6" sx={{ color: "#1565c0", fontWeight: 500 }}>
          Loading your dashboard...
        </Typography>
      </Box>
    )

  if (error)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Alert severity="error" sx={{ width: "80%", maxWidth: "600px" }}>
          {error}
        </Alert>
      </Box>
    )

  const drawerContent = (
    <Box sx={{ width: 260, height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(135deg, #1976d2, #2196f3)",
          color: "white",
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mb: 2,
            bgcolor: "white",
            color: "#1976d2",
            fontSize: "1.8rem",
            fontWeight: "bold",
            border: "3px solid rgba(255,255,255,0.8)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
          src={user?.profile_photo ? `http://localhost:5000${user.profile_photo}` : undefined}
          onError={(e) => {
            e.target.src = undefined // Fallback to the initial if the image fails to load
          }}
        >
          {user.name ? user.name.charAt(0).toUpperCase() : "R"}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {user.name || "Recruiter Portal"}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.9rem" }}>
          {user.email || "recruiter@example.com"}
        </Typography>
      </Box>
      
      <Divider />
      <List sx={{ flexGrow: 1, py: 1 }}>
        <ListItem
          button
          component={Link}
          to="/recruiter-dashboard"
          selected
          sx={{
            py: 1.2,
            px: 2,
            borderRadius: "0 24px 24px 0",
            mr: 1,
            mb: 0.5,
            "&.Mui-selected": {
              bgcolor: "rgba(25, 118, 210, 0.12)",
              "&:hover": { bgcolor: "rgba(25, 118, 210, 0.18)" },
            },
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "#1976d2" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            primaryTypographyProps={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#1976d2",
            }}
          />
        </ListItem>
        <ListItem
          button
          onClick={() => setShowPostJob(true)}
          sx={{
            py: 1.2,
            px: 2,
            borderRadius: "0 24px 24px 0",
            mr: 1,
            mb: 0.5,
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Add />
          </ListItemIcon>
          <ListItemText
            primary="Post New Job"
            primaryTypographyProps={{
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/recruiter/profile-edit"
          sx={{
            py: 1.2,
            px: 2,
            borderRadius: "0 24px 24px 0",
            mr: 1,
            mb: 0.5,
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <Person />
          </ListItemIcon>
          <ListItemText
            primary=" Edit Profile"
            primaryTypographyProps={{
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          />
        </ListItem>
         
      </List>

      <MenuItem component={Link} to="/recruiter/contact" onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
       <ListItemIcon>
         <ContactMailIcon fontSize="small" />
       </ListItemIcon>
       <ListItemText>Contact Us</ListItemText>
        </MenuItem>

          <MenuItem component={Link} to="/recruiter/resetpassword" onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
       <ListItemIcon>
         <Settings fontSize="small" />
       </ListItemIcon>
       <ListItemText>Reset password</ListItemText>
        </MenuItem>


      <Divider />
      
             
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{
            py: 1,
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 500,
            borderColor: "rgba(211, 47, 47, 0.5)",
            "&:hover": { borderColor: "#d32f2f", bgcolor: "rgba(211, 47, 47, 0.04)" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        backgroundImage: "url('/images/recruiter-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(245, 247, 250, 0.85)",
          zIndex: -1,
        },
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          background: "linear-gradient(90deg, #1976d2, #2196f3)",
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <BusinessCenter sx={{ mr: 1.5, fontSize: "1.8rem" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, fontSize: "1.25rem" }}>
            CareerConnect
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <Badge badgeContent={applications.length} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            <Button
              color="inherit"
              onClick={handleProfileMenuOpen}
              startIcon={
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "white",
                    color: "#1976d2",
                    fontSize: "1rem",
                    border: "2px solid rgba(255,255,255,0.6)",
                  }}
                  src={user?.profile_photo ? `http://localhost:5000${user.profile_photo}` : undefined}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "R"}
                </Avatar>
              }
              endIcon={<KeyboardArrowDown />}
              sx={{
                textTransform: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                borderRadius: 2,
                px: 1.5,
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "block" } }}>{user.name || "Profile"}</Box>
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
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 200,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {user.name || "User"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
            {user.email || "user@example.com"}
          </Typography>
        </Box>
         <MenuItem component={Link} to="/recruiteredit/profile" onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>

        
        <Divider />
        <MenuItem
          onClick={() => {
            handleLogout()
            handleProfileMenuClose()
          }}
          sx={{ py: 1.5, color: "#d32f2f" }}
        >
          <ListItemIcon sx={{ color: "#d32f2f" }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
        
      </Menu>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={toggleDrawer}
        sx={{
          width: 260,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 260,
            boxSizing: "border-box",
            mt: "64px",
            height: "calc(100% - 64px)",
            borderRight: "none",
            boxShadow: isMobile ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
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
          p: { xs: 2, sm: 3, md: 4 },
          width: { md: `calc(100% - 260px)` },
          mt: "64px",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Paper
            elevation={0}
            sx={{
              mb: 3,
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              bgcolor: "white",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant={isMobile ? "fullWidth" : "standard"}
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: { xs: 2, sm: 3 },
                    py: 1.5,
                    minHeight: 48,
                  },
                  "& .MuiTabs-indicator": {
                    height: 3,
                    borderRadius: "3px 3px 0 0",
                    bgcolor: "#1976d2",
                  },
                }}
              >
                <Tab
                  label="Job Postings"
                  icon={<Work />}
                  iconPosition="start"
                  sx={{
                    color: tabValue === 0 ? "#1976d2" : "text.secondary",
                    "&.Mui-selected": { color: "#1976d2" },
                  }}
                />
                <Tab
                  label={`Applications (${applications.length})`}
                  icon={<Description />}
                  iconPosition="start"
                  sx={{
                    color: tabValue === 1 ? "#1976d2" : "text.secondary",
                    "&.Mui-selected": { color: "#1976d2" },
                  }}
                />
              </Tabs>
            </Box>
          </Paper>

          {tabValue === 0 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "stretch", sm: "center" },
                  mb: 3,
                  gap: 2,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1565c0" }}>
                  Your Job Postings
                </Typography>

                <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" } }}>
                  <TextField
                    placeholder="Search jobs..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchTerm && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchTerm("")}>
                            <Close fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        bgcolor: "white",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#90caf9",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#1976d2",
                        },
                      },
                    }}
                    sx={{
                      width: { xs: "100%", sm: "300px" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#e0e0e0" },
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => setShowPostJob(true)}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                      whiteSpace: "nowrap",
                      bgcolor: "#1976d2",
                      "&:hover": { bgcolor: "#1565c0" },
                    }}
                  >
                    Post Job
                  </Button>
                </Box>
              </Box>

              {filteredJobs.length === 0 ? (
                <Paper
                  sx={{
                    p: 6,
                    textAlign: "center",
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    bgcolor: "white",
                  }}
                >
                  <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                    <Avatar sx={{ width: 80, height: 80, bgcolor: "#e3f2fd" }}>
                      <Work sx={{ fontSize: 40, color: "#1976d2" }} />
                    </Avatar>
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "#1565c0" }}>
                    {searchTerm ? "No matching jobs found" : "You haven't posted any jobs yet"}
                  </Typography>
                  <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
                    {searchTerm
                      ? "Try adjusting your search criteria or check back later for new opportunities."
                      : "Create your first job posting to start receiving applications from qualified candidates."}
                  </Typography>
                  {searchTerm ? (
                    <Button
                      variant="outlined"
                      onClick={() => setSearchTerm("")}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        "&:hover": {
                          borderColor: "#1565c0",
                          bgcolor: "rgba(25, 118, 210, 0.04)",
                        },
                      }}
                    >
                      Clear Search
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                      onClick={() => setShowPostJob(true)}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                        bgcolor: "#1976d2",
                        "&:hover": {
                          bgcolor: "#1565c0",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                        },
                      }}
                    >
                      Post Your First Job
                    </Button>
                  )}
                </Paper>
              ) : (
                <Grid container spacing={3}>
                  {/* {filteredJobs.map((job) => (
                    <Grid item xs={12} md={6} key={job.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: 3,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          overflow: "visible",
                          position: "relative",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                          },
                        }}
                      >{job.image_url && (
                        <Box sx={{ height: 180, overflow: "hidden", position: "relative", backgroundColor: "#f5f5f5" }}>
                          <img
                            src={`http://localhost:5000${job.image_url}`}
                            alt={job.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "3px 3px 0 0",
                              transition: "transform 0.3s ease",
                            }}
                            onError={(e) => {
                              console.error("Image failed to load:", job.image_url);
                              e.target.src = "https://via.placeholder.com/180"; // Fallback image
                            }}
                          />
                        </Box>
                      )}
                      <Box sx={{ height: 4, bgcolor: "#1976d2", borderRadius: job.image_url ? "0" : "3px 3px 0 0" }} />
                        <CardContent sx={{ flexGrow: 1, pt: 2.5, pb: 1 }}>
                          <Box
                            sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}
                          >
                            <Typography
                              variant="h6"
                              component="h2"
                              gutterBottom
                              sx={{
                                fontWeight: 600,
                                color: "#1565c0",
                                fontSize: "1.1rem",
                                lineHeight: 1.3,
                                mb: 0.5,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                height: 46,
                              }}
                            >
                              {job.title}
                            </Typography>

                            <Chip
                              label={`${applications.filter((app) => app.job_id === job.id).length} Applications`}
                              color="primary"
                              size="small"
                              sx={{ fontWeight: 500, ml: 1 }}
                            />
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                            <BusinessCenter fontSize="small" sx={{ color: "#1976d2", mr: 1, fontSize: "1rem" }} />
                            <Typography variant="body2" sx={{ fontWeight: 500, color: "#424242" }}>
                              {job.company || "Unknown Company"}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                            {job.location && (
                              <Chip
                                size="small"
                                icon={<LocationOn fontSize="small" />}
                                label={job.location}
                                sx={{
                                  bgcolor: "#e3f2fd",
                                  color: "#1565c0",
                                  fontWeight: 500,
                                  fontSize: "0.8rem",
                                  borderRadius: 1,
                                  "& .MuiChip-icon": { color: "#1976d2" },
                                }}
                              />
                            )}
                            {job.job_type && (
                              <Chip
                                size="small"
                                icon={<AccessTime fontSize="small" />}
                                label={job.job_type}
                                sx={{
                                  bgcolor: "#e3f2fd",
                                  color: "#1565c0",
                                  fontWeight: 500,
                                  fontSize: "0.8rem",
                                  borderRadius: 1,
                                  "& .MuiChip-icon": { color: "#1976d2" },
                                }}
                              />
                            )}
                            {job.salary && (
                              <Chip
                                size="small"
                                icon={<AttachMoney fontSize="small" />}
                                label={job.salary}
                                sx={{
                                  bgcolor: "#e3f2fd",
                                  color: "#1565c0",
                                  fontWeight: 500,
                                  fontSize: "0.8rem",
                                  borderRadius: 1,
                                  "& .MuiChip-icon": { color: "#1976d2" },
                                }}
                              />
                            )}
                          </Box>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.6,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              height: 60,
                              mb: 1,
                            }}
                          >
                            {job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}
                          </Typography>
                        </CardContent>
                        <Divider sx={{ my: 1 }} />
                        <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
                          <Button
                            size="small"
                            startIcon={<Edit />}
                            onClick={() => handleEditClick(job)}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              fontWeight: 500,
                              color: "#1976d2",
                              "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() => handleDeleteClick(job)}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              fontWeight: 500,
                              color: "#d32f2f",
                              "&:hover": { bgcolor: "rgba(211, 47, 47, 0.04)" },
                            }}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))} */}
                  {filteredJobs.map((job) => (
    <Grid item xs={12} md={6} key={job.id}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          transition: "transform 0.2s, box-shadow 0.2s",
          overflow: "visible",
          position: "relative",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          },
        }}
      >
        {job.photo && (
          <Box sx={{ height: 180, overflow: "hidden", position: "relative", backgroundColor: "#f5f5f5" }}>
            <img
              src={`http://localhost:5000${job.photo}`}
              alt={job.title}
              style={{
                width: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "3px 3px 0 0",
                transition: "transform 0.3s ease",
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/180"; // Fallback image
                console.error("Image failed to load for job:", job.title, job.photo);
              }}
            />
          </Box>
        )}
        <Box sx={{ height: 4, bgcolor: "#1976d2", borderRadius: job.photo ? "0" : "3px 3px 0 0" }} />
        <CardContent sx={{ flexGrow: 1, pt: 2.5, pb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#1565c0",
                fontSize: "1.1rem",
                lineHeight: 1.3,
                mb: 0.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                height: 46,
              }}
            >
              {job.title}
            </Typography>
            <Chip
              label={`${applications.filter((app) => app.job_id === job.id).length} Applications`}
              color="primary"
              size="small"
              sx={{ fontWeight: 500, ml: 1 }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <BusinessCenter fontSize="small" sx={{ color: "#1976d2", mr: 1, fontSize: "1rem" }} />
            <Typography variant="body2" sx={{ fontWeight: 500, color: "#424242" }}>
              {job.company || "Unknown Company"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {job.location && (
              <Chip
                size="small"
                icon={<LocationOn fontSize="small" />}
                label={job.location}
                sx={{
                  bgcolor: "#e3f2fd",
                  color: "#1565c0",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  borderRadius: 1,
                  "& .MuiChip-icon": { color: "#1976d2" },
                }}
              />
            )}
            {job.job_type && (
              <Chip
                size="small"
                icon={<AccessTime fontSize="small" />}
                label={job.job_type}
                sx={{
                  bgcolor: "#e3f2fd",
                  color: "#1565c0",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  borderRadius: 1,
                  "& .MuiChip-icon": { color: "#1976d2" },
                }}
              />
            )}
            {job.salary && (
              <Chip
                size="small"
                icon={<AttachMoney fontSize="small" />}
                label={job.salary}
                sx={{
                  bgcolor: "#e3f2fd",
                  color: "#1565c0",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  borderRadius: 1,
                  "& .MuiChip-icon": { color: "#1976d2" },
                }}
              />
            )}
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: 60,
              mb: 1,
            }}
          >
            {job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}
          </Typography>
        </CardContent>
        <Divider sx={{ my: 1 }} />
        <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
          <Button
            size="small"
            startIcon={<Edit />}
            onClick={() => handleEditClick(job)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 500,
              color: "#1976d2",
              "&:hover": { bgcolor: "rgba(25, 118, 210, 0.04)" },
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<Delete />}
            onClick={() => handleDeleteClick(job)}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 500,
              color: "#d32f2f",
              "&:hover": { bgcolor: "rgba(211, 47, 47, 0.04)" },
            }}
          >
            Delete
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "stretch", sm: "center" },
                  mb: 3,
                  gap: 2,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1565c0" }}>
                  Applications
                </Typography>

                <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" } }}>
                  <TextField
                    placeholder="Search applications..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchTerm && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchTerm("")}>
                            <Close fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: 2,
                        bgcolor: "white",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#90caf9",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#1976d2",
                        },
                      },
                    }}
                    sx={{
                      width: { xs: "100%", sm: "250px" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#e0e0e0" },
                      },
                    }}
                  />

                  <FormControl
                    size="small"
                    sx={{
                      minWidth: 120,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor: "white",
                        "& fieldset": { borderColor: "#e0e0e0" },
                      },
                    }}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                      <SelectMenuItem value="all">All</SelectMenuItem>
                      <SelectMenuItem value="pending">Pending</SelectMenuItem>
                      <SelectMenuItem value="accepted">Accepted</SelectMenuItem>
                      <SelectMenuItem value="rejected">Rejected</SelectMenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={fetchApplications}
                    sx={{
                      borderRadius: 2,
                      px: { xs: 1, sm: 2 },
                      minWidth: { xs: "auto", sm: "auto" },
                      textTransform: "none",
                      fontWeight: 500,
                      borderColor: "#90caf9",
                      color: "#1976d2",
                      "&:hover": {
                        borderColor: "#1976d2",
                        bgcolor: "rgba(25, 118, 210, 0.04)",
                      },
                    }}
                  >
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>Refresh</Box>
                  </Button>
                </Box>
              </Box>

              {filteredApplications.length === 0 ? (
                <Paper
                  sx={{
                    p: 6,
                    textAlign: "center",
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    bgcolor: "white",
                  }}
                >
                  <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                    <Avatar sx={{ width: 80, height: 80, bgcolor: "#e3f2fd" }}>
                      <Description sx={{ fontSize: 40, color: "#1976d2" }} />
                    </Avatar>
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "#1565c0" }}>
                    {searchTerm || statusFilter !== "all"
                      ? "No matching applications found"
                      : "No applications received yet"}
                  </Typography>
                  <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search criteria or filters."
                      : "When candidates apply to your job postings, their applications will appear here."}
                  </Typography>
                  {(searchTerm || statusFilter !== "all") && (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSearchTerm("")
                        setStatusFilter("all")
                      }}
                      sx={{
                        textTransform: "none",
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        "&:hover": {
                          borderColor: "#1565c0",
                          bgcolor: "rgba(25, 118, 210, 0.04)",
                        },
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </Paper>
              ) : (
                <Grid container spacing={3}>
                  {filteredApplications.map((app) => {
                    const getStatusColor = (status) => {
                      if (!status) return { bg: "#fff8e1", color: "#ffa000", border: "#ffe082" }

                      switch (status.toLowerCase()) {
                        case "rejected":
                          return { bg: "#ffebee", color: "#d32f2f", border: "#ef9a9a" }
                        case "accepted":
                          return { bg: "#e8f5e9", color: "#2e7d32", border: "#a5d6a7" }
                        default:
                          return { bg: "#fff8e1", color: "#ffa000", border: "#ffe082" }
                      }
                    }

                    const statusColors = getStatusColor(app.status)

                    return (
                      <Grid item xs={12} md={6} lg={4} key={app.application_id}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            overflow: "visible",
                            position: "relative",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          <Box sx={{ height: 4, bgcolor: statusColors.color, borderRadius: "3px 3px 0 0" }} />

                          <CardContent sx={{ flexGrow: 1, pt: 2.5, pb: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                              <Avatar
                                sx={{
                                  mr: 2,
                                  bgcolor: "#1976d2",
                                  width: 50,
                                  height: 50,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                              >
                                {(app.candidate_name || app.candidate_email || "C").charAt(0).toUpperCase()}
                              </Avatar>
                              <Box>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: "1.1rem",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {app.candidate_name || "Unknown Candidate"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <Mail fontSize="small" sx={{ mr: 0.5, fontSize: "0.9rem" }} />
                                  {app.candidate_email || "No email available"}
                                </Typography>
                              </Box>
                            </Box>

                            <Divider sx={{ my: 1.5 }} />

                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: "#1565c0" }}>
                              Applied for: {app.job_title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              Company: {app.job_company || "Unknown Company"}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                              {app.applied_date
                                ? new Date(app.applied_date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : "Date not available"}
                            </Typography>

                            <Box
                              sx={{
                                mt: 2,
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: statusColors.bg,
                                border: `1px solid ${statusColors.border}`,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography variant="body2" sx={{ fontWeight: 600, color: statusColors.color }}>
                                Status:{" "}
                                {(app.status || "Pending").charAt(0).toUpperCase() + (app.status || "Pending").slice(1)}
                              </Typography>

                              <FormControl size="small" sx={{ minWidth: 110 }}>
                                <Select
                                  value={app.status || "pending"}
                                  onChange={(e) => handleStatusChange(app.application_id, e.target.value)}
                                  displayEmpty
                                  variant="outlined"
                                  sx={{
                                    height: 32,
                                    fontSize: "0.875rem",
                                    bgcolor: "white",
                                    borderRadius: 1,
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: statusColors.border,
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                      borderColor: statusColors.color,
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                      borderColor: statusColors.color,
                                    },
                                  }}
                                >
                                  <SelectMenuItem value="pending">Pending</SelectMenuItem>
                                  <SelectMenuItem value="accepted">Accepted</SelectMenuItem>
                                  <SelectMenuItem value="rejected">Rejected</SelectMenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </CardContent>

                          <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between" }}>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<ChatIcon />}
                              onClick={() =>
                                handleChatOpen(
                                  app.candidate_id,
                                  app.candidate_name || "Unknown Candidate",
                                  app.job_id,
                                  app.job_title,
                                )
                              }
                              sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                fontWeight: 500,
                                borderColor: "#90caf9",
                                color: "#1976d2",
                                "&:hover": {
                                  borderColor: "#1976d2",
                                  bgcolor: "rgba(25, 118, 210, 0.04)",
                                },
                              }}
                            >
                              Chat
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              )}
            </>
          )}

          <Dialog
            open={showPostJob}
            onClose={() => setShowPostJob(false)}
            fullWidth
            maxWidth="md"
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              },
            }}
          >
            <DialogTitle sx={{ pb: 1 }}>
              <Typography variant="h5" component="div" fontWeight="bold">
                Post New Job
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <PostJob
                onSuccess={() => {
                  setShowPostJob(false)
                  fetchJobs()
                  setSnackbar({ open: true, message: "Job posted successfully", severity: "success" })
                }}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={Boolean(editJob)}
            onClose={() => setEditJob(null)}
            fullWidth
            maxWidth="md"
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              },
            }}
          >
            <DialogTitle sx={{ pb: 1 }}>
              <Typography variant="h5" component="div" fontWeight="bold">
                Edit Job
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              {editJob ? (
                <EditJob
                  job={editJob}
                  onSuccess={() => {
                    setEditJob(null)
                    fetchJobs()
                    setSnackbar({
                      open: true,
                      message: "Job updated successfully",
                      severity: "success",
                    })
                  }}
                  onCancel={() => setEditJob(null)}
                />
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress />
                </Box>
              )}
            </DialogContent>
          </Dialog>

          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              },
            }}
          >
            <DialogTitle>
              <Typography variant="h6" component="div" fontWeight="bold">
                Confirm Delete
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete "{jobToDelete?.title}" position at {jobToDelete?.company}?
              </Typography>
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                This action cannot be undone.
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={() => setDeleteDialogOpen(false)}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 500,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                color="error"
                variant="contained"
                startIcon={<Delete />}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 500,
                  boxShadow: "0 2px 8px rgba(211, 47, 47, 0.3)",
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={showChat}
            onClose={() => setShowChat(false)}
            fullWidth
            maxWidth="md"
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              },
            }}
          >
            <DialogTitle
              sx={{
                bgcolor: "#1976d2",
                color: "white",
                py: 2,
                fontWeight: 600,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                Chat with {selectedConversation?.name || "Candidate"} about {selectedConversation?.jobTitle}
              </Box>
              <IconButton onClick={() => setShowChat(false)} sx={{ color: "white" }}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              {selectedConversation && (
                <Message
                  currentUser={{
                    id: user.id || localStorage.getItem("userId"),
                    name: user.name,
                    email: user.email,
                  }}
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
              sx={{ width: "100%", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </Box>
  )
}

export default RecruiterDashboard

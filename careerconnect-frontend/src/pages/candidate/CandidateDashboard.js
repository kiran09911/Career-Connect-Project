// // "use client"

// // import { useState, useEffect } from "react"
// // import { useNavigate, Link } from "react-router-dom"
// // import axios from "axios"
// // import Message from "../../components/chat/Message"
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Button,
// //   IconButton,
// //   Avatar,
// //   CircularProgress,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   TextField,
// //   Box,
// //   Drawer,
// //   Divider,
// //   ListItemIcon,
// //   Paper,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Chip,
// //   Grid,
// //   Menu,
// //   MenuItem,
// //   useTheme,
// //   useMediaQuery,
// //   InputAdornment,
// //   Snackbar,
// //   Alert,
// //   Tab,
// //   Tabs,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   Tooltip,
// // } from "@mui/material"
// // import {
// //   Chat as ChatIcon,
// //   Logout as LogoutIcon,
// //   Menu as MenuIcon,
// //   Dashboard,
// //   Work,
// //   Person,
// //   Search,
// //   BusinessCenter,
// //   Description,
// //   Settings,
// //   LocationOn,
// //   AttachMoney,
// //   AccessTime,
// //   Refresh,
// //   Delete as DeleteIcon,
// // } from "@mui/icons-material"

// // const CandidateDashboard = () => {
// //   const navigate = useNavigate()
// //   const theme = useTheme()
// //   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

// //   const [currentUser, setCurrentUser] = useState(null)
// //   const [loading, setLoading] = useState(true)
// //   const [jobs, setJobs] = useState([])
// //   const [filteredJobs, setFilteredJobs] = useState([])
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [drawerOpen, setDrawerOpen] = useState(false)
// //   const [anchorEl, setAnchorEl] = useState(null)
// //   const [tabValue, setTabValue] = useState(0)
// //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
// //   const [applications, setApplications] = useState([])
// //   const [showChat, setShowChat] = useState(false)
// //   const [selectedConversation, setSelectedConversation] = useState(null)

// //   // Verify authentication and fetch user data
// //   useEffect(() => {
// //     const verifyAuth = async () => {
// //       try {
// //         const token = localStorage.getItem("token")
// //         if (!token) {
// //           navigate("/login")
// //           return
// //         }

// //         const response = await axios.get("http://localhost:5000/api/candidate/profile", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         })
// //         setCurrentUser(response.data)
// //         setLoading(false)
// //       } catch (error) {
// //         console.error("Auth verification failed:", error)
// //         if (error.response && error.response.status === 401) {
// //           localStorage.removeItem("token")
// //           localStorage.removeItem("refreshToken")
// //           navigate("/login")
// //         } else {
// //           setLoading(false)
// //         }
// //       }
// //     }

// //     verifyAuth()
// //   }, [navigate])

// //   // Fetch available jobs
// //   useEffect(() => {
// //     const fetchJobs = async () => {
// //       try {
// //         const token = localStorage.getItem("token")
// //         const response = await axios.get("http://localhost:5000/api/jobs", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         })
// //         setJobs(response.data)
// //         setFilteredJobs(response.data)
// //       } catch (err) {
// //         console.error("Error fetching jobs:", err)
// //         if (err.response?.status === 401) {
// //           localStorage.removeItem("token")
// //           localStorage.removeItem("refreshToken")
// //           navigate("/login")
// //         }
// //       }
// //     }

// //     fetchJobs()
// //   }, [navigate])

// //   // Fetch user applications
// //   const fetchApplications = async () => {
// //     if (!currentUser?.id) return

// //     try {
// //       const token = localStorage.getItem("token")
// //       const response = await axios.get("http://localhost:5000/api/applications/candidate", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       setApplications(response.data)
// //     } catch (err) {
// //       console.error("Error fetching applications:", err)
// //       if (err.response?.status === 401) {
// //         localStorage.removeItem("token")
// //         localStorage.removeItem("refreshToken")
// //         navigate("/login")
// //       } else {
// //         setSnackbar({
// //           open: true,
// //           message: "Failed to fetch applications. Please try again.",
// //           severity: "error",
// //         })
// //       }
// //     }
// //   }

// //   useEffect(() => {
// //     fetchApplications()
// //   }, [currentUser])

// //   // Periodically refresh applications to catch status updates
// //   useEffect(() => {
// //     if (tabValue === 1 && currentUser?.id) {
// //       const interval = setInterval(() => {
// //         fetchApplications()
// //       }, 30000) // Refresh every 30 seconds
// //       return () => clearInterval(interval)
// //     }
// //   }, [tabValue, currentUser])

// //   // Filter jobs based on search term
// //   useEffect(() => {
// //     if (searchTerm.trim() === "") {
// //       setFilteredJobs(jobs)
// //     } else {
// //       const filtered = jobs.filter(
// //         (job) =>
// //           job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //           (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //           (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase())),
// //       )
// //       setFilteredJobs(filtered)
// //     }
// //   }, [searchTerm, jobs])

// //   const handleApply = async (jobId, recruiterId) => {
// //     try {
// //       const token = localStorage.getItem("token")
// //       await axios.post(
// //         "http://localhost:5000/api/applications",
// //         { jobId, recruiterId },
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       )

// //       setSnackbar({
// //         open: true,
// //         message: "Application submitted successfully!",
// //         severity: "success",
// //       })

// //       await fetchApplications() // Refresh applications after applying
// //     } catch (err) {
// //       console.error("Error applying for job:", err)
// //       if (err.response?.status === 401) {
// //         localStorage.removeItem("token")
// //         localStorage.removeItem("refreshToken")
// //         navigate("/login")
// //       } else {
// //         setSnackbar({
// //           open: true,
// //           message: err.response?.data?.error || "Failed to apply for the job.",
// //           severity: "error",
// //         })
// //       }
// //     }
// //   }

// //   const handleDelete = async (jobId) => {
// //     try {
// //       const token = localStorage.getItem("token")
// //       await axios.delete(`http://localhost:5000/api/applications/${jobId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })

// //       // Update the applications state by removing the deleted application
// //       setApplications(applications.filter((app) => app.job_id !== jobId))

// //       setSnackbar({
// //         open: true,
// //         message: "Application deleted successfully!",
// //         severity: "success",
// //       })
// //     } catch (err) {
// //       console.error("Error deleting application:", err)
// //       if (err.response?.status === 401) {
// //         localStorage.removeItem("token")
// //         localStorage.removeItem("refreshToken")
// //         navigate("/login")
// //       } else if (err.code === "ERR_NETWORK") {
// //         setSnackbar({
// //           open: true,
// //           message: "Cannot connect to the server. Please check if the backend is running.",
// //           severity: "error",
// //         })
// //       } else {
// //         setSnackbar({
// //           open: true,
// //           message: err.response?.data?.details || err.response?.data?.error || "Failed to delete the application.",
// //           severity: "error",
// //         })
// //       }
// //     }
// //   }

// //   const handleLogout = () => {
// //     localStorage.clear()
// //     navigate("/login")
// //   }

// //   const handleProfileMenuOpen = (event) => {
// //     setAnchorEl(event.currentTarget)
// //   }

// //   const handleProfileMenuClose = () => {
// //     setAnchorEl(null)
// //   }

// //   const handleChatOpen = async (recruiterId, recruiterName, jobId, jobTitle) => {
// //     console.log("handleChatOpen called with:", { recruiterId, recruiterName, jobId, jobTitle })

// //     if (!recruiterId || !currentUser?.id || !jobId) {
// //       console.error("Missing recruiterId, currentUser.id, or jobId:", { recruiterId, currentUserId: currentUser?.id, jobId })
// //       setSnackbar({
// //         open: true,
// //         message: "Unable to start chat. Missing required information.",
// //         severity: "error",
// //       })
// //       return
// //     }

// //     try {
// //       const token = localStorage.getItem("token")
// //       const response = await axios.post(
// //         "http://localhost:5000/api/conversations",
// //         {
// //           user1Id: currentUser.id,
// //           user2Id: recruiterId,
// //           jobId: jobId,
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       )

// //       const conversationId = response.data.conversationId
// //       console.log("Fetched conversationId:", conversationId)

// //       setSelectedConversation({
// //         id: conversationId,
// //         name: recruiterName || "Recruiter",
// //         receiverId: recruiterId,
// //         jobTitle: jobTitle || "Job",
// //       })
// //       setShowChat(true)
// //     } catch (err) {
// //       console.error("Error fetching conversation ID:", err.response?.data || err.message)
// //       if (err.response?.status === 401) {
// //         localStorage.removeItem("token")
// //         localStorage.removeItem("refreshToken")
// //         navigate("/login")
// //       } else {
// //         setSnackbar({
// //           open: true,
// //           message: err.response?.data?.message || "Failed to start chat. Please try again.",
// //           severity: "error",
// //         })
// //       }
// //     }
// //   }

// //   const handleTabChange = (event, newValue) => {
// //     setTabValue(newValue)
// //   }

// //   const toggleDrawer = () => {
// //     setDrawerOpen(!drawerOpen)
// //   }

// //   if (loading) {
// //     return (
// //       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "background.default" }}>
// //         <CircularProgress color="primary" />
// //       </Box>
// //     )
// //   }

// //   const hasApplied = (jobId) => {
// //     return applications.some((app) => app.job_id === jobId)
// //   }

// //   const drawerContent = (
// //     <Box sx={{ width: 250, bgcolor: "background.paper", height: "100%", display: "flex", flexDirection: "column" }}>
// //       <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", bgcolor: theme.palette.primary.main, color: "white" }}>
// //         <Avatar
// //           sx={{
// //             width: 60,
// //             height: 60,
// //             mb: 2,
// //             bgcolor: "white",
// //             color: theme.palette.primary.main,
// //             fontSize: "1.5rem",
// //             fontWeight: "bold",
// //           }}
// //           src={currentUser?.profile_photo ? `http://localhost:5000${currentUser.profile_photo}` : undefined}
// //           onError={(e) => {
// //             e.target.src = undefined; // Fallback to the initial if the image fails to load
// //           }}
// //         >
// //           {currentUser?.name?.charAt(0) || "C"}
// //         </Avatar>
// //         <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
// //           Candidate Portal
// //         </Typography>
// //         <Typography variant="body2" sx={{ opacity: 0.8 }}>
// //           {currentUser?.email || "candidate@example.com"}
// //         </Typography>
// //       </Box>
// //       <Divider />
// //       <List sx={{ flexGrow: 1 }}>
// //         {[
// //           { text: "Dashboard", icon: <Dashboard />, value: 0 },
// //           { text: "Browse Jobs", icon: <Work />, value: 0 },
// //           { text: "Applied Jobs", icon: <Description />, value: 1 },
// //           { text: "Profile", icon: <Person />, to: "/candidate/profile" },
// //           { text: "Edit Profile", icon: <Person />, to: "/candidate/profile/edit" },
// //           { text: "Settings", icon: <Settings />, to: "/candidate/settings" },
// //         ].map((item, index) => (
// //           <ListItem
// //             key={index}
// //             button
// //             component={item.to ? Link : "button"}
// //             to={item.to}
// //             onClick={item.value !== undefined ? () => setTabValue(item.value) : undefined}
// //             selected={item.value !== undefined && tabValue === item.value}
// //             sx={{
// //               py: 1.5,
// //               "&:hover": { bgcolor: theme.palette.grey[100] },
// //               "&.Mui-selected": {
// //                 bgcolor: theme.palette.grey[200],
// //                 "&:hover": { bgcolor: theme.palette.grey[200] },
// //               },
// //             }}
// //           >
// //             <ListItemIcon sx={{ minWidth: 40, color: theme.palette.text.secondary }}>
// //               {item.icon}
// //             </ListItemIcon>
// //             <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: "0.95rem", fontWeight: 500 }} />
// //           </ListItem>
// //         ))}
// //       </List>
// //       <Divider />
// //       <List>
// //         <ListItem
// //           button
// //           onClick={handleLogout}
// //           sx={{
// //             py: 1.5,
// //             "&:hover": { bgcolor: theme.palette.grey[100] },
// //           }}
// //         >
// //           <ListItemIcon sx={{ minWidth: 40, color: theme.palette.text.secondary }}>
// //             <LogoutIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "0.95rem", fontWeight: 500 }} />
// //         </ListItem>
// //       </List>
// //     </Box>
// //   )

// //   return (
// //     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
// //       <AppBar
// //         position="fixed"
// //         sx={{
// //           zIndex: (theme) => theme.zIndex.drawer + 1,
// //           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
// //           background: "linear-gradient(90deg, #1976d2, #2196f3)",
// //         }}
// //       >
// //         <Toolbar sx={{ minHeight: 64 }}>
// //           <IconButton
// //             color="inherit"
// //             edge="start"
// //             onClick={toggleDrawer}
// //             sx={{ mr: 2, display: { md: "none" } }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           <BusinessCenter sx={{ mr: 1, fontSize: "1.8rem" }} />
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, fontSize: "1.25rem" }}>
// //             CareerConnect
// //           </Typography>

// //           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //             <Button
// //               color="inherit"
// //               onClick={handleProfileMenuOpen}
// //               startIcon={
// //                 <Avatar
// //                   sx={{
// //                     width: 32,
// //                     height: 32,
// //                     bgcolor: "white",
// //                     color: theme.palette.primary.main,
// //                     fontSize: "1rem",
// //                   }}
// //                 >
// //                   {currentUser?.name?.charAt(0) || "C"}
// //                 </Avatar>
// //               }
// //               sx={{
// //                 textTransform: "none",
// //                 fontSize: "0.95rem",
// //                 fontWeight: 500,
// //                 "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
// //               }}
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
// //         <MenuItem component={Link} to="/candidate/profile">
// //           <ListItemIcon>
// //             <Person fontSize="small" />
// //           </ListItemIcon>
// //           <ListItemText>Profile</ListItemText>
// //         </MenuItem>
// //         <MenuItem component={Link} to="/candidate/settings">
// //           <ListItemIcon>
// //             <Settings fontSize="small" />
// //           </ListItemIcon>
// //           <ListItemText>Settings</ListItemText>
// //         </MenuItem>
// //         <Divider />
// //         <MenuItem onClick={handleLogout}>
// //           <ListItemIcon>
// //             <LogoutIcon fontSize="small" />
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
// //             borderRight: `1px solid ${theme.palette.divider}`,
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
// //           p: { xs: 2, sm: 3, md: 4 },
// //           width: { md: `calc(100% - 250px)` },
// //           mt: "64px",
// //           bgcolor: theme.palette.grey[50],
// //           minHeight: "calc(100vh - 64px)",
// //         }}
// //       >
// //         <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
// //           <Tabs
// //             value={tabValue}
// //             onChange={handleTabChange}
// //             variant={isMobile ? "scrollable" : "standard"}
// //             scrollButtons="auto"
// //             sx={{
// //               "& .MuiTab-root": {
// //                 textTransform: "none",
// //                 fontWeight: 500,
// //                 fontSize: "1rem",
// //                 px: 3,
// //                 py: 2,
// //               },
// //               "& .MuiTabs-indicator": {
// //                 height: 3,
// //                 bgcolor: theme.palette.primary.main,
// //               },
// //             }}
// //           >
// //             <Tab label="Available Jobs" icon={<Work />} iconPosition="start" />
// //             <Tab
// //               label={`Applied Jobs${applications.length > 0 ? ` (${applications.length})` : ""}`}
// //               icon={<Description />}
// //               iconPosition="start"
// //             />
// //           </Tabs>
// //         </Box>

// //         {tabValue === 0 && (
// //           <>
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 flexDirection: { xs: "column", sm: "row" },
// //                 justifyContent: "space-between",
// //                 alignItems: { xs: "stretch", sm: "center" },
// //                 mb: 4,
// //                 gap: 2,
// //               }}
// //             >
// //               <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
// //                 Explore Job Opportunities
// //               </Typography>

// //               <TextField
// //                 placeholder="Search jobs..."
// //                 variant="outlined"
// //                 size="small"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 InputProps={{
// //                   startAdornment: (
// //                     <InputAdornment position="start">
// //                       <Search sx={{ color: theme.palette.text.secondary }} />
// //                     </InputAdornment>
// //                   ),
// //                   endAdornment: searchTerm && (
// //                     <InputAdornment position="end">
// //                       <IconButton size="small" onClick={() => setSearchTerm("")}>
// //                         ×
// //                       </IconButton>
// //                     </InputAdornment>
// //                   ),
// //                 }}
// //                 sx={{
// //                   width: { xs: "100%", sm: "300px" },
// //                   bgcolor: "white",
// //                   borderRadius: 1,
// //                   "& .MuiOutlinedInput-root": {
// //                     "& fieldset": { borderColor: theme.palette.grey[300] },
// //                     "&:hover fieldset": { borderColor: theme.palette.grey[400] },
// //                     "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
// //                   },
// //                 }}
// //               />
// //             </Box>

// //             {filteredJobs.length === 0 ? (
// //               <Paper
// //                 sx={{
// //                   p: 6,
// //                   textAlign: "center",
// //                   borderRadius: 2,
// //                   boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
// //                   bgcolor: "white",
// //                 }}
// //               >
// //                 <Box sx={{ mb: 3 }}>
// //                   <Work sx={{ fontSize: 60, color: theme.palette.grey[400] }} />
// //                 </Box>
// //                 <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
// //                   No jobs found
// //                 </Typography>
// //                 <Typography color="text.secondary" paragraph sx={{ mb: 3 }}>
// //                   {searchTerm
// //                     ? "Try adjusting your search criteria."
// //                     : "There are no job postings available at the moment."}
// //                 </Typography>
// //                 {searchTerm && (
// //                   <Button
// //                     variant="outlined"
// //                     onClick={() => setSearchTerm("")}
// //                     sx={{
// //                       textTransform: "none",
// //                       borderRadius: 1,
// //                       px: 3,
// //                       py: 1,
// //                       color: theme.palette.primary.main,
// //                       borderColor: theme.palette.primary.main,
// //                       "&:hover": {
// //                         bgcolor: theme.palette.primary.light,
// //                         borderColor: theme.palette.primary.main,
// //                         color: "white",
// //                       },
// //                     }}
// //                   >
// //                     Clear Search
// //                   </Button>
// //                 )}
// //               </Paper>
// //             ) : (
// //               <Grid container spacing={3}>
// //                 {filteredJobs.map((job) => (
// //                   <Grid item xs={12} sm={6} lg={4} key={job.id}>
// //                     <Card
// //                       sx={{
// //                         height: "100%",
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         borderRadius: 2,
// //                         boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// //                         transition: "transform 0.2s, box-shadow 0.2s",
// //                         bgcolor: "white",
// //                         "&:hover": {
// //                           transform: "translateY(-4px)",
// //                           boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
// //                         },
// //                       }}
// //                     >
// //                       <CardContent sx={{ flexGrow: 1, pb: 1 }}>
// //                         <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
// //                           {job.title}
// //                         </Typography>

// //                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
// //                           {job.company && (
// //                             <Chip
// //                               size="small"
// //                               label={job.company}
// //                               icon={<BusinessCenter fontSize="small" />}
// //                               sx={{
// //                                 bgcolor: theme.palette.grey[100],
// //                                 color: theme.palette.text.secondary,
// //                                 fontWeight: 500,
// //                                 fontSize: "0.85rem",
// //                                 px: 1,
// //                               }}
// //                             />
// //                           )}
// //                           {job.location && (
// //                             <Chip
// //                               size="small"
// //                               label={job.location}
// //                               icon={<LocationOn fontSize="small" />}
// //                               sx={{
// //                                 bgcolor: theme.palette.grey[100],
// //                                 color: theme.palette.text.secondary,
// //                                 fontWeight: 500,
// //                                 fontSize: "0.85rem",
// //                                 px: 1,
// //                               }}
// //                             />
// //                           )}
// //                           {job.salary && (
// //                             <Chip
// //                               size="small"
// //                               label={`$${job.salary}`}
// //                               icon={<AttachMoney fontSize="small" />}
// //                               sx={{
// //                                 bgcolor: theme.palette.grey[100],
// //                                 color: theme.palette.text.secondary,
// //                                 fontWeight: 500,
// //                                 fontSize: "0.85rem",
// //                                 px: 1,
// //                               }}
// //                             />
// //                           )}
// //                         </Box>

// //                         <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.6 }}>
// //                           {job.description && job.description.length > 150
// //                             ? `${job.description.substring(0, 150)}...`
// //                             : job.description}
// //                         </Typography>
// //                       </CardContent>

// //                       <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
// //                         <Button
// //                           variant="contained"
// //                           color="primary"
// //                           onClick={() => handleApply(job.id, job.recruiterId)}
// //                           disabled={hasApplied(job.id)}
// //                           sx={{
// //                             textTransform: "none",
// //                             borderRadius: 1,
// //                             px: 3,
// //                             py: 1,
// //                             fontWeight: 500,
// //                             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //                             "&:hover": {
// //                               boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
// //                             },
// //                           }}
// //                         >
// //                           {hasApplied(job.id) ? "Applied" : "Apply Now"}
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
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 flexDirection: { xs: "column", sm: "row" },
// //                 justifyContent: "space-between",
// //                 alignItems: { xs: "stretch", sm: "center" },
// //                 mb: 4,
// //                 gap: 2,
// //               }}
// //             >
// //               <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
// //                 Applied Jobs
// //               </Typography>
// //               <Button
// //                 variant="outlined"
// //                 startIcon={<Refresh />}
// //                 onClick={fetchApplications}
// //                 sx={{
// //                   textTransform: "none",
// //                   borderRadius: 1,
// //                   px: 3,
// //                   py: 1,
// //                   color: theme.palette.primary.main,
// //                   borderColor: theme.palette.grey[300],
// //                   "&:hover": {
// //                     bgcolor: theme.palette.primary.light,
// //                     borderColor: theme.palette.primary.main,
// //                     color: "white",
// //                   },
// //                 }}
// //               >
// //                 Refresh
// //               </Button>
// //             </Box>

// //             {applications.length === 0 ? (
// //               <Paper
// //                 sx={{
// //                   p: 6,
// //                   textAlign: "center",
// //                   borderRadius: 2,
// //                   boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
// //                   bgcolor: "white",
// //                 }}
// //               >
// //                 <Box sx={{ mb: 3 }}>
// //                   <Description sx={{ fontSize: 60, color: theme.palette.grey[400] }} />
// //                 </Box>
// //                 <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
// //                   No applications yet
// //                 </Typography>
// //                 <Typography color="text.secondary" paragraph sx={{ mb: 3 }}>
// //                   You haven't applied to any jobs yet. Browse available jobs and submit your first application.
// //                 </Typography>
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   onClick={() => setTabValue(0)}
// //                   sx={{
// //                     textTransform: "none",
// //                     borderRadius: 1,
// //                     px: 3,
// //                     py: 1,
// //                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //                     "&:hover": {
// //                       boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
// //                     },
// //                   }}
// //                 >
// //                   Browse Jobs
// //                 </Button>
// //               </Paper>
// //             ) : (
// //               <Grid container spacing={3}>
// //                 {applications.map((application) => {
// //                   const job = jobs.find((j) => j.id === application.job_id) || {
// //                     title: "Unknown Position",
// //                     company: "Unknown Company",
// //                     location: "Unknown Location",
// //                     job_type: "Unknown Type",
// //                   }

// //                   return (
// //                     <Grid item xs={12} sm={6} lg={4} key={application.job_id}>
// //                       <Card
// //                         sx={{
// //                           height: "100%",
// //                           display: "flex",
// //                           flexDirection: "column",
// //                           borderRadius: 2,
// //                           boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// //                           transition: "transform 0.2s, box-shadow 0.2s",
// //                           bgcolor: "white",
// //                           "&:hover": {
// //                             transform: "translateY(-4px)",
// //                             boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
// //                           },
// //                         }}
// //                       >
// //                         <CardContent sx={{ flexGrow: 1, pb: 1 }}>
// //                           <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
// //                             {job.title}
// //                           </Typography>

// //                           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
// //                             {job.company && (
// //                               <Chip
// //                                 size="small"
// //                                 label={job.company}
// //                                 icon={<BusinessCenter fontSize="small" />}
// //                                 sx={{
// //                                   bgcolor: theme.palette.grey[100],
// //                                   color: theme.palette.text.secondary,
// //                                   fontWeight: 500,
// //                                   fontSize: "0.85rem",
// //                                   px: 1,
// //                                 }}
// //                               />
// //                             )}
// //                             {job.location && (
// //                               <Chip
// //                                 size="small"
// //                                 label={job.location}
// //                                 icon={<LocationOn fontSize="small" />}
// //                                 sx={{
// //                                   bgcolor: theme.palette.grey[100],
// //                                   color: theme.palette.text.secondary,
// //                                   fontWeight: 500,
// //                                   fontSize: "0.85rem",
// //                                   px: 1,
// //                                 }}
// //                               />
// //                             )}
// //                             {job.job_type && (
// //                               <Chip
// //                                 size="small"
// //                                 label={job.job_type}
// //                                 icon={<AccessTime fontSize="small" />}
// //                                 sx={{
// //                                   bgcolor: theme.palette.grey[100],
// //                                   color: theme.palette.text.secondary,
// //                                   fontWeight: 500,
// //                                   fontSize: "0.85rem",
// //                                   px: 1,
// //                                 }}
// //                               />
// //                             )}
// //                             {job.salary && (
// //                               <Chip
// //                                 size="small"
// //                                 label={job.salary}
// //                                 icon={<AttachMoney fontSize="small" />}
// //                                 sx={{
// //                                   bgcolor: theme.palette.grey[100],
// //                                   color: theme.palette.text.secondary,
// //                                   fontWeight: 500,
// //                                   fontSize: "0.85rem",
// //                                   px: 1,
// //                                 }}
// //                               />
// //                             )}
// //                           </Box>

// //                           <Box sx={{ mt: 2 }}>
// //                             <Chip
// //                               label={application.status ? application.status.charAt(0).toUpperCase() + application.status.slice(1) : "Applied"}
// //                               color={
// //                                 application.status && application.status.toLowerCase() === "rejected"
// //                                   ? "error"
// //                                   : application.status && application.status.toLowerCase() === "accepted"
// //                                     ? "success"
// //                                     : "warning"
// //                               }
// //                               sx={{
// //                                 fontWeight: 600,
// //                                 fontSize: "0.9rem",
// //                                 px: 1.5,
// //                                 py: 0.5,
// //                                 borderRadius: 1,
// //                               }}
// //                             />
// //                             <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, fontSize: "0.9rem" }}>
// //                               Applied on: {new Date(application.created_at || Date.now()).toLocaleDateString()}
// //                             </Typography>
// //                           </Box>
// //                         </CardContent>
// //                         <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between" }}>
// //                           <Tooltip title="Delete this application" placement="top">
// //                             <Button
// //                               variant="outlined"
// //                               color="error"
// //                               startIcon={<DeleteIcon />}
// //                               onClick={() => handleDelete(application.job_id)}
// //                               sx={{
// //                                 textTransform: "none",
// //                                 borderRadius: 1,
// //                                 px: 3,
// //                                 py: 1,
// //                                 fontWeight: 500,
// //                                 borderColor: theme.palette.error.main,
// //                                 color: theme.palette.error.main,
// //                                 "&:hover": {
// //                                   borderColor: theme.palette.error.dark,
// //                                   bgcolor: theme.palette.error.light,
// //                                 },
// //                               }}
// //                             >
// //                               Delete
// //                             </Button>
// //                           </Tooltip>
// //                           <Tooltip
// //                             title={application.status && application.status.toLowerCase() === 'accepted' ? "Chat with the recruiter" : "Wait for response from recruiter"}
// //                             placement="top"
// //                           >
// //                             <span>
// //                               <Button
// //                                 variant="outlined"
// //                                 color={application.status && application.status.toLowerCase() === 'accepted' ? "primary" : "inherit"}
// //                                 startIcon={<ChatIcon />}
// //                                 onClick={() => handleChatOpen(
// //                                   application.recruiter_id || job.posted_by || 'unknown',
// //                                   application.recruiter_name || 'Recruiter',
// //                                   application.job_id,
// //                                   job.title
// //                                 )}
// //                                 disabled={!(application.status && application.status.toLowerCase() === 'accepted')}
// //                                 sx={{
// //                                   textTransform: "none",
// //                                   borderRadius: 1,
// //                                   px: 3,
// //                                   py: 1,
// //                                   fontWeight: 500,
// //                                   borderColor: application.status && application.status.toLowerCase() === 'accepted' ? theme.palette.primary.main : theme.palette.grey[300],
// //                                   "&:hover": {
// //                                     borderColor: application.status && application.status.toLowerCase() === 'accepted' ? theme.palette.primary.dark : theme.palette.grey[400],
// //                                     bgcolor: application.status && application.status.toLowerCase() === 'accepted' ? theme.palette.primary.light : theme.palette.grey[50],
// //                                   },
// //                                 }}
// //                               >
// //                                 Chat
// //                               </Button>
// //                             </span>
// //                           </Tooltip>
// //                         </CardActions>
// //                       </Card>
// //                     </Grid>
// //                   )
// //                 })}
// //               </Grid>
// //             )}
// //           </>
// //         )}

// //         <Dialog open={showChat} onClose={() => setShowChat(false)} fullWidth maxWidth="md">
// //           <DialogTitle sx={{ bgcolor: theme.palette.grey[50], borderBottom: `1px solid ${theme.palette.divider}` }}>
// //             Chat with {selectedConversation?.name || "Recruiter"} about {selectedConversation?.jobTitle}
// //           </DialogTitle>
// //           <DialogContent sx={{ p: 3, bgcolor: "white" }}>
// //             {selectedConversation && (
// //               <Message
// //                 currentUser={currentUser}
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

// // export default CandidateDashboard

// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import axios from "axios"
// import Message from "../../components/chat/Message"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Avatar,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Box,
//   Drawer,
//   Divider,
//   ListItemIcon,
//   Paper,
//   Card,
//   CardContent,
//   CardActions,
//   Chip,
//   Grid,
//   Menu,
//   MenuItem,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   Snackbar,
//   Alert,
//   Tab,
//   Tabs,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Tooltip,
//   Badge,
//   Container,
// } from "@mui/material"
// import {
//   Chat as ChatIcon,
//   Logout as LogoutIcon,
//   Menu as MenuIcon,
//   Dashboard,
//   Work,
//   Person,
//   Search,
//   BusinessCenter,
//   Description,
//   Settings,
//   LocationOn,
//   AttachMoney,
//   AccessTime,
//   Refresh,
//   Delete as DeleteIcon,
//   Close,
//   ChevronRight,
//   MoreVert,
//   Notifications,
//   FilterList,
//   KeyboardArrowDown,
// } from "@mui/icons-material"

// const CandidateDashboard = () => {
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

//   const [currentUser, setCurrentUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [jobs, setJobs] = useState([])
//   const [filteredJobs, setFilteredJobs] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [drawerOpen, setDrawerOpen] = useState(false)
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [tabValue, setTabValue] = useState(0)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
//   const [applications, setApplications] = useState([])
//   const [showChat, setShowChat] = useState(false)
//   const [selectedConversation, setSelectedConversation] = useState(null)

//   // Verify authentication and fetch user data
//   useEffect(() => {
//     const verifyAuth = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         if (!token) {
//           navigate("/login")
//           return
//         }

//         const response = await axios.get("http://localhost:5000/api/candidate/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         setCurrentUser(response.data)
//         setLoading(false)
//       } catch (error) {
//         console.error("Auth verification failed:", error)
//         if (error.response && error.response.status === 401) {
//           localStorage.removeItem("token")
//           localStorage.removeItem("refreshToken")
//           navigate("/login")
//         } else {
//           setLoading(false)
//         }
//       }
//     }

//     verifyAuth()
//   }, [navigate])

//   // Fetch available jobs
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         const response = await axios.get("http://localhost:5000/api/jobs", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         setJobs(response.data)
//         setFilteredJobs(response.data)
//       } catch (err) {
//         console.error("Error fetching jobs:", err)
//         if (err.response?.status === 401) {
//           localStorage.removeItem("token")
//           localStorage.removeItem("refreshToken")
//           navigate("/login")
//         }
//       }
//     }

//     fetchJobs()
//   }, [navigate])

//   // Fetch user applications
//   const fetchApplications = async () => {
//     if (!currentUser?.id) return

//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.get("http://localhost:5000/api/applications/candidate", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       setApplications(response.data)
//     } catch (err) {
//       console.error("Error fetching applications:", err)
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token")
//         localStorage.removeItem("refreshToken")
//         navigate("/login")
//       } else {
//         setSnackbar({
//           open: true,
//           message: "Failed to fetch applications. Please try again.",
//           severity: "error",
//         })
//       }
//     }
//   }

//   useEffect(() => {
//     fetchApplications()
//   }, [currentUser])

//   // Periodically refresh applications to catch status updates
//   useEffect(() => {
//     if (tabValue === 1 && currentUser?.id) {
//       const interval = setInterval(() => {
//         fetchApplications()
//       }, 30000) // Refresh every 30 seconds
//       return () => clearInterval(interval)
//     }
//   }, [tabValue, currentUser])

//   // Filter jobs based on search term
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredJobs(jobs)
//     } else {
//       const filtered = jobs.filter(
//         (job) =>
//           job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//       setFilteredJobs(filtered)
//     }
//   }, [searchTerm, jobs])

//   const handleApply = async (jobId, recruiterId) => {
//     try {
//       const token = localStorage.getItem("token")
//       await axios.post(
//         "http://localhost:5000/api/applications",
//         { jobId, recruiterId },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       setSnackbar({
//         open: true,
//         message: "Application submitted successfully!",
//         severity: "success",
//       })

//       await fetchApplications() // Refresh applications after applying
//     } catch (err) {
//       console.error("Error applying for job:", err)
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token")
//         localStorage.removeItem("refreshToken")
//         navigate("/login")
//       } else {
//         setSnackbar({
//           open: true,
//           message: err.response?.data?.error || "Failed to apply for the job.",
//           severity: "error",
//         })
//       }
//     }
//   }

//   const handleDelete = async (jobId) => {
//     try {
//       const token = localStorage.getItem("token")
//       await axios.delete(`http://localhost:5000/api/applications/${jobId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       // Update the applications state by removing the deleted application
//       setApplications(applications.filter((app) => app.job_id !== jobId))

//       setSnackbar({
//         open: true,
//         message: "Application deleted successfully!",
//         severity: "success",
//       })
//     } catch (err) {
//       console.error("Error deleting application:", err)
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token")
//         localStorage.removeItem("refreshToken")
//         navigate("/login")
//       } else {
//         setSnackbar({
//           open: true,
//           message: err.response?.data?.details || err.response?.data?.error || "Failed to delete the application.",
//           severity: "error",
//         })
//       }
//     }
//   }

//   const handleLogout = () => {
//     localStorage.clear()
//     navigate("/login")
//   }

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleChatOpen = async (recruiterId, recruiterName, jobId, jobTitle) => {
//     if (!recruiterId || !currentUser?.id || !jobId) {
//       setSnackbar({
//         open: true,
//         message: "Unable to start chat. Missing required information.",
//         severity: "error",
//       })
//       return
//     }

//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.post(
//         "http://localhost:5000/api/conversations",
//         {
//           user1Id: currentUser.id,
//           user2Id: recruiterId,
//           jobId: jobId,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )

//       const conversationId = response.data.conversationId

//       setSelectedConversation({
//         id: conversationId,
//         name: recruiterName || "Recruiter",
//         receiverId: recruiterId,
//         jobTitle: jobTitle || "Job",
//       })
//       setShowChat(true)
//     } catch (err) {
//       console.error("Error fetching conversation ID:", err.response?.data || err.message)
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token")
//         localStorage.removeItem("refreshToken")
//         navigate("/login")
//       } else {
//         setSnackbar({
//           open: true,
//           message: err.response?.data?.message || "Failed to start chat. Please try again.",
//           severity: "error",
//         })
//       }
//     }
//   }

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue)
//   }

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen)
//   }

//   if (loading) {
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
//   }

//   const hasApplied = (jobId) => {
//     return applications.some((app) => app.job_id === jobId)
//   }

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
//             width: 70,
//             height: 70,
//             mb: 2,
//             bgcolor: "white",
//             color: "#1976d2",
//             fontSize: "1.8rem",
//             fontWeight: "bold",
//             border: "3px solid rgba(255,255,255,0.8)",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//           }}
//           src={currentUser?.profile_photo ? `http://localhost:5000${currentUser.profile_photo}` : undefined}
//         >
//           {currentUser?.name?.charAt(0) || "C"}
//         </Avatar>
//         <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
//           Candidate Portal
//         </Typography>
//         <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.9rem" }}>
//           {currentUser?.email || "candidate@example.com"}
//         </Typography>
//       </Box>
//       <Divider />
//       <List sx={{ flexGrow: 1, py: 1 }}>
//         {[
//           { text: "Dashboard", icon: <Dashboard />, value: 0 },
//           { text: "Browse Jobs", icon: <Work />, value: 0 },
//           { text: "Applied Jobs", icon: <Description />, value: 1, badge: applications.length },
//           // { text: "Profile", icon: <Person />, to: "/candidate/profile" },
//           { text: "Edit Profile", icon: <Person />, to: "/candidate/profile/edit" },
//           // { text: "Settings", icon: <Settings />, to: "/candidate/settings" },
//         ].map((item, index) => (
//           <ListItem
//             key={index}
//             button
//             component={item.to ? Link : "div"}
//             to={item.to}
//             onClick={
//               item.value !== undefined
//                 ? () => {
//                     setTabValue(item.value)
//                     if (isMobile) setDrawerOpen(false)
//                   }
//                 : undefined
//             }
//             selected={item.value !== undefined && tabValue === item.value}
//             sx={{
//               py: 1.2,
//               px: 2,
//               borderRadius: "0 24px 24px 0",
//               mr: 1,
//               mb: 0.5,
//               position: "relative",
//               "&.Mui-selected": {
//                 bgcolor: "rgba(25, 118, 210, 0.12)",
//                 "&:hover": { bgcolor: "rgba(25, 118, 210, 0.18)" },
//               },
//               "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
//             }}
//           >
//             <ListItemIcon sx={{ minWidth: 40, color: item.value === tabValue ? "#1976d2" : "rgba(0, 0, 0, 0.54)" }}>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={item.text}
//               primaryTypographyProps={{
//                 fontSize: "0.95rem",
//                 fontWeight: item.value === tabValue ? 600 : 500,
//                 color: item.value === tabValue ? "#1976d2" : "inherit",
//               }}
//             />
//             {item.badge > 0 && (
//               <Chip
//                 size="small"
//                 label={item.badge}
//                 sx={{
//                   bgcolor: "#1976d2",
//                   color: "white",
//                   height: 22,
//                   fontSize: "0.75rem",
//                   fontWeight: 600,
//                   minWidth: 22,
//                 }}
//               />
//             )}
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <Box sx={{ p: 2 }}>
//         <Button
//           fullWidth
//           variant="outlined"
//           color="error"
//           startIcon={<LogoutIcon />}
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
//         backgroundImage: "url('/images/dashboard-bg.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         "&::before": {
//           content: '""',
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(245, 247, 250, 0.85)",
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
//                 <Badge badgeContent={3} color="error">
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
//                   src={currentUser?.profile_photo ? `http://localhost:5000${currentUser.profile_photo}` : undefined}
//                 >
//                   {currentUser?.name?.charAt(0) || "C"}
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
//               <Box sx={{ display: { xs: "none", sm: "block" } }}>{currentUser?.name || "Profile"}</Box>
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
//             {currentUser?.name || "User"}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
//             {currentUser?.email || "user@example.com"}
//           </Typography>
//         </Box>

//         <MenuItem component={Link} to="/candidate/profile" onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
//           <ListItemIcon>
//             <Person fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Profile</ListItemText>
//         </MenuItem>
//         {/* <MenuItem component={Link} to="/candidate/settings" onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
//           <ListItemIcon>
//             <Settings fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Settings</ListItemText>
//         </MenuItem> */}
//         <Divider />
//         <MenuItem
//           onClick={() => {
//             handleLogout()
//             handleProfileMenuClose()
//           }}
//           sx={{ py: 1.5, color: "#d32f2f" }}
//         >
//           <ListItemIcon sx={{ color: "#d32f2f" }}>
//             <LogoutIcon fontSize="small" />
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
//                   label="Available Jobs"
//                   icon={<Work />}
//                   iconPosition="start"
//                   sx={{
//                     color: tabValue === 0 ? "#1976d2" : "text.secondary",
//                     "&.Mui-selected": { color: "#1976d2" },
//                   }}
//                 />
//                 <Tab
//                   label={`Applied Jobs${applications.length > 0 ? ` (${applications.length})` : ""}`}
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
//                   Explore Job Opportunities
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
//                   <Tooltip title="Filter Jobs">
//                     <IconButton
//                       sx={{
//                         bgcolor: "white",
//                         border: "1px solid #e0e0e0",
//                         borderRadius: 2,
//                         "&:hover": { bgcolor: "#f5f5f5" },
//                       }}
//                     >
//                       <FilterList />
//                     </IconButton>
//                   </Tooltip>
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
//                     No jobs found
//                   </Typography>
//                   <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
//                     {searchTerm
//                       ? "Try adjusting your search criteria or check back later for new opportunities."
//                       : "There are no job postings available at the moment. Please check back later."}
//                   </Typography>
//                   {searchTerm && (
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
//                   )}
//                 </Paper>
//               ) : (
//                 <Grid container spacing={3}>
//                   {filteredJobs.map((job) => (
//                     <Grid item xs={12} sm={6} lg={4} key={job.id}>
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

//                             <IconButton size="small" sx={{ ml: 1, mt: -0.5 }}>
//                               <MoreVert fontSize="small" />
//                             </IconButton>
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
//                             {job.description || "No description available for this position."}
//                           </Typography>
//                         </CardContent>

//                         <CardActions
//                           sx={{ p: 2, pt: 0, justifyContent: "space-between", borderTop: "1px solid #f0f0f0" }}
//                         >
//                           {/* <Button
//                             variant="outlined"
//                             size="small"
//                             component={Link}
//                             to={`/jobs/${job.id}`}
//                             sx={{
//                               textTransform: "none",
//                               borderRadius: 2,
//                               px: 2,
//                               py: 0.5,
//                               fontWeight: 500,
//                               borderColor: "#90caf9",
//                               color: "#1976d2",
//                               "&:hover": {
//                                 borderColor: "#1976d2",
//                                 bgcolor: "rgba(25, 118, 210, 0.04)",
//                               },
//                             }}
//                           >
//                             Details
//                             <ChevronRight sx={{ fontSize: "1rem", ml: 0.5 }} />
//                           </Button> */}
            

//                           <Button
//                             variant="contained"
//                             size="small"
//                             onClick={() => handleApply(job.id, job.recruiterId)}
//                             disabled={hasApplied(job.id)}
//                             sx={{
//                               textTransform: "none",
//                               borderRadius: 2,
//                               px: 2,
//                               py: 0.5,
//                               fontWeight: 600,
//                               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                               bgcolor: hasApplied(job.id) ? "#4caf50" : "#1976d2",
//                               "&:hover": {
//                                 bgcolor: hasApplied(job.id) ? "#43a047" : "#1565c0",
//                                 boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                               },
//                             }}
//                           >
//                             {hasApplied(job.id) ? "Applied" : "Apply Now"}
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
//                   Your Applications
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   startIcon={<Refresh />}
//                   onClick={fetchApplications}
//                   sx={{
//                     textTransform: "none",
//                     borderRadius: 2,
//                     px: 3,
//                     py: 1,
//                     fontWeight: 600,
//                     borderColor: "#90caf9",
//                     color: "#1976d2",
//                     "&:hover": {
//                       borderColor: "#1976d2",
//                       bgcolor: "rgba(25, 118, 210, 0.04)",
//                     },
//                   }}
//                 >
//                   Refresh
//                 </Button>
//               </Box>

//               {applications.length === 0 ? (
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
//                     No applications yet
//                   </Typography>
//                   <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
//                     You haven't applied to any jobs yet. Browse available jobs and submit your first application.
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     onClick={() => setTabValue(0)}
//                     sx={{
//                       textTransform: "none",
//                       borderRadius: 2,
//                       px: 3,
//                       py: 1,
//                       fontWeight: 600,
//                       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                       bgcolor: "#1976d2",
//                       "&:hover": {
//                         bgcolor: "#1565c0",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                       },
//                     }}
//                   >
//                     Browse Jobs
//                   </Button>
//                 </Paper>
//               ) : (
//                 <Grid container spacing={3}>
//                   {applications.map((application) => {
//                     const job = jobs.find((j) => j.id === application.job_id) || {
//                       title: "Unknown Position",
//                       company: "Unknown Company",
//                       location: "Unknown Location",
//                       job_type: "Unknown Type",
//                     }

//                     const getStatusColor = (status) => {
//                       if (!status) return { chip: "#ffa726", bg: "#fff8e1", border: "#ffe082" }

//                       switch (status.toLowerCase()) {
//                         case "rejected":
//                           return { chip: "#e53935", bg: "#ffebee", border: "#ef9a9a" }
//                         case "accepted":
//                           return { chip: "#43a047", bg: "#e8f5e9", border: "#a5d6a7" }
//                         case "interview":
//                           return { chip: "#1e88e5", bg: "#e3f2fd", border: "#90caf9" }
//                         default:
//                           return { chip: "#ffa726", bg: "#fff8e1", border: "#ffe082" }
//                       }
//                     }

//                     const statusColors = getStatusColor(application.status)

//                     return (
//                       <Grid item xs={12} sm={6} lg={4} key={application.job_id}>
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
//                           <Box sx={{ height: 4, bgcolor: statusColors.chip, borderRadius: "3px 3px 0 0" }} />

//                           <CardContent sx={{ flexGrow: 1, pt: 2.5, pb: 1 }}>
//                             <Box
//                               sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}
//                             >
//                               <Typography
//                                 variant="h6"
//                                 component="h2"
//                                 gutterBottom
//                                 sx={{
//                                   fontWeight: 600,
//                                   color: "#1565c0",
//                                   fontSize: "1.1rem",
//                                   lineHeight: 1.3,
//                                   mb: 0.5,
//                                   display: "-webkit-box",
//                                   WebkitLineClamp: 2,
//                                   WebkitBoxOrient: "vertical",
//                                   overflow: "hidden",
//                                   height: 46,
//                                 }}
//                               >
//                                 {job.title}
//                               </Typography>

//                               <IconButton size="small" sx={{ ml: 1, mt: -0.5 }}>
//                                 <MoreVert fontSize="small" />
//                               </IconButton>
//                             </Box>

//                             <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
//                               <BusinessCenter fontSize="small" sx={{ color: "#1976d2", mr: 1, fontSize: "1rem" }} />
//                               <Typography variant="body2" sx={{ fontWeight: 500, color: "#424242" }}>
//                                 {job.company || "Unknown Company"}
//                               </Typography>
//                             </Box>

//                             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//                               {job.location && (
//                                 <Chip
//                                   size="small"
//                                   icon={<LocationOn fontSize="small" />}
//                                   label={job.location}
//                                   sx={{
//                                     bgcolor: "#e3f2fd",
//                                     color: "#1565c0",
//                                     fontWeight: 500,
//                                     fontSize: "0.8rem",
//                                     borderRadius: 1,
//                                     "& .MuiChip-icon": { color: "#1976d2" },
//                                   }}
//                                 />
//                               )}
//                               {job.job_type && (
//                                 <Chip
//                                   size="small"
//                                   icon={<AccessTime fontSize="small" />}
//                                   label={job.job_type}
//                                   sx={{
//                                     bgcolor: "#e3f2fd",
//                                     color: "#1565c0",
//                                     fontWeight: 500,
//                                     fontSize: "0.8rem",
//                                     borderRadius: 1,
//                                     "& .MuiChip-icon": { color: "#1976d2" },
//                                   }}
//                                 />
//                               )}
//                             </Box>

//                             <Box sx={{ mt: 2 }}>
//                               <Chip
//                                 label={
//                                   application.status
//                                     ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
//                                     : "Applied"
//                                 }
//                                 sx={{
//                                   bgcolor: statusColors.bg,
//                                   color: statusColors.chip,
//                                   fontWeight: 600,
//                                   fontSize: "0.9rem",
//                                   px: 1.5,
//                                   py: 2,
//                                   height: 28,
//                                   borderRadius: 1,
//                                 }}
//                               />
//                               <Typography
//                                 variant="body2"
//                                 sx={{ mt: 1.5, fontSize: "0.85rem", color: "text.secondary" }}
//                               >
//                                 Applied on: {new Date(application.created_at || Date.now()).toLocaleDateString()}
//                               </Typography>
//                             </Box>
//                           </CardContent>

//                           <CardActions
//                             sx={{ p: 2, pt: 0, justifyContent: "space-between", borderTop: "1px solid #f0f0f0" }}
//                           >
//                             <Tooltip title="Delete this application">
//                               <Button
//                                 variant="outlined"
//                                 size="small"
//                                 startIcon={<DeleteIcon />}
//                                 onClick={() => handleDelete(application.job_id)}
//                                 sx={{
//                                   textTransform: "none",
//                                   borderRadius: 2,
//                                   px: 2,
//                                   py: 0.5,
//                                   fontWeight: 500,
//                                   borderColor: "#ffcdd2",
//                                   color: "#d32f2f",
//                                   "&:hover": {
//                                     borderColor: "#e57373",
//                                     bgcolor: "rgba(211, 47, 47, 0.04)",
//                                   },
//                                 }}
//                               >
//                                 Delete
//                               </Button>
//                             </Tooltip>

//                             <Tooltip
//                               title={
//                                 application.status && application.status.toLowerCase() === "accepted"
//                                   ? "Chat with the recruiter"
//                                   : "Wait for response from recruiter"
//                               }
//                             >
//                               <span>
//                                 <Button
//                                   variant="outlined"
//                                   size="small"
//                                   startIcon={<ChatIcon />}
//                                   onClick={() =>
//                                     handleChatOpen(
//                                       application.recruiter_id || job.posted_by || "unknown",
//                                       application.recruiter_name || "Recruiter",
//                                       application.job_id,
//                                       job.title,
//                                     )
//                                   }
//                                   disabled={!(application.status && application.status.toLowerCase() === "accepted")}
//                                   sx={{
//                                     textTransform: "none",
//                                     borderRadius: 2,
//                                     px: 2,
//                                     py: 0.5,
//                                     fontWeight: 500,
//                                     borderColor:
//                                       application.status && application.status.toLowerCase() === "accepted"
//                                         ? "#90caf9"
//                                         : "#e0e0e0",
//                                     color:
//                                       application.status && application.status.toLowerCase() === "accepted"
//                                         ? "#1976d2"
//                                         : "#9e9e9e",
//                                     "&:hover": {
//                                       borderColor:
//                                         application.status && application.status.toLowerCase() === "accepted"
//                                           ? "#1976d2"
//                                           : "#e0e0e0",
//                                       bgcolor:
//                                         application.status && application.status.toLowerCase() === "accepted"
//                                           ? "rgba(25, 118, 210, 0.04)"
//                                           : "transparent",
//                                     },
//                                   }}
//                                 >
//                                   Chat
//                                 </Button>
//                               </span>
//                             </Tooltip>
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
//                 Chat with {selectedConversation?.name || "Recruiter"} about {selectedConversation?.jobTitle}
//               </Box>
//               <IconButton onClick={() => setShowChat(false)} sx={{ color: "white" }}>
//                 <Close />
//               </IconButton>
//             </DialogTitle>
//             <DialogContent sx={{ p: 3, bgcolor: "#f5f7fa" }}>
//               {selectedConversation && (
//                 <Message
//                   currentUser={currentUser}
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

// export default CandidateDashboard

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
  Tooltip,
  Badge,
  Container,
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
  Refresh,
  Delete as DeleteIcon,
  Close,
  ChevronRight,
  MoreVert,
  Notifications,
  FilterList,
  KeyboardArrowDown,
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
          navigate("/login")
          return
        }

        const response = await axios.get("http://localhost:5000/api/candidate/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCurrentUser(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Auth verification failed:", error)
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          navigate("/login")
        } else {
          setLoading(false)
        }
      }
    }

    verifyAuth()
  }, [navigate])

  // Fetch available jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:5000/api/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("Fetched jobs in CandidateDashboard:", response.data); // Debug log
        setJobs(response.data)
        setFilteredJobs(response.data)
      } catch (err) {
        console.error("Error fetching jobs:", err)
        if (err.response?.status === 401) {
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          navigate("/login")
        }
      }
    }

    fetchJobs()
  }, [navigate])

  // Fetch user applications
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
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        navigate("/login")
      } else {
        setSnackbar({
          open: true,
          message: "Failed to fetch applications. Please try again.",
          severity: "error",
        })
      }
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [currentUser])

  // Periodically refresh applications to catch status updates
  useEffect(() => {
    if (tabValue === 1 && currentUser?.id) {
      const interval = setInterval(() => {
        fetchApplications()
      }, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [tabValue, currentUser])

  // Filter jobs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredJobs(jobs)
    } else {
      const filtered = jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

      await fetchApplications() // Refresh applications after applying
    } catch (err) {
      console.error("Error applying for job:", err)
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        navigate("/login")
      } else {
        setSnackbar({
          open: true,
          message: err.response?.data?.error || "Failed to apply for the job.",
          severity: "error",
        })
      }
    }
  }

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:5000/api/applications/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Update the applications state by removing the deleted application
      setApplications(applications.filter((app) => app.job_id !== jobId))

      setSnackbar({
        open: true,
        message: "Application deleted successfully!",
        severity: "success",
      })
    } catch (err) {
      console.error("Error deleting application:", err)
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        navigate("/login")
      } else {
        setSnackbar({
          open: true,
          message: err.response?.data?.details || err.response?.data?.error || "Failed to delete the application.",
          severity: "error",
        })
      }
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

  const handleChatOpen = async (recruiterId, recruiterName, jobId, jobTitle) => {
    if (!recruiterId || !currentUser?.id || !jobId) {
      setSnackbar({
        open: true,
        message: "Unable to start chat. Missing required information.",
        severity: "error",
      })
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:5000/api/conversations",
        {
          user1Id: currentUser.id,
          user2Id: recruiterId,
          jobId: jobId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const conversationId = response.data.conversationId

      setSelectedConversation({
        id: conversationId,
        name: recruiterName || "Recruiter",
        receiverId: recruiterId,
        jobTitle: jobTitle || "Job",
      })
      setShowChat(true)
    } catch (err) {
      console.error("Error fetching conversation ID:", err.response?.data || err.message)
      if (err.response?.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        navigate("/login")
      } else {
        setSnackbar({
          open: true,
          message: err.response?.data?.message || "Failed to start chat. Please try again.",
          severity: "error",
        })
      }
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  if (loading) {
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
  }

  const hasApplied = (jobId) => {
    return applications.some((app) => app.job_id === jobId)
  }

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
            width: 70,
            height: 70,
            mb: 2,
            bgcolor: "white",
            color: "#1976d2",
            fontSize: "1.8rem",
            fontWeight: "bold",
            border: "3px solid rgba(255,255,255,0.8)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
          src={currentUser?.profile_photo ? `http://localhost:5000${currentUser.profile_photo}` : undefined}
        >
          {currentUser?.name?.charAt(0) || "C"}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          Candidate Portal
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.9rem" }}>
          {currentUser?.email || "candidate@example.com"}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, py: 1 }}>
        {[
          { text: "Dashboard", icon: <Dashboard />, value: 0 },
          { text: "Browse Jobs", icon: <Work />, value: 0 },
          { text: "Applied Jobs", icon: <Description />, value: 1, badge: applications.length },
          { text: "Edit Profile", icon: <Person />, to: "/candidate/profile/edit" },
        ].map((item, index) => (
          <ListItem
            key={index}
            button
            component={item.to ? Link : "div"}
            to={item.to}
            onClick={
              item.value !== undefined
                ? () => {
                    setTabValue(item.value)
                    if (isMobile) setDrawerOpen(false)
                  }
                : undefined
            }
            selected={item.value !== undefined && tabValue === item.value}
            sx={{
              py: 1.2,
              px: 2,
              borderRadius: "0 24px 24px 0",
              mr: 1,
              mb: 0.5,
              position: "relative",
              "&.Mui-selected": {
                bgcolor: "rgba(25, 118, 210, 0.12)",
                "&:hover": { bgcolor: "rgba(25, 118, 210, 0.18)" },
              },
              "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: item.value === tabValue ? "#1976d2" : "rgba(0, 0, 0, 0.54)" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: item.value === tabValue ? 600 : 500,
                color: item.value === tabValue ? "#1976d2" : "inherit",
              }}
            />
            {item.badge > 0 && (
              <Chip
                size="small"
                label={item.badge}
                sx={{
                  bgcolor: "#1976d2",
                  color: "white",
                  height: 22,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  minWidth: 22,
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
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
        backgroundImage: "url('/images/dashboard-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(245, 247, 250, 0.85)",
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
                <Badge badgeContent={3} color="error">
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
                  src={currentUser?.profile_photo ? `http://localhost:5000${currentUser.profile_photo}` : undefined}
                >
                  {currentUser?.name?.charAt(0) || "C"}
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
              <Box sx={{ display: { xs: "none", sm: "block" } }}>{currentUser?.name || "Profile"}</Box>
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
            {currentUser?.name || "User"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
            {currentUser?.email || "user@example.com"}
          </Typography>
        </Box>

        <MenuItem component={Link} to="/candidate/profile" onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
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
                  label="Available Jobs"
                  icon={<Work />}
                  iconPosition="start"
                  sx={{
                    color: tabValue === 0 ? "#1976d2" : "text.secondary",
                    "&.Mui-selected": { color: "#1976d2" },
                  }}
                />
                <Tab
                  label={`Applied Jobs${applications.length > 0 ? ` (${applications.length})` : ""}`}
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
                  Explore Job Opportunities
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
                  <Tooltip title="Filter Jobs">
                    <IconButton
                      sx={{
                        bgcolor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        "&:hover": { bgcolor: "#f5f5f5" },
                      }}
                    >
                      <FilterList />
                    </IconButton>
                  </Tooltip>
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
                    No jobs found
                  </Typography>
                  <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
                    {searchTerm
                      ? "Try adjusting your search criteria or check back later for new opportunities."
                      : "There are no job postings available at the moment. Please check back later."}
                  </Typography>
                  {searchTerm && (
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
                  )}
                </Paper>
              ) : (
                <Grid container spacing={3}>
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
                            {job.description || "No description available for this position."}
                          </Typography>
                        </CardContent>

                        <CardActions
                          sx={{ p: 2, pt: 0, justifyContent: "space-between", borderTop: "1px solid #f0f0f0" }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleApply(job.id, job.recruiterId)}
                            disabled={hasApplied(job.id)}
                            sx={{
                              textTransform: "none",
                              borderRadius: 2,
                              px: 2,
                              py: 0.5,
                              fontWeight: 600,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              bgcolor: hasApplied(job.id) ? "#4caf50" : "#1976d2",
                              "&:hover": {
                                bgcolor: hasApplied(job.id) ? "#43a047" : "#1565c0",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              },
                            }}
                          >
                            {hasApplied(job.id) ? "Applied" : "Apply Now"}
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
                  Your Applications
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={fetchApplications}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    borderColor: "#90caf9",
                    color: "#1976d2",
                    "&:hover": {
                      borderColor: "#1976d2",
                      bgcolor: "rgba(25, 118, 210, 0.04)",
                    },
                  }}
                >
                  Refresh
                </Button>
              </Box>

              {applications.length === 0 ? (
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
                    No applications yet
                  </Typography>
                  <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
                    You haven't applied to any jobs yet. Browse available jobs and submit your first application.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setTabValue(0)}
                    sx={{
                      textTransform: "none",
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                      fontWeight: 600,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      bgcolor: "#1976d2",
                      "&:hover": {
                        bgcolor: "#1565c0",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                    }}
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

                    const getStatusColor = (status) => {
                      if (!status) return { chip: "#ffa726", bg: "#fff8e1", border: "#ffe082" }

                      switch (status.toLowerCase()) {
                        case "rejected":
                          return { chip: "#e53935", bg: "#ffebee", border: "#ef9a9a" }
                        case "accepted":
                          return { chip: "#43a047", bg: "#e8f5e9", border: "#a5d6a7" }
                        case "interview":
                          return { chip: "#1e88e5", bg: "#e3f2fd", border: "#90caf9" }
                        default:
                          return { chip: "#ffa726", bg: "#fff8e1", border: "#ffe082" }
                      }
                    }

                    const statusColors = getStatusColor(application.status)

                    return (
                      <Grid item xs={12} sm={6} lg={4} key={application.job_id}>
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
                          <Box sx={{ height: 4, bgcolor: statusColors.chip, borderRadius: job.photos && job.photos.length > 0 ? "0" : "3px 3px 0 0" }} />

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

                              <IconButton size="small" sx={{ ml: 1, mt: -0.5 }}>
                                <MoreVert fontSize="small" />
                              </IconButton>
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
                            </Box>

                            <Box sx={{ mt: 2 }}>
                              <Chip
                                label={
                                  application.status
                                    ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
                                    : "Applied"
                                }
                                sx={{
                                  bgcolor: statusColors.bg,
                                  color: statusColors.chip,
                                  fontWeight: 600,
                                  fontSize: "0.9rem",
                                  px: 1.5,
                                  py: 2,
                                  height: 28,
                                  borderRadius: 1,
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{ mt: 1.5, fontSize: "0.85rem", color: "text.secondary" }}
                              >
                                Applied on: {new Date(application.created_at || Date.now()).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </CardContent>

                          <CardActions
                            sx={{ p: 2, pt: 0, justifyContent: "space-between", borderTop: "1px solid #f0f0f0" }}
                          >
                            <Tooltip title="Delete this application">
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDelete(application.job_id)}
                                sx={{
                                  textTransform: "none",
                                  borderRadius: 2,
                                  px: 2,
                                  py: 0.5,
                                  fontWeight: 500,
                                  borderColor: "#ffcdd2",
                                  color: "#d32f2f",
                                  "&:hover": {
                                    borderColor: "#e57373",
                                    bgcolor: "rgba(211, 47, 47, 0.04)",
                                  },
                                }}
                              >
                                Delete
                              </Button>
                            </Tooltip>

                            <Tooltip
                              title={
                                application.status && application.status.toLowerCase() === "accepted"
                                  ? "Chat with the recruiter"
                                  : "Wait for response from recruiter"
                              }
                            >
                              <span>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<ChatIcon />}
                                  onClick={() =>
                                    handleChatOpen(
                                      application.recruiter_id || job.posted_by || "unknown",
                                      application.recruiter_name || "Recruiter",
                                      application.job_id,
                                      job.title,
                                    )
                                  }
                                  disabled={!(application.status && application.status.toLowerCase() === "accepted")}
                                  sx={{
                                    textTransform: "none",
                                    borderRadius: 2,
                                    px: 2,
                                    py: 0.5,
                                    fontWeight: 500,
                                    borderColor:
                                      application.status && application.status.toLowerCase() === "accepted"
                                        ? "#90caf9"
                                        : "#e0e0e0",
                                    color:
                                      application.status && application.status.toLowerCase() === "accepted"
                                        ? "#1976d2"
                                        : "#9e9e9e",
                                    "&:hover": {
                                      borderColor:
                                        application.status && application.status.toLowerCase() === "accepted"
                                          ? "#1976d2"
                                          : "#e0e0e0",
                                      bgcolor:
                                        application.status && application.status.toLowerCase() === "accepted"
                                          ? "rgba(25, 118, 210, 0.04)"
                                          : "transparent",
                                    },
                                  }}
                                >
                                  Chat
                                </Button>
                              </span>
                            </Tooltip>
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
                Chat with {selectedConversation?.name || "Recruiter"} about {selectedConversation?.jobTitle}
              </Box>
              <IconButton onClick={() => setShowChat(false)} sx={{ color: "white" }}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 3, bgcolor: "#f5f7fa" }}>
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

export default CandidateDashboard
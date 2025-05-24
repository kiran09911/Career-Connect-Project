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
// //   Badge,
// //   Container,
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
// //   Close,
// //   ChevronRight,
// //   MoreVert,
// //   Notifications,
// //   FilterList,
// //   KeyboardArrowDown,
// //   Info as InfoIcon,
// //   ContactMail as ContactMailIcon,
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
// //         console.log("Fetched jobs in CandidateDashboard:", response.data); // Debug log
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
// //           job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
// //     if (!recruiterId || !currentUser?.id || !jobId) {
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
// //         },
// //       )

// //       const conversationId = response.data.conversationId

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
// //       <Box
// //         sx={{
// //           display: "flex",
// //           flexDirection: "column",
// //           justifyContent: "center",
// //           alignItems: "center",
// //           height: "100vh",
// //           background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
// //         }}
// //       >
// //         <CircularProgress size={60} sx={{ color: "#1976d2", mb: 3 }} />
// //         <Typography variant="h6" sx={{ color: "#1565c0", fontWeight: 500 }}>
// //           Loading your dashboard...
// //         </Typography>
// //       </Box>
// //     )
// //   }

// //   const hasApplied = (jobId) => {
// //     return applications.some((app) => app.job_id === jobId)
// //   }

// //   const drawerContent = (
// //     <Box sx={{ width: 260, height: "100%", display: "flex", flexDirection: "column" }}>
// //       <Box
// //         sx={{
// //           p: 3,
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           background: "linear-gradient(135deg, #1976d2, #2196f3)",
// //           color: "white",
// //         }}
// //       >
// //         <Avatar
// //           sx={{
// //             width: 70,
// //             height: 70,
// //             mb: 2,
// //             bgcolor: "white",
// //             color: "#1976d2",
// //             fontSize: "1.8rem",
// //             fontWeight: "bold",
// //             border: "3px solid rgba(255,255,255,0.8)",
// //             boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
// //           }}
// //           src={currentUser?.profile_photo ? `http://localhost:5000${currentUser.profile_photo}` : undefined}
// //         >
// //           {currentUser?.name?.charAt(0) || "C"}
// //         </Avatar>
// //         <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
// //           Candidate Portal
// //         </Typography>
// //         <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.9rem" }}>
// //           {currentUser?.email || "candidate@example.com"}
// //         </Typography>
// //       </Box>
// //       <Divider />
// //       <List sx={{ flexGrow: 1, py: 1 }}>
// //         {[
// //           { text: "Dashboard", icon: <Dashboard />, value: 0 },
// //           { text: "Browse Jobs", icon: <Work />, value: 0 },
// //           { text: "Applied Jobs", icon: <Description />, value: 1, badge: applications.length },
// //           { text: "Edit Profile", icon: <Person />, to: "/candidate/profile/edit" },
// //           { text: "Contact Us", icon: <ContactMailIcon />, to: "/candidate/contact" },
// //           { text: "Reset Password", icon: <Settings />, to: "/candidate/resetpassword" },
// //         ].map((item, index) => (
// //           <ListItem
// //             key={index}
// //             button
// //             component={item.to ? Link : "div"}
// //             to={item.to}
// //             onClick={
// //               item.value !== undefined
// //                 ? () => {
// //                     setTabValue(item.value)
// //                     if (isMobile) setDrawerOpen(false)
// //                   }
// //                 : undefined
// //             }
// //             selected={item.value !== undefined && tabValue === item.value}
// //             sx={{
// //               py: 1.2,
// //               px: 2,
// //               borderRadius: "0 24px 24px 0",
// //               mr: 1,
// //               mb: 0.5,
// //               position: "relative",
// //               "&.Mui-selected": {
// //                 bgcolor: "rgba(25, 118, 210, 0.12)",
// //                 "&:hover": { bgcolor: "rgba(25, 118, 210, 0.18)" },
// //               },
// //               "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
// //             }}
// //           >
// //             <ListItemIcon sx={{ minWidth: 40, color: item.value === tabValue ? "#1976d2" : "rgba(0, 0, 0, 0.54)" }}>
// //               {item.icon}
// //             </ListItemIcon>
// //             <ListItemText
// //               primary={item.text}
// //               primaryTypographyProps={{
// //                 fontSize: "0.95rem",
// //                 fontWeight: item.value === tabValue ? 600 : 500,
// //                 color: item.value === tabValue ? "#1976d2" : "inherit",
// //               }}
// //             />
// //             {item.badge > 0 && (
// //               <Chip
// //                 size="small"
// //                 label={item.badge}
// //                 sx={{
// //                   bgcolor: "#1976d2",
// //                   color: "white",
// //                   height: 22,
// //                   fontSize: "0.75rem",
// //                   fontWeight: 600,
// //                   minWidth: 22,
// //                 }}
// //               />
// //             )}
// //           </ListItem>
// //         ))}
// //       </List>
// //       <Divider />
// //       <Box sx={{ p: 2 }}>
// //         <Button
// //           fullWidth
// //           variant="outlined"
// //           color="error"
// //           startIcon={<LogoutIcon />}
// //           onClick={handleLogout}
// //           sx={{
// //             py: 1,
// //             textTransform: "none",
// //             borderRadius: 2,
// //             fontWeight: 500,
// //             borderColor: "rgba(211, 47, 47, 0.5)",
// //             "&:hover": { borderColor: "#d32f2f", bgcolor: "rgba(211, 47, 47, 0.04)" },
// //           }}
// //         >
// //           Logout
// //         </Button>
// //       </Box>
// //     </Box>
// //   )

// //   return (
// //     <Box
// //       sx={{
// //         display: "flex",
// //         minHeight: "100vh",
// //         bgcolor: "#f5f7fa",
// //         backgroundImage: "url('/images/dashboard-bg.png')",
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundAttachment: "fixed",
// //         "&::before": {
// //           content: '""',
// //           position: "fixed",
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           backgroundColor: "rgba(245, 247, 250, 0.85)",
// //           zIndex: -1,
// //         },
// //       }}
// //     >
// //       <AppBar
// //         position="fixed"
// //         sx={{
// //           zIndex: (theme) => theme.zIndex.drawer + 1,
// //           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
// //           background: "linear-gradient(90deg, #1976d2, #2196f3)",
// //         }}
// //       >
// //         <Toolbar sx={{ minHeight: 64 }}>
// //           <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2, display: { md: "none" } }}>
// //             <MenuIcon />
// //           </IconButton>
// //           <BusinessCenter sx={{ mr: 1.5, fontSize: "1.8rem" }} />
// //           <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600, fontSize: "1.25rem" }}>
// //             CareerConnect
// //           </Typography>

// //           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //             <Tooltip title="Notifications">
// //               <IconButton color="inherit" sx={{ mr: 1 }}>
// //                 <Badge badgeContent={3} color="error">
// //                   <Notifications />
// //                 </Badge>
// //               </IconButton>
// //             </Tooltip>

// //             <Button
// //               color="inherit"
// //               onClick={handleProfileMenuOpen}
// //               startIcon={
// //                 <Avatar
// //                   sx={{
// //                     width: 32,
// //                     height: 32,
// //                     bgcolor: "white",
// //                     color: "#1976d2",
// //                     fontSize: "1rem",
// //                     border: "2px solid rgba(255,255,255,0.6)",
// //                   }}
// //                   src={currentUser?.profile_photo ? `http://localhost:5000${currentUser.profile_photo}` : undefined}
// //                 >
// //                   {currentUser?.name?.charAt(0) || "C"}
// //                 </Avatar>
// //               }
// //               endIcon={<KeyboardArrowDown />}
// //               sx={{
// //                 textTransform: "none",
// //                 fontSize: "0.95rem",
// //                 fontWeight: 500,
// //                 borderRadius: 2,
// //                 px: 1.5,
// //                 "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
// //               }}
// //             >
// //               <Box sx={{ display: { xs: "none", sm: "block" } }}>{currentUser?.name || "Profile"}</Box>
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
// //         PaperProps={{
// //           elevation: 3,
// //           sx: {
// //             mt: 1.5,
// //             borderRadius: 2,
// //             minWidth: 200,
// //             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
// //           },
// //         }}
// //       >
// //         <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
// //           <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
// //             {currentUser?.name || "User"}
// //           </Typography>
// //           <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
// //             {currentUser?.email || "user@example.com"}
// //           </Typography>
// //         </Box>

// //         <MenuItem component={Link} to="/candidate/profile" onClick={handleProfileMenuClose} sx={{ py: 1.5 }}>
// //           <ListItemIcon>
// //             <Person fontSize="small" />
// //           </ListItemIcon>
// //           <ListItemText>Profile</ListItemText>
// //         </MenuItem>
// //         <Divider />
// //         <MenuItem
// //           onClick={() => {
// //             handleLogout()
// //             handleProfileMenuClose()
// //           }}
// //           sx={{ py: 1.5, color: "#d32f2f" }}
// //         >
// //           <ListItemIcon sx={{ color: "#d32f2f" }}>
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
// //           width: 260,
// //           flexShrink: 0,
// //           [`& .MuiDrawer-paper`]: {
// //             width: 260,
// //             boxSizing: "border-box",
// //             mt: "64px",
// //             height: "calc(100% - 64px)",
// //             borderRight: "none",
// //             boxShadow: isMobile ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
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
// //           width: { md: `calc(100% - 260px)` },
// //           mt: "64px",
// //           minHeight: "calc(100vh - 64px)",
// //         }}
// //       >
// //         <Container maxWidth="xl" disableGutters>
// //           <Paper
// //             elevation={0}
// //             sx={{
// //               mb: 3,
// //               p: { xs: 2, sm: 3 },
// //               borderRadius: 3,
// //               bgcolor: "white",
// //               boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
// //             }}
// //           >
// //             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
// //               <Tabs
// //                 value={tabValue}
// //                 onChange={handleTabChange}
// //                 variant={isMobile ? "fullWidth" : "standard"}
// //                 sx={{
// //                   "& .MuiTab-root": {
// //                     textTransform: "none",
// //                     fontWeight: 600,
// //                     fontSize: "1rem",
// //                     px: { xs: 2, sm: 3 },
// //                     py: 1.5,
// //                     minHeight: 48,
// //                   },
// //                   "& .MuiTabs-indicator": {
// //                     height: 3,
// //                     borderRadius: "3px 3px 0 0",
// //                     bgcolor: "#1976d2",
// //                   },
// //                 }}
// //               >
// //                 <Tab
// //                   label="Available Jobs"
// //                   icon={<Work />}
// //                   iconPosition="start"
// //                   sx={{
// //                     color: tabValue === 0 ? "#1976d2" : "text.secondary",
// //                     "&.Mui-selected": { color: "#1976d2" },
// //                   }}
// //                 />
// //                 <Tab
// //                   label={`Applied Jobs${applications.length > 0 ? ` (${applications.length})` : ""}`}
// //                   icon={<Description />}
// //                   iconPosition="start"
// //                   sx={{
// //                     color: tabValue === 1 ? "#1976d2" : "text.secondary",
// //                     "&.Mui-selected": { color: "#1976d2" },
// //                   }}
// //                 />
// //               </Tabs>
// //             </Box>
// //           </Paper>

// //           {tabValue === 0 && (
// //             <>
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   flexDirection: { xs: "column", sm: "row" },
// //                   justifyContent: "space-between",
// //                   alignItems: { xs: "stretch", sm: "center" },
// //                   mb: 3,
// //                   gap: 2,
// //                 }}
// //               >
// //                 <Typography variant="h4" sx={{ fontWeight: 700, color: "#1565c0" }}>
// //                   Explore Job Opportunities
// //                 </Typography>

// //                 <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" } }}>
// //                   <TextField
// //                     placeholder="Search jobs..."
// //                     variant="outlined"
// //                     size="small"
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     InputProps={{
// //                       startAdornment: (
// //                         <InputAdornment position="start">
// //                           <Search sx={{ color: "text.secondary" }} />
// //                         </InputAdornment>
// //                       ),
// //                       endAdornment: searchTerm && (
// //                         <InputAdornment position="end">
// //                           <IconButton size="small" onClick={() => setSearchTerm("")}>
// //                             <Close fontSize="small" />
// //                           </IconButton>
// //                         </InputAdornment>
// //                       ),
// //                       sx: {
// //                         borderRadius: 2,
// //                         bgcolor: "white",
// //                         "&:hover .MuiOutlinedInput-notchedOutline": {
// //                           borderColor: "#90caf9",
// //                         },
// //                         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
// //                           borderColor: "#1976d2",
// //                         },
// //                       },
// //                     }}
// //                     sx={{
// //                       width: { xs: "100%", sm: "300px" },
// //                       "& .MuiOutlinedInput-root": {
// //                         "& fieldset": { borderColor: "#e0e0e0" },
// //                       },
// //                     }}
// //                   />
// //                   <Tooltip title="Filter Jobs">
// //                     <IconButton
// //                       sx={{
// //                         bgcolor: "white",
// //                         border: "1px solid #e0e0e0",
// //                         borderRadius: 2,
// //                         "&:hover": { bgcolor: "#f5f5f5" },
// //                       }}
// //                     >
// //                       <FilterList />
// //                     </IconButton>
// //                   </Tooltip>
// //                 </Box>
// //               </Box>

// //               {filteredJobs.length === 0 ? (
// //                 <Paper
// //                   sx={{
// //                     p: 6,
// //                     textAlign: "center",
// //                     borderRadius: 4,
// //                     boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
// //                     bgcolor: "white",
// //                   }}
// //                 >
// //                   <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
// //                     <Avatar sx={{ width: 80, height: 80, bgcolor: "#e3f2fd" }}>
// //                       <Work sx={{ fontSize: 40, color: "#1976d2" }} />
// //                     </Avatar>
// //                   </Box>
// //                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "#1565c0" }}>
// //                     No jobs found
// //                   </Typography>
// //                   <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
// //                     {searchTerm
// //                       ? "Try adjusting your search criteria or check back later for new opportunities."
// //                       : "There are no job postings available at the moment. Please check back later."}
// //                   </Typography>
// //                   {searchTerm && (
// //                     <Button
// //                       variant="outlined"
// //                       onClick={() => setSearchTerm("")}
// //                       sx={{
// //                         textTransform: "none",
// //                         borderRadius: 2,
// //                         px: 3,
// //                         py: 1,
// //                         fontWeight: 600,
// //                         borderColor: "#1976d2",
// //                         color: "#1976d2",
// //                         "&:hover": {
// //                           borderColor: "#1565c0",
// //                           bgcolor: "rgba(25, 118, 210, 0.04)",
// //                         },
// //                       }}
// //                     >
// //                       Clear Search
// //                     </Button>
// //                   )}
// //                 </Paper>
// //               ) : (
// //                 <Grid container spacing={3}>
// //                   {filteredJobs.map((job) => (
// //                     <Grid item xs={12} md={6} key={job.id}>
// //                           <Card
// //                             sx={{
// //                               height: "100%",
// //                               display: "flex",
// //                               flexDirection: "column",
// //                               borderRadius: 3,
// //                               boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// //                               transition: "transform 0.2s, box-shadow 0.2s",
// //                               overflow: "visible",
// //                               position: "relative",
// //                               "&:hover": {
// //                                 transform: "translateY(-4px)",
// //                                 boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
// //                               },
// //                             }}
// //                           >
// //                             {job.photo && (
// //                               <Box sx={{ height: 180, overflow: "hidden", position: "relative", backgroundColor: "#f5f5f5" }}>
// //                                 <img
// //                                   src={`http://localhost:5000${job.photo}`}
// //                                   alt={job.title}
// //                                   style={{
// //                                     width: "100%",
// //                                     maxHeight: "100%",
// //                                     objectFit: "contain",
// //                                     borderRadius: "3px 3px 0 0",
// //                                     transition: "transform 0.3s ease",
// //                                   }}
// //                                   onError={(e) => {
// //                                     e.target.src = "https://via.placeholder.com/180"; // Fallback image
// //                                     console.error("Image failed to load for job:", job.title, job.photo);
// //                                   }}
// //                                 />
// //                               </Box>
// //                             )}
// //                             <Box sx={{ height: 4, bgcolor: "#1976d2", borderRadius: job.photo ? "0" : "3px 3px 0 0" }} />
// //                             <CardContent sx={{ flexGrow: 1, pt: 2.5, pb: 1 }}>
// //                               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
// //                                 <Typography
// //                                   variant="h6"
// //                                   component="h2"
// //                                   gutterBottom
// //                                   sx={{
// //                                     fontWeight: 600,
// //                                     color: "#1565c0",
// //                                     fontSize: "1.1rem",
// //                                     lineHeight: 1.3,
// //                                     mb: 0.5,
// //                                     display: "-webkit-box",
// //                                     WebkitLineClamp: 2,
// //                                     WebkitBoxOrient: "vertical",
// //                                     overflow: "hidden",
// //                                     height: 46,
// //                                   }}
// //                                 >
// //                                   {job.title}
// //                                 </Typography>
                             
// //                               </Box>
// //                               <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
// //                                 <BusinessCenter fontSize="small" sx={{ color: "#1976d2", mr: 1, fontSize: "1rem" }} />
// //                                 <Typography variant="body2" sx={{ fontWeight: 500, color: "#424242" }}>
// //                                   {job.company || "Unknown Company"}
// //                                 </Typography>
// //                               </Box>
// //                           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
// //                             {job.location && (
// //                               <Chip
// //                                 size="small"
// //                                 icon={<LocationOn fontSize="small" />}
// //                                 label={job.location}
// //                                 sx={{
// //                                   bgcolor: "#e3f2fd",
// //                                   color: "#1565c0",
// //                                   fontWeight: 500,
// //                                   fontSize: "0.8rem",
// //                                   borderRadius: 1,
// //                                   "& .MuiChip-icon": { color: "#1976d2" },
// //                                 }}
// //                               />
// //                             )}
// //                             {job.salary && (
// //                               <Chip
// //                                 size="small"
// //                                 icon={<AttachMoney fontSize="small" />}
// //                                 label={job.salary}
// //                                 sx={{
// //                                   bgcolor: "#e3f2fd",
// //                                   color: "#1565c0",
// //                                   fontWeight: 500,
// //                                   fontSize: "0.8rem",
// //                                   borderRadius: 1,
// //                                   "& .MuiChip-icon": { color: "#1976d2" },
// //                                 }}
// //                               />
// //                             )}
// //                             {job.job_type && (
// //                               <Chip
// //                                 size="small"
// //                                 icon={<AccessTime fontSize="small" />}
// //                                 label={job.job_type}
// //                                 sx={{
// //                                   bgcolor: "#e3f2fd",
// //                                   color: "#1565c0",
// //                                   fontWeight: 500,
// //                                   fontSize: "0.8rem",
// //                                   borderRadius: 1,
// //                                   "& .MuiChip-icon": { color: "#1976d2" },
// //                                 }}
// //                               />
// //                             )}
// //                           </Box>

// //                           <Typography
// //                             variant="body2"
// //                             color="text.secondary"
// //                             sx={{
// //                               lineHeight: 1.6,
// //                               display: "-webkit-box",
// //                               WebkitLineClamp: 3,
// //                               WebkitBoxOrient: "vertical",
// //                               overflow: "hidden",
// //                               height: 60,
// //                               mb: 1,
// //                             }}
// //                           >
// //                             {job.description || "No description available for this position."}
// //                           </Typography>
// //                         </CardContent>

// //                         <CardActions
// //                           sx={{ p: 2, pt: 0, justifyContent: "space-between", borderTop: "1px solid #f0f0f0" }}
// //                         >
// //                           <Button
// //                             variant="contained"
// //                             size="small"
// //                             onClick={() => handleApply(job.id, job.recruiterId)}
// //                             disabled={hasApplied(job.id)}
// //                             sx={{
// //                               textTransform: "none",
// //                               borderRadius: 2,
// //                               px: 2,
// //                               py: 0.5,
// //                               fontWeight: 600,
// //                               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //                               bgcolor: hasApplied(job.id) ? "#4caf50" : "#1976d2",
// //                               "&:hover": {
// //                                 bgcolor: hasApplied(job.id) ? "#43a047" : "#1565c0",
// //                                 boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
// //                               },
// //                             }}
// //                           >
// //                             {hasApplied(job.id) ? "Applied" : "Apply Now"}
// //                           </Button>
// //                         </CardActions>
// //                       </Card>
// //                     </Grid>
// //                   ))}
// //                 </Grid>
// //               )}
// //             </>
// //           )}

// //           {tabValue === 1 && (
// //             <>
// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   flexDirection: { xs: "column", sm: "row" },
// //                   justifyContent: "space-between",
// //                   alignItems: { xs: "stretch", sm: "center" },
// //                   mb: 3,
// //                   gap: 2,
// //                 }}
// //               >
// //                 <Typography variant="h4" sx={{ fontWeight: 700, color: "#1565c0" }}>
// //                   Your Applications
// //                 </Typography>
// //                 <Button
// //                   variant="outlined"
// //                   startIcon={<Refresh />}
// //                   onClick={fetchApplications}
// //                   sx={{
// //                     textTransform: "none",
// //                     borderRadius: 2,
// //                     px: 3,
// //                     py: 1,
// //                     fontWeight: 600,
// //                     borderColor: "#90caf9",
// //                     color: "#1976d2",
// //                     "&:hover": {
// //                       borderColor: "#1976d2",
// //                       bgcolor: "rgba(25, 118, 210, 0.04)",
// //                     },
// //                   }}
// //                 >
// //                   Refresh
// //                 </Button>
// //               </Box>

// //               {applications.length === 0 ? (
// //                 <Paper
// //                   sx={{
// //                     p: 6,
// //                     textAlign: "center",
// //                     borderRadius: 4,
// //                     boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
// //                     bgcolor: "white",
// //                   }}
// //                 >
// //                   <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
// //                     <Avatar sx={{ width: 80, height: 80, bgcolor: "#e3f2fd" }}>
// //                       <Description sx={{ fontSize: 40, color: "#1976d2" }} />
// //                     </Avatar>
// //                   </Box>
// //                   <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "#1565c0" }}>
// //                     No applications yet
// //                   </Typography>
// //                   <Typography color="text.secondary" paragraph sx={{ mb: 3, maxWidth: 500, mx: "auto" }}>
// //                     You haven't applied to any jobs yet. Browse available jobs and submit your first application.
// //                   </Typography>
// //                   <Button
// //                     variant="contained"
// //                     onClick={() => setTabValue(0)}
// //                     sx={{
// //                       textTransform: "none",
// //                       borderRadius: 2,
// //                       px: 3,
// //                       py: 1,
// //                       fontWeight: 600,
// //                       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// //                       bgcolor: "#1976d2",
// //                       "&:hover": {
// //                         bgcolor: "#1565c0",
// //                         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
// //                       },
// //                     }}
// //                   >
// //                     Browse Jobs
// //                   </Button>
// //                 </Paper>
// //               ) : (
// //                 <Grid container spacing={3}>
// //                   {applications.map((application) => {
// //                     const job = jobs.find((j) => j.id === application.job_id) || {
// //                       title: "Unknown Position",
// //                       company: "Unknown Company",
// //                       location: "Unknown Location",
// //                       job_type: "Unknown Type",
// //                     }

// //                     const getStatusColor = (status) => {
// //                       if (!status) return { chip: "#ffa726", bg: "#fff8e1", border: "#ffe082" }

// //                       switch (status.toLowerCase()) {
// //                         case "rejected":
// //                           return { chip: "#e53935", bg: "#ffebee", border: "#ef9a9a" }
// //                         case "accepted":
// //                           return { chip: "#43a047", bg: "#e8f5e9", border: "#a5d6a7" }
// //                         case "interview":
// //                           return { chip: "#1e88e5", bg: "#e3f2fd", border: "#90caf9" }
// //                         default:
// //                           return { chip: "#ffa726", bg: "#fff8e1", border: "#ffe082" }
// //                       }
// //                     }

// //                     const statusColors = getStatusColor(application.status)

// //                     return (
// //                       <Grid item xs={12} sm={6} lg={4} key={application.job_id}>
// //                         <Card
// //                           sx={{
// //                             height: "100%",
// //                             display: "flex",
// //                             flexDirection: "column",
// //                             borderRadius: 3,
// //                             boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// //                             transition: "transform 0.2s, box-shadow 0.2s",
// //                             overflow: "visible",
// //                             position: "relative",
// //                             "&:hover": {
// //                               transform: "translateY(-4px)",
// //                               boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
// //                             },
// //                           }}
// //                         >
// //                           {job.photo && (
// //                               <Box sx={{ height: 180, overflow: "hidden", position: "relative", backgroundColor: "#f5f5f5" }}>
// //                                 <img
// //                                   src={`http://localhost:5000${job.photo}`}
// //                                   alt={job.title}
// //                                   style={{
// //                                     width: "100%",
// //                                     maxHeight: "100%",
// //                                     objectFit: "contain",
// //                                     borderRadius: "3px 3px 0 0",
// //                                     transition: "transform 0.3s ease",
// //                                   }}
// //                                   onError={(e) => {
// //                                     e.target.src = "https://via.placeholder.com/180"; // Fallback image
// //                                     console.error("Image failed to load for job:", job.title, job.photo);
// //                                   }}
// //                                 />
// //                               </Box>
// //                           )}
// //                           <Box sx={{ height: 4, bgcolor: statusColors.chip, borderRadius: job.photos && job.photos.length > 0 ? "0" : "3px 3px 0 0" }} />

// //                           <CardContent sx={{ flexGrow: 1, pt: 2.5, pb: 1 }}>
// //                             <Box
// //                               sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}
// //                             >
// //                               <Typography
// //                                 variant="h6"
// //                                 component="h2"
// //                                 gutterBottom
// //                                 sx={{
// //                                   fontWeight: 600,
// //                                   color: "#1565c0",
// //                                   fontSize: "1.1rem",
// //                                   lineHeight: 1.3,
// //                                   mb: 0.5,
// //                                   display: "-webkit-box",
// //                                   WebkitLineClamp: 2,
// //                                   WebkitBoxOrient: "vertical",
// //                                   overflow: "hidden",
// //                                   height: 46,
// //                                 }}
// //                               >
// //                                 {job.title}
// //                               </Typography>

// //                               <IconButton size="small" sx={{ ml: 1, mt: -0.5 }}>
// //                                 <MoreVert fontSize="small" />
// //                               </IconButton>
// //                             </Box>

// //                             <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
// //                               <BusinessCenter fontSize="small" sx={{ color: "#1976d2", mr: 1, fontSize: "1rem" }} />
// //                               <Typography variant="body2" sx={{ fontWeight: 500, color: "#424242" }}>
// //                                 {job.company || "Unknown Company"}
// //                               </Typography>
// //                             </Box>

// //                             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
// //                               {job.location && (
// //                                 <Chip
// //                                   size="small"
// //                                   icon={<LocationOn fontSize="small" />}
// //                                   label={job.location}
// //                                   sx={{
// //                                     bgcolor: "#e3f2fd",
// //                                     color: "#1565c0",
// //                                     fontWeight: 500,
// //                                     fontSize: "0.8rem",
// //                                     borderRadius: 1,
// //                                     "& .MuiChip-icon": { color: "#1976d2" },
// //                                   }}
// //                                 />
// //                               )}
// //                               {job.job_type && (
// //                                 <Chip
// //                                   size="small"
// //                                   icon={<AccessTime fontSize="small" />}
// //                                   label={job.job_type}
// //                                   sx={{
// //                                     bgcolor: "#e3f2fd",
// //                                     color: "#1565c0",
// //                                     fontWeight: 500,
// //                                     fontSize: "0.8rem",
// //                                     borderRadius: 1,
// //                                     "& .MuiChip-icon": { color: "#1976d2" },
// //                                   }}
// //                                 />
// //                               )}
// //                             </Box>

// //                             <Box sx={{ mt: 2 }}>
// //                               <Chip
// //                                 label={
// //                                   application.status
// //                                     ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
// //                                     : "Applied"
// //                                 }
// //                                 sx={{
// //                                   bgcolor: statusColors.bg,
// //                                   color: statusColors.chip,
// //                                   fontWeight: 600,
// //                                   fontSize: "0.9rem",
// //                                   px: 1.5,
// //                                   py: 2,
// //                                   height: 28,
// //                                   borderRadius: 1,
// //                                 }}
// //                               />
// //                               <Typography
// //                                 variant="body2"
// //                                 sx={{ mt: 1.5, fontSize: "0.85rem", color: "text.secondary" }}
// //                               >
// //                                 Applied on: {new Date(application.created_at || Date.now()).toLocaleDateString()}
// //                               </Typography>
// //                             </Box>
// //                           </CardContent>

// //                           <CardActions
// //                             sx={{ p: 2, pt: 0, justifyContent: "space-between", borderTop: "1px solid #f0f0f0" }}
// //                           >
// //                             <Tooltip title="Delete this application">
// //                               <Button
// //                                 variant="outlined"
// //                                 size="small"
// //                                 startIcon={<DeleteIcon />}
// //                                 onClick={() => handleDelete(application.job_id)}
// //                                 sx={{
// //                                   textTransform: "none",
// //                                   borderRadius: 2,
// //                                   px: 2,
// //                                   py: 0.5,
// //                                   fontWeight: 500,
// //                                   borderColor: "#ffcdd2",
// //                                   color: "#d32f2f",
// //                                   "&:hover": {
// //                                     borderColor: "#e57373",
// //                                     bgcolor: "rgba(211, 47, 47, 0.04)",
// //                                   },
// //                                 }}
// //                               >
// //                                 Delete
// //                               </Button>
// //                             </Tooltip>

// //                             <Tooltip
// //                               title={
// //                                 application.status && application.status.toLowerCase() === "accepted"
// //                                   ? "Chat with the recruiter"
// //                                   : "Wait for response from recruiter"
// //                               }
// //                             >
// //                               <span>
// //                                 <Button
// //                                   variant="outlined"
// //                                   size="small"
// //                                   startIcon={<ChatIcon />}
// //                                   onClick={() =>
// //                                     handleChatOpen(
// //                                       application.recruiter_id || job.posted_by || "unknown",
// //                                       application.recruiter_name || "Recruiter",
// //                                       application.job_id,
// //                                       job.title,
// //                                     )
// //                                   }
// //                                   disabled={!(application.status && application.status.toLowerCase() === "accepted")}
// //                                   sx={{
// //                                     textTransform: "none",
// //                                     borderRadius: 2,
// //                                     px: 2,
// //                                     py: 0.5,
// //                                     fontWeight: 500,
// //                                     borderColor:
// //                                       application.status && application.status.toLowerCase() === "accepted"
// //                                         ? "#90caf9"
// //                                         : "#e0e0e0",
// //                                     color:
// //                                       application.status && application.status.toLowerCase() === "accepted"
// //                                         ? "#1976d2"
// //                                         : "#9e9e9e",
// //                                     "&:hover": {
// //                                       borderColor:
// //                                         application.status && application.status.toLowerCase() === "accepted"
// //                                           ? "#1976d2"
// //                                           : "#e0e0e0",
// //                                       bgcolor:
// //                                         application.status && application.status.toLowerCase() === "accepted"
// //                                           ? "rgba(25, 118, 210, 0.04)"
// //                                           : "transparent",
// //                                     },
// //                                   }}
// //                                 >
// //                                   Chat
// //                                 </Button>
// //                               </span>
// //                             </Tooltip>
// //                           </CardActions>
// //                         </Card>
// //                       </Grid>
// //                     )
// //                   })}
// //                 </Grid>
// //               )}
// //             </>
// //           )}

// //           <Dialog
// //             open={showChat}
// //             onClose={() => setShowChat(false)}
// //             fullWidth
// //             maxWidth="md"
// //             PaperProps={{
// //               sx: {
// //                 borderRadius: 3,
// //                 boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
// //               },
// //             }}
// //           >
// //             <DialogTitle
// //               sx={{
// //                 bgcolor: "#1976d2",
// //                 color: "white",
// //                 py: 2,
// //                 fontWeight: 600,
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <Box>
// //                 Chat with {selectedConversation?.name || "Recruiter"} about {selectedConversation?.jobTitle}
// //               </Box>
// //               <IconButton onClick={() => setShowChat(false)} sx={{ color: "white" }}>
// //                 <Close />
// //               </IconButton>
// //             </DialogTitle>
// //             <DialogContent sx={{ p: 3, bgcolor: "#f5f7fa" }}>
// //               {selectedConversation && (
// //                 <Message
// //                   currentUser={currentUser}
// //                   conversationId={selectedConversation.id}
// //                   receiverId={selectedConversation.receiverId}
// //                   receiverName={selectedConversation.name}
// //                 />
// //               )}
// //             </DialogContent>
// //           </Dialog>

// //           <Snackbar
// //             open={snackbar.open}
// //             autoHideDuration={6000}
// //             onClose={() => setSnackbar({ ...snackbar, open: false })}
// //             anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //           >
// //             <Alert
// //               severity={snackbar.severity}
// //               onClose={() => setSnackbar({ ...snackbar, open: false })}
// //               variant="filled"
// //               sx={{ width: "100%", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
// //             >
// //               {snackbar.message}
// //             </Alert>
// //           </Snackbar>
// //         </Container>
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
//   Popover,
//   ListItemAvatar,
//   Fade,
//   ListItemButton,
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
//   MoreVert,
//   Notifications,
//   FilterList,
//   KeyboardArrowDown,
//   Info as InfoIcon,
//   ContactMail as ContactMailIcon,
//   CheckCircle,
//   Cancel,
//   Schedule,
//   MarkEmailRead,
//   Clear,
//   NotificationsActive,
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

//   // Enhanced Notification states
//   const [notifications, setNotifications] = useState([])
//   const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)
//   const [unreadCount, setUnreadCount] = useState(0)
//   const [notificationLoading, setNotificationLoading] = useState(false)

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
//         console.log("Fetched jobs in CandidateDashboard:", response.data)
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

//   // Enhanced notification fetching with better persistence
//   const fetchNotifications = async () => {
//     if (!currentUser?.id) return

//     try {
//       setNotificationLoading(true)
//       const token = localStorage.getItem("token")

//       // Try to fetch from backend first
//       let backendNotifications = []
//       try {
//         const response = await axios.get("http://localhost:5000/api/notifications/candidate", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         backendNotifications = response.data || []
//       } catch (err) {
//         console.log("Backend notifications not available, using local storage")
//       }

//       // Get stored notifications from localStorage
//       const storedNotifications = JSON.parse(localStorage.getItem(`notifications_${currentUser.id}`) || "[]")
//       const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")
//       const clearedNotifications = JSON.parse(localStorage.getItem(`clearedNotifications_${currentUser.id}`) || "[]")

//       // Combine backend and stored notifications, removing duplicates
//       const allNotifications = [...backendNotifications, ...storedNotifications]
//       const uniqueNotifications = allNotifications.filter(
//         (notification, index, self) => index === self.findIndex((n) => n.id === notification.id),
//       )

//       // Filter out cleared notifications and update read status
//       const validNotifications = uniqueNotifications
//         .filter((notification) => !clearedNotifications.includes(notification.id))
//         .map((notification) => ({
//           ...notification,
//           read: readNotifications.includes(notification.id),
//         }))
//         .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

//       setNotifications(validNotifications)
//       setUnreadCount(validNotifications.filter((n) => !n.read).length)
//     } catch (err) {
//       console.error("Error fetching notifications:", err)
//     } finally {
//       setNotificationLoading(false)
//     }
//   }

//   // Enhanced application fetching with status change detection
//   const fetchApplications = async () => {
//     if (!currentUser?.id) return

//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.get("http://localhost:5000/api/applications/candidate", {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       const newApplications = response.data

//       // Get previous applications to detect status changes
//       const previousApplications = JSON.parse(localStorage.getItem(`previousApplications_${currentUser.id}`) || "[]")

//       // Store current applications for next comparison
//       localStorage.setItem(`previousApplications_${currentUser.id}`, JSON.stringify(newApplications))

//       setApplications(newApplications)

//       // Check for status changes and create notifications
//       await createNotificationsFromStatusChanges(newApplications, previousApplications)
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

//   // Create notifications from application status changes
//   const createNotificationsFromStatusChanges = async (currentApplications, previousApplications) => {
//     if (!currentUser?.id) return

//     const clearedNotifications = JSON.parse(localStorage.getItem(`clearedNotifications_${currentUser.id}`) || "[]")
//     const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")
//     const existingNotifications = JSON.parse(localStorage.getItem(`notifications_${currentUser.id}`) || "[]")

//     const newNotifications = []

//     currentApplications.forEach((currentApp) => {
//       const previousApp = previousApplications.find((prev) => prev.job_id === currentApp.job_id)
//       const job = jobs.find((j) => j.id === currentApp.job_id)

//       // Check if status changed or if it's a new application with non-pending status
//       const statusChanged = previousApp && previousApp.status !== currentApp.status
//       const newAcceptedApp = !previousApp && currentApp.status && currentApp.status.toLowerCase() !== "pending"

//       if ((statusChanged || newAcceptedApp) && currentApp.status && currentApp.status.toLowerCase() !== "pending") {
//         const notificationId = `status-${currentApp.job_id}-${currentApp.status}-${Date.now()}`

//         // Check if we already have a similar notification
//         const existingSimilar = existingNotifications.find(
//           (n) => n.job_id === currentApp.job_id && n.status === currentApp.status,
//         )

//         // Only create if not cleared and doesn't exist
//         if (!clearedNotifications.includes(notificationId) && !existingSimilar) {
//           const notification = {
//             id: notificationId,
//             job_id: currentApp.job_id,
//             type: "status_change",
//             title: `Application ${currentApp.status.charAt(0).toUpperCase() + currentApp.status.slice(1)}`,
//             message: `Your application for "${job?.title || "Unknown Position"}" has been ${currentApp.status.toLowerCase()}.`,
//             status: currentApp.status,
//             job_title: job?.title || "Unknown Position",
//             company: job?.company || "Unknown Company",
//             created_at: new Date().toISOString(),
//             read: false,
//           }

//           newNotifications.push(notification)

//           // Show snackbar for status changes
//           if (statusChanged) {
//             setSnackbar({
//               open: true,
//               message: notification.message,
//               severity:
//                 currentApp.status.toLowerCase() === "accepted"
//                   ? "success"
//                   : currentApp.status.toLowerCase() === "rejected"
//                     ? "error"
//                     : "info",
//             })
//           }
//         }
//       }
//     })

//     // Update stored notifications if we have new ones
//     if (newNotifications.length > 0) {
//       const updatedStoredNotifications = [...newNotifications, ...existingNotifications]
//       localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(updatedStoredNotifications))

//       // Update state
//       setNotifications((prev) => {
//         const combined = [...newNotifications, ...prev]
//         return combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//       })

//       setUnreadCount((prev) => prev + newNotifications.length)
//     }
//   }

//   // Create notification when applying to a job
//   const createApplicationNotification = async (jobId, jobTitle, company) => {
//     if (!currentUser?.id) return

//     try {
//       const notificationId = `application-${jobId}-${Date.now()}`
//       const notification = {
//         id: notificationId,
//         job_id: jobId,
//         type: "application_submitted",
//         title: "Application Submitted",
//         message: `Your application for "${jobTitle}" at ${company} has been submitted successfully.`,
//         status: "submitted",
//         job_title: jobTitle,
//         company: company,
//         created_at: new Date().toISOString(),
//         read: false,
//       }

//       // Add to stored notifications
//       const existingNotifications = JSON.parse(localStorage.getItem(`notifications_${currentUser.id}`) || "[]")
//       const updatedNotifications = [notification, ...existingNotifications]
//       localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(updatedNotifications))

//       // Update state
//       setNotifications((prev) => [notification, ...prev])
//       setUnreadCount((prev) => prev + 1)

//       // Try to send to backend
//       const token = localStorage.getItem("token")
//       try {
//         await axios.post(
//           "http://localhost:5000/api/notifications",
//           {
//             candidateId: currentUser.id,
//             jobId: jobId,
//             type: "application_submitted",
//             title: notification.title,
//             message: notification.message,
//           },
//           { headers: { Authorization: `Bearer ${token}` } },
//         )
//       } catch (err) {
//         console.log("Backend notification creation failed (non-critical):", err)
//       }
//     } catch (err) {
//       console.error("Error creating application notification:", err)
//     }
//   }

//   // Initialize notifications from localStorage on component mount
//   useEffect(() => {
//     if (currentUser?.id) {
//       // Load stored notifications immediately
//       const storedNotifications = JSON.parse(localStorage.getItem(`notifications_${currentUser.id}`) || "[]")
//       const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")
//       const clearedNotifications = JSON.parse(localStorage.getItem(`clearedNotifications_${currentUser.id}`) || "[]")

//       // Filter out cleared notifications and update read status
//       const validNotifications = storedNotifications
//         .filter((notification) => !clearedNotifications.includes(notification.id))
//         .map((notification) => ({
//           ...notification,
//           read: readNotifications.includes(notification.id),
//         }))
//         .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

//       if (validNotifications.length > 0) {
//         setNotifications(validNotifications)
//         setUnreadCount(validNotifications.filter((n) => !n.read).length)
//       } else {
//         // Add welcome notification for new users
//         const welcomeNotification = {
//           id: "welcome-" + Date.now(),
//           job_id: "welcome",
//           type: "welcome",
//           title: "Welcome to CareerConnect!",
//           message: "Start browsing jobs and applying to positions that match your skills.",
//           status: "info",
//           job_title: "Welcome",
//           company: "CareerConnect",
//           created_at: new Date().toISOString(),
//           read: false,
//         }

//         setNotifications([welcomeNotification])
//         setUnreadCount(1)
//         localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify([welcomeNotification]))
//       }

//       // Then fetch from backend and applications
//       fetchApplications()
//       fetchNotifications()
//     }
//   }, [currentUser?.id])

//   // Periodically refresh applications and notifications
//   useEffect(() => {
//     if (currentUser?.id) {
//       const interval = setInterval(() => {
//         fetchApplications()
//         fetchNotifications()
//       }, 30000) // Refresh every 30 seconds
//       return () => clearInterval(interval)
//     }
//   }, [currentUser, jobs])

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

//   // Enhanced apply handler with notification
//   const handleApply = async (jobId, recruiterId) => {
//     try {
//       const token = localStorage.getItem("token")
//       await axios.post(
//         "http://localhost:5000/api/applications",
//         { jobId, recruiterId },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       // Find the job details for notification
//       const job = jobs.find((j) => j.id === jobId)

//       // Create application notification
//       await createApplicationNotification(jobId, job?.title || "Unknown Position", job?.company || "Unknown Company")

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

//   // Enhanced notification handlers
//   const handleNotificationClick = (event) => {
//     setNotificationAnchorEl(event.currentTarget)
//   }

//   const handleNotificationClose = () => {
//     setNotificationAnchorEl(null)
//   }

//   // Enhanced mark notification as read
//   const markNotificationAsRead = async (notificationId) => {
//     try {
//       setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
//       setUnreadCount((prev) => Math.max(0, prev - 1))

//       // Store read notification IDs
//       const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")
//       if (!readNotifications.includes(notificationId)) {
//         readNotifications.push(notificationId)
//         localStorage.setItem(`readNotifications_${currentUser.id}`, JSON.stringify(readNotifications))
//       }

//       // Try to update backend
//       const token = localStorage.getItem("token")
//       try {
//         await axios.put(
//           `http://localhost:5000/api/notifications/${notificationId}/read`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } },
//         )
//       } catch (err) {
//         console.log("Backend notification read update failed (non-critical):", err)
//       }
//     } catch (err) {
//       console.error("Error marking notification as read:", err)
//     }
//   }

//   // Enhanced clear all notifications
//   const clearAllNotifications = () => {
//     if (notifications.length === 0) return

//     // Store cleared notification IDs
//     const clearedIds = notifications.map((n) => n.id)
//     const existingClearedNotifications = JSON.parse(
//       localStorage.getItem(`clearedNotifications_${currentUser.id}`) || "[]",
//     )
//     const updatedClearedNotifications = [...new Set([...existingClearedNotifications, ...clearedIds])]
//     localStorage.setItem(`clearedNotifications_${currentUser.id}`, JSON.stringify(updatedClearedNotifications))

//     // Clear from stored notifications
//     localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify([]))

//     // Clear state
//     setNotifications([])
//     setUnreadCount(0)

//     setSnackbar({
//       open: true,
//       message: "All notifications cleared",
//       severity: "info",
//     })
//   }

//   const getNotificationIcon = (type, status) => {
//     if (type === "status_change") {
//       switch (status?.toLowerCase()) {
//         case "accepted":
//           return <CheckCircle sx={{ color: "#4caf50", fontSize: "1.2rem" }} />
//         case "rejected":
//           return <Cancel sx={{ color: "#f44336", fontSize: "1.2rem" }} />
//         case "interview":
//           return <Schedule sx={{ color: "#2196f3", fontSize: "1.2rem" }} />
//         default:
//           return <InfoIcon sx={{ color: "#ff9800", fontSize: "1.2rem" }} />
//       }
//     } else if (type === "application_submitted") {
//       return <CheckCircle sx={{ color: "#4caf50", fontSize: "1.2rem" }} />
//     } else if (type === "welcome") {
//       return <NotificationsActive sx={{ color: "#2196f3", fontSize: "1.2rem" }} />
//     }
//     return <InfoIcon sx={{ color: "#2196f3", fontSize: "1.2rem" }} />
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
//           // { text: "Browse Jobs", icon: <Work />, value: 0 },
//           { text: "Applied Jobs", icon: <Description />, value: 1, badge: applications.length },
//           { text: "Edit Profile", icon: <Person />, to: "/candidate/profile/edit" },
//           { text: "Contact Us", icon: <ContactMailIcon />, to: "/candidate/contact" },
//           { text: "OCR Upload", icon: <Description />, to: "/candidate/ocr" },
//           { text: "Reset Password", icon: <Settings />, to: "/candidate/resetpassword" },
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
//             {/* Enhanced Notifications */}
//             <Tooltip title="Notifications">
//               <IconButton color="inherit" sx={{ mr: 1 }} onClick={handleNotificationClick}>
//                 <Badge
//                   badgeContent={unreadCount}
//                   color="error"
//                   sx={{
//                     "& .MuiBadge-badge": {
//                       fontSize: "0.75rem",
//                       minWidth: "18px",
//                       height: "18px",
//                     },
//                   }}
//                 >
//                   {unreadCount > 0 ? <NotificationsActive /> : <Notifications />}
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

//       {/* Enhanced Notifications Popover */}
//       <Popover
//         open={Boolean(notificationAnchorEl)}
//         anchorEl={notificationAnchorEl}
//         onClose={handleNotificationClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         PaperProps={{
//           sx: {
//             width: 420,
//             maxHeight: 600,
//             mt: 1,
//             borderRadius: 3,
//             boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
//             border: "1px solid rgba(0,0,0,0.05)",
//           },
//         }}
//       >
//         <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0", bgcolor: "#f8f9fa" }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//             <Typography variant="h6" sx={{ fontWeight: 700, color: "#1565c0" }}>
//               Notifications
//             </Typography>
//             <Box sx={{ display: "flex", gap: 1 }}>
//               {unreadCount > 0 && (
//                 <Tooltip title="Mark all as read">
//                   <IconButton size="small" onClick={markAllNotificationsAsRead} sx={{ color: "#1976d2" }}>
//                     <MarkEmailRead fontSize="small" />
//                   </IconButton>
//                 </Tooltip>
//               )}
//               <Tooltip title="Clear all">
//                 <IconButton size="small" onClick={clearAllNotifications} sx={{ color: "#666" }}>
//                   <Clear fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="Refresh">
//                 <IconButton
//                   size="small"
//                   onClick={fetchNotifications}
//                   disabled={notificationLoading}
//                   sx={{ color: "#666" }}
//                 >
//                   <Refresh fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </Box>
//           {unreadCount > 0 && (
//             <Typography variant="body2" sx={{ color: "#666", fontSize: "0.875rem" }}>
//               You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
//             </Typography>
//           )}
//         </Box>

//         <Box sx={{ maxHeight: 500, overflow: "auto" }}>
//           {notificationLoading ? (
//             <Box sx={{ p: 4, textAlign: "center" }}>
//               <CircularProgress size={32} sx={{ color: "#1976d2" }} />
//               <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
//                 Loading notifications...
//               </Typography>
//             </Box>
//           ) : notifications.length === 0 ? (
//             <Box sx={{ p: 6, textAlign: "center" }}>
//               <Notifications sx={{ fontSize: 56, color: "#e0e0e0", mb: 2 }} />
//               <Typography variant="h6" sx={{ color: "#666", mb: 1 }}>
//                 No notifications yet
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 You'll see updates about your applications here
//               </Typography>
//             </Box>
//           ) : (
//             <List sx={{ p: 0 }}>
//               {notifications.map((notification, index) => (
//                 <Fade in={true} timeout={300 + index * 50} key={notification.id}>
//                   <ListItemButton
//                     sx={{
//                       borderBottom: index < notifications.length - 1 ? "1px solid #f0f0f0" : "none",
//                       bgcolor: notification.read ? "transparent" : "rgba(25, 118, 210, 0.04)",
//                       "&:hover": {
//                         bgcolor: notification.read ? "#f8f9fa" : "rgba(25, 118, 210, 0.08)",
//                       },
//                       py: 2,
//                       px: 3,
//                     }}
//                     onClick={() => !notification.read && markNotificationAsRead(notification.id)}
//                   >
//                     <ListItemAvatar>
//                       <Avatar sx={{ bgcolor: "transparent", width: 40, height: 40 }}>
//                         {getNotificationIcon(notification.type, notification.status)}
//                       </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={
//                         <Box
//                           sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}
//                         >
//                           <Typography
//                             variant="subtitle1"
//                             sx={{
//                               fontWeight: notification.read ? 500 : 700,
//                               color: notification.read ? "text.primary" : "#1565c0",
//                               fontSize: "0.95rem",
//                             }}
//                           >
//                             {notification.title}
//                           </Typography>
//                           {!notification.read && (
//                             <Box
//                               sx={{
//                                 width: 8,
//                                 height: 8,
//                                 borderRadius: "50%",
//                                 bgcolor: "#1976d2",
//                                 ml: 1,
//                                 mt: 0.5,
//                                 flexShrink: 0,
//                               }}
//                             />
//                           )}
//                         </Box>
//                       }
//                       secondary={
//                         <Box>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               color: "text.secondary",
//                               mb: 1,
//                               lineHeight: 1.4,
//                               fontSize: "0.875rem",
//                             }}
//                           >
//                             {notification.message}
//                           </Typography>
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
//                             {notification.company && (
//                               <Chip
//                                 label={notification.company}
//                                 size="small"
//                                 variant="outlined"
//                                 sx={{
//                                   fontSize: "0.75rem",
//                                   height: 20,
//                                   borderColor: "#e0e0e0",
//                                   color: "#666",
//                                 }}
//                               />
//                             )}
//                             <Typography variant="caption" sx={{ color: "#999", fontSize: "0.75rem" }}>
//                               {new Date(notification.created_at).toLocaleDateString()} at{" "}
//                               {new Date(notification.created_at).toLocaleTimeString([], {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       }
//                     />
//                   </ListItemButton>
//                 </Fade>
//               ))}
//             </List>
//           )}
//         </Box>
//       </Popover>

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
//                         {job.photo && (
//                           <Box
//                             sx={{ height: 180, overflow: "hidden", position: "relative", backgroundColor: "#f5f5f5" }}
//                           >
//                             <img
//                               src={`http://localhost:5000${job.photo}`}
//                               alt={job.title}
//                               style={{
//                                 width: "100%",
//                                 maxHeight: "100%",
//                                 objectFit: "contain",
//                                 borderRadius: "3px 3px 0 0",
//                                 transition: "transform 0.3s ease",
//                               }}
//                               onError={(e) => {
//                                 e.target.src = "https://via.placeholder.com/180"
//                                 console.error("Image failed to load for job:", job.title, job.photo)
//                               }}
//                             />
//                           </Box>
//                         )}
//                         <Box sx={{ height: 4, bgcolor: "#1976d2", borderRadius: job.photo ? "0" : "3px 3px 0 0" }} />
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
//                           {job.photo && (
//                             <Box
//                               sx={{ height: 180, overflow: "hidden", position: "relative", backgroundColor: "#f5f5f5" }}
//                             >
//                               <img
//                                 src={`http://localhost:5000${job.photo}`}
//                                 alt={job.title}
//                                 style={{
//                                   width: "100%",
//                                   maxHeight: "100%",
//                                   objectFit: "contain",
//                                   borderRadius: "3px 3px 0 0",
//                                   transition: "transform 0.3s ease",
//                                 }}
//                                 onError={(e) => {
//                                   e.target.src = "https://via.placeholder.com/180"
//                                   console.error("Image failed to load for job:", job.title, job.photo)
//                                 }}
//                               />
//                             </Box>
//                           )}
//                           <Box
//                             sx={{
//                               height: 4,
//                               bgcolor: statusColors.chip,
//                               borderRadius: job.photo ? "0" : "3px 3px 0 0",
//                             }}
//                           />

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

//   async function markAllNotificationsAsRead() {
//     try {
//       // Optimistically update the UI
//       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
//       setUnreadCount(0)

//       // Store read notification IDs
//       const allNotificationIds = notifications.map((n) => n.id)
//       localStorage.setItem(`readNotifications_${currentUser.id}`, JSON.stringify(allNotificationIds))

//       // Try to update backend for each notification
//       const token = localStorage.getItem("token")
//       for (const notification of notifications) {
//         try {
//           await axios.put(
//             `http://localhost:5000/api/notifications/${notification.id}/read`,
//             {},
//             { headers: { Authorization: `Bearer ${token}` } },
//           )
//         } catch (err) {
//           console.log(`Backend notification read update failed for ${notification.id} (non-critical):`, err)
//         }
//       }
//     } catch (err) {
//       console.error("Error marking all notifications as read:", err)
//     }
//   }
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
  Popover,
  ListItemAvatar,
  Fade,
  ListItemButton,
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
  MoreVert,
  Notifications,
  FilterList,
  KeyboardArrowDown,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
  CheckCircle,
  Cancel,
  Schedule,
  MarkEmailRead,
  Clear,
  NotificationsActive,
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

  // Enhanced Notification states
  const [notifications, setNotifications] = useState([])
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [notificationLoading, setNotificationLoading] = useState(false)

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
        console.log("Fetched jobs in CandidateDashboard:", response.data)
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

  // Enhanced notification fetching with better persistence
  const fetchNotifications = async () => {
    if (!currentUser?.id) return

    try {
      setNotificationLoading(true)
      const token = localStorage.getItem("token")

      // Try to fetch from backend first
      let backendNotifications = []
      try {
        const response = await axios.get("http://localhost:5000/api/notifications/candidate", {
          headers: { Authorization: `Bearer ${token}` },
        })
        backendNotifications = response.data || []
      } catch (err) {
        console.log("Backend notifications not available, using local storage")
      }

      // Get stored notifications from localStorage
      const storedNotifications = JSON.parse(localStorage.getItem(`notifications_${currentUser.id}`) || "[]")
      const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")
      const clearedNotifications = JSON.parse(localStorage.getItem(`clearedNotifications_${currentUser.id}`) || "[]")

      // Combine backend and stored notifications, removing duplicates
      const allNotifications = [...backendNotifications, ...storedNotifications]
      const uniqueNotifications = allNotifications.filter(
        (notification, index, self) => index === self.findIndex((n) => n.id === notification.id),
      )

      // Filter out cleared notifications and update read status
      const validNotifications = uniqueNotifications
        .filter((notification) => !clearedNotifications.includes(notification.id))
        .map((notification) => ({
          ...notification,
          read: readNotifications.includes(notification.id),
        }))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      setNotifications(validNotifications)
      setUnreadCount(validNotifications.filter((n) => !n.read).length)
    } catch (err) {
      console.error("Error fetching notifications:", err)
    } finally {
      setNotificationLoading(false)
    }
  }

  // Enhanced application fetching with status change detection
  const fetchApplications = async () => {
    if (!currentUser?.id) return

    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:5000/api/applications/candidate", {
        headers: { Authorization: `Bearer ${token}` },
      })

      const newApplications = response.data

      // Get previous applications to detect status changes
      const previousApplications = JSON.parse(localStorage.getItem(`previousApplications_${currentUser.id}`) || "[]")

      // Store current applications for next comparison
      localStorage.setItem(`previousApplications_${currentUser.id}`, JSON.stringify(newApplications))

      setApplications(newApplications)

      // Check for status changes and create notifications
      await createNotificationsFromStatusChanges(newApplications, previousApplications)
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

  // Create notifications from application status changes
  const createNotificationsFromStatusChanges = async (currentApplications, previousApplications) => {
    if (!currentUser?.id) return

    const clearedNotifications = JSON.parse(localStorage.getItem(`clearedNotifications_${currentUser.id}`) || "[]")
    const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")
    const existingNotifications = JSON.parse(localStorage.getItem(`notifications_${currentUser.id}`) || "[]")

    const newNotifications = []

    currentApplications.forEach((currentApp) => {
      const previousApp = previousApplications.find((prev) => prev.job_id === currentApp.job_id)
      const job = jobs.find((j) => j.id === currentApp.job_id)

      // Check if status changed or if it's a new application with non-pending status
      const statusChanged = previousApp && previousApp.status !== currentApp.status
      const newAcceptedApp = !previousApp && currentApp.status && currentApp.status.toLowerCase() !== "pending"

      if ((statusChanged || newAcceptedApp) && currentApp.status && currentApp.status.toLowerCase() !== "pending") {
        const notificationId = `status-${currentApp.job_id}-${currentApp.status}-${Date.now()}`

        // Check if we already have a similar notification
        const existingSimilar = existingNotifications.find(
          (n) => n.job_id === currentApp.job_id && n.status === currentApp.status,
        )

        // Only create if not cleared and doesn't exist
        if (!clearedNotifications.includes(notificationId) && !existingSimilar) {
          const notification = {
            id: notificationId,
            job_id: currentApp.job_id,
            type: "status_change",
            title: `Application ${currentApp.status.charAt(0).toUpperCase() + currentApp.status.slice(1)}`,
            message: `Your application for "${job?.title || "Unknown Position"}" has been ${currentApp.status.toLowerCase()}.`,
            status: currentApp.status,
            job_title: job?.title || "Unknown Position",
            company: job?.company || "Unknown Company",
            created_at: new Date().toISOString(),
            read: false,
          }

          newNotifications.push(notification)

          // Show snackbar for status changes
          if (statusChanged) {
            setSnackbar({
              open: true,
              message: notification.message,
              severity:
                currentApp.status.toLowerCase() === "accepted"
                  ? "success"
                  : currentApp.status.toLowerCase() === "rejected"
                    ? "error"
                    : "info",
            })
          }
        }
      }
    })

    // Update stored notifications if we have new ones
    if (newNotifications.length > 0) {
      const updatedStoredNotifications = [...newNotifications, ...existingNotifications]
      localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(updatedStoredNotifications))

      // Update state
      setNotifications((prev) => {
        const combined = [...newNotifications, ...prev]
        return combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      })

      setUnreadCount((prev) => prev + newNotifications.length)
    }
  }

  // Create notification when applying to a job
  const createApplicationNotification = async (jobId, jobTitle, company) => {
    if (!currentUser?.id) return

    try {
      const notificationId = `application-${jobId}-${Date.now()}`
      const notification = {
        id: notificationId,
        job_id: jobId,
        type: "application_submitted",
        title: "Application Submitted",
        message: `Your application for "${jobTitle}" at ${company} has been submitted successfully.`,
        status: "submitted",
        job_title: jobTitle,
        company: company,
        created_at: new Date().toISOString(),
        read: false,
      }

      // Add to stored notifications
      const existingNotifications = JSON.parse(localStorage.getItem(`notifications_${currentUser.id}`) || "[]")
      const updatedNotifications = [notification, ...existingNotifications]
      localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify(updatedNotifications))

      // Update state
      setNotifications((prev) => [notification, ...prev])
      setUnreadCount((prev) => prev + 1)

      // Try to send to backend
      const token = localStorage.getItem("token")
      try {
        await axios.post(
          "http://localhost:5000/api/notifications",
          {
            candidateId: currentUser.id,
            jobId: jobId,
            type: "application_submitted",
            title: notification.title,
            message: notification.message,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
      } catch (err) {
        console.log("Backend notification creation failed (non-critical):", err)
      }
    } catch (err) {
      console.error("Error creating application notification:", err)
    }
  }

  // Initialize notifications from localStorage on component mount
  useEffect(() => {
    if (currentUser?.id) {
      // Load stored notifications immediately
      const storedNotifications = JSON.parse(localStorage.getItem(`notifications_${currentUser.id}`) || "[]")
      const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")
      const clearedNotifications = JSON.parse(localStorage.getItem(`clearedNotifications_${currentUser.id}`) || "[]")

      // Filter out cleared notifications and update read status
      const validNotifications = storedNotifications
        .filter((notification) => !clearedNotifications.includes(notification.id))
        .map((notification) => ({
          ...notification,
          read: readNotifications.includes(notification.id),
        }))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

      if (validNotifications.length > 0) {
        setNotifications(validNotifications)
        setUnreadCount(validNotifications.filter((n) => !n.read).length)
      } else {
        // Add welcome notification for new users
        const welcomeNotification = {
          id: "welcome-" + Date.now(),
          job_id: "welcome",
          type: "welcome",
          title: "Welcome to CareerConnect!",
          message: "Start browsing jobs and applying to positions that match your skills.",
          status: "info",
          job_title: "Welcome",
          company: "CareerConnect",
          created_at: new Date().toISOString(),
          read: false,
        }

        setNotifications([welcomeNotification])
        setUnreadCount(1)
        localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify([welcomeNotification]))
      }

      // Then fetch from backend and applications
      fetchApplications()
      fetchNotifications()
    }
  }, [currentUser?.id])

  // Periodically refresh applications and notifications
  useEffect(() => {
    if (currentUser?.id) {
      const interval = setInterval(() => {
        fetchApplications()
        fetchNotifications()
      }, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [currentUser, jobs])

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
          job.created_at?.toLowerCase?.().includes(searchTerm.toLowerCase()) ||
          (job.job_type && job.job_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredJobs(filtered)
    }
  }, [searchTerm, jobs])

  // Enhanced apply handler with notification
  const handleApply = async (jobId, recruiterId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "http://localhost:5000/api/applications",
        { jobId, recruiterId },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      // Find the job details for notification
      const job = jobs.find((j) => j.id === jobId)

      // Create application notification
      await createApplicationNotification(jobId, job?.title || "Unknown Position", job?.company || "Unknown Company")

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

  // Enhanced notification handlers
  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget)
  }

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null)
  }

  // Enhanced mark notification as read
  const markNotificationAsRead = async (notificationId) => {
    try {
      setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
      setUnreadCount((prev) => Math.max(0, prev - 1))

      // Store read notification IDs
      const readNotifications = JSON.parse(localStorage.getItem(`readNotifications_${currentUser.id}`) || "[]")
      if (!readNotifications.includes(notificationId)) {
        readNotifications.push(notificationId)
        localStorage.setItem(`readNotifications_${currentUser.id}`, JSON.stringify(readNotifications))
      }

      // Try to update backend
      const token = localStorage.getItem("token")
      try {
        await axios.put(
          `http://localhost:5000/api/notifications/${notificationId}/read`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        )
      } catch (err) {
        console.log("Backend notification read update failed (non-critical):", err)
      }
    } catch (err) {
      console.error("Error marking notification as read:", err)
    }
  }

  // Enhanced clear all notifications
  const clearAllNotifications = () => {
    if (notifications.length === 0) return

    // Store cleared notification IDs
    const clearedIds = notifications.map((n) => n.id)
    const existingClearedNotifications = JSON.parse(
      localStorage.getItem(`clearedNotifications_${currentUser.id}`) || "[]",
    )
    const updatedClearedNotifications = [...new Set([...existingClearedNotifications, ...clearedIds])]
    localStorage.setItem(`clearedNotifications_${currentUser.id}`, JSON.stringify(updatedClearedNotifications))

    // Clear from stored notifications
    localStorage.setItem(`notifications_${currentUser.id}`, JSON.stringify([]))

    // Clear state
    setNotifications([])
    setUnreadCount(0)

    setSnackbar({
      open: true,
      message: "All notifications cleared",
      severity: "info",
    })
  }

  const getNotificationIcon = (type, status) => {
    if (type === "status_change") {
      switch (status?.toLowerCase()) {
        case "accepted":
          return <CheckCircle sx={{ color: "#4caf50", fontSize: "1.2rem" }} />
        case "rejected":
          return <Cancel sx={{ color: "#f44336", fontSize: "1.2rem" }} />
        case "interview":
          return <Schedule sx={{ color: "#2196f3", fontSize: "1.2rem" }} />
        default:
          return <InfoIcon sx={{ color: "#ff9800", fontSize: "1.2rem" }} />
      }
    } else if (type === "application_submitted") {
      return <CheckCircle sx={{ color: "#4caf50", fontSize: "1.2rem" }} />
    } else if (type === "welcome") {
      return <NotificationsActive sx={{ color: "#2196f3", fontSize: "1.2rem" }} />
    }
    return <InfoIcon sx={{ color: "#2196f3", fontSize: "1.2rem" }} />
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
          // { text: "Browse Jobs", icon: <Work />, value: 0 },
          { text: "Applied Jobs", icon: <Description />, value: 1, badge: applications.length },
          { text: "Edit Profile", icon: <Person />, to: "/candidate/profile/edit" },
          { text: "Contact Us", icon: <ContactMailIcon />, to: "/candidate/contact" },
          { text: "OCR Upload", icon: <Description />, to: "/candidate/ocr" },
          { text: "Reset Password", icon: <Settings />, to: "/candidate/resetpassword" },
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
            {/* Enhanced Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit" sx={{ mr: 1 }} onClick={handleNotificationClick}>
                <Badge
                  badgeContent={unreadCount}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      minWidth: "18px",
                      height: "18px",
                    },
                  }}
                >
                  {unreadCount > 0 ? <NotificationsActive /> : <Notifications />}
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

      {/* Enhanced Notifications Popover */}
      <Popover
        open={Boolean(notificationAnchorEl)}
        anchorEl={notificationAnchorEl}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: 420,
            maxHeight: 600,
            mt: 1,
            borderRadius: 3,
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            border: "1px solid rgba(0,0,0,0.05)",
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: "1px solid #e0e0e0", bgcolor: "#f8f9fa" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1565c0" }}>
              Notifications
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {unreadCount > 0 && (
                <Tooltip title="Mark all as read">
                  <IconButton size="small" onClick={markAllNotificationsAsRead} sx={{ color: "#1976d2" }}>
                    <MarkEmailRead fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Clear all">
                <IconButton size="small" onClick={clearAllNotifications} sx={{ color: "#666" }}>
                  <Clear fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Refresh">
                <IconButton
                  size="small"
                  onClick={fetchNotifications}
                  disabled={notificationLoading}
                  sx={{ color: "#666" }}
                >
                  <Refresh fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          {unreadCount > 0 && (
            <Typography variant="body2" sx={{ color: "#666", fontSize: "0.875rem" }}>
              You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </Typography>
          )}
        </Box>

        <Box sx={{ maxHeight: 500, overflow: "auto" }}>
          {notificationLoading ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <CircularProgress size={32} sx={{ color: "#1976d2" }} />
              <Typography variant="body2" sx={{ mt: 2, color: "#666" }}>
                Loading notifications...
              </Typography>
            </Box>
          ) : notifications.length === 0 ? (
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Notifications sx={{ fontSize: 56, color: "#e0e0e0", mb: 2 }} />
              <Typography variant="h6" sx={{ color: "#666", mb: 1 }}>
                No notifications yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You'll see updates about your applications here
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {notifications.map((notification, index) => (
                <Fade in={true} timeout={300 + index * 50} key={notification.id}>
                  <ListItemButton
                    sx={{
                      borderBottom: index < notifications.length - 1 ? "1px solid #f0f0f0" : "none",
                      bgcolor: notification.read ? "transparent" : "rgba(25, 118, 210, 0.04)",
                      "&:hover": {
                        bgcolor: notification.read ? "#f8f9fa" : "rgba(25, 118, 210, 0.08)",
                      },
                      py: 2,
                      px: 3,
                    }}
                    onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "transparent", width: 40, height: 40 }}>
                        {getNotificationIcon(notification.type, notification.status)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: notification.read ? 500 : 700,
                              color: notification.read ? "text.primary" : "#1565c0",
                              fontSize: "0.95rem",
                            }}
                          >
                            {notification.title}
                          </Typography>
                          {!notification.read && (
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                bgcolor: "#1976d2",
                                ml: 1,
                                mt: 0.5,
                                flexShrink: 0,
                              }}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              mb: 1,
                              lineHeight: 1.4,
                              fontSize: "0.875rem",
                            }}
                          >
                            {notification.message}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                            {notification.company && (
                              <Chip
                                label={notification.company}
                                size="small"
                                variant="outlined"
                                sx={{
                                  fontSize: "0.75rem",
                                  height: 20,
                                  borderColor: "#e0e0e0",
                                  color: "#666",
                                }}
                              />
                            )}
                            <Typography variant="caption" sx={{ color: "#999", fontSize: "0.75rem" }}>
                              {new Date(notification.created_at).toLocaleDateString()} at{" "}
                              {new Date(notification.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </Fade>
              ))}
            </List>
          )}
        </Box>
      </Popover>

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
                          <Box
                            sx={{ height: 180, overflow: "hidden", position: "relative", backgroundColor: "#f5f5f5" }}
                          >
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
                                e.target.src = "https://via.placeholder.com/180"
                                console.error("Image failed to load for job:", job.title, job.photo)
                              }}
                            />
                          </Box>
                        )}
                        <Box sx={{ height: 4, bgcolor: "#1976d2", borderRadius: job.photo ? "0" : "3px 3px 0 0" }} />
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
                            <Box
                              sx={{ height: 180, overflow: "hidden", position: "relative", backgroundColor: "#f5f5f5" }}
                            >
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
                                  e.target.src = "https://via.placeholder.com/180"
                                  console.error("Image failed to load for job:", job.title, job.photo)
                                }}
                              />
                            </Box>
                          )}
                          <Box
                            sx={{
                              height: 4,
                              bgcolor: statusColors.chip,
                              borderRadius: job.photo ? "0" : "3px 3px 0 0",
                            }}
                          />

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

  async function markAllNotificationsAsRead() {
    try {
      // Optimistically update the UI
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)

      // Store read notification IDs
      const allNotificationIds = notifications.map((n) => n.id)
      localStorage.setItem(`readNotifications_${currentUser.id}`, JSON.stringify(allNotificationIds))

      // Try to update backend for each notification
      const token = localStorage.getItem("token")
      for (const notification of notifications) {
        try {
          await axios.put(
            `http://localhost:5000/api/notifications/${notification.id}/read`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
          )
        } catch (err) {
          console.log(`Backend notification read update failed for ${notification.id} (non-critical):`, err)
        }
      }
    } catch (err) {
      console.error("Error marking all notifications as read:", err)
    }
  }
}

export default CandidateDashboard

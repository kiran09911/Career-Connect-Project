// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import axios from "axios"
// import { io } from "socket.io-client"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Badge,
//   Avatar,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
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
//   Send,
//   LocationOn,
//   AttachMoney,
//   AccessTime,
// } from "@mui/icons-material"

// const CandidateDashboard = () => {
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

//   const [currentUser, setCurrentUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [jobs, setJobs] = useState([])
//   const [filteredJobs, setFilteredJobs] = useState([])
//   const [conversations, setConversations] = useState([])
//   const [unreadCounts, setUnreadCounts] = useState({})
//   const [showChat, setShowChat] = useState(false)
//   const [selectedChat, setSelectedChat] = useState(null)
//   const [socket, setSocket] = useState(null)
//   const [messages, setMessages] = useState([])
//   const [newMessage, setNewMessage] = useState("")
//   const [searchTerm, setSearchTerm] = useState("")
//   const [drawerOpen, setDrawerOpen] = useState(false)
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [tabValue, setTabValue] = useState(0)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
//   const [applications, setApplications] = useState([])

//   // Initialize socket connection
//   useEffect(() => {
//     const newSocket = io("http://localhost:5000", {
//       autoConnect: false,
//       withCredentials: true,
//       auth: {
//         token: localStorage.getItem("token"),
//       },
//     })
//     setSocket(newSocket)

//     return () => {
//       newSocket.disconnect()
//     }
//   }, [])

//   // Verify authentication and fetch user data
//   useEffect(() => {
//     const verifyAuth = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         if (!token) {
//           navigate("/login")
//           return
//         }

//         const response = await axios.get("http://localhost:5000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         setCurrentUser(response.data)
//         setLoading(false)
//       } catch (error) {
//         console.error("Auth verification failed:", error)
//         localStorage.removeItem("token")
//         navigate("/login")
//       }
//     }

//     verifyAuth()
//   }, [navigate])

//   // Fetch available jobs
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/jobs")
//         setJobs(response.data)
//         setFilteredJobs(response.data)
//       } catch (err) {
//         console.error("Error fetching jobs:", err)
//       }
//     }

//     fetchJobs()
//   }, [])

//   // Fetch user applications
//   useEffect(() => {
//     const fetchApplications = async () => {
//       if (!currentUser?.id) return

//       try {
//         const token = localStorage.getItem("token")
//         const response = await axios.get("http://localhost:5000/api/applications/candidate", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         setApplications(response.data)
//       } catch (err) {
//         console.error("Error fetching applications:", err)
//       }
//     }

//     fetchApplications()
//   }, [currentUser])

//   // Fetch conversations
//   useEffect(() => {
//     if (!currentUser?.id) return

//     const fetchConversations = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         const response = await axios.get(`http://localhost:5000/api/conversations/${currentUser.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         setConversations(response.data || [])

//         const counts = {}
//         ;(response.data || []).forEach((conv) => {
//           counts[conv.id] = conv.unread_count || 0
//         })
//         setUnreadCounts(counts)
//       } catch (err) {
//         console.error("Error fetching conversations:", err)
//       }
//     }

//     fetchConversations()
//   }, [currentUser])

//   // Socket event listeners
//   useEffect(() => {
//     if (!socket || !currentUser?.id) return

//     socket.connect()

//     const handleNewMessage = (message) => {
//       if (message.conversation_id && message.sender_id !== currentUser?.id) {
//         setUnreadCounts((prev) => ({
//           ...prev,
//           [message.conversation_id]: (prev[message.conversation_id] || 0) + 1,
//         }))

//         // If chat is open and it's the current conversation, add message to the list
//         if (showChat && selectedChat?.id === message.conversation_id) {
//           setMessages((prev) => [...prev, message])
//         }
//       }
//     }

//     socket.on("receiveMessage", handleNewMessage)

//     return () => {
//       socket.off("receiveMessage", handleNewMessage)
//     }
//   }, [socket, currentUser, showChat, selectedChat])

//   // Filter jobs based on search term
//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setFilteredJobs(jobs)
//     } else {
//       const filtered = jobs.filter(
//         (job) =>
//           job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

//       // Refresh applications list
//       const response = await axios.get("http://localhost:5000/api/applications/candidate", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       setApplications(response.data)
//     } catch (err) {
//       console.error("Error applying for job:", err);
  
//       if (err.response?.status === 409) {
//         setSnackbar({
//           open: true,
//           message: "You have already applied for this job.",
//           severity: "warning",
//         });
//       } else {
//         setSnackbar({
//           open: true,
//           message: err.response?.data?.error || "Failed to apply for the job.",
//           severity: "error",
//         });
//       }
//     }
//   }


  

//   const handleChatOpen = (chat) => {
//     if (!chat || !chat.id) {
//       console.error("Invalid chat object:", chat)
//       return
//     }

//     setSelectedChat(chat)
//     setShowChat(true)
//     setUnreadCounts((prev) => ({
//       ...prev,
//       [chat.id]: 0,
//     }))
//     fetchMessages(chat.id)
//   }

//   const fetchMessages = async (conversationId) => {
//     if (!conversationId) {
//       console.error("Invalid conversationId:", conversationId)
//       return
//     }

//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.get(`http://localhost:5000/api/messages/${conversationId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       setMessages(response.data || [])
//     } catch (err) {
//       console.error("Error fetching messages:", err)
//     }
//   }

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedChat?.id) return

//     try {
//       const token = localStorage.getItem("token")

//       const response = await axios.post(
//         "http://localhost:5000/api/messages",
//         { conversationId: selectedChat.id, content: newMessage },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )

//       setMessages((prev) => [...prev, response.data])
//       setNewMessage("")
//     } catch (err) {
//       console.error("Error sending message:", err)
//       setSnackbar({
//         open: true,
//         message: "Failed to send message. Please try again.",
//         severity: "error",
//       })
//     }
//   }

//   const handleLogout = () => {
//     if (socket) socket.disconnect()
//     localStorage.clear()
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
//   }

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen)
//   }

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </Box>
//     )
//   }

//   // Check if a job has already been applied to
//   const hasApplied = (jobId) => {
//     return applications.some((app) => app.job_id === jobId)
//   }

//   const totalUnreadMessages = Object.values(unreadCounts).reduce((a, b) => a + b, 0)

//   const drawerContent = (
//     <Box sx={{ width: 250 }}>
//       <Box sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <Avatar
//           sx={{
//             width: 80,
//             height: 80,
//             mb: 2,
//             bgcolor: theme.palette.primary.main,
//           }}
//         >
//           {currentUser?.name?.charAt(0) || "C"}
//         </Avatar>
//         <Typography variant="h6" noWrap component="div">
//           Candidate Portal
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {currentUser?.email || "candidate@example.com"}
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         <ListItem button component={Link} to="/candidate-dashboard" selected={tabValue === 0}>
//           <ListItemIcon>
//             <Dashboard />
//           </ListItemIcon>
//           <ListItemText primary="Dashboard" />
//         </ListItem>
//         <ListItem button component={Link} to="/candidate/jobs" selected={tabValue === 0}>
//           <ListItemIcon>
//             <Work />
//           </ListItemIcon>
//           <ListItemText primary="Browse Jobs" />
//         </ListItem>
//         <ListItem button component={Link} to="/candidate/applications" selected={tabValue === 1}>
//           <ListItemIcon>
//             <Description />
//           </ListItemIcon>
//           <ListItemText primary="My Applications" />
//           <Chip size="small" color="primary" label={applications.length} sx={{ ml: 1 }} />
//         </ListItem>
//         <ListItem button onClick={() => setShowChat(true)}>
//           <ListItemIcon>
//             <Badge badgeContent={totalUnreadMessages} color="error">
//               <ChatIcon />
//             </Badge>
//           </ListItemIcon>
//           <ListItemText primary="Messages" />
//         </ListItem>
//         <ListItem button component={Link} to="/candidate/profile">
//           <ListItemIcon>
//             <Person />
//           </ListItemIcon>
//           <ListItemText primary="Profile" />
//         </ListItem>
//         <ListItem button component={Link} to="/candidate/settings">
//           <ListItemIcon>
//             <Settings />
//           </ListItemIcon>
//           <ListItemText primary="Settings" />
//         </ListItem>
//       </List>
//       <Divider />
//       <List>
//         <ListItem button onClick={handleLogout}>
//           <ListItemIcon>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItem>
//       </List>
//     </Box>
//   )

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
//           background: "linear-gradient(90deg, #1976d2, #2196f3)",
//         }}
//       >
//         <Toolbar>
//           <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 2, display: { md: "none" } }}>
//             <MenuIcon />
//           </IconButton>
//           <BusinessCenter sx={{ mr: 1 }} />
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             CareerConnect
//           </Typography>

//           <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
//             <IconButton color="inherit" sx={{ mr: 1 }} onClick={() => setShowChat(true)}>
//               <Badge badgeContent={totalUnreadMessages} color="error">
//                 <ChatIcon />
//               </Badge>
//             </IconButton>
//             <Button
//               color="inherit"
//               onClick={handleProfileMenuOpen}
//               startIcon={
//                 <Avatar
//                   sx={{
//                     width: 32,
//                     height: 32,
//                     bgcolor: "primary.light",
//                   }}
//                 >
//                   {currentUser?.name?.charAt(0) || "C"}
//                 </Avatar>
//               }
//             >
//               Profile
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
//       >
//         <MenuItem component={Link} to="/candidate/profile">
//           <ListItemIcon>
//             <Person fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Profile</ListItemText>
//         </MenuItem>
//         <MenuItem component={Link} to="/candidate/settings">
//           <ListItemIcon>
//             <Settings fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Settings</ListItemText>
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={handleLogout}>
//           <ListItemIcon>
//             <LogoutIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText>Logout</ListItemText>
//         </MenuItem>
//       </Menu>

//       {/* Responsive drawer */}
//       <Drawer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={isMobile ? drawerOpen : true}
//         onClose={toggleDrawer}
//         sx={{
//           width: 250,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: 250,
//             boxSizing: "border-box",
//             mt: "64px",
//             height: "calc(100% - 64px)",
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
//           p: 3,
//           width: { md: `calc(100% - 250px)` },
//           mt: "64px",
//         }}
//       >
//         <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//           <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
//             <Tab label="Available Jobs" icon={<Work />} iconPosition="start" />
//             <Tab
//               label={`My Applications (${applications.length})`}
//               icon={<Description />}
//               iconPosition="start"
//               component={Link}
//               to="/candidate/applications"
//               sx={{ textDecoration: "none" }}
//             />
//           </Tabs>
//         </Box>

//         {tabValue === 0 && (
//           <>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 3,
//                 flexWrap: "wrap",
//                 gap: 2,
//               }}
//             >
//               <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//                 Explore Job Opportunities
//               </Typography>

//               <TextField
//                 placeholder="Search jobs..."
//                 variant="outlined"
//                 size="small"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Search />
//                     </InputAdornment>
//                   ),
//                   endAdornment: searchTerm && (
//                     <InputAdornment position="end">
//                       <IconButton size="small" onClick={() => setSearchTerm("")}>
//                         ×
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   width: { xs: "100%", sm: "300px" },
//                   bgcolor: "background.paper",
//                   borderRadius: 1,
//                 }}
//               />
//             </Box>

//             {filteredJobs.length === 0 ? (
//               <Paper
//                 sx={{
//                   p: 4,
//                   textAlign: "center",
//                   borderRadius: 2,
//                   boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//                   background: "linear-gradient(to bottom right, #f5f5f5, #ffffff)",
//                 }}
//               >
//                 <Box sx={{ mb: 2 }}>
//                   <Work sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5 }} />
//                 </Box>
//                 <Typography variant="h6" gutterBottom>
//                   No jobs found
//                 </Typography>
//                 <Typography color="text.secondary" paragraph>
//                   {searchTerm
//                     ? "Try adjusting your search criteria."
//                     : "There are no job postings available at the moment."}
//                 </Typography>
//                 {searchTerm && (
//                   <Button variant="outlined" onClick={() => setSearchTerm("")} sx={{ mt: 2 }}>
//                     Clear Search
//                   </Button>
//                 )}
//               </Paper>
//             ) : (
//               <Grid container spacing={3}>
//                 {filteredJobs.map((job) => (
//                   <Grid item xs={12} md={6} lg={4} key={job.id}>
//                     <Card
//                       sx={{
//                         height: "100%",
//                         display: "flex",
//                         flexDirection: "column",
//                         borderRadius: 2,
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                         transition: "transform 0.2s, box-shadow 0.2s",
//                         "&:hover": {
//                           transform: "translateY(-4px)",
//                           boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//                         },
//                       }}
//                     >
//                       <CardContent sx={{ flexGrow: 1 }}>
//                         <Typography variant="h5" component="h2" gutterBottom>
//                           {job.title}
//                         </Typography>

//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
//                           {job.company && (
//                             <Chip size="small" label={job.company} icon={<BusinessCenter fontSize="small" />} />
//                           )}
//                           {job.location && (
//                             <Chip size="small" label={job.location} icon={<LocationOn fontSize="small" />} />
//                           )}
//                           {job.job_type && (
//                             <Chip
//                               size="small"
//                               label={job.job_type}
//                               color="primary"
//                               variant="outlined"
//                               icon={<AccessTime fontSize="small" />}
//                             />
//                           )}
//                           {job.salary && (
//                             <Chip size="small" label={job.salary} icon={<AttachMoney fontSize="small" />} />
//                           )}
//                         </Box>

//                         <Typography variant="body2" color="text.secondary" paragraph>
//                           {job.description && job.description.length > 150
//                             ? `${job.description.substring(0, 150)}...`
//                             : job.description}
//                         </Typography>

//                         {job.recruiterName && (
//                           <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
//                             <Avatar sx={{ width: 24, height: 24, bgcolor: "primary.main", fontSize: "0.8rem" }}>
//                               {job.recruiterName.charAt(0)}
//                             </Avatar>
//                             <Typography variant="body2" color="text.secondary">
//                               Posted by: {job.recruiterName}
//                             </Typography>
//                           </Box>
//                         )}
//                       </CardContent>

//                       <CardActions sx={{ p: 2, pt: 0, justifyContent: "space-between" }}>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={() => handleApply(job.id, job.recruiterId)}
//                           disabled={hasApplied(job.id)}
//                           sx={{
//                             borderRadius: 2,
//                             boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//                           }}
//                         >
//                           {hasApplied(job.id) ? "Applied" : "Apply Now"}
//                         </Button>

//                         <Button
//                           variant="outlined"
//                           color="secondary"
//                           startIcon={<ChatIcon />}
//                           onClick={() =>
//                             handleChatOpen({
//                               id: job.recruiterId,
//                               name: job.recruiterName || "Recruiter",
//                             })
//                           }
//                           sx={{ borderRadius: 2 }}
//                         >
//                           Contact
//                         </Button>
//                       </CardActions>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             )}
//           </>
//         )}

//         {/* Chat Dialog */}
//         <Dialog
//           open={showChat}
//           onClose={() => setShowChat(false)}
//           fullWidth
//           maxWidth="md"
//           PaperProps={{
//             sx: {
//               borderRadius: 2,
//               boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
//               height: { xs: "100%", sm: "80vh" },
//             },
//           }}
//         >
//           <DialogTitle
//             sx={{
//               borderBottom: "1px solid",
//               borderColor: "divider",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <ChatIcon color="primary" />
//               <Typography variant="h6">{selectedChat ? `Chat with ${selectedChat.name}` : "Messages"}</Typography>
//             </Box>
//             <IconButton onClick={() => setShowChat(false)} size="small">
//               ×
//             </IconButton>
//           </DialogTitle>

//           <DialogContent sx={{ p: 0, display: "flex", height: "100%" }}>
//             {/* Conversations List */}
//             <Box
//               sx={{
//                 width: { xs: selectedChat ? "0" : "100%", sm: "250px" },
//                 borderRight: "1px solid",
//                 borderColor: "divider",
//                 display: { xs: selectedChat ? "none" : "block", sm: "block" },
//                 overflow: "auto",
//               }}
//             >
//               <List sx={{ p: 0 }}>
//                 {conversations.length === 0 ? (
//                   <Box sx={{ p: 3, textAlign: "center" }}>
//                     <Typography color="text.secondary">No conversations yet</Typography>
//                   </Box>
//                 ) : (
//                   conversations.map((conv) => (
//                     <ListItem
//                       button
//                       key={conv.id}
//                       onClick={() => handleChatOpen(conv)}
//                       selected={selectedChat?.id === conv.id}
//                       sx={{
//                         borderBottom: "1px solid",
//                         borderColor: "divider",
//                         "&.Mui-selected": {
//                           bgcolor: "action.selected",
//                         },
//                       }}
//                     >
//                       <Avatar sx={{ mr: 2 }}>{conv.name?.charAt(0) || "?"}</Avatar>
//                       <ListItemText
//                         primary={conv.name || "Unknown"}
//                         secondary={conv.last_message || "No messages yet"}
//                         primaryTypographyProps={{
//                           fontWeight: unreadCounts[conv.id] ? "bold" : "normal",
//                         }}
//                       />
//                       {unreadCounts[conv.id] > 0 && (
//                         <Badge badgeContent={unreadCounts[conv.id]} color="primary" sx={{ ml: 1 }} />
//                       )}
//                     </ListItem>
//                   ))
//                 )}
//               </List>
//             </Box>

//             {/* Chat Area */}
//             <Box
//               sx={{
//                 flexGrow: 1,
//                 display: "flex",
//                 flexDirection: "column",
//                 display: { xs: selectedChat ? "flex" : "none", sm: "flex" },
//               }}
//             >
//               {selectedChat ? (
//                 <>
//                   <Box
//                     sx={{
//                       flexGrow: 1,
//                       p: 2,
//                       overflowY: "auto",
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 1,
//                     }}
//                   >
//                     {messages.length === 0 ? (
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           height: "100%",
//                         }}
//                       >
//                         <Typography color="text.secondary">No messages yet. Start the conversation!</Typography>
//                       </Box>
//                     ) : (
//                       messages.map((msg, index) => (
//                         <Box
//                           key={index}
//                           sx={{
//                             alignSelf: msg.sender_id === currentUser?.id ? "flex-end" : "flex-start",
//                             maxWidth: "70%",
//                             bgcolor: msg.sender_id === currentUser?.id ? "primary.light" : "grey.100",
//                             color: msg.sender_id === currentUser?.id ? "white" : "text.primary",
//                             p: 2,
//                             borderRadius: 2,
//                             boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
//                           }}
//                         >
//                           <Typography variant="body2">{msg.content}</Typography>
//                           <Typography
//                             variant="caption"
//                             sx={{
//                               display: "block",
//                               mt: 0.5,
//                               opacity: 0.8,
//                               textAlign: "right",
//                             }}
//                           >
//                             {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                           </Typography>
//                         </Box>
//                       ))
//                     )}
//                   </Box>

//                   <Box
//                     sx={{
//                       p: 2,
//                       borderTop: "1px solid",
//                       borderColor: "divider",
//                       display: "flex",
//                       gap: 1,
//                     }}
//                   >
//                     <TextField
//                       fullWidth
//                       placeholder="Type a message..."
//                       variant="outlined"
//                       size="small"
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                     />
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       endIcon={<Send />}
//                       onClick={handleSendMessage}
//                       disabled={!newMessage.trim()}
//                     >
//                       Send
//                     </Button>
//                   </Box>
//                 </>
//               ) : (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "100%",
//                     p: 3,
//                   }}
//                 >
//                   <Box sx={{ textAlign: "center" }}>
//                     <ChatIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
//                     <Typography variant="h6" gutterBottom>
//                       Select a conversation
//                     </Typography>
//                     <Typography color="text.secondary">
//                       Choose a conversation from the list to start chatting
//                     </Typography>
//                   </Box>
//                 </Box>
//               )}
//             </Box>
//           </DialogContent>
//         </Dialog>

//         {/* Snackbar for notifications */}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         >
//           <Alert
//             severity={snackbar.severity}
//             onClose={() => setSnackbar({ ...snackbar, open: false })}
//             variant="filled"
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Box>
//   )
// }

// export default CandidateDashboard


"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { io } from "socket.io-client"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
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
  Send,
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
  const [conversations, setConversations] = useState([])
  const [unreadCounts, setUnreadCounts] = useState({})
  const [showChat, setShowChat] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [applications, setApplications] = useState([])

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      autoConnect: false,
      withCredentials: true,
      auth: {
        token: localStorage.getItem("token"),
      },
    })
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  // Verify authentication and fetch user data
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }

        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setCurrentUser(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Auth verification failed:", error)
        localStorage.removeItem("token")
        navigate("/login")
      }
    }

    verifyAuth()
  }, [navigate])

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

  // Fetch conversations
  useEffect(() => {
    if (!currentUser?.id) return

    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`http://localhost:5000/api/conversations/${currentUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setConversations(response.data || [])

        const counts = {}
        ;(response.data || []).forEach((conv) => {
          counts[conv.id] = conv.unread_count || 0
        })
        setUnreadCounts(counts)
      } catch (err) {
        console.error("Error fetching conversations:", err)
      }
    }

    fetchConversations()
  }, [currentUser])

  // Socket event listeners
  useEffect(() => {
    if (!socket || !currentUser?.id) return

    socket.connect()

    const handleNewMessage = (message) => {
      if (message.conversation_id && message.sender_id !== currentUser?.id) {
        setUnreadCounts((prev) => ({
          ...prev,
          [message.conversation_id]: (prev[message.conversation_id] || 0) + 1,
        }))

        // If chat is open and it's the current conversation, add message to the list
        if (showChat && selectedChat?.id === message.conversation_id) {
          setMessages((prev) => [...prev, message])
        }
      }
    }

    socket.on("receiveMessage", handleNewMessage)

    return () => {
      socket.off("receiveMessage", handleNewMessage)
    }
  }, [socket, currentUser, showChat, selectedChat])

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

      // Refresh applications list
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

  const handleChatOpen = (chat) => {
    if (!chat || !chat.id) {
      console.error("Invalid chat object:", chat)
      return
    }

    setSelectedChat(chat)
    setShowChat(true)
    setUnreadCounts((prev) => ({
      ...prev,
      [chat.id]: 0,
    }))
    fetchMessages(chat.id)
  }

  const fetchMessages = async (conversationId) => {
    if (!conversationId) {
      console.error("Invalid conversationId:", conversationId)
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`http://localhost:5000/api/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMessages(response.data || [])
    } catch (err) {
      console.error("Error fetching messages:", err)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat?.id) return

    try {
      const token = localStorage.getItem("token")

      const response = await axios.post(
        "http://localhost:5000/api/messages",
        { conversationId: selectedChat.id, content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setMessages((prev) => [...prev, response.data])
      setNewMessage("")
    } catch (err) {
      console.error("Error sending message:", err)
      setSnackbar({
        open: true,
        message: "Failed to send message. Please try again.",
        severity: "error",
      })
    }
  }

  const handleLogout = () => {
    if (socket) socket.disconnect()
    localStorage.clear()
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

  // Check if a job has already been applied to
  const hasApplied = (jobId) => {
    return applications.some((app) => app.job_id === jobId)
  }

  const totalUnreadMessages = Object.values(unreadCounts).reduce((a, b) => a + b, 0)

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
        <ListItem button component={Link} to="/candidate-dashboard" selected={tabValue === 0}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/candidate/jobs" selected={tabValue === 0}>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary="Browse Jobs" />
        </ListItem>
        <ListItem button component={Link} to="/candidate/applications" selected={tabValue === 1}>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary="Applied Jobs" />
        </ListItem>
        <ListItem button onClick={() => setShowChat(true)}>
          <ListItemIcon>
            <Badge badgeContent={totalUnreadMessages} color="error">
              <ChatIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem button component={Link} to="/candidate/profile">
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
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
            <IconButton color="inherit" sx={{ mr: 1 }} onClick={() => setShowChat(true)}>
              <Badge badgeContent={totalUnreadMessages} color="error">
                <ChatIcon />
              </Badge>
            </IconButton>
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

      {/* Responsive drawer */}
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
              component={Link}
              to="/candidate/applications"
              sx={{ textDecoration: "none" }}
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

                        <Typography variant="body2" color="text.secondary" paragraph>
                          {job.description && job.description.length > 150
                            ? `${job.description.substring(0, 150)}...`
                            : job.description}
                        </Typography>

                        {job.recruiterName && (
                          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: "primary.main", fontSize: "0.8rem" }}>
                              {job.recruiterName.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" color="text.secondary">
                              Posted by: {job.recruiterName}
                            </Typography>
                          </Box>
                        )}
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
                          onClick={() =>
                            handleChatOpen({
                              id: job.recruiterId,
                              name: job.recruiterName || "Recruiter",
                            })
                          }
                          sx={{ borderRadius: 2 }}
                        >
                          Contact
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
                  component={Link}
                  to="/candidate/jobs"
                  onClick={() => setTabValue(0)}
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Browse Jobs
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {applications.map((application) => {
                  // Find the corresponding job details
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

                        <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<ChatIcon />}
                            onClick={() =>
                              handleChatOpen({
                                id: job.recruiterId,
                                name: job.recruiterName || "Recruiter",
                              })
                            }
                            sx={{ borderRadius: 2 }}
                          >
                            Contact Recruiter
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

        {/* Chat Dialog */}
        <Dialog
          open={showChat}
          onClose={() => setShowChat(false)}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              height: { xs: "100%", sm: "80vh" },
            },
          }}
        >
          <DialogTitle
            sx={{
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChatIcon color="primary" />
              <Typography variant="h6">{selectedChat ? `Chat with ${selectedChat.name}` : "Messages"}</Typography>
            </Box>
            <IconButton onClick={() => setShowChat(false)} size="small">
              ×
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 0, display: "flex", height: "100%" }}>
            {/* Conversations List */}
            <Box
              sx={{
                width: { xs: selectedChat ? "0" : "100%", sm: "250px" },
                borderRight: "1px solid",
                borderColor: "divider",
                display: { xs: selectedChat ? "none" : "block", sm: "block" },
                overflow: "auto",
              }}
            >
              <List sx={{ p: 0 }}>
                {conversations.length === 0 ? (
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography color="text.secondary">No conversations yet</Typography>
                  </Box>
                ) : (
                  conversations.map((conv) => (
                    <ListItem
                      button
                      key={conv.id}
                      onClick={() => handleChatOpen(conv)}
                      selected={selectedChat?.id === conv.id}
                      sx={{
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        "&.Mui-selected": {
                          bgcolor: "action.selected",
                        },
                      }}
                    >
                      <Avatar sx={{ mr: 2 }}>{conv.name?.charAt(0) || "?"}</Avatar>
                      <ListItemText
                        primary={conv.name || "Unknown"}
                        secondary={conv.last_message || "No messages yet"}
                        primaryTypographyProps={{
                          fontWeight: unreadCounts[conv.id] ? "bold" : "normal",
                        }}
                      />
                      {unreadCounts[conv.id] > 0 && (
                        <Badge badgeContent={unreadCounts[conv.id]} color="primary" sx={{ ml: 1 }} />
                      )}
                    </ListItem>
                  ))
                )}
              </List>
            </Box>

            {/* Chat Area */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                display: { xs: selectedChat ? "flex" : "none", sm: "flex" },
              }}
            >
              {selectedChat ? (
                <>
                  <Box
                    sx={{
                      flexGrow: 1,
                      p: 2,
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    {messages.length === 0 ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Typography color="text.secondary">No messages yet. Start the conversation!</Typography>
                      </Box>
                    ) : (
                      messages.map((msg, index) => (
                        <Box
                          key={index}
                          sx={{
                            alignSelf: msg.sender_id === currentUser?.id ? "flex-end" : "flex-start",
                            maxWidth: "70%",
                            bgcolor: msg.sender_id === currentUser?.id ? "primary.light" : "grey.100",
                            color: msg.sender_id === currentUser?.id ? "white" : "text.primary",
                            p: 2,
                            borderRadius: 2,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          }}
                        >
                          <Typography variant="body2">{msg.content}</Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              mt: 0.5,
                              opacity: 0.8,
                              textAlign: "right",
                            }}
                          >
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </Typography>
                        </Box>
                      ))
                    )}
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderTop: "1px solid",
                      borderColor: "divider",
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Type a message..."
                      variant="outlined"
                      size="small"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<Send />}
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </Button>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    p: 3,
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <ChatIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      Select a conversation
                    </Typography>
                    <Typography color="text.secondary">
                      Choose a conversation from the list to start chatting
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </DialogContent>
        </Dialog>

        {/* Snackbar for notifications */}
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

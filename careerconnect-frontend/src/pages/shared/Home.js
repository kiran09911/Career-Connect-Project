
// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Paper,
//   Card,
//   CardContent,
//   Avatar,
//   Chip,
//   useTheme,
//   useMediaQuery,
//   IconButton,
//   TextField,
//   InputAdornment,
//   Divider,
// } from "@mui/material"
// import {
//   BusinessCenter,
//   Search,
//   ArrowForward,
//   Work,
//   Person,
//   School,
//   LocationOn,
//   Visibility,
//   TrendingUp,
//   Email,
//   Phone,
//   ArrowDownward,
//   PlayArrow,
// } from "@mui/icons-material"


// const LandingPage = () => {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
//   const isTablet = useMediaQuery(theme.breakpoints.down("md"))
//   const navigate = useNavigate()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isVisible, setIsVisible] = useState({
//     hero: false,
//     features: false,
//     jobs: false,
//     testimonials: false,
//     cta: false,
//   })

//   useEffect(() => {
//     // Trigger animations on mount
//     setIsVisible({
//       hero: true,
//       features: true,
//       jobs: true,
//       testimonials: true,
//       cta: true,
//     })
//   }, [])

//   const handleSearch = (e) => {
//     e.preventDefault()
//     if (searchTerm.trim()) {
//       navigate("/candidate-dashboard", { state: { tabValue: 1, searchTerm } })
//     }
//   }

//   const scrollToFeatures = () => {
//     document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
//   }

//   // Sample job data
//   const featuredJobs = [
//     {
//       id: 1,
//       title: "Senior Frontend Developer",
//       company: "TechCorp Solutions",
//       location: "San Francisco, CA",
//       salary: "$120K - $150K",
//       type: "Full-time",
//       logo: "/placeholder.svg?height=60&width=60",
//     },
//     {
//       id: 2,
//       title: "UX/UI Designer",
//       company: "Creative Designs Inc",
//       location: "New York, NY",
//       salary: "$90K - $110K",
//       type: "Full-time",
//       logo: "/placeholder.svg?height=60&width=60",
//     },
//     {
//       id: 3,
//       title: "DevOps Engineer",
//       company: "Cloud Systems",
//       location: "Remote",
//       salary: "$110K - $140K",
//       type: "Full-time",
//       logo: "/placeholder.svg?height=60&width=60",
//     },
//   ]

//   // Sample testimonials
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "Software Engineer",
//       company: "TechCorp",
//       avatar: "/placeholder.svg?height=80&width=80",
//       text: "CareerConnect helped me find my dream job in just two weeks! The platform is intuitive and the job recommendations were spot on.",
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "Product Manager",
//       company: "InnovateTech",
//       avatar: "/placeholder.svg?height=80&width=80",
//       text: "After months of searching elsewhere, I found the perfect position through CareerConnect. The application process was seamless.",
//     },
//     {
//       id: 3,
//       name: "Emily Rodriguez",
//       role: "UX Designer",
//       company: "DesignHub",
//       avatar: "/placeholder.svg?height=80&width=80",
//       text: "The quality of job listings on CareerConnect is exceptional. I appreciated the detailed company profiles and salary transparency.",
//     },
//   ]

//   return (
//     <Box sx={{ overflow: "hidden" }}>
//       {/* Hero Section */}
//       <Box
//         sx={{
//           background: "linear-gradient(135deg, #1976d2, #64b5f6)",
//           color: "white",
//           pt: { xs: 10, md: 12 },
//           pb: { xs: 10, md: 12 },
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <Container maxWidth="lg">
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               right: 0,
//               width: "100%",
//               height: "100%",
//               opacity: 0.05,
//               backgroundImage: "url('/placeholder.svg?height=600&width=600')",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               zIndex: 0,
//             }}
//           />

//           <Box
//             sx={{
//               position: "relative",
//               zIndex: 1,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               textAlign: "center",
//               opacity: isVisible.hero ? 1 : 0,
//               transform: isVisible.hero ? "translateY(0)" : "translateY(20px)",
//               transition: "opacity 0.8s ease, transform 0.8s ease",
//             }}
//           >
//             <Typography
//               variant="h1"
//               sx={{
//                 fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
//                 fontWeight: 800,
//                 mb: 2,
//                 textShadow: "0 2px 10px rgba(0,0,0,0.2)",
//                 lineHeight: 1.2,
//               }}
//             >
//               Your Career Journey <br /> Starts Here
//             </Typography>

//             <Typography
//               variant="h5"
//               sx={{
//                 maxWidth: "800px",
//                 mb: 5,
//                 fontWeight: 400,
//                 opacity: 0.9,
//                 lineHeight: 1.5,
//                 fontSize: { xs: "1.1rem", md: "1.3rem" },
//               }}
//             >
//               Connect with top employers, discover opportunities that match your skills, and take the next step in your
//               professional growth.
//             </Typography>

//             <Box
//               component="form"
//               onSubmit={handleSearch}
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 width: "100%",
//                 maxWidth: "700px",
//                 gap: 2,
//                 mb: 6,
//               }}
//             >
              
             
//             </Box>

//             <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
//               <Button
//                 variant="contained"
//                 component={Link}
//                 to="/register"
//                 sx={{
//                   bgcolor: "white",
//                   color: "#1976d2",
//                   px: 4,
//                   py: 1.5,
//                   fontSize: "1rem",
//                   fontWeight: 600,
//                   textTransform: "none",
//                   borderRadius: 2,
//                   boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
//                   "&:hover": {
//                     bgcolor: "rgba(255,255,255,0.9)",
//                     boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
//                   },
//                 }}
//               >
//                 Create Account
//               </Button>
//               <Button
//                 variant="outlined"
//                 component={Link}
//                 to="/login"
//                 sx={{
//                   borderColor: "white",
//                   color: "white",
//                   px: 4,
//                   py: 1.5,
//                   fontSize: "1rem",
//                   fontWeight: 600,
//                   textTransform: "none",
//                   borderRadius: 2,
//                   "&:hover": {
//                     borderColor: "white",
//                     bgcolor: "rgba(255,255,255,0.1)",
//                   },
//                 }}
//               >
//                 Sign In
//               </Button>
//             </Box>

//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mt: 8,
//                 cursor: "pointer",
//               }}
//               onClick={scrollToFeatures}
//             >
//               <Typography variant="body1" sx={{ mr: 1, fontWeight: 500 }}>
//                 Explore Features
//               </Typography>
//               <IconButton
//                 sx={{
//                   color: "white",
//                   animation: "bounce 2s infinite",
//                   "@keyframes bounce": {
//                     "0%, 20%, 50%, 80%, 100%": {
//                       transform: "translateY(0)",
//                     },
//                     "40%": {
//                       transform: "translateY(-10px)",
//                     },
//                     "60%": {
//                       transform: "translateY(-5px)",
//                     },
//                   },
//                 }}
//               >
//                 <ArrowDownward />
//               </IconButton>
//             </Box>
//           </Box>
//         </Container>
//       </Box>

//       {/* Stats Section */}
//       <Box sx={{ py: 6, bgcolor: "#f5f7fa" }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={3} justifyContent="center">
//             {[
//               { value: "10,000+", label: "Job Listings" },
//               { value: "5,000+", label: "Companies" },
//               { value: "25,000+", label: "Successful Hires" },
//               { value: "95%", label: "Satisfaction Rate" },
//             ].map((stat, index) => (
//               <Grid item xs={6} md={3} key={index}>
//                 <Box
//                   sx={{
//                     textAlign: "center",
//                     p: 2,
//                     opacity: isVisible.hero ? 1 : 0,
//                     transform: isVisible.hero ? "translateY(0)" : "translateY(20px)",
//                     transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`,
//                   }}
//                 >
//                   <Typography
//                     variant="h3"
//                     sx={{
//                       fontWeight: 700,
//                       color: "#1976d2",
//                       mb: 1,
//                       fontSize: { xs: "2rem", md: "2.5rem" },
//                     }}
//                   >
//                     {stat.value}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {stat.label}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Box id="features" sx={{ py: 10, bgcolor: "white" }}>
//         <Container maxWidth="lg">
//           <Box
//             sx={{
//               textAlign: "center",
//               mb: 8,
//               opacity: isVisible.features ? 1 : 0,
//               transform: isVisible.features ? "translateY(0)" : "translateY(20px)",
//               transition: "opacity 0.8s ease, transform 0.8s ease",
//             }}
//           >
//             <Typography
//               variant="h2"
//               sx={{
//                 fontWeight: 700,
//                 mb: 2,
//                 color: "#1565c0",
//                 fontSize: { xs: "2rem", md: "2.5rem" },
//               }}
//             >
//               Why Choose CareerConnect?
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 400,
//                 color: "text.secondary",
//                 maxWidth: "800px",
//                 mx: "auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               Our platform offers everything you need to advance your career and find the perfect job match.
//             </Typography>
//           </Box>

//           <Grid container spacing={4}>
//             {[
//               {
//                 icon: <Work sx={{ fontSize: 40, color: "#1976d2" }} />,
//                 title: "Personalized Job Matches",
//                 description:
//                   "Our AI-powered algorithm analyzes your skills and preferences to recommend the most relevant job opportunities.",
//               },
//               {
//                 icon: <Person sx={{ fontSize: 40, color: "#1976d2" }} />,
//                 title: "Professional Profile",
//                 description:
//                   "Create a comprehensive profile that showcases your skills, experience, and career aspirations to potential employers.",
//               },
//               {
//                 icon: <School sx={{ fontSize: 40, color: "#1976d2" }} />,
//                 title: "Skill Development",
//                 description:
//                   "Access resources and courses to enhance your skills and stay competitive in the job market.",
//               },
//               {
//                 icon: <BusinessCenter sx={{ fontSize: 40, color: "#1976d2" }} />,
//                 title: "Application Tracking",
//                 description:
//                   "Keep track of all your job applications, interviews, and offers in one centralized dashboard.",
//               },
//               {
//                 icon: <Visibility sx={{ fontSize: 40, color: "#1976d2" }} />,
//                 title: "Company Insights",
//                 description:
//                   "Get detailed information about companies, including culture, benefits, and employee reviews.",
//               },
//               {
//                 icon: <TrendingUp sx={{ fontSize: 40, color: "#1976d2" }} />,
//                 title: "Career Growth",
//                 description:
//                   "Receive personalized career advice and guidance to help you achieve your professional goals.",
//               },
//             ].map((feature, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: 4,
//                     height: "100%",
//                     borderRadius: 3,
//                     border: "1px solid #e0e0e0",
//                     transition: "all 0.3s ease",
//                     opacity: isVisible.features ? 1 : 0,
//                     transform: isVisible.features ? "translateY(0)" : "translateY(20px)",
//                     transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s, box-shadow 0.3s ease, transform 0.3s ease`,
//                     "&:hover": {
//                       boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//                       transform: "translateY(-5px)",
//                       borderColor: "#bbdefb",
//                     },
//                   }}
//                 >
//                   <Avatar
//                     sx={{
//                       bgcolor: "#e3f2fd",
//                       width: 70,
//                       height: 70,
//                       mb: 3,
//                     }}
//                   >
//                     {feature.icon}
//                   </Avatar>
//                   <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#1565c0" }}>
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
//                     {feature.description}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Featured Jobs Section */}
//       <Box sx={{ py: 10, bgcolor: "#f5f7fa" }}>
//         <Container maxWidth="lg">
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: { xs: "flex-start", sm: "center" },
//               flexDirection: { xs: "column", sm: "row" },
//               mb: 6,
//               gap: { xs: 2, sm: 0 },
//               opacity: isVisible.jobs ? 1 : 0,
//               transform: isVisible.jobs ? "translateY(0)" : "translateY(20px)",
//               transition: "opacity 0.8s ease, transform 0.8s ease",
//             }}
//           >
//             <Box>
//               <Typography
//                 variant="h2"
//                 sx={{
//                   fontWeight: 700,
//                   color: "#1565c0",
//                   fontSize: { xs: "2rem", md: "2.5rem" },
//                 }}
//               >
//                 Featured Jobs
//               </Typography>
//               <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
//                 Explore top opportunities from leading companies
//               </Typography>
//             </Box>
//             <Button
//               component={Link}
//               to="/register"
//               endIcon={<ArrowForward />}
//               sx={{
//                 textTransform: "none",
//                 fontWeight: 600,
//                 fontSize: "1rem",
//                 color: "#1976d2",
//                 "&:hover": {
//                   bgcolor: "rgba(25, 118, 210, 0.04)",
//                 },
//               }}
//             >
//               View All Jobs
//             </Button>
//           </Box>

//           <Grid container spacing={3}>
//             {featuredJobs.map((job, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     borderRadius: 3,
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                     transition: "all 0.3s ease",
//                     opacity: isVisible.jobs ? 1 : 0,
//                     transform: isVisible.jobs ? "translateY(0)" : "translateY(20px)",
//                     transition: `opacity 0.8s ease ${index * 0.1 + 0.2}s, transform 0.8s ease ${
//                       index * 0.1 + 0.2
//                     }s, box-shadow 0.3s ease, transform 0.3s ease`,
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 3 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                       <Avatar
//                         src={job.logo}
//                         alt={job.company}
//                         variant="rounded"
//                         sx={{ width: 60, height: 60, mr: 2, bgcolor: "#e3f2fd" }}
//                       />
//                       <Box>
//                         <Typography variant="h6" sx={{ fontWeight: 600, color: "#1565c0", mb: 0.5 }}>
//                           {job.title}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {job.company}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
//                       <Chip
//                         icon={<LocationOn fontSize="small" />}
//                         label={job.location}
//                         size="small"
//                         sx={{
//                           bgcolor: "#e3f2fd",
//                           color: "#1565c0",
//                           fontWeight: 500,
//                           fontSize: "0.8rem",
//                           borderRadius: 1,
//                         }}
//                       />
//                       <Chip
//                         label={job.salary}
//                         size="small"
//                         sx={{
//                           bgcolor: "#e3f2fd",
//                           color: "#1565c0",
//                           fontWeight: 500,
//                           fontSize: "0.8rem",
//                           borderRadius: 1,
//                         }}
//                       />
//                       <Chip
//                         label={job.type}
//                         size="small"
//                         sx={{
//                           bgcolor: "#e3f2fd",
//                           color: "#1565c0",
//                           fontWeight: 500,
//                           fontSize: "0.8rem",
//                           borderRadius: 1,
//                         }}
//                       />
//                     </Box>

//                     <Button
//                       variant="contained"
//                       fullWidth
//                       component={Link}
//                       to="/register"
//                       sx={{
//                         textTransform: "none",
//                         fontWeight: 600,
//                         py: 1,
//                         borderRadius: 2,
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                         "&:hover": {
//                           boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
//                         },
//                       }}
//                     >
//                       Apply Now
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* How It Works Section */}
//       <Box sx={{ py: 10, bgcolor: "white" }}>
//         <Container maxWidth="lg">
//           <Box
//             sx={{
//               textAlign: "center",
//               mb: 8,
//               opacity: isVisible.testimonials ? 1 : 0,
//               transform: isVisible.testimonials ? "translateY(0)" : "translateY(20px)",
//               transition: "opacity 0.8s ease, transform 0.8s ease",
//             }}
//           >
//             <Typography
//               variant="h2"
//               sx={{
//                 fontWeight: 700,
//                 mb: 2,
//                 color: "#1565c0",
//                 fontSize: { xs: "2rem", md: "2.5rem" },
//               }}
//             >
//               How CareerConnect Works
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 400,
//                 color: "text.secondary",
//                 maxWidth: "800px",
//                 mx: "auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               Your journey to career success in three simple steps
//             </Typography>
//           </Box>

//           <Grid container spacing={5} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   position: "relative",
//                   opacity: isVisible.testimonials ? 1 : 0,
//                   transform: isVisible.testimonials ? "translateX(0)" : "translateX(-20px)",
//                   transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
//                 }}
//               >
//                 <Paper
//                   sx={{
//                     borderRadius: 4,
//                     overflow: "hidden",
//                     boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//                     position: "relative",
//                   }}
//                 >
//                   <Box
//                     component="img"
//                     src="/placeholder.svg?height=400&width=600"
//                     alt="Career platform interface"
//                     sx={{
//                       width: "100%",
//                       height: "auto",
//                       display: "block",
//                     }}
//                   />
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                       bgcolor: "rgba(25, 118, 210, 0.9)",
//                       borderRadius: "50%",
//                       width: 80,
//                       height: 80,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         bgcolor: "rgba(21, 101, 192, 0.9)",
//                         transform: "translate(-50%, -50%) scale(1.1)",
//                       },
//                     }}
//                   >
//                     <PlayArrow sx={{ color: "white", fontSize: 40 }} />
//                   </Box>
//                 </Paper>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Box>
//                 {[
//                   {
//                     number: "01",
//                     title: "Create Your Profile",
//                     description:
//                       "Sign up and build your professional profile highlighting your skills, experience, and career goals.",
//                   },
//                   {
//                     number: "02",
//                     title: "Explore Opportunities",
//                     description:
//                       "Browse job listings tailored to your profile or search for specific positions that match your interests.",
//                   },
//                   {
//                     number: "03",
//                     title: "Apply and Connect",
//                     description:
//                       "Submit applications with ease and connect directly with employers through our messaging system.",
//                   },
//                 ].map((step, index) => (
//                   <Box
//                     key={index}
//                     sx={{
//                       display: "flex",
//                       mb: 4,
//                       opacity: isVisible.testimonials ? 1 : 0,
//                       transform: isVisible.testimonials ? "translateX(0)" : "translateX(20px)",
//                       transition: `opacity 0.8s ease ${0.3 + index * 0.1}s, transform 0.8s ease ${0.3 + index * 0.1}s`,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: 60,
//                         height: 60,
//                         borderRadius: 2,
//                         bgcolor: "#e3f2fd",
//                         color: "#1976d2",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontWeight: 700,
//                         fontSize: "1.5rem",
//                         mr: 3,
//                         flexShrink: 0,
//                       }}
//                     >
//                       {step.number}
//                     </Box>
//                     <Box>
//                       <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#1565c0" }}>
//                         {step.title}
//                       </Typography>
//                       <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
//                         {step.description}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 ))}
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Testimonials Section */}
//       <Box sx={{ py: 10, bgcolor: "#f5f7fa" }}>
//         <Container maxWidth="lg">
//           <Box
//             sx={{
//               textAlign: "center",
//               mb: 8,
//               opacity: isVisible.testimonials ? 1 : 0,
//               transform: isVisible.testimonials ? "translateY(0)" : "translateY(20px)",
//               transition: "opacity 0.8s ease, transform 0.8s ease",
//             }}
//           >
//             <Typography
//               variant="h2"
//               sx={{
//                 fontWeight: 700,
//                 mb: 2,
//                 color: "#1565c0",
//                 fontSize: { xs: "2rem", md: "2.5rem" },
//               }}
//             >
//               Success Stories
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 400,
//                 color: "text.secondary",
//                 maxWidth: "800px",
//                 mx: "auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               Hear from professionals who found their dream jobs through CareerConnect
//             </Typography>
//           </Box>

//           <Grid container spacing={3}>
//             {testimonials.map((testimonial, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     borderRadius: 3,
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//                     transition: "all 0.3s ease",
//                     opacity: isVisible.testimonials ? 1 : 0,
//                     transform: isVisible.testimonials ? "translateY(0)" : "translateY(20px)",
//                     transition: `opacity 0.8s ease ${index * 0.1 + 0.2}s, transform 0.8s ease ${
//                       index * 0.1 + 0.2
//                     }s, box-shadow 0.3s ease, transform 0.3s ease`,
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
//                     },
//                     position: "relative",
//                     overflow: "visible",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: -20,
//                       left: 20,
//                       color: "#1976d2",
//                       fontSize: "4rem",
//                       fontFamily: "serif",
//                       fontWeight: 700,
//                       opacity: 0.1,
//                       lineHeight: 1,
//                     }}
//                   >
//                     "
//                   </Box>
//                   <CardContent sx={{ p: 4 }}>
//                     <Typography
//                       variant="body1"
//                       sx={{ mb: 4, lineHeight: 1.8, color: "text.secondary", position: "relative", zIndex: 1 }}
//                     >
//                       "{testimonial.text}"
//                     </Typography>

//                     <Divider sx={{ mb: 3 }} />

//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 56, height: 56, mr: 2 }} />
//                       <Box>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1565c0" }}>
//                           {testimonial.name}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           {testimonial.role} at {testimonial.company}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* CTA Section */}
//       <Box
//         sx={{
//           py: 10,
//           background: "linear-gradient(135deg, #1976d2, #64b5f6)",
//           color: "white",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             right: 0,
//             width: "100%",
//             height: "100%",
//             opacity: 0.05,
//             backgroundImage: "url('/placeholder.svg?height=600&width=600')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             zIndex: 0,
//           }}
//         />

//         <Container maxWidth="md">
//           <Box
//             sx={{
//               textAlign: "center",
//               position: "relative",
//               zIndex: 1,
//               opacity: isVisible.cta ? 1 : 0,
//               transform: isVisible.cta ? "translateY(0)" : "translateY(20px)",
//               transition: "opacity 0.8s ease, transform 0.8s ease",
//             }}
//           >
//             <Typography
//               variant="h2"
//               sx={{
//                 fontWeight: 700,
//                 mb: 3,
//                 fontSize: { xs: "2rem", md: "3rem" },
//                 textShadow: "0 2px 10px rgba(0,0,0,0.1)",
//               }}
//             >
//               Ready to Advance Your Career?
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 400,
//                 mb: 5,
//                 opacity: 0.9,
//                 maxWidth: "800px",
//                 mx: "auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               Join thousands of professionals who have found their dream jobs through CareerConnect. Create your account
//               today and start your journey to career success.
//             </Typography>

//             <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
//               <Button
//                 variant="contained"
//                 component={Link}
//                 to="/register"
//                 sx={{
//                   bgcolor: "white",
//                   color: "#1976d2",
//                   px: 4,
//                   py: 1.5,
//                   fontSize: "1rem",
//                   fontWeight: 600,
//                   textTransform: "none",
//                   borderRadius: 2,
//                   boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
//                   "&:hover": {
//                     bgcolor: "rgba(255,255,255,0.9)",
//                     boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
//                   },
//                 }}
//               >
//                 Get Started Now
//               </Button>
//               <Button
//                 variant="outlined"
//                 component={Link}
//                 to="/register"
//                 sx={{
//                   borderColor: "white",
//                   color: "white",
//                   px: 4,
//                   py: 1.5,
//                   fontSize: "1rem",
//                   fontWeight: 600,
//                   textTransform: "none",
//                   borderRadius: 2,
//                   "&:hover": {
//                     borderColor: "white",
//                     bgcolor: "rgba(255,255,255,0.1)",
//                   },
//                 }}
//               >
//                 Explore Jobs
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box sx={{ py: 6, bgcolor: "#0a1929", color: "white" }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Box sx={{ mb: { xs: 3, md: 0 } }}>
//                 <Typography variant="h5" sx={{ fontWeight: 700, display: "flex", alignItems: "center", mb: 2 }}>
//                   <BusinessCenter sx={{ mr: 1, fontSize: "1.8rem" }} />
//                   CareerConnect
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                   <Email sx={{ fontSize: 20, opacity: 0.7, mr: 1 }} />
//                   <Typography variant="body2" sx={{ opacity: 0.7 }}>
//                     contact@careerconnect.com
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Phone sx={{ fontSize: 20, opacity: 0.7, mr: 1 }} />
//                   <Typography variant="body2" sx={{ opacity: 0.7 }}>
//                     +1 (555) 123-4567
//                   </Typography>
//                 </Box>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
//               <Link
//               to="/terms-and-conditions"
  
//                 component={Link}
//                 href="#"
//                 sx={{
//                   color: "white",
//                   opacity: 0.7,
//                   textDecoration: "none",
//                   fontSize: "0.875rem",
//                   "&:hover": { opacity: 1, textDecoration: "underline" },
//                 }}
//               >
//                 Terms and Conditions
//               </Link>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

//           <Typography variant="body2" sx={{ opacity: 0.7, textAlign: "center" }}>
//             © {new Date().getFullYear()} CareerConnect. All rights reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   )
// }

// export default LandingPage

"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material"
import {
  BusinessCenter,
  Search,
  ArrowForward,
  LocationOn,
  Email,
  Phone,
  ArrowDownward,
  PlayArrow,
} from "@mui/icons-material"

// Ensure the public directory is properly set up
// The image should be in public/images/career-illustration.png

const LandingPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    jobs: false,
    testimonials: false,
    cta: false,
  })

  useEffect(() => {
    // Trigger animations on mount
    setIsVisible({
      hero: true,
      features: true,
      jobs: true,
      testimonials: true,
      cta: true,
    })
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate("/candidate-dashboard", { state: { tabValue: 1, searchTerm } })
    }
  }

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  // Sample job data
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      salary: "$120K - $150K",
      type: "Full-time",
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Designs Inc",
      location: "New York, NY",
      salary: "$90K - $110K",
      type: "Full-time",
      logo: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "Cloud Systems",
      location: "Remote",
      salary: "$110K - $140K",
      type: "Full-time",
      logo: "/placeholder.svg?height=60&width=60",
    },
  ]

  // Sample testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "CareerConnect helped me find my dream job in just two weeks! The platform is intuitive and the job recommendations were spot on.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateTech",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "After months of searching elsewhere, I found the perfect position through CareerConnect. The application process was seamless.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "DesignHub",
      avatar: "/placeholder.svg?height=80&width=80",
      text: "The quality of job listings on CareerConnect is exceptional. I appreciated the detailed company profiles and salary transparency.",
    },
  ]

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient( rgba(17, 31, 41, 0.7)), url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          pt: { xs: 10, md: 12 },
          pb: { xs: 10, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          {/* Add decorative background pattern */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.07,
             
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              opacity: isVisible.hero ? 1 : 0,
              transform: isVisible.hero ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 800,
                mb: 2,
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                lineHeight: 1.2,
              }}
            >
              Your Career Journey <br /> Starts Here
            </Typography>

            <Typography
              variant="h5"
              sx={{
                maxWidth: "800px",
                mb: 5,
                fontWeight: 400,
                opacity: 0.9,
                lineHeight: 1.5,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              Connect with top employers, discover opportunities that match your skills, and take the next step in your
              professional growth.
            </Typography>

           

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
              <Button
                variant="contained"
                component={Link}
                to="/register"
                sx={{
                  bgcolor: "white",
                  color: "#1976d2",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Create Account
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/login"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Sign In
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 8,
                cursor: "pointer",
              }}
              onClick={scrollToFeatures}
            >
              <Typography variant="body1" sx={{ mr: 1, fontWeight: 500 }}>
                Explore Features
              </Typography>
              <IconButton
                sx={{
                  color: "white",
                  animation: "bounce 2s infinite",
                  "@keyframes bounce": {
                    "0%, 20%, 50%, 80%, 100%": {
                      transform: "translateY(0)",
                    },
                    "40%": {
                      transform: "translateY(-10px)",
                    },
                    "60%": {
                      transform: "translateY(-5px)",
                    },
                  },
                }}
              >
                <ArrowDownward />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 6, bgcolor: "#f5f7fa", position: "relative" }}>
        <Container maxWidth="lg">
          {/* Add company logos */}
          <Box
            sx={{
              textAlign: "center",
              mb: 5,
              opacity: isVisible.hero ? 1 : 0,
              transform: isVisible.hero ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
              Trusted by leading companies worldwide
            </Typography>
            
          </Box>

          <Grid container spacing={3} justifyContent="center">
            {[
              { value: "10,000+", label: "Job Listings" },
              { value: "5,000+", label: "Companies" },
              { value: "25,000+", label: "Successful Hires" },
              { value: "95%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    opacity: isVisible.hero ? 1 : 0,
                    transform: isVisible.hero ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: "#1976d2",
                      mb: 1,
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" sx={{ py: 10, bgcolor: "white" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              mb: 8,
              opacity: isVisible.features ? 1 : 0,
              transform: isVisible.features ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#1565c0",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Why Choose CareerConnect?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Our platform offers everything you need to advance your career and find the perfect job match.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  transition: "all 0.3s ease",
                  opacity: isVisible.features ? 1 : 0,
                  transform: isVisible.features ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transform: "translateY(-5px)",
                    borderColor: "#bbdefb",
                  },
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
                  alt="Latest Jobs"
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#1565c0" }}>
                    Latest Jobs
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    Browse through thousands of opportunities across industries. Our AI-powered algorithm analyzes your
                    skills and preferences to recommend the most relevant job opportunities.
                  </Typography>
                  <Button
                    component={Link}
                    to="/register"
                    endIcon={<ArrowForward />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#1976d2",
                      p: 0,
                      "&:hover": {
                        bgcolor: "transparent",
                        opacity: 0.8,
                      },
                    }}
                  >
                    View Jobs →
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  transition: "all 0.3s ease",
                  opacity: isVisible.features ? 1 : 0,
                  transform: isVisible.features ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s, box-shadow 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transform: "translateY(-5px)",
                    borderColor: "#bbdefb",
                  },
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                  alt="Professional Network"
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#1565c0" }}>
                    Professional Network
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    Connect with other professionals in your industry. Create a comprehensive profile that showcases
                    your skills, experience, and career aspirations to potential employers.
                  </Typography>
                  <Button
                    component={Link}
                    to="/register"
                    endIcon={<ArrowForward />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#1976d2",
                      p: 0,
                      "&:hover": {
                        bgcolor: "transparent",
                        opacity: 0.8,
                      },
                    }}
                  >
                    Grow Network →
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  transition: "all 0.3s ease",
                  opacity: isVisible.features ? 1 : 0,
                  transform: isVisible.features ? "translateY(0)" : "translateY(20px)",
                  transition:
                    "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s, box-shadow 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    transform: "translateY(-5px)",
                    borderColor: "#bbdefb",
                  },
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                  alt="Top Companies"
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: "#1565c0" }}>
                    Top Companies
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                    Discover leading companies hiring in your field. Get detailed information about companies, including
                    culture, benefits, and employee reviews to make informed career decisions.
                  </Typography>
                  <Button
                    component={Link}
                    to="/register"
                    endIcon={<ArrowForward />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#1976d2",
                      p: 0,
                      "&:hover": {
                        bgcolor: "transparent",
                        opacity: 0.8,
                      },
                    }}
                  >
                    View Companies →
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Jobs Section */}
      <Box sx={{ py: 10, bgcolor: "#f5f7fa" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
              mb: 6,
              gap: { xs: 2, sm: 0 },
              opacity: isVisible.jobs ? 1 : 0,
              transform: isVisible.jobs ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: "#1565c0",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                Featured Jobs
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                Explore top opportunities from leading companies
              </Typography>
            </Box>
            <Button
              component={Link}
              to="/register"
              endIcon={<ArrowForward />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#1976d2",
                "&:hover": {
                  bgcolor: "rgba(25, 118, 210, 0.04)",
                },
              }}
            >
              View All Jobs
            </Button>
          </Box>

          <Grid container spacing={3}>
            {featuredJobs.map((job, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    opacity: isVisible.jobs ? 1 : 0,
                    transform: isVisible.jobs ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.8s ease ${index * 0.1 + 0.2}s, transform 0.8s ease ${
                      index * 0.1 + 0.2
                    }s, box-shadow 0.3s ease, transform 0.3s ease`,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Avatar
                        src={job.logo}
                        alt={job.company}
                        variant="rounded"
                        sx={{ width: 60, height: 60, mr: 2, bgcolor: "#e3f2fd" }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1565c0", mb: 0.5 }}>
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.company}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                      <Chip
                        icon={<LocationOn fontSize="small" />}
                        label={job.location}
                        size="small"
                        sx={{
                          bgcolor: "#e3f2fd",
                          color: "#1565c0",
                          fontWeight: 500,
                          fontSize: "0.8rem",
                          borderRadius: 1,
                        }}
                      />
                      <Chip
                        label={job.salary}
                        size="small"
                        sx={{
                          bgcolor: "#e3f2fd",
                          color: "#1565c0",
                          fontWeight: 500,
                          fontSize: "0.8rem",
                          borderRadius: 1,
                        }}
                      />
                      <Chip
                        label={job.type}
                        size="small"
                        sx={{
                          bgcolor: "#e3f2fd",
                          color: "#1565c0",
                          fontWeight: 500,
                          fontSize: "0.8rem",
                          borderRadius: 1,
                        }}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      fullWidth
                      component={Link}
                      to="/register"
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        py: 1,
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, bgcolor: "white" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              mb: 8,
              opacity: isVisible.testimonials ? 1 : 0,
              transform: isVisible.testimonials ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#1565c0",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              How CareerConnect Works
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Your journey to career success in three simple steps
            </Typography>
          </Box>

          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  opacity: isVisible.testimonials ? 1 : 0,
                  transform: isVisible.testimonials ? "translateX(0)" : "translateX(-20px)",
                  transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
                }}
              >
                <Paper
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    position: "relative",
                  }}
                >
                  
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "rgba(25, 118, 210, 0.9)",
                      borderRadius: "50%",
                      width: 80,
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "rgba(21, 101, 192, 0.9)",
                        transform: "translate(-50%, -50%) scale(1.1)",
                      },
                    }}
                  >
                    <PlayArrow sx={{ color: "white", fontSize: 40 }} />
                  </Box>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                {[
                  {
                    number: "01",
                    title: "Create Your Profile",
                    description:
                      "Sign up and build your professional profile highlighting your skills, experience, and career goals.",
                  },
                  {
                    number: "02",
                    title: "Explore Opportunities",
                    description:
                      "Browse job listings tailored to your profile or search for specific positions that match your interests.",
                  },
                  {
                    number: "03",
                    title: "Apply and Connect",
                    description:
                      "Submit applications with ease and connect directly with employers through our messaging system.",
                  },
                ].map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      mb: 4,
                      opacity: isVisible.testimonials ? 1 : 0,
                      transform: isVisible.testimonials ? "translateX(0)" : "translateX(20px)",
                      transition: `opacity 0.8s ease ${0.3 + index * 0.1}s, transform 0.8s ease ${0.3 + index * 0.1}s`,
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        bgcolor: "#e3f2fd",
                        color: "#1976d2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        mr: 3,
                        flexShrink: 0,
                      }}
                    >
                      {step.number}
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#1565c0" }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 10, bgcolor: "#f5f7fa" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              mb: 8,
              opacity: isVisible.testimonials ? 1 : 0,
              transform: isVisible.testimonials ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "#1565c0",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Success Stories
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                color: "text.secondary",
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Hear from professionals who found their dream jobs through CareerConnect
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    opacity: isVisible.testimonials ? 1 : 0,
                    transform: isVisible.testimonials ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.8s ease ${index * 0.1 + 0.2}s, transform 0.8s ease ${
                      index * 0.1 + 0.2
                    }s, box-shadow 0.3s ease, transform 0.3s ease`,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                    },
                    position: "relative",
                    overflow: "visible",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -20,
                      left: 20,
                      color: "#1976d2",
                      fontSize: "4rem",
                      fontFamily: "serif",
                      fontWeight: 700,
                      opacity: 0.1,
                      lineHeight: 1,
                    }}
                  >
                    "
                  </Box>
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 4, lineHeight: 1.8, color: "text.secondary", position: "relative", zIndex: 1 }}
                    >
                      "{testimonial.text}"
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 56, height: 56, mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1565c0" }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role} at {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(135deg, #1976d2, #64b5f6)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0.07,
            backgroundImage: "url('/images/pattern-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: "center",
              position: "relative",
              zIndex: 1,
              opacity: isVisible.cta ? 1 : 0,
              transform: isVisible.cta ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: "2rem", md: "3rem" },
                textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              Ready to Advance Your Career?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                mb: 5,
                opacity: 0.9,
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Join thousands of professionals who have found their dream jobs through CareerConnect. Create your account
              today and start your journey to career success.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                component={Link}
                to="/register"
                sx={{
                  bgcolor: "white",
                  color: "#1976d2",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Get Started Now
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/register"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Explore Jobs
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, bgcolor: "#0a1929", color: "white" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: { xs: 3, md: 0 } }}>
                <Typography variant="h5" sx={{ fontWeight: 700, display: "flex", alignItems: "center", mb: 2 }}>
                  <BusinessCenter sx={{ mr: 1, fontSize: "1.8rem" }} />
                  CareerConnect
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Email sx={{ fontSize: 20, opacity: 0.7, mr: 1 }} />
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    careerconnect1@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Phone sx={{ fontSize: 20, opacity: 0.7, mr: 1 }} />
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    +977 9741720726
                  </Typography>
                </Box>
                 <Box sx={{display: "flex", alignItems: "center"}}>
              <Link
              to="/terms-and-conditions"

                component={Link}
                href="#"
                sx={{
                   fontSize: 20, opacity: 0.7, mr: 1 
                }}
              >
              
                Terms and Conditions (click here)
               
              </Link>
               </Box>
              </Box>
            </Grid>

            
          </Grid>

          <Divider sx={{ my: 3, borderColor: "rgba(240, 238, 238, 0.1)" }} />

          <Typography variant="body2" sx={{ opacity: 0.7, textAlign: "center" }}>
            © {new Date().getFullYear()} CareerConnect. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default LandingPage

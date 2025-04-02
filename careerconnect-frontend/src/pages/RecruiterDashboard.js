// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "../styles/Home.css";
// import"../styles/Candidate.css";
// import Chat from "../components/Chat";


// const Home = () => {
//   const [jobs, setJobs] = useState([]);
 
//   const [showJobs, setShowJobs] = useState(false);
//   const [showChat, setShowChat] = useState(false);
//   const [receiverId, setReceiverId] = useState(null);

  
  

//   return (
//     <div className="home-container">
//       {/* Header Section */}
//       <header className="header">
//         <div className="container">
//           <div className="logo">
//             <span>Career Connect</span>
//           </div>
//           <nav className="nav">
//             <Link to="/profile">UserProfile</Link>
//             {/* <Link to="#">Companies</Link> 
//             <Link to="#">Career Advice</Link> */}
//           </nav>
//         </div>
//       </header>

//       <div>
//             <button onClick={() => { setShowChat(true); setReceiverId(2); }}>
//                 Chat with Recruiter
//             </button>

//             {showChat && <Chat senderId={1} receiverId={receiverId} />}
//         </div>

//       {/* <UserProfile userId={userId} /> */}

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="overlay"></div>
//         <div className="hero-content">
//           <h1>Connect With Your Next Opportunity</h1>
//           <p>Join thousands of professionals finding their dream careers</p>
//           <div className="buttons">
//             <Link onClick={() => setShowJobs(true)} className="btn primary">
//               Find Jobs
//             </Link>
//             <Link to="/post-job" className="btn secondary">
//               Post a Job
//             </Link>
//           </div>
//         </div>
//       </section>
      
//             {/* Features Section */}
//             <section className="features">
//               <div className="feature">
//                 <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80" alt="Jobs" />
//                 <h3>Latest Jobs</h3>
//                 <p>Browse through thousands of opportunities across industries.</p>
//                 <Link to="/jobs" className="feature-link">View Jobs →</Link>
//               </div>
      
//               <div className="feature">
//                 <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Network" />
//                 <h3>Professional Network</h3>
//                 <p>Connect with other professionals in your industry.</p>
//                 <Link to="/network" className="feature-link">Grow Network →</Link>
//               </div>
      
//               <div className="feature">
//                 <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Companies" />
//                 <h3>Top Companies</h3>
//                 <p>Discover leading companies hiring in your field.</p>
//                 <Link to="/companies" className="feature-link">View Companies →</Link>
//               </div>
//             </section>

//       {/* Job Listings Section */}
//       {showJobs && (
//         <section className="job-listings">
//           <h2>Available Jobs</h2>
//           {jobs.length > 0 ? (
//             jobs.map((job) => (
//               <div key={job.id} className="job-card">
//                 <h3>{job.title}</h3>
//                 <p><strong>Company:</strong> {job.company}</p>
//                 <p><strong>Location:</strong> {job.location}</p>
//                 <p>{job.description}</p>

//                 <button onClick={() => { setShowChat(true); setReceiverId(2); }}>
//                 Chat
//             </button>

//             {showChat && <Chat senderId={1} receiverId={receiverId} />}
//               </div>
              
//             ))
//           ) : (
//             <p>No jobs available yet.</p>
//           )}
//         </section>
//       )}

//       {/* Footer Section */}
//       <footer className="footer">
//         <div className="container">
//           <div className="footer-content">
//             <div className="footer-company">
//               <div className="logo">JobPortal</div>
//               <p>Connecting talent with opportunity since 2023.</p>
//               <div className="social-links">
//                 {/* <a href="#">Twitter</a>
//                 <a href="#">LinkedIn</a>
//                 <a href="#">Facebook</a> */}
//               </div>
//             </div>
//             <div className="footer-links">
//               <div className="footer-links-column">
//                 <h3>For Job Seekers</h3>
//                 <ul>
//                   {/* <li><a href="#">Browse Jobs</a></li>
//                   <li><a href="#">Career Advice</a></li>
//                   <li><a href="#">Resume Builder</a></li>
//                   <li><a href="#">Salary Calculator</a></li> */}
//                 </ul>
//               </div>
//               <div className="footer-links-column">
//                 <h3>For Employers</h3>
//                 <ul>
//                   {/* <li><a href="#">Post a Job</a></li>
//                   <li><a href="#">Browse Candidates</a></li>
//                   <li><a href="#">Pricing Plans</a></li>
//                   <li><a href="#">Recruitment Solutions</a></li> */}
//                 </ul>
//               </div>
//               <div className="footer-links-column">
//                 <h3>Company</h3>
//                 <ul>
//                   {/* <li><a href="#">About Us</a></li>
//                   <li><a href="#">Contact Us</a></li>
//                   <li><a href="#">Privacy Policy</a></li>
//                   <li><a href="#">Terms of Service</a></li> */}
//                 </ul>
//               </div>
//             </div>
//           </div>
//           <div className="copyright">
//             <p>© {new Date().getFullYear()} Career Connect. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
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
  Avatar
} from '@mui/material';
import { Delete, Edit, Logout } from '@mui/icons-material';
import PostJob from './PostJob';
import EditJob from './EditJob';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const [showPostJob, setShowPostJob] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  // Fetch recruiter's jobs
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/jobs/recruiter', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/jobs/${jobToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSnackbar({ open: true, message: 'Job deleted successfully', severity: 'success' });
      fetchJobs(); // Refresh the list
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete job', severity: 'error' });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleEditClick = (job) => {
    setEditJob(job);
  };

  const handleJobUpdated = () => {
    setEditJob(null);
    fetchJobs();
    setSnackbar({ open: true, message: 'Job updated successfully', severity: 'success' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recruiter Dashboard
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Your Job Postings</Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => setShowPostJob(true)}
          >
            Post New Job
          </Button>
        </Box>

        {jobs.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography>You haven't posted any jobs yet.</Typography>
            <Button 
              variant="contained" 
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => setShowPostJob(true)}
            >
              Post Your First Job
            </Button>
          </Paper>
        ) : (
          <List>
            {jobs.map((job) => (
              <Paper key={job.id} sx={{ mb: 2 }}>
                <ListItem>
                  <ListItemText
                    primary={job.title}
                    secondary={
                      <>
                        <Typography component="span" display="block">
                          {job.company} • {job.location}
                        </Typography>
                        <Typography component="span" display="block">
                          {job.job_type} • {job.salary || 'Salary not specified'}
                        </Typography>
                        <Typography component="span" display="block" sx={{ mt: 1 }}>
                          {job.description.length > 100 
                            ? `${job.description.substring(0, 100)}...` 
                            : job.description}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleEditClick(job)}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteClick(job)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            ))}
          </List>
        )}

        {/* Post Job Modal */}
        <Dialog 
          open={showPostJob} 
          onClose={() => setShowPostJob(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Post New Job</DialogTitle>
          <DialogContent>
            <PostJob 
              onSuccess={() => {
                setShowPostJob(false);
                fetchJobs();
                setSnackbar({ open: true, message: 'Job posted successfully', severity: 'success' });
              }} 
            />
          </DialogContent>
        </Dialog>

        {/* Edit Job Modal */}
        <Dialog 
          open={Boolean(editJob)} 
          onClose={() => setEditJob(null)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Edit Job</DialogTitle>
          <DialogContent>
            {editJob && (
              <EditJob 
                job={editJob} 
                onSuccess={handleJobUpdated}
                onCancel={() => setEditJob(null)}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete "{jobToDelete?.title}" position at {jobToDelete?.company}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error"
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default RecruiterDashboard;
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
  Tabs
} from '@mui/material';
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
  ArrowForward
} from '@mui/icons-material';
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
  const [applications, setApplications] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState({ name: '', email: '' }); // State to store user data
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        navigate('/login');
        return;
      }
  
      const response = await axios.get('http://localhost:5000/api/applications/recruiter', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(response.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };


  // Fetch recruiter's jobs
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        navigate('/login');
        return;
      }
  
      const response = await axios.get('http://localhost:5000/api/jobs/recruiter', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(response.data);
    } catch (err) {
      if (err.response?.status === 403) {
        console.error('Forbidden: Invalid or expired token');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error('Error fetching jobs:', err);
      }
    } finally {
      setLoading(false);
    }
  };
 

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        navigate('/login');
        return;
      }
  
      const response = await axios.get('http://localhost:5000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setUser(response.data); // Set the user data
    } catch (err) {
      console.error('Error fetching user profile:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setUserLoading(false); // Stop loading
    }
  };
  
  useEffect(() => {
    fetchJobs();
    fetchApplications(); // Fetch applications when the component mounts
    fetchUserProfile(); // Call the function here
  }, []);
  
  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        setSnackbar({ open: true, message: 'Unauthorized: Please log in again', severity: 'error' });
        navigate('/login');
        return;
      }
  
      await axios.delete(`http://localhost:5000/api/jobs/${jobToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setSnackbar({ open: true, message: 'Job deleted successfully', severity: 'success' });
      fetchJobs(); // Refresh the job list
    } catch (err) {
      if (err.response?.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setSnackbar({ open: true, message: 'Failed to delete job', severity: 'error' });
      }
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
    setUser({ name: '', email: '' }); // Reset the user state
    navigate('/login');
  };
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Alert severity="error" sx={{ width: '80%', maxWidth: '600px' }}>{error}</Alert>
    </Box>
  );

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80, 
            mb: 2,
            bgcolor: theme.palette.primary.main
          }}
        >
          {user.name ? user.name.charAt(0).toUpperCase() : 'R'}
        </Avatar>
        <Typography variant="h6" noWrap component="div">
          {user.name || 'Recruiter Portal'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email || 'recruiter@example.com'}
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/recruiter-dashboard" selected>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => setShowPostJob(true)}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Post New Job" />
        </ListItem>
        <ListItem button component={Link} to="/recruiter/profile-edit">
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/recruiter/settings">
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
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          background: 'linear-gradient(90deg, #1976d2, #2196f3)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <BusinessCenter sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CareerConnect
          </Typography>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={applications.length} color="error">
                <Notifications />
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
                    bgcolor: 'primary.light'
                  }}
                >
                  {localStorage.getItem('userName')?.charAt(0) || 'R'}
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
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to="/recruiter/profile-edit">
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/recruiter/settings">
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
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
            boxSizing: 'border-box',
            mt: '64px',
            height: 'calc(100% - 64px)'
          },
          display: { xs: isMobile && !drawerOpen ? 'none' : 'block', md: 'block' }
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
          mt: '64px'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Job Postings" icon={<Work />} iconPosition="start" />
            <Tab 
              label={`Applications (${applications.length})`} 
              icon={<Description />} 
              iconPosition="start" 
            />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Your Job Postings</Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setShowPostJob(true)}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                }}
              >
                Post New Job
              </Button>
            </Box>

            {jobs.length === 0 ? (
              <Paper 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  background: 'linear-gradient(to bottom right, #f5f5f5, #ffffff)'
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Work sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
                </Box>
                <Typography variant="h6" gutterBottom>You haven't posted any jobs yet</Typography>
                <Typography color="text.secondary" paragraph>
                  Create your first job posting to start receiving applications from qualified candidates.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => setShowPostJob(true)}
                  sx={{ mt: 2, borderRadius: 2 }}
                >
                  Post Your First Job
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {jobs.map((job) => (
                  <Grid item xs={12} key={job.id}>
                    <Card 
                      sx={{ 
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Box>
                            <Typography variant="h5" component="h2" gutterBottom>
                              {job.title}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                              <Chip 
                                size="small" 
                                label={job.company} 
                                icon={<BusinessCenter fontSize="small" />}
                              />
                              <Chip 
                                size="small" 
                                label={job.location} 
                              />
                              <Chip 
                                size="small" 
                                label={job.job_type} 
                                color="primary" 
                                variant="outlined"
                              />
                              {job.salary && (
                                <Chip 
                                  size="small" 
                                  label={job.salary} 
                                />
                              )}
                            </Box>
                          </Box>
                          <Box>
                            <Chip 
                              label={`${applications.filter(app => app.job_id === job.id).length} Applications`}
                              color="primary"
                              sx={{ fontWeight: 'bold' }}
                            />
                          </Box>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {job.description.length > 200
                            ? `${job.description.substring(0, 200)}...`
                            : job.description}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                        <Button 
                          size="small" 
                          startIcon={<Edit />}
                          onClick={() => handleEditClick(job)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="small" 
                          color="error"
                          startIcon={<Delete />}
                          onClick={() => handleDeleteClick(job)}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Applications</Typography>
            </Box>

            {applications.length === 0 ? (
              <Paper 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  background: 'linear-gradient(to bottom right, #f5f5f5, #ffffff)'
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Description sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5 }} />
                </Box>
                <Typography variant="h6" gutterBottom>No applications received yet</Typography>
                <Typography color="text.secondary" paragraph>
                  When candidates apply to your job postings, their applications will appear here.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {applications.map((app) => (
                  <Grid item xs={12} md={6} key={app.application_id}>
                    <Card 
                      sx={{ 
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                            {app.candidate_name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="h6">{app.candidate_name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              <Mail fontSize="small" sx={{ mr: 0.5, verticalAlign: 'text-bottom' }} />
                              {app.candidate_email}
                            </Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant="subtitle1" gutterBottom>
                          Applied for: <strong>{app.job_title}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Company: {app.job_company}
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
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                        <Button 
                          size="small" 
                          endIcon={<ArrowForward />}
                          component={Link}
                          to={`/recruiter/applications/${app.application_id}`}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {/* Post Job Modal */}
        <Dialog
          open={showPostJob}
          onClose={() => setShowPostJob(false)}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }
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
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }
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
                  setEditJob(null);
                  fetchJobs();
                  setSnackbar({
                    open: true,
                    message: 'Job updated successfully',
                    severity: 'success',
                  });
                }}
                onCancel={() => setEditJob(null)}
              />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }
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
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
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
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            severity={snackbar.severity}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default RecruiterDashboard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Paper,
  Grid,
  Divider,
  Avatar,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  Save,
  Cancel,
  Person,
  Home,
  LocationOn,
  Phone,
  Email,
  School,
  PhotoCamera,
  Dashboard
} from '@mui/icons-material';

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    degree: '',
    institute: '',
    permanent_address: {
      province: '',
      district: '',
      municipality: '',
      city: '',
    },
    current_address: {
      province: '',
      district: '',
      municipality: '',
      city: '',
    },
    profile_photo: '',
    
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();
 

  // Gender options
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
  ];

  // Fetch the recruiter's current profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const data = response.data;
      setProfile({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        gender: data.gender || '',
        degree: data.degree || '',
        institute: data.institute || '',
        permanent_address: data.permanent_address || {
          province: '',
          district: '',
          municipality: '',
          city: '',
        },
        current_address: data.current_address || {
          province: '',
          district: '',
          municipality: '',
          city: '',
        },
        profile_photo: data.profile_photo || '',
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      setSnackbar({ open: true, message: 'Failed to fetch profile', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    // Check if all required fields are filled
    if (
      !profile.name ||
      !profile.email ||
      !profile.phone ||
      !profile.gender ||
      !profile.degree ||
      !profile.institute ||
      !profile.permanent_address.province ||
      !profile.permanent_address.district ||
      !profile.permanent_address.municipality ||
      !profile.permanent_address.city ||
      !profile.current_address.province ||
      !profile.current_address.district ||
      !profile.current_address.municipality ||
      !profile.current_address.city
    ) {
      setSnackbar({ open: true, message: 'Please fill all required fields!', severity: 'error' });
      return;
    }
  
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      formData.append('gender', profile.gender);
      formData.append('degree', profile.degree);
      formData.append('institute', profile.institute);
      formData.append('permanent_address', JSON.stringify(profile.permanent_address));
      formData.append('current_address', JSON.stringify(profile.current_address));
      if (profile.profile_photo instanceof File) {
        formData.append('profile_photo', profile.profile_photo); // Add profile photo if updated
      }
  
      await axios.put('http://localhost:5000/api/candidate/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      console.error('Error updating profile:', err);
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCancel = () => {
    window.history.back();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/recruiter-dashboard')} sx={{ mr: 2 }}>
            <Dashboard />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            CareerConnect
          </Typography>
        </Toolbar>
      </AppBar>
      
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/candidate-dashboard" sx={{ display: 'flex', alignItems: 'center' }}>
              <Dashboard sx={{ mr: 0.5 }} fontSize="small" />
              Dashboard
            </Link>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 0.5 }} fontSize="small" />
              Edit Profile
            </Typography>
          </Breadcrumbs>
        </Box>
     

        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          <Box 
            sx={{ 
              p: 3, 
              background: 'linear-gradient(to right, #1976d2, #2196f3)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80,
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
                src={
                  profile.profile_photo instanceof File
                    ? URL.createObjectURL(profile.profile_photo)
                    : profile.profile_photo
                    ? `http://localhost:5000${profile.profile_photo}`
                    : undefined
                }
              >
                {!profile.profile_photo && (profile.name ? profile.name.charAt(0).toUpperCase() : 'U')}
              
                
              </Avatar>
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  bgcolor: 'white',
                  '&:hover': { bgcolor: '#f5f5f5' },
                }}
                size="small"
              >
                <PhotoCamera fontSize="small" color="primary" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProfile({ ...profile, profile_photo: e.target.files[0] });
                    }
                  }}
                />
              </IconButton>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {profile.name || 'Your Profile'}
              </Typography>
              <Typography variant="body1">
                Update your personal information
              </Typography>
            </Box>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              variant="fullWidth"
              sx={{ 
                '& .MuiTab-root': { 
                  py: 2,
                  fontWeight: 'medium'
                }
              }}
            >
              <Tab icon={<Person />} iconPosition="start" label="Personal Info" />
              <Tab icon={<Home />} iconPosition="start" label="Address" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Person sx={{ mr: 1 }} /> Personal Information
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Email Address"
                            fullWidth
                            variant="outlined"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            InputProps={{
                              startAdornment: <Email color="action" sx={{ mr: 1 }} />,
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Phone Number"
                            fullWidth
                            variant="outlined"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            InputProps={{
                              startAdornment: <Phone color="action" sx={{ mr: 1 }} />,
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth variant="outlined" sx={{ borderRadius: 1.5 }}>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                              labelId="gender-label"
                              label="Gender"
                              value={profile.gender || ''}
                              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                              sx={{ borderRadius: 1.5 }}
                            >
                              {genderOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <School sx={{ mr: 1 }} /> Education
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Degree"
                            fullWidth
                            variant="outlined"
                            value={profile.degree}
                            onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
                            placeholder="e.g., Bachelor of Computer Science"
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Institute"
                            fullWidth
                            variant="outlined"
                            value={profile.institute}
                            onChange={(e) => setProfile({ ...profile, institute: e.target.value })}
                            placeholder="e.g., University of Technology"
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <Home sx={{ mr: 1 }} /> Permanent Address
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Province"
                            fullWidth
                            variant="outlined"
                            value={profile.permanent_address?.province || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                permanent_address: { ...profile.permanent_address, province: e.target.value },
                              })
                            }
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="District"
                            fullWidth
                            variant="outlined"
                            value={profile.permanent_address?.district || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                permanent_address: { ...profile.permanent_address, district: e.target.value },
                              })
                            }
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Municipality"
                            fullWidth
                            variant="outlined"
                            value={profile.permanent_address?.municipality || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                permanent_address: { ...profile.permanent_address, municipality: e.target.value },
                              })
                            }
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="City"
                            fullWidth
                            variant="outlined"
                            value={profile.permanent_address?.city || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                permanent_address: { ...profile.permanent_address, city: e.target.value },
                              })
                            }
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOn sx={{ mr: 1 }} /> Current Address
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Province"
                            fullWidth
                            variant="outlined"
                            value={profile.current_address?.province || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                current_address: { ...profile.current_address, province: e.target.value },
                              })
                            }
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="District"
                            fullWidth
                            variant="outlined"
                            value={profile.current_address?.district || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                current_address: { ...profile.current_address, district: e.target.value },
                              })
                            }
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="Municipality"
                            fullWidth
                            variant="outlined"
                            value={profile.current_address?.municipality || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                current_address: { ...profile.current_address, municipality: e.target.value },
                              })
                            }
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="City"
                            fullWidth
                            variant="outlined"
                            value={profile.current_address?.city || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                current_address: { ...profile.current_address, city: e.target.value },
                              })
                            }
                            InputProps={{
                              sx: { borderRadius: 1.5 }
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          <Box sx={{ p: 3, display: 'flex', justifyContent: 'flex-end', gap: 2, borderTop: '1px solid #e0e0e0' }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleCancel}
              startIcon={<Cancel />}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProfileUpdate}
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
              disabled={saving}
              sx={{ 
                borderRadius: 2,
                px: 3,
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Paper>

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
      </Container>
    </>
  );
};

export default ProfileEdit;
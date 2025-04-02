// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "../styles/PostJob.css";

// const PostJob = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     company: '',
//     location: '',
//     description: '',
//     salary: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/post-job', formData);
//       alert(res.data.message);
//       navigate('/');
//     } catch (error) {
//       alert('Failed to post job');
//     }
//   };

//   return (
//     <div className="post-job-container">
//       <h2>Post a New Job</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
//         <input type="text" name="company" placeholder="Company Name" onChange={handleChange} required />
//         <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
//         <textarea name="description" placeholder="Job Description" onChange={handleChange} required />
//         <input type="text" name="salary" placeholder="Salary" onChange={handleChange} required />
//         <button type="submit">Post Job</button>
//       </form>
//     </div>
//   );
// };

// export default PostJob;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  Typography,
  Container
} from '@mui/material';
import "../styles/PostJob.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: '',
    jobType: 'full-time',
    skills: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const jobTypes = [
    'full-time',
    'part-time',
    'contract',
    'internship',
    'remote'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length < 50) newErrors.description = 'Description should be at least 50 characters';
    if (formData.salary && !/^\d+(\.\d{1,2})?$/.test(formData.salary)) {
      newErrors.salary = 'Enter valid salary (numbers only)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/post-job', 
        {
          ...formData,
          posted_by: localStorage.getItem('userId') // Add recruiter ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setAlert({
        open: true,
        message: 'Job posted successfully!',
        severity: 'success'
      });
      
      // Reset form after successful submission
      setFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        salary: '',
        jobType: 'full-time',
        skills: ''
      });

      // Redirect after delay
      setTimeout(() => navigate('/recruiter-dashboard'), 1500);

    } catch (error) {
      let message = 'Failed to post job';
      if (error.response) {
        if (error.response.status === 401) {
          message = 'Please login to post jobs';
        } else if (error.response.data?.message) {
          message = error.response.data.message;
        }
      }
      setAlert({
        open: true,
        message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} className="post-job-container">
        <Typography variant="h4" gutterBottom>
          Post a New Job Opportunity
        </Typography>
        
        <form onSubmit={handleSubmit} className="post-job-form">
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Company Name"
            name="company"
            value={formData.company}
            onChange={handleChange}
            error={!!errors.company}
            helperText={errors.company}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Job Type</InputLabel>
            <Select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              label="Job Type"
            >
              {jobTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Salary (optional)"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            error={!!errors.salary}
            helperText={errors.salary}
            margin="normal"
            placeholder="e.g. 50000 or 25.50/hour"
          />

          <TextField
            fullWidth
            label="Required Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            margin="normal"
            placeholder="e.g. JavaScript, React, Node.js"
          />

          <TextField
            fullWidth
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description || "Minimum 50 characters"}
            margin="normal"
            multiline
            rows={6}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            fullWidth
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Post Job'}
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PostJob;
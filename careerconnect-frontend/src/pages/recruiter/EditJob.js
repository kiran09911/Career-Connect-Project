import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
} from '@mui/material';

const EditJob = ({ job, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pre-populate the form with the existing job data
  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitting form data:', formData); // Debugging log
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/jobs/${job.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSuccess();
    } catch (err) {
      console.error('Error updating job:', err);
      setError(err.response?.data?.message || 'Failed to update job');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Edit Job
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        fullWidth
        label="Job Title"
        name="title"
        value={formData.title || ''}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Company"
        name="company"
        value={formData.company || ''}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Location"
        name="location"
        value={formData.location || ''}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description || ''}
        onChange={handleChange}
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        label="Salary"
        name="salary"
        value={formData.salary || ''}
        onChange={handleChange}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Job Type</InputLabel>
        <Select
          name="jobType"
          value={formData.jobType || ''}
          onChange={handleChange}
        >
          <MenuItem value="Full-Time">Full-Time</MenuItem>
          <MenuItem value="Part-Time">Part-Time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
          <MenuItem value="Internship">Internship</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Skills"
        name="skills"
        value={formData.skills || ''}
        onChange={handleChange}
        margin="normal"
      />
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Update Job'}
        </Button>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditJob;
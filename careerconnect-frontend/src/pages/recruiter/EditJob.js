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
  Box,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const EditJob = ({ job, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null); // New photo file to upload
  const [photoPreview, setPhotoPreview] = useState(null); // Preview of current or new photo

  // Pre-populate the form with the existing job data and photo
  useEffect(() => {
    if (job) {
      setFormData(job);
      setPhotoPreview(job.photo ? `http://localhost:5000${job.photo}` : null); // Set preview from existing photo
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Preview the new photo
    }
  };

  const handleDeletePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setFormData({ ...formData, photo: null }); // Mark photo as deleted
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Submitting form data:', formData);
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (photo) {
        data.append('photo', photo); // Append new photo if selected
      } else if (photoPreview === null && job.photo) {
        data.append('photo', ''); // Indicate deletion (backend should interpret empty string or null as delete)
      }

      await axios.put(`http://localhost:5000/api/jobs/${job.id}`, data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
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
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          Job Photo
        </Typography>
        {photoPreview && (
          <Box sx={{ position: 'relative', mb: 2 }}>
            <img
              src={photoPreview}
              alt="Job Preview"
              style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px' }}
            />
            <IconButton
              size="small"
              color="error"
              onClick={handleDeletePhoto}
              sx={{ position: 'absolute', top: 0, right: 0 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <Button
          variant="outlined"
          component="label"
          sx={{ mb: 2 }}
        >
          Upload New Photo
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </Button>
      </Box>
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
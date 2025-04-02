import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';

const EditJob = ({ job, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState(job);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/jobs/${job.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Similar form fields as PostJob.js */}
      <Button type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Update Job'}
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
    </form>
  );
};

export default EditJob;
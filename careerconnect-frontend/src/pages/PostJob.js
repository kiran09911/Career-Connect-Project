import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/PostJob.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/post-job', formData);
      alert(res.data.message);
      navigate('/');
    } catch (error) {
      alert('Failed to post job');
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
        <input type="text" name="company" placeholder="Company Name" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" onChange={handleChange} required />
        <input type="text" name="salary" placeholder="Salary" onChange={handleChange} required />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;

import React, { useState, useEffect } from "react";

const Jobs = () => {
  const [showJobs, setShowJobs] = useState(false);
  const [jobs] = useState([]);

  useEffect(() => {
    const showJobs = localStorage.getItem('showJobs');
    if (showJobs === 'true') {
      setShowJobs(true);
      localStorage.removeItem('showJobs'); // Clean up storage
    }
  }, []);
  

  return (
    <div className="jobs-container">
      <h1>Available Jobs</h1>
      {!showJobs ? (
        <p>Click "Find Jobs" to view available job listings.</p>
      ) : (
        <ul className="job-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <li key={job.id} className="job-item">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
              </li>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Jobs;

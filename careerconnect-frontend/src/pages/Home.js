import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css"; 

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [showJobs, setShowJobs] = useState(false);
  



  // Fetch jobs from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Connect With Your Next Opportunity</h1>
          <p>Join thousands of professionals finding their dream careers</p>
          <div className="buttons">
          
            <Link onClick={() => setShowJobs(true)} className="btn primary">Find Jobs</Link>
            {/* <button
              onClick={() => {
               setShowJobs(true);
                  window.open('/jobsview'); // Open the Jobs page in a new tab
                            }}
                 className="btn primary"
>
                      Find Jobs
                            </button> */}
            <Link to="/post-job" className="btn secondary">Post a Job</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80" alt="Jobs" />
          <h3>Latest Jobs</h3>
          <p>Browse through thousands of opportunities across industries.</p>
          <Link to="/jobs" className="feature-link">View Jobs →</Link>
        </div>

        <div className="feature">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Network" />
          <h3>Professional Network</h3>
          <p>Connect with other professionals in your industry.</p>
          <Link to="/network" className="feature-link">Grow Network →</Link>
        </div>

        <div className="feature">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Companies" />
          <h3>Top Companies</h3>
          <p>Discover leading companies hiring in your field.</p>
          <Link to="/companies" className="feature-link">View Companies →</Link>
        </div>
      </section>

      {/* Job Listings Section */}
      {showJobs && (
        <section className="job-listings">
          <h2>Available Jobs</h2>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p>{job.description}</p>
              </div>
            ))
          ) : (
            <p>No jobs available yet.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;

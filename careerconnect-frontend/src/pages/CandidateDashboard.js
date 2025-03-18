import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import"../styles/Candidate.css";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [showJobs, setShowJobs] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <span>Career Connect</span>
          </div>
          <nav className="nav">
            <Link to="/profile">UserProfile</Link>
            {/* <Link to="#">Companies</Link> 
            <Link to="#">Career Advice</Link> */}
          </nav>
        </div>
      </header>

      {/* <UserProfile userId={userId} /> */}

      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Connect With Your Next Opportunity</h1>
          <p>Join thousands of professionals finding their dream careers</p>
          <div className="buttons">
            <Link onClick={() => setShowJobs(true)} className="btn primary">
              Find Jobs
            </Link>
            <Link to="/post-job" className="btn secondary">
              Post a Job
            </Link>
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

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-company">
              <div className="logo">JobPortal</div>
              <p>Connecting talent with opportunity since 2023.</p>
              <div className="social-links">
                {/* <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Facebook</a> */}
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h3>For Job Seekers</h3>
                <ul>
                  {/* <li><a href="#">Browse Jobs</a></li>
                  <li><a href="#">Career Advice</a></li>
                  <li><a href="#">Resume Builder</a></li>
                  <li><a href="#">Salary Calculator</a></li> */}
                </ul>
              </div>
              <div className="footer-links-column">
                <h3>For Employers</h3>
                <ul>
                  {/* <li><a href="#">Post a Job</a></li>
                  <li><a href="#">Browse Candidates</a></li>
                  <li><a href="#">Pricing Plans</a></li>
                  <li><a href="#">Recruitment Solutions</a></li> */}
                </ul>
              </div>
              <div className="footer-links-column">
                <h3>Company</h3>
                <ul>
                  {/* <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>© {new Date().getFullYear()} Career Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
} from "@mui/material"
import {
  BusinessCenter,
  LocationOn,
  AccessTime,
  AttachMoney,
  Description,
  Chat as ChatIcon,
  Work,
} from "@mui/icons-material"

const AppliedJobs = () => {
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
  
          if (!token) {
            setError("Authentication token not found. Please log in again.");
            setLoading(false);
            return;
          }
  
          // Fetch applications
          const applicationsResponse = await axios.get("http://localhost:5000/api/applications/candidate", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          // Fetch jobs
          const jobsResponse = await axios.get("http://localhost:5000/api/jobs");
  
          // Remove duplicate applications based on job_id
          const uniqueApplications = Array.from(
            new Map(applicationsResponse.data.map((app) => [app.job_id, app])).values()
          );
  
          setApplications(uniqueApplications);
          setJobs(jobsResponse.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError(err.response?.data?.message || "Failed to load your applications. Please try again later.");
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const handleContactRecruiter = (recruiterId, recruiterName) => {
      setSelectedRecruiter({ id: recruiterId, name: recruiterName });
      setShowChat(true);
    };
  
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button variant="contained" component={Link} to="/login">
            Back to Login
          </Button>
        </Box>
      );
    }
  
    return (
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            borderBottom: "1px solid",
            borderColor: "divider",
            pb: 2,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Applied Jobs
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Track your job applications and their status
            </Typography>
          </Box>
          <Chip
            label={`${applications.length} Application${applications.length !== 1 ? "s" : ""}`}
            color="primary"
            icon={<Description />}
          />
        </Box>
  
        {applications.length === 0 ? (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              background: "linear-gradient(to bottom right, #f5f5f5, #ffffff)",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Work sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5 }} />
            </Box>
            <Typography variant="h6" gutterBottom>
              No applications yet
            </Typography>
            <Typography color="text.secondary" paragraph>
              You haven't applied to any jobs yet. Browse available jobs and submit your first application.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/candidate/jobs"
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Browse Jobs
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {applications.map((application) => {
              const job = jobs.find((j) => j.id === application.job_id) || {
                title: "Unknown Position",
                company: "Unknown Company",
                location: "Unknown Location",
                job_type: "Unknown Type",
              };
  
              return (
                <Grid item xs={12} md={6} lg={4} key={application.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      },
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    {application.status && (
                      <Chip
                        label={application.status}
                        color={
                          application.status === "Rejected"
                            ? "error"
                            : application.status === "Accepted"
                            ? "success"
                            : "primary"
                        }
                        sx={{
                          position: "absolute",
                          top: -12,
                          right: 16,
                          fontWeight: "bold",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                    )}
  
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {job.title}
                      </Typography>
  
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {job.company && (
                          <Chip size="small" label={job.company} icon={<BusinessCenter fontSize="small" />} />
                        )}
                        {job.location && (
                          <Chip size="small" label={job.location} icon={<LocationOn fontSize="small" />} />
                        )}
                        {job.job_type && (
                          <Chip
                            size="small"
                            label={job.job_type}
                            color="primary"
                            variant="outlined"
                            icon={<AccessTime fontSize="small" />}
                          />
                        )}
                        {job.salary && (
                          <Chip size="small" label={job.salary} icon={<AttachMoney fontSize="small" />} />
                        )}
                      </Box>
  
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Applied on: {new Date(application.created_at || Date.now()).toLocaleDateString()}
                      </Typography>
                    </CardContent>
  
                    <CardActions sx={{ p: 2, pt: 0, justifyContent: "flex-end" }}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<ChatIcon />}
                        onClick={() => handleContactRecruiter(job.recruiterId, job.recruiterName)}
                        sx={{ borderRadius: 2 }}
                      >
                        Contact Recruiter
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    );
  };
  
  export default AppliedJobs;
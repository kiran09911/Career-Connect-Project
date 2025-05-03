import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CandidateProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Debug: Log the token
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/candidate/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Profile API Response:", response.data); // Debug: Log the response
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        console.error("Error response:", err.response?.data); // Debug: Log error details
        setSnackbar({
          open: true,
          message: err.response?.data?.message || "Failed to fetch profile",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6" color="text.secondary">
          No profile data found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "primary.main",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
            src={profile.profile_photo ? `http://localhost:5000${profile.profile_photo}` : undefined}
            onError={(e) => {
              e.target.src = undefined; // Fallback to the avatar if the image fails to load
            }}
          >
            {profile.name?.charAt(0).toUpperCase() || "C"}
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {profile.name || "N/A"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {profile.email || "N/A"}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Phone:
            </Typography>
            <Typography variant="body1">{profile.phone || "Not provided"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Gender:
            </Typography>
            <Typography variant="body1">{profile.gender || "Not provided"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Degree:
            </Typography>
            <Typography variant="body1">{profile.degree || "Not provided"}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" fontWeight="bold">
              Institute:
            </Typography>
            <Typography variant="body1">{profile.institute || "Not provided"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Permanent Address:
            </Typography>
            <Typography variant="body1">
              {profile.permanent_address
                ? `${profile.permanent_address.province || "N/A"}, ${profile.permanent_address.district || "N/A"}, ${profile.permanent_address.municipality || "N/A"}, ${profile.permanent_address.city || "N/A"}`
                : "Not provided"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Current Address:
            </Typography>
            <Typography variant="body1">
              {profile.current_address
                ? `${profile.current_address.province || "N/A"}, ${profile.current_address.district || "N/A"}, ${profile.current_address.municipality || "N/A"}, ${profile.current_address.city || "N/A"}`
                : "Not provided"}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Edit />}
            onClick={() => navigate("/candidate/profile/edit")}
          >
            Edit Profile
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CandidateProfile;
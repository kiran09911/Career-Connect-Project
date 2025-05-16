import { useState } from "react";
import { Box, Typography, Container, Paper, TextField, Button, Grid, Snackbar, Alert } from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  };
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Submitting feedback with token:", token ? "Present" : "Missing");
      console.log("Request payload:", formData);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.post(
        "http://localhost:5000/api/admin/feedback", 
        formData,
        config
      );

        console.log("Feedback submitted successfully:", response.data);

    setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data || error.message);
      let errorMessage = "Failed to submit feedback. Please try again.";
      
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: "calc(100vh - 64px)",
        mt: "64px",
        bgcolor: "#f5f7fa",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            p: 2,
            borderRadius: "8px 8px 0 0",
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Contact Us
          </Typography>
        </Box>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <Grid container spacing={4}>
            {/* Contact Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: "#1565c0" }}>
                You Will Grow, You Will Succeed
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Phone sx={{ color: "#2e7d32", fontSize: 30 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Call for Inquiry
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +977-9741720726
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Email sx={{ color: "#2e7d32", fontSize: 30 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Send us Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      careerconnect1@gmail.com
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <LocationOn sx={{ color: "#2e7d32", fontSize: 30 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Office
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      koteshwor, kathmandu
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: "#e0e0e0",
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Share your feedback
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        sx={{ bgcolor: "white" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        sx={{ bgcolor: "white" }}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ bgcolor: "white" }}
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    sx={{ bgcolor: "white" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#1976d2",
                      color: "white",
                      textTransform: "none",
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#1565c0" },
                    }}
                  >
                    Send Feedback
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
          sx={{ width: "100%", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar> */}
    </Box>
  );
};

export default ContactUs;


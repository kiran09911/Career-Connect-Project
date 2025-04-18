import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Alert, 
  Snackbar,
  CircularProgress,
  Paper,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  Container,
  Divider,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  Avatar
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import "../../styles/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "",
    rememberMe: false 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "error" });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Pre-fill email if remembered
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
  
      // Handle remember me
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      // Store authentication data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("userId", res.data.id);
  
      // Redirect with role-based routing
      navigate(res.data.role === "recruiter" ? "/recruiter-dashboard" : "/candidate-dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.status === 401 ? "Invalid email or password" : "Login failed. Please try again.");
      setError(errorMessage);
      setAlert({
        open: true,
        message: errorMessage,
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper 
        elevation={6} 
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar 
            sx={{ 
              mb: 2, 
              bgcolor: 'primary.main', 
              width: 56, 
              height: 56 
            }}
          >
            <LockOutlined fontSize="large" />
          </Avatar>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            Sign in to continue to CareerConnect
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2, 
              borderRadius: 1.5,
              '& .MuiAlert-icon': { alignItems: 'center' }
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="email"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 1.5 } }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="current-password"
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 1.5 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    aria-label={showPassword ? "hide password" : "show password"}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            mt: 1,
            mb: 2
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  Remember me
                </Typography>
              }
            />

            <Link 
              to="/forgot-password" 
              style={{ 
                textDecoration: 'none', 
                color: theme.palette.primary.main,
                fontWeight: 'medium',
                fontSize: '0.875rem'
              }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ 
              mt: 2, 
              mb: 2, 
              py: 1.5, 
              borderRadius: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              style={{ 
                textDecoration: "none", 
                color: theme.palette.primary.main,
                fontWeight: 'bold'
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alert.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
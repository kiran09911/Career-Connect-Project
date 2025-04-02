
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Auth.css";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/login", formData);

//       if (res.data.token) {
//         alert(res.data.message);
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("role", res.data.role);

//         if (res.data.role === "recruiter") navigate("/recruiter-dashboard");
//         else navigate("/candidate-dashboard");
//       } else {
//         setError("Invalid credentials, please try again.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Login failed!");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Login</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//           <button type="submit">Login</button>
//         </form>
//         <p>Don't have an account? <a href="/register">Register</a></p>
//         <p>Forgot Password <a href="/forgot-password">ForgotPassword</a></p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState, useEffect } from "react";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
  Box
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../styles/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "",
    rememberMe: false 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      const res = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password
      });

      // Store authentication data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("userId", res.data.id); // Needed for chat system
      
    // Immediate redirect
    window.location.href = res.data.role === 'recruiter' 
    ? '/recruiter-dashboard' 
    : '/candidate-dashboard';
      
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect with role-based routing
      navigate(res.data.role === "recruiter" 
        ? "/recruiter-dashboard" 
        : "/candidate-dashboard");

    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         (err.response?.status === 401 
                          ? "Invalid email or password" 
                          : "Login failed. Please try again.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <Paper elevation={3} className="auth-box">
        <Typography variant="h4" gutterBottom>
          Welcome to CareerConnect
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Please sign in to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
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
            my: 2
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Remember me"
            />

            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
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
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;

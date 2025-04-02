// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Auth.css";

// const Register = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "candidate" });
//   const navigate = useNavigate();

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/register", formData);
//       alert("Registration successful! Please login.");
//       navigate("/login");
//     } catch (error) {
//       alert("Error during registration.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

//           <select name="role" onChange={handleChange}>
//             <option value="candidate">Candidate</option>
//             <option value="recruiter">Recruiter</option>
//           </select>

//           <button type="submit">Register</button>
//         </form>
//         <p>Already have an account? <a href="/login">Login</a></p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Alert, 
  Snackbar,
  CircularProgress,
  Paper,
  Typography
} from "@mui/material";
import "../styles/Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "candidate" 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      
      // Store token if automatically logged in after registration
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", formData.role);
        navigate(formData.role === "recruiter" ? "/recruiter-dashboard" : "/candidate-dashboard");
      } else {
        setAlert({
          open: true,
          message: "Registration successful! Please login.",
          severity: "success"
        });
        navigate("/login");
      }
    } catch (error) {
      let message = "Error during registration";
      if (error.response) {
        if (error.response.status === 409) {
          message = "Email already exists";
        } else if (error.response.data?.message) {
          message = error.response.data.message;
        }
      }
      setAlert({ open: true, message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div className="auth-container">
      <Paper elevation={3} className="auth-box">
        <Typography variant="h4" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Join CareerConnect as {formData.role}
        </Typography>

        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>I am a...</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="I am a..."
            >
              <MenuItem value="candidate">Job Candidate</MenuItem>
              <MenuItem value="recruiter">Recruiter</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            style={{ marginTop: "20px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>

        <Typography variant="body2" style={{ marginTop: "20px", textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Paper>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;
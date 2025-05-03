// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { 
//   TextField, 
//   Button, 
//   Select, 
//   MenuItem, 
//   FormControl, 
//   InputLabel, 
//   Alert, 
//   Snackbar,
//   CircularProgress,
//   Paper,
//   Typography,
//   Box,
//   Container,
//   Divider,
//   useTheme,
//   useMediaQuery,
//   Avatar
// } from "@mui/material";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import "../../styles/Auth.css";

// const Register = () => {
//   const [formData, setFormData] = useState({ 
//     name: "", 
//     email: "", 
//     password: "", 
//     role: "candidate", 
//     confirmPassword: "" 
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/register", formData);
  
//       // Show success message and redirect to login page
//       setAlert({
//         open: true,
//         message: "Registration successful! Please login.",
//         severity: "success",
//       });
//       navigate("/login");
//     } catch (error) {
//       let message = "Error during registration";
//       if (error.response) {
//         if (error.response.status === 409) {
//           message = "Email already exists";
//         } else if (error.response.data?.message) {
//           message = error.response.data.message;
//         }
//       }
//       setAlert({ open: true, message, severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleCloseAlert = () => {
//     setAlert({ ...alert, open: false });
//   };

//   return (
//     <Container maxWidth="sm" sx={{ py: 4 }}>
//       <Paper 
//         elevation={6} 
//         sx={{
//           p: { xs: 3, sm: 4 },
//           borderRadius: 2,
//           background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)',
//           boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
//           <Avatar 
//             sx={{ 
//               mb: 2, 
//               bgcolor: 'primary.main', 
//               width: 56, 
//               height: 56 
//             }}
//           >
//             <PersonAddIcon fontSize="large" />
//           </Avatar>
//           <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
//             Create Account
//           </Typography>
//           <Typography variant="body1" color="text.secondary" align="center">
//             Join CareerConnect as a {formData.role === "candidate" ? "Job Seeker" : "Recruiter"}
//           </Typography>
//         </Box>

//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Full Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             error={!!errors.name}
//             helperText={errors.name}
//             fullWidth
//             margin="normal"
//             required
//             variant="outlined"
//             InputProps={{ sx: { borderRadius: 1.5 } }}
//           />

//           <TextField
//             label="Email Address"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             error={!!errors.email}
//             helperText={errors.email}
//             fullWidth
//             margin="normal"
//             required
//             variant="outlined"
//             InputProps={{ sx: { borderRadius: 1.5 } }}
//           />

//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={!!errors.password}
//             helperText={errors.password || "Password must be at least 6 characters"}
//             fullWidth
//             margin="normal"
//             required
//             variant="outlined"
//             InputProps={{ sx: { borderRadius: 1.5 } }}
//           />

//           <FormControl fullWidth margin="normal" variant="outlined">
//             <InputLabel id="role-label">I am a...</InputLabel>
//             <Select
//               labelId="role-label"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               label="I am a..."
//               sx={{ borderRadius: 1.5 }}
//             >
//               <MenuItem value="candidate">Job Candidate</MenuItem>
//               <MenuItem value="recruiter">Recruiter</MenuItem>
//             </Select>
//           </FormControl>

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             size="large"
//             disabled={loading}
//             sx={{ 
//               mt: 3, 
//               mb: 2, 
//               py: 1.5, 
//               borderRadius: 1.5,
//               textTransform: 'none',
//               fontSize: '1rem',
//               fontWeight: 'bold',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
//             }}
//           >
//             {loading ? <CircularProgress size={24} /> : "Create Account"}
//           </Button>
//         </form>

//         <Divider sx={{ my: 3 }}>
//           <Typography variant="body2" color="text.secondary">
//             OR
//           </Typography>
//         </Divider>

//         <Box sx={{ textAlign: 'center' }}>
//           <Typography variant="body2">
//             Already have an account?{" "}
//             <Link 
//               to="/login" 
//               style={{ 
//                 textDecoration: "none", 
//                 color: theme.palette.primary.main,
//                 fontWeight: 'bold'
//               }}
//             >
//               Sign In
//             </Link>
//           </Typography>
//         </Box>
//       </Paper>

//       <Snackbar
//         open={alert.open}
//         autoHideDuration={6000}
//         onClose={handleCloseAlert}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert 
//           onClose={handleCloseAlert} 
//           severity={alert.severity}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {alert.message}
//         </Alert>
//       </Snackbar>
//     </Container>
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
  Typography,
  Box,
  Container,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "../../styles/Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "candidate", 
    confirmPassword: "" 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must contain at least one capital letter and one number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
  
      // Show success message and redirect to login page
      setAlert({
        open: true,
        message: "Registration successful! Please login.",
        severity: "success",
      });
      navigate("/login");
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <PersonAddIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            Join CareerConnect as a {formData.role === "candidate" ? "Job Seeker" : "Recruiter"}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
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
            variant="outlined"
            InputProps={{ sx: { borderRadius: 1.5 } }}
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            InputProps={{ sx: { borderRadius: 1.5 } }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password || "Must be 6+ characters with 1 capital letter and 1 number"}
            fullWidth
            margin="normal"
            required
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

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 1.5 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                    aria-label={showConfirmPassword ? "hide confirm password" : "show confirm password"}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="role-label">I am a...</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="I am a..."
              sx={{ borderRadius: 1.5 }}
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
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5, 
              borderRadius: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Create Account"}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link 
              to="/login" 
              style={{ 
                textDecoration: "none", 
                color: theme.palette.primary.main,
                fontWeight: 'bold'
              }}
            >
              Sign In
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

export default Register;
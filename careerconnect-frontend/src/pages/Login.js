// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";  
// import axios from "axios";  
// import "../styles/Auth.css"; 

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/login", { email, password });

//       if (res.data.token) {  
//         alert(res.data.message);
//         localStorage.setItem("token", res.data.token); 
//         navigate("/Home");  
//       }
//     } catch (error) {
//       alert("Login failed! Please check your credentials.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Login</h2>
//         <p>Welcome Back</p>
//         <div className="social-login">
//           <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
//         </div>
//         <form onSubmit={handleSubmit}>
//           <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//           <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
//           <button type="submit">Login</button>
//         </form>
//         <p className="signup-link">Don't have an account? <a href="/Register">Signup</a></p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/login", formData);

      if (res.data.token) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        if (res.data.role === "recruiter") navigate("/recruiter-dashboard");
        else navigate("/candidate-dashboard");
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
        <p>Forgot Password <a href="/forgot-password">ForgotPassword</a></p>
      </div>
    </div>
  );
};

export default Login;

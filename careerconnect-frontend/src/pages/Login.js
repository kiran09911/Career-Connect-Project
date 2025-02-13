import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import axios from "axios";  
import "../styles/Auth.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });

      if (res.data.token) {  
        alert(res.data.message);
        localStorage.setItem("token", res.data.token); 
        navigate("/Home");  
      }
    } catch (error) {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <p>Welcome Back</p>
        <div className="social-login">
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">Don't have an account? <a href="/Register">Signup</a></p>
      </div>
    </div>
  );
};

export default Login;

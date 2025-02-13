import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css"; 


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", { name, email, password });
      alert("User registered successfully!");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="auth-container">
     <div className="auth-box">
        <h2>Signup</h2>
        <p>Create an account</p>
        <div className="social-login">
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
          <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="Facebook" />
          <span> OR </span>
        </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Create Account</button>
        
      </form>  
      
        <p className="login-link">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;






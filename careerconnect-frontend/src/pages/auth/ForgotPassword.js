import React, { useState } from "react";
import axios from "axios";
import "../../styles/Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error sending reset email. Please try again.");
      }
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

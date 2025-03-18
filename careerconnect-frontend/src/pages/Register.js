// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/Auth.css"; 

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("candidate"); // Default role

//   const handleChange = (e) => {
//     setRole(e.target.value); // ✅ Update the role state when user selects an option
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/register", { name, email, password, role });
//       alert("User registered successfully!");
//     } catch (error) {
//       alert("Registration failed!");
//     }
//   };

//   return (
//     <div className="auth-container">
//      <div className="auth-box">
//         <h2>Signup</h2>
//         <p>Create an account</p>
//         <div className="social-login">
//           <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
//           <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="Facebook" />
//           <span> OR </span>
//         </div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
//         <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        
//         {/* ✅ Corrected handleChange function */}
//         <select name="role" onChange={handleChange} value={role}>
//             <option value="candidate">Candidate</option>
//             <option value="recruiter">Recruiter</option>
//         </select>

//         <p>By signing up, you agree to our Terms & Privacy Policy</p>
//         <button type="submit">Create Account</button>
//       </form>  
      
//         <p className="login-link">Already have an account? <a href="/login">Login</a></p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "candidate" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert("Error during registration.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <select name="role" onChange={handleChange}>
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>

          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import { BrowserRouter , Route, Routes, } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"; 
import PostJob from './pages/PostJob';
import JobsList from './pages/JobsList';
import "./styles/Auth.css";  
import "./styles/Home.css"; 
import './styles/PostJob.css';

const NotFound = () => <h1>404 - Page Not Found</h1>;

const App = () => {
  return (
    <BrowserRouter>
    
      {/* <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav> */}

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobsview" element={<JobsList />} />
        <Route path="/post-job" element={<PostJob />} /> 
        <Route path="*" element={<NotFound />} /> {/* Handle unknown routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

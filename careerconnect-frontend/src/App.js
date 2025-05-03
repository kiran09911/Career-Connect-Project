import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import { io } from 'socket.io-client';
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import PostJob from './pages/recruiter/PostJob';
import JobsList from './pages/candidate/JobsList';
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AppliedJobs from "./pages/candidate/AppliedJobs";
// import ProfileEdit from './pages/shared/ProfileEdit';
import ProfileEdit from './pages/recruiter/ProfileEdit';
import CandidateProfileEdit from './pages/candidate/CandidateProfileEdit';
import CandidateProfile from "./pages/candidate/CandidateProfile";


import ProtectedRoute from "./components/auth/ProtectedRoute";


 // For auth protection

import "./styles/Auth.css";
import "./styles/Home.css";
import './styles/PostJob.css';
import './styles/Profile.css';
import './styles/Chat.css'; 
import './styles/Candidate.css';// Add this new CSS file


const getUserId = () => {
  return localStorage.getItem("userId"); // Assuming user ID is stored in localStorage after login
};

const loggedInUserId = getUserId(); // Get the logged-in user ID


const App = () => {
  return(
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            

            {/* Protected routes */}
            <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
              <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
              <Route path="/candidate/applications" element={<AppliedJobs />} />
              <Route path="/candidate/profile/edit" element={<CandidateProfileEdit />} />
              <Route path="/candidate/profile" element={<CandidateProfile />} />

            </Route>

            

            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/recruiter/profile-edit" element={<ProfileEdit  />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['candidate', 'recruiter']} />}>
              <Route path="/jobsview" element={<JobsList />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
     
    // </SocketContext.Provider>
  );
};

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};


export default App;


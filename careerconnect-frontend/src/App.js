import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import PostJob from './pages/recruiter/PostJob';
// import JobsList from './pages/candidate/JobsList';
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AppliedJobs from "./pages/candidate/AppliedJobs";
import ProfileEdit from './pages/recruiter/ProfileEdit';
import CandidateProfileEdit from './pages/candidate/CandidateProfileEdit';
import CandidateProfile from "./pages/candidate/CandidateProfile";
import Profile from './pages/recruiter/Profile';
import ContactUs from "./components/ContactUs";
import TermsAndCondition from './pages/auth/TermsAndCondition';
import Home from "./pages/shared/Home";



import ProtectedRoute from "./components/auth/ProtectedRoute";


 // For auth protection

import "./styles/Auth.css";
import "./styles/Home.css";
import './styles/PostJob.css';
import './styles/Profile.css';
import './styles/Chat.css'; 
import './styles/Candidate.css';


const getUserId = () => {
  return localStorage.getItem("userId"); // Assuming user ID is stored in localStorage after login
};

const loggedInUserId = getUserId(); // Get the logged-in user ID


const App = () => {
  return(
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
            <Route path="/Home" element={<Home/>} />


            <Route path="/admin" element={<AdminDashboard />} />
            
            

            {/* Protected routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Route>
              
            <Route element={<ProtectedRoute allowedRoles={['candidate']} />}>
              <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
              <Route path="/candidate/applications" element={<AppliedJobs />} />
              <Route path="/candidate/profile/edit" element={<CandidateProfileEdit />} />
              <Route path="/candidate/profile" element={<CandidateProfile />} />
              <Route path="/candidate/contact" element={<ContactUs />} />
              <Route path="/candidate/resetpassword" element={<ResetPassword />} />

            </Route>
            

            

            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/recruiter/profile-edit" element={<ProfileEdit  />} />
              <Route path="/recruiteredit/profile" element={<Profile />} />
              <Route path="/recruiter/contact" element={<ContactUs />} />
              <Route path="/recruiter/resetpassword" element={<ResetPassword />} />

            </Route>

            <Route element={<ProtectedRoute allowedRoles={['candidate', 'recruiter']} />}>
              {/* <Route path="/jobsview" element={<JobsList />} /> */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
     
  
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


// import React from "react";
// import { BrowserRouter , Route, Routes, } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Home from "./pages/Home"; 
// import PostJob from './pages/PostJob';
// import JobsList from './pages/JobsList';
// import CandidateDashboard from "./pages/CandidateDashboard";
// import RecruiterDashboard from "./pages/RecruiterDashboard";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import UserProfile from "./components/UserProfile"; 



// import "./styles/Auth.css";  
// import "./styles/Home.css"; 
// import './styles/PostJob.css';
// import './styles/Profile.css';


// const NotFound = () => <h1>404 - Page Not Found</h1>;

// const App = () => {
//   return (
//     <BrowserRouter>
    
//       {/* <nav className="navbar">
//         <Link to="/">Home</Link>
//         <Link to="/register">Register</Link>
//         <Link to="/login">Login</Link>
//       </nav> */}

//       <Routes>
//         <Route path="/" element={<Register />} />
//         <Route path="/home" element={<Home />} /> 
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/jobsview" element={<JobsList />} />
//         <Route path="/post-job" element={<PostJob />} /> 
//         <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
//         <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/profile" element={<UserProfile />} />
     
//         <Route path="*" element={<NotFound />} /> {/* Handle unknown routes */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostJob from './pages/PostJob';
import JobsList from './pages/JobsList';
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./components/UserProfile";

import ProtectedRoute from "./components/ProtectedRoute";
import { ChatProvider } from './context/ChatContext';

 // For auth protection

import "./styles/Auth.css";
import "./styles/Home.css";
import './styles/PostJob.css';
import './styles/Profile.css';
import './styles/Chat.css'; 
import './styles/Candidate.css';// Add this new CSS file

// Socket.io context setup
export const SocketContext = React.createContext();

const App = () => {
  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    // Initialize socket connection when user is authenticated
    const token = localStorage.getItem('token');
    if (token && !socket) {
      const newSocket = io('http://localhost:5000', {
        auth: { token },
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <ChatProvider>
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
            </Route>

            

            <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
              <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
              <Route path="/post-job" element={<PostJob />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['candidate', 'recruiter']} />}>
              <Route path="/jobsview" element={<JobsList />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </SocketContext.Provider>
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
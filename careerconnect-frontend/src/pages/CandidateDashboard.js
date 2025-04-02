// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/Home.css";
// import "../styles/Candidate.css";
// import Chat from "../components/Chat"; 
// import { List, ListItem, ListItemText, Avatar, Badge, IconButton, Dialog, DialogTitle, DialogContent } from "@mui/material";
// import ChatIcon from '@mui/icons-material/Chat';
// import CloseIcon from '@mui/icons-material/Close';
// import Button from '@mui/material/Button';



// const Home = () => {
//   const [jobs, setJobs] = useState([]);
  
// const [loading, setLoading] = useState(false);
//   const [showJobs, setShowJobs] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [conversations, setConversations] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [showChat, setShowChat] = useState(false);
//   const [unreadCounts, setUnreadCounts] = useState({});
//   const navigate = useNavigate();
//   const [authChecked, setAuthChecked] = useState(false)

//   useEffect(() => {
//     const verifyAuth = async () => {
//       const token = localStorage.getItem('token');
//       console.log('Initial token check:', token);
      
//       if (!token) {
//         console.log('No token found - redirecting');
//         navigate('/login');
//         return;
//       }

//       try {
//         console.log('Verifying token with backend...');
//         const response = await axios.get('http://localhost:5000/api/user', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        
//         console.log('Auth response:', response.data);
//         if (!response.data?.id) {
//           throw new Error('Invalid user data');
//         }

//         setCurrentUser(response.data);
//         localStorage.setItem('userRole', response.data.role);
//         localStorage.setItem('userId', response.data.id);

//       } catch (err) {
//         console.error('Auth verification failed:', err);
//         localStorage.clear();
//         navigate('/login');
//       } finally {
//         setAuthChecked(true);
//         setLoading(false);
//         console.log('Auth check completed');
//       }
//     };

//     verifyAuth();
//   }, [navigate])

//   // Fetch current user data
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     axios.get('http://localhost:5000/api/user', {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(res => setCurrentUser(res.data))
//     .catch(err => {
//       console.error("Error fetching user:", err);
//       navigate('/login');
//     });
//   }, [navigate]);

//   // Fetch jobs from backend
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/jobs")
//       .then((res) => setJobs(res.data))
//       .catch((err) => console.error("Error fetching jobs:", err));
//   }, []);

  

//   // Fetch conversations
//   useEffect(() => {
//     if (!currentUser?.id) return;

//     axios.get(`http://localhost:5000/api/conversations/${currentUser.id}`)
//       .then(res => {
//         setConversations(res.data);
        
//         // Initialize unread counts
//         const counts = {};
//         res.data.forEach(conv => {
//           counts[conv.id] = conv.unread_count || 0;
//         });
//         setUnreadCounts(counts);
//       })
//       .catch(err => console.error("Error fetching conversations:", err));
//   }, [currentUser?.id]);

//   const handleChatOpen = (conversation) => {
//     setSelectedChat({
//       id: conversation.other_user_id,
//       name: conversation.other_user_name,
//       conversationId: conversation.id,
//       jobId: conversation.job_id
//     });
//     setShowChat(true);
    
//     // Mark as read when opening chat
//     if (unreadCounts[conversation.id] > 0) {
//       setUnreadCounts(prev => ({ ...prev, [conversation.id]: 0 }));
//     }
//   };

//   return (
//     <div className="home-container">
//       {/* Header Section with Chat Icon */}
//       <header className="header">
//         <div className="container">
//           <div className="logo">
//             <span>Career Connect</span>
//           </div>
//           <nav className="nav">
//             <Link to="/profile">UserProfile</Link>
//             <IconButton 
//               color="inherit" 
//               onClick={() => setShowChat(true)}
//               style={{ marginLeft: 'auto' }}
//             >
//               <Badge 
//                 badgeContent={Object.values(unreadCounts).reduce((a, b) => a + b, 0)} 
//                 color="error"
//               >
//                 <ChatIcon />
//               </Badge>
//             </IconButton>
//           </nav>
//         </div>
//       </header>

//       {/* Chat Dialog */}
//       <Dialog 
//         open={showChat} 
//         onClose={() => setShowChat(false)}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>
//           Messages
//           <IconButton
//             aria-label="close"
//             onClick={() => setShowChat(false)}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {!selectedChat ? (
//             <List>
//               {conversations.length > 0 ? (
//                 conversations.map(conversation => (
//                   <ListItem 
//                     button 
//                     key={conversation.id}
//                     onClick={() => handleChatOpen(conversation)}
//                     secondaryAction={
//                       <Badge 
//                         badgeContent={unreadCounts[conversation.id] || 0} 
//                         color="primary"
//                       />
//                     }
//                   >
//                     <Avatar>{conversation.other_user_name.charAt(0)}</Avatar>
//                     <ListItemText
//                       primary={conversation.other_user_name}
//                       secondary={conversation.last_message}
//                       style={{ marginLeft: '16px' }}
//                     />
//                   </ListItem>
//                 ))
//               ) : (
//                 <ListItem>
//                   <ListItemText primary="No conversations yet" />
//                 </ListItem>
//               )}
//             </List>
//           ) : (
//             <>
//               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
//                 <Avatar>{selectedChat.name.charAt(0)}</Avatar>
//                 <h3 style={{ marginLeft: '16px' }}>{selectedChat.name}</h3>
//                 <Button 
//                   style={{ marginLeft: 'auto' }}
//                   onClick={() => setSelectedChat(null)}
//                 >
//                   Back to conversations
//                 </Button>
//               </div>
//               {currentUser && (
//                 <Chat 
//                   currentUser={currentUser} 
//                   otherUser={selectedChat} 
//                 />
//               )}
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Rest of your existing components... */}
//       <section className="hero">
//         {/* ... existing hero content ... */}
//       </section>

//       <section className="features">
//         {/* ... existing features ... */}
//       </section>

//       {showJobs && (
//         <section className="job-listings">
//           {/* ... existing job listings ... */}
//         </section>
//       )}

//       <footer className="footer">
//         {/* ... existing footer ... */}
//       </footer>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import"../styles/Candidate.css";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [showJobs, setShowJobs] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <span>Career Connect</span>
          </div>
          <nav className="nav">
            <Link to="/profile">UserProfile</Link>
            {/* <Link to="#">Companies</Link> 
            <Link to="#">Career Advice</Link> */}
          </nav>
        </div>
      </header>

      {/* <UserProfile userId={userId} /> */}

      {/* Hero Section */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Connect With Your Next Opportunity</h1>
          <p>Join thousands of professionals finding their dream careers</p>
          <div className="buttons">
            <Link onClick={() => setShowJobs(true)} className="btn primary">
              Find Jobs
            </Link>
            {/* <Link to="/post-job" className="btn secondary">
              Post a Job
            </Link> */}
          </div>
        </div>
      </section>
      
            {/* Features Section */}
            <section className="features">
              <div className="feature">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80" alt="Jobs" />
                <h3>Latest Jobs</h3>
                <p>Browse through thousands of opportunities across industries.</p>
                <Link to="/jobs" className="feature-link">View Jobs →</Link>
              </div>
      
              <div className="feature">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Network" />
                <h3>Professional Network</h3>
                <p>Connect with other professionals in your industry.</p>
                <Link to="/network" className="feature-link">Grow Network →</Link>
              </div>
      
              <div className="feature">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Companies" />
                <h3>Top Companies</h3>
                <p>Discover leading companies hiring in your field.</p>
                <Link to="/companies" className="feature-link">View Companies →</Link>
              </div>
            </section>

      {/* Job Listings Section */}
      {showJobs && (
        <section className="job-listings">
          <h2>Available Jobs</h2>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p>{job.description}</p>
              </div>
            ))
          ) : (
            <p>No jobs available yet.</p>
          )}
        </section>
      )}

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-company">
              <div className="logo">JobPortal</div>
              <p>Connecting talent with opportunity since 2023.</p>
              <div className="social-links">
                {/* <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Facebook</a> */}
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-links-column">
                <h3>For Job Seekers</h3>
                <ul>
                  {/* <li><a href="#">Browse Jobs</a></li>
                  <li><a href="#">Career Advice</a></li>
                  <li><a href="#">Resume Builder</a></li>
                  <li><a href="#">Salary Calculator</a></li> */}
                </ul>
              </div>
              <div className="footer-links-column">
                <h3>For Employers</h3>
                <ul>
                  {/* <li><a href="#">Post a Job</a></li>
                  <li><a href="#">Browse Candidates</a></li>
                  <li><a href="#">Pricing Plans</a></li>
                  <li><a href="#">Recruitment Solutions</a></li> */}
                </ul>
              </div>
              <div className="footer-links-column">
                <h3>Company</h3>
                <ul>
                  {/* <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li> */}
                </ul>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>© {new Date().getFullYear()} Career Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
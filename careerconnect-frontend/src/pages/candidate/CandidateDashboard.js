// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Avatar, CircularProgress } from '@mui/material';
// import ChatIcon from '@mui/icons-material/Chat';
// import LogoutIcon from '@mui/icons-material/Logout';
// import ChatDialog from '../components/chat/Chat';
// import { getToken } from './auth/Login'; 
// import { io } from 'socket.io-client';


// const socket = io('http://localhost:5000', {
//     autoConnect: false, // Prevent immediate connection
//     withCredentials: true
//   });
// // Connect when needed

// const Home = () => {
//     const navigate = useNavigate();
//     const [currentUser] = useState(null);
//     const [] = useState(false);
//     const [loading] = useState(true);
//     const [conversations, setConversations] = useState([]);
//     const [unreadCounts, setUnreadCounts] = useState({});
//     const [showChat, setShowChat] = useState(false);
//     const [selectedChat, setSelectedChat] = useState(null);

//     useEffect(() => {
//       const verifyAuth = async () => {
//         try {
//             const token = localStorage.getItem("token"); // Get token
//             if (!token) {
//                 console.log("No token found in localStorage");
//                 return;
//             }
    
//             const response = await axios.get("http://localhost:5000/api/user", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
    
//             console.log("User Data:", response.data);
//         } catch (error) {
//             console.error("Auth verification failed:", error);
//         }
//     };
      
//           verifyAuth();    
//     }, [navigate]);

//     useEffect(() => {
//         if (!currentUser || !currentUser.id) return;
//         axios.get(`http://localhost:5000/api/conversations/${currentUser.id}`)
//             .then(res => {
//                 setConversations(res.data);
                
//                 const counts = {};
//                 res.data.forEach(conv => {
//                     counts[conv.id] = conv.unread_count || 0;
//                 });
//                 setUnreadCounts(counts);
//             })
//             .catch(err => console.error("Error fetching conversations:", err));
//     }, [currentUser]);

//     const handleChatOpen = (chat) => {
//         setSelectedChat(chat);
//         setShowChat(true);
//     };

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate('/login');
//     };

//     if (loading) {
//         return <CircularProgress style={{ display: 'block', margin: '20% auto' }} />;
//     }

//     return (
//         <div>
//             <AppBar position="static">
//                 <Toolbar>
//                     <Typography variant="h6">Career Connect</Typography>
//                     <IconButton 
//                         color="inherit" 
//                         onClick={() => setShowChat(!showChat)} 
//                         style={{ marginLeft: 'auto' }}
//                     >
//                         <Badge 
//                             badgeContent={Object.values(unreadCounts).reduce((a, b) => a + b, 0)} 
//                             color="error"
//                         >
//                             <ChatIcon />
//                         </Badge>
//                     </IconButton>
//                     <IconButton color="inherit" onClick={handleLogout}>
//                         <LogoutIcon />
//                     </IconButton>
//                 </Toolbar>
//             </AppBar>

//             <div style={{ padding: '20px' }}>
//                 <Typography variant="h4">Welcome, {currentUser?.name || 'User'}!</Typography>
//                 <Typography variant="subtitle1">Your role: {currentUser?.role}</Typography>

//                 <Typography variant="h5" style={{ marginTop: '20px' }}>Conversations</Typography>
//                 <ul>
//                     {conversations.map(chat => (
//                         <li key={chat.id} style={{ cursor: 'pointer' }} onClick={() => handleChatOpen(chat)}>
//                             <Avatar>{chat?.name?.charAt(0) || "U"}</Avatar>
//                             <h3>{chat?.name || "Unknown"}</h3>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {showChat && selectedChat && (
//                 <ChatDialog chat={selectedChat} onClose={() => setShowChat(false)} />
//             )}
//         </div>
//     );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Avatar,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [showChat, setShowChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      autoConnect: false,
      withCredentials: true,
      auth: {
        token: localStorage.getItem('token'),
      },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Verify authentication and fetch user data
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
    
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        setCurrentUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyAuth();
  }, [navigate, socket]);

  // Fetch available jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  // Fetch conversations
  useEffect(() => {
    if (!currentUser?.id) return;
    console.log('Current User:', currentUser); // Debugging
  if (!currentUser?.id) return;

  
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/conversations/${currentUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data.length === 0) {
          console.log('No conversations found');
          setConversations([]);
          return;
        }
  
        setConversations(response.data);
  
        const counts = {};
        response.data.forEach((conv) => {
          counts[conv.id] = conv.unread_count || 0;
        });
        setUnreadCounts(counts);
      } catch (err) {
        console.error('Error fetching conversations:', err);
      }
    };
  
    fetchConversations();
  }, [currentUser]);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (message.conversation_id && message.sender_id !== currentUser?.id) {
        setUnreadCounts((prev) => ({
          ...prev,
          [message.conversation_id]: (prev[message.conversation_id] || 0) + 1,
        }));
      }
    };

    socket.on('receiveMessage', handleNewMessage);

    return () => {
      socket.off('receiveMessage', handleNewMessage);
    };
  }, [socket, currentUser]);

  const handleApply = async (jobId, recruiterId) => {
    try {
      console.log('Applying for job:', { jobId, candidateId: currentUser.id, recruiterId }); // Debugging
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/applications',
        { jobId, candidateId: currentUser.id, recruiterId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application submitted successfully!');
    } catch (err) {
      console.error('Error applying for job:', err);
      alert('Failed to apply for the job.');
    }
  };

  const handleChatOpen = (chat) => {
    console.log('Opening chat:', chat); // Debugging
    if (!chat.id) {
      console.error('Invalid chat object:', chat);
      return;
    }
  
    setSelectedChat(chat);
    setShowChat(true);
    setUnreadCounts((prev) => ({
      ...prev,
      [chat.id]: 0,
    }));
    fetchMessages(chat.id);
  };
  
  const fetchMessages = async (conversationId) => {
    if (!conversationId) {
      console.error('Invalid conversationId:', conversationId);
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
  
    try {
      const token = localStorage.getItem('token');
      console.log('Sending message:', { conversationId: selectedChat.id, content: newMessage }); // Debugging
  
      const response = await axios.post(
        'http://localhost:5000/api/messages',
        { conversationId: selectedChat.id, content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Message sent successfully:', response.data); // Debugging
      setMessages((prev) => [...prev, response.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      if (err.response?.status === 404) {
        alert('Conversation not found. Please refresh and try again.');
      }
    }
  };

  const handleLogout = () => {
    if (socket) socket.disconnect();
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return <CircularProgress style={{ display: 'block', margin: '20% auto' }} />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Career Connect</Typography>
          <IconButton
            color="inherit"
            onClick={() => setShowChat(!showChat)}
            style={{ marginLeft: 'auto' }}
          >
            <Badge
              badgeContent={Object.values(unreadCounts).reduce((a, b) => a + b, 0)}
              color="error"
            >
              <ChatIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={{ padding: '20px' }}>
        <Typography variant="h4">Welcome, {currentUser?.name || 'User'}!</Typography>
        <Typography variant="subtitle1">Your role: Candidate</Typography>

        <Typography variant="h5" style={{ marginTop: '20px' }}>Available Jobs</Typography>
        <List>
  {jobs.map((job) => {
    console.log(job); // Debugging: Check the structure of the job object
    return (
      <ListItem key={job.id} style={{ borderBottom: '1px solid #ccc' }}>
        <ListItemText
          primary={job.title}
          secondary={`Posted by: ${job.recruiterName || 'Unknown Recruiter'}`}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleApply(job.id, job.recruiterId)}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() =>
            handleChatOpen({
              id: job.recruiterId || 'Unknown',
              name: job.recruiterName || 'Unknown Recruiter',
            })
          }
        >
          Chat
        </Button>
      </ListItem>
    );
  })}
</List>
      </div>

      {showChat && selectedChat && (
        <Dialog open={showChat} onClose={() => setShowChat(false)} fullWidth>
          <DialogTitle>Chat with {selectedChat.name}</DialogTitle>
          <DialogContent>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ margin: '10px 0' }}>
                  <strong>{msg.senderName}:</strong> {msg.content}
                </div>
              ))}
            </div>
            <TextField
              fullWidth
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowChat(false)}>Close</Button>
            <Button onClick={handleSendMessage} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CandidateDashboard;
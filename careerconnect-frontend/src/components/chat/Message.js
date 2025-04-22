// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Avatar,
//   IconButton,
// } from "@mui/material";
// import { Send } from "@mui/icons-material";

// const Message = ({ currentUser, conversationId, receiverId, receiverName }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   // Fetch messages for the conversation
//   useEffect(() => {
//     const fetchMessages = async () => {
//       if (!conversationId) return;

//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:5000/api/messages/${conversationId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         console.log("Fetched messages:", response.data); // Debugging line
//         // setMessages(response.data || []);
//         setMessages(response.data);
//       } catch (err) {
//         console.error("Error fetching messages:", err.response?.data || err.message);
//       }
//     };

//     fetchMessages();
//   }, [conversationId]);

//   // Send a new message
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !conversationId || !currentUser?.id || !receiverId) {
//       console.error("Invalid message or missing required fields:", {
//         newMessage,
//         conversationId,
//         senderId: currentUser?.id,
//         receiverId,
//       });
//       return;
//     }
  
//     try {
//       const token = localStorage.getItem("token");
//       console.log("Sending message:", {
//         conversationId,
//         senderId: currentUser.id,
//         receiverId,
//         content: newMessage,
//       });
  
//       const response = await axios.post(
//         "http://localhost:5000/api/messages",
//         {
//           conversationId,
//           senderId: currentUser.id,
//           receiverId,
//           content: newMessage,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       setMessages((prev) => [...prev, response.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.error("Error sending message:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         borderRadius: 2,
//         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//         overflow: "hidden",
//       }}
//     >
//       {/* Chat Header */}
//       <Box
//         sx={{
//           p: 2,
//           borderBottom: "1px solid",
//           borderColor: "divider",
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <Avatar>{receiverName?.charAt(0) || "?"}</Avatar>
//         <Typography variant="h6">{receiverName || "Chat"}</Typography>
//       </Box>

//       {/* Chat Messages */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           p: 2,
//           overflowY: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: 1,
//         }}
//       >
//         {messages.length === 0 ? (
//           <Typography color="text.secondary" align="center">
//             No messages yet. Start the conversation!
//           </Typography>
//         ) : (
//           messages.map((msg, index) => (
//             <Box
//               key={index}
//               sx={{
//                 alignSelf: msg.sender_id === currentUser.id ? "flex-end" : "flex-start",
//                 maxWidth: "70%",
//                 bgcolor: msg.sender_id === currentUser.id ? "primary.light" : "grey.100",
//                 color: msg.sender_id === currentUser.id ? "white" : "text.primary",
//                 p: 2,
//                 borderRadius: 2,
//                 boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
//               }}
//             >
//               <Typography variant="body2">{msg.content}</Typography>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   display: "block",
//                   mt: 0.5,
//                   opacity: 0.8,
//                   textAlign: "right",
//                 }}
//               >
//                 {new Date(msg.created_at).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </Typography>
//             </Box>
//           ))
//         )}
//       </Box>

//       {/* Chat Input */}
//       <Box
//         sx={{
//           p: 2,
//           borderTop: "1px solid",
//           borderColor: "divider",
//           display: "flex",
//           gap: 1,
//         }}
//       >
//         <TextField
//           fullWidth
//           placeholder="Type a message..."
//           variant="outlined"
//           size="small"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           endIcon={<Send />}
//           onClick={handleSendMessage}
//           disabled={!newMessage.trim()}
//         >
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Message;

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Box, Typography, TextField, Button, Avatar, List, ListItem } from "@mui/material"
import { Send } from "@mui/icons-material"

const Message = ({ currentUser, conversationId, receiverId, receiverName }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  // Fetch messages for the conversation
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     if (!conversationId) return

  //     try {
  //       const token = localStorage.getItem("token")
  //       const response = await axios.get(`http://localhost:5000/api/messages/${conversationId}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       // console.log("Fetched messages:", response.data) // Debugging line
  //       setMessages(response.data)
  //       console.log("Current User ID:", currentUser?.id);
  //     console.log("Fetched Messages:", response.data);
  //     } catch (err) {
  //       console.error("Error fetching messages:", err.response?.data || err.message)
  //     }
  //   }

  //   fetchMessages()
  // }, [conversationId])

  // Fetch messages for the conversation
useEffect(() => {
  const fetchMessages = async () => {
    if (!conversationId || !currentUser?.id) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/messages/${conversationId}?currentUserId=${currentUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched messages:", response.data); // Debugging line
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages:", err.response?.data || err.message);
    }
  };

  fetchMessages();
}, [conversationId, currentUser?.id]);


  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversationId || !currentUser?.id || !receiverId) {
      console.error("Invalid message or missing required fields:", {
        newMessage,
        conversationId,
        senderId: currentUser?.id,
        receiverId,
      })
      return
    }

    try {
      const token = localStorage.getItem("token")
      console.log("Sending message:", {
        conversationId,
        senderId: currentUser.id,
        receiverId,
        content: newMessage,
      })

      const response = await axios.post(
        "http://localhost:5000/api/messages",
        {
          conversationId,
          senderId: currentUser.id,
          receiverId,
          content: newMessage,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      setMessages((prev) => [...prev, response.data])
      setNewMessage("")
    } catch (err) {
      console.error("Error sending message:", err.response?.data || err.message)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 2,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar>{receiverName?.charAt(0) || "?"}</Avatar>
        <Typography variant="h6">{receiverName || "Chat"}</Typography>
      </Box>

      {/* Chat Messages */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.length === 0 ? (
          <Typography color="text.secondary" align="center">
            No messages yet. Start the conversation!
          </Typography>
        ) : (
          <List sx={{ width: "100%", padding: 0 }}>
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                sx={{
                  justifyContent: msg.sender_id === currentUser.id ? "flex-end" : "flex-start", // Sent messages on the right, received on the left
                  padding: "4px 0",
                }}
                disableGutters
              >
                <Box
                  sx={{
                    bgcolor: msg.sender_id === currentUser.id ? "primary.light" : "grey.200", // Different background colors
                    color: msg.sender_id === currentUser.id ? "white" : "text.primary",
                    p: 2,
                    borderRadius: 2,
                    maxWidth: "70%",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.5,
                      opacity: 0.8,
                      textAlign: "right",
                    }}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Chat Input */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          gap: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<Send />}
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default Message

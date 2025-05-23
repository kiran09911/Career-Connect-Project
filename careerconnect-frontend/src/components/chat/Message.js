"use client"

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, TextField, Button, List, ListItem, Typography, IconButton, Input } from "@mui/material";
import { AttachFile, Download } from "@mui/icons-material";

const Message = ({ currentUser, conversationId, receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State for file upload
  const messagesEndRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async (retryCount = 0) => {
    if (!conversationId) {
      console.error("Missing conversationId in fetchMessages");
      return;
    }

    if (!currentUser?.id) {
      console.error("currentUser.id is undefined or null. Cannot fetch messages.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/messages/${conversationId}?currentUserId=${currentUser.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(`Fetched messages for conversationId ${conversationId}:`, response.data);
      response.data.forEach((msg, index) => {
        console.log(`Message ${index}:`, {
          sender_id: msg.sender_id,
          sender_id_type: typeof msg.sender_id,
          currentUser_id: currentUser.id,
          currentUser_id_type: typeof currentUser.id,
          isSender: String(msg.sender_id) === String(currentUser.id),
          content: msg.content,
          created_at: msg.created_at,
        });
      });

      setMessages((prevMessages) => {
        const existingMessageIds = new Set(prevMessages.map((msg) => msg.id));
        const newMessages = response.data.filter((msg) => !existingMessageIds.has(msg.id));
        const updatedMessages = [...prevMessages, ...newMessages].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        console.log("Updated messages state:", updatedMessages);
        return updatedMessages;
      });
    } catch (err) {
      console.error("Error fetching messages:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      if (err.response?.status === 403 && retryCount < 3) {
        console.log(`Retrying fetchMessages (attempt ${retryCount + 1}/3) for conversationId ${conversationId}`);
        setTimeout(() => fetchMessages(retryCount + 1), 2000);
      }
    }
  };

  useEffect(() => {
    console.log("Message.js props:", { conversationId, currentUser, receiverId, receiverName });

    fetchMessages();

    pollingIntervalRef.current = setInterval(() => {
      console.log(`Polling messages for conversationId ${conversationId} at ${new Date().toLocaleTimeString()}`);
      fetchMessages();
    }, 5000);

    return () => {
      console.log(`Clearing polling interval for conversationId ${conversationId}`);
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [conversationId, currentUser?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!conversationId || !currentUser?.id || !receiverId) {
      console.error("Invalid message or missing fields:", {
        newMessage,
        conversationId,
        senderId: currentUser?.id,
        receiverId,
      });
      return;
    }

    if (!newMessage.trim() && !selectedFile) {
      console.error("No message content or file to send.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("conversationId", conversationId);
      formData.append("senderId", currentUser.id);
      formData.append("receiverId", receiverId);
      if (newMessage.trim()) {
        formData.append("content", newMessage);
      }
      if (selectedFile) {
        formData.append("document", selectedFile);
      }

      console.log("Sending message:", {
        conversationId,
        senderId: currentUser.id,
        receiverId,
        content: newMessage,
        hasFile: !!selectedFile,
      });

      const response = await axios.post(
        "http://localhost:5000/api/messages",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Message sent:", response.data);
      await fetchMessages();
      setNewMessage("");
      setSelectedFile(null);
    } catch (err) {
      console.error("Error sending message:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "400px" }}>
      <List sx={{ flexGrow: 1, overflowY: "auto", padding: "8px" }}>
        {messages.map((msg) => {
          const isSender = String(msg.sender_id) === String(currentUser.id);
          return (
            <ListItem
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: isSender ? "flex-end" : "flex-start",
                padding: "4px 8px",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isSender ? "flex-end" : "flex-start",
                }}
              >
                {msg.content && (
                  <Typography
                    variant="body1"
                    sx={{
                      backgroundColor: isSender ? "#1976d2" : "#e0e0e0",
                      color: isSender ? "white" : "black",
                      borderRadius: isSender ? "12px 12px 0 12px" : "12px 12px 12px 0",
                      padding: "8px 12px",
                      marginBottom: "4px",
                      wordBreak: "break-word",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    {msg.content}
                  </Typography>
                )}
                {msg.document_url && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: isSender ? "#1976d2" : "#e0e0e0",
                      borderRadius: "12px",
                      padding: "8px 12px",
                      marginBottom: "4px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Button
                      variant="text"
                      href={`http://localhost:5000${msg.document_url}`}
                      download
                      startIcon={<Download />}
                      sx={{
                        color: isSender ? "white" : "black",
                        textTransform: "none",
                        fontSize: "0.875rem",
                      }}
                    >
                      {msg.document_url.split("/").pop()}
                    </Button>
                  </Box>
                )}
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </Typography>
              </Box>
            </ListItem>
          );
        })}
        <div ref={messagesEndRef} />
      </List>
      <Box sx={{ display: "flex", padding: "8px", borderTop: "1px solid #e0e0e0", alignItems: "center" }}>
        <IconButton component="label">
          <AttachFile />
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            sx={{ display: "none" }}
          />
        </IconButton>
        {selectedFile && (
          <Typography variant="body2" sx={{ mr: 1, color: "text.secondary" }}>
            {selectedFile.name}
          </Typography>
        )}
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#f5f5f5",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            marginLeft: "8px",
            borderRadius: "20px",
            padding: "8px 16px",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Message;


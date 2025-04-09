import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  TextField, Button, List, ListItem, ListItemText, 
  Avatar, Paper, Typography, CircularProgress 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';

// Move socket connection outside component to prevent re-creation
const socket = io('http://localhost:5000', {
  autoConnect: false,
  auth: (cb) => {
    const token = localStorage.getItem('token');
    cb({ token });
  }
});

const Chat = ({ currentUser, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Fetch messages with error handling
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/messages/conversation/${otherUser.conversationId || 
        `${currentUser.id}-${otherUser.id}`}`
      );
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
      
      // Mark messages as read when opening chat
      if (data.length > 0) {
        const unreadIds = data
          .filter(m => !m.is_read && m.receiver_id === currentUser.id)
          .map(m => m.id);
        if (unreadIds.length > 0) {
          socket.emit('markAsRead', unreadIds);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser.id, otherUser.id, otherUser.conversationId]);

  useEffect(() => {
    socket.connect();
    
    // Join rooms when connected
    const onConnect = () => {
      socket.emit('joinRoom', currentUser.id);
      fetchMessages();
    };

    socket.on('connect', onConnect);
    socket.on('receiveMessage', handleNewMessage);
    socket.on('typing', handleTypingNotification);
    socket.on('error', (err) => setError(err));

    return () => {
      socket.off('connect', onConnect);
      socket.off('receiveMessage', handleNewMessage);
      socket.off('typing', handleTypingNotification);
      socket.off('error');
      clearTimeout(typingTimeoutRef.current);
    };
  }, [currentUser.id, fetchMessages]);

  const handleNewMessage = (message) => {
    setMessages(prev => [...prev, message]);
    // Auto-mark as read if current user is receiver
    if (message.receiver_id === currentUser.id) {
      socket.emit('markAsRead', [message.id]);
    }
  };

  const handleTypingNotification = ({ sender_id, isTyping }) => {
    if (sender_id === otherUser.id) {
      setIsTyping(isTyping);
    }
  };

  const handleTyping = () => {
    socket.emit('typing', {
      receiver_id: otherUser.id,
      isTyping: true
    });
    
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing', {
        receiver_id: otherUser.id,
        isTyping: false
      });
    }, 2000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      sender_id: currentUser.id,
      receiver_id: otherUser.id,
      content: newMessage,
      job_id: otherUser.jobId // Add if job-related
    };

    socket.emit('sendMessage', messageData, (ack) => {
      if (ack?.error) {
        setError(ack.error);
      } else {
        setNewMessage('');
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (loading) return <CircularProgress />;

  return (
    <Paper style={{ 
      padding: '20px', 
      height: '500px', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        marginBottom: '20px',
        background: '#f9f9f9',
        borderRadius: '8px',
        padding: '10px'
      }}>
        <List>
          {messages.length === 0 ? (
            <Typography align="center" color="textSecondary">
              No messages yet. Start the conversation!
            </Typography>
          ) : (
            messages.map((message) => (
              <ListItem 
                key={message.id} 
                style={{ 
                  justifyContent: message.sender_id === currentUser.id ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end'
                }}
              >
                {message.sender_id !== currentUser.id && (
                  <Avatar src={otherUser.avatar} alt={message.sender_name}>
                    {message.sender_name.charAt(0)}
                  </Avatar>
                )}
                <ListItemText
                  primary={message.content}
                  secondary={
                    `${message.sender_name} • ${new Date(message.created_at).toLocaleString()} • ${
                      message.is_read ? 'Read' : 'Delivered'
                    }`
                  }
                  style={{ 
                    marginLeft: '10px',
                    marginRight: '10px',
                    backgroundColor: message.sender_id === currentUser.id ? '#1976d2' : '#e0e0e0',
                    color: message.sender_id === currentUser.id ? 'white' : 'black',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    maxWidth: '70%',
                    wordBreak: 'break-word'
                  }}
                />
              </ListItem>
            ))
          )}
          {isTyping && (
            <ListItem style={{ justifyContent: 'flex-start' }}>
              <Avatar>{otherUser.name.charAt(0)}</Avatar>
              <ListItemText
                primary="..."
                style={{ 
                  marginLeft: '10px',
                  backgroundColor: '#e0e0e0',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  maxWidth: '50px'
                }}
              />
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          style={{ marginLeft: '10px', height: '56px' }}
          disabled={!newMessage.trim()}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default Chat;
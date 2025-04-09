// 
import React, { createContext, useState, useContext, useEffect } from 'react';
import { SocketContext } from './SocketContext';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    const fetchConversations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/conversations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setConversations(data);
      } catch (err) {
        console.error('Error fetching conversations:', err);
      }
    };

    socket.on('connect', fetchConversations);

    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
      
      if (activeConversation?.id !== message.conversation_id) {
        setUnreadCounts(prev => ({
          ...prev,
          [message.conversation_id]: (prev[message.conversation_id] || 0) + 1
        }));
      }
    });

    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
    };
  }, [socket, activeConversation]);

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      setActiveConversation,
      messages,
      setMessages,
      unreadCounts,
      setUnreadCounts
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
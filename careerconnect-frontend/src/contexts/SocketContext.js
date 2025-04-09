import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  autoConnect: false,
  withCredentials: true
});

export const SocketContext = React.createContext(socket);

export const SocketProvider = ({ children }) => {
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      socket.auth = { token };
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
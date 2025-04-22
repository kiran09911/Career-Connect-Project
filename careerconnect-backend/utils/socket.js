const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle receiving a new message
    socket.on("sendMessage", (message) => {
      console.log("Message received:", message);

      // Broadcast the message to all users in the conversation
      io.emit("receiveMessage", message);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized. Call initializeSocket first.");
  }
  return io;
};

module.exports = { initializeSocket, getSocketInstance };
// const { Server } = require("socket.io");

// let io;

// const initializeSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "http://localhost:3000", // Frontend URL
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     // Handle receiving a new message
//     socket.on("sendMessage", (message) => {
//       console.log("Message received:", message);

//       // Broadcast the message to all users in the conversation
//       io.emit("receiveMessage", message);
//     });

//     // Handle disconnection
//     socket.on("disconnect", () => {
//       console.log("A user disconnected:", socket.id);
//     });
//   });

//   return io;
// };

// const getSocketInstance = () => {
//   if (!io) {
//     throw new Error("Socket.IO is not initialized. Call initializeSocket first.");
//   }
//   return io;
// };

// module.exports = { initializeSocket, getSocketInstance };

const { Server } = require("socket.io");
const Conversation = require("../controllers/messageController"); // Adjust path to your model
const User = require("../models/User"); // Adjust path to your model

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

    // Join a room based on user ID for notifications
    socket.on("joinUserRoom", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    // Join a conversation room for real-time messaging
    socket.on("joinConversation", async (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined conversation ${conversationId}`);

      // Optional: Fetch and send existing messages for the conversation
      try {
        const conversation = await Conversation.findById(conversationId).populate("messages");
        if (conversation) {
          socket.emit("loadMessages", conversation.messages);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    });

    // Handle sending a message
    socket.on("sendMessage", async (data) => {
      const { conversationId, senderId, message, timestamp } = data;
      console.log("Message received:", data);

      try {
        // Fetch conversation details to get participants
        const conversation = await Conversation.findById(conversationId).populate("user1Id user2Id");
        if (!conversation) {
          console.error("Conversation not found:", conversationId);
          return;
        }

        const sender = senderId === conversation.user1Id._id.toString() ? conversation.user1Id : conversation.user2Id;
        const receiver =
          senderId === conversation.user1Id._id.toString() ? conversation.user2Id : conversation.user1Id;

        // Emit the message to the conversation room
        io.to(conversationId).emit("receiveMessage", { senderId, message, timestamp });

        // Emit a notification to the receiver (recruiter) if the sender is a candidate
        if (sender.role === "candidate") { // Assuming a role field in User model
          io.to(receiver._id.toString()).emit("newMessageNotification", {
            senderId,
            senderName: sender.name,
            conversationId,
          });
        }

        console.log(`Message sent in conversation ${conversationId} from ${senderId} to ${receiver._id}`);
      } catch (error) {
        console.error("Error handling sendMessage:", error);
      }
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
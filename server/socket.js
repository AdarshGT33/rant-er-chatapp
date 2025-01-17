import { Server as SocketIoServer } from "socket.io";
import Message from "./models/messagesModel.js";

const setupSocket = (server) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recepientSocketId = userSocketMap.get(message.recepient);

    const createMessage = await Message.create(message);

    const messageData = await Message.findById(createMessage._id)
      .populate("sender", "id email firsName lastName image color")
      .populate("recepient", "id email firsName lastName image color");

    if(recepientSocketId){
        io.to(recepientSocketId).emit("recieveMessage", messageData)
    }
    if(senderSocketId){
        io.to(senderSocketId).emit("recieveMessage", messageData)
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(
        `User with user id: ${userId} is connected to socket with socket id: ${socket.id}`
      );
    } else {
      console.log("The connection experienced absence of userid");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;

import {Server as SocketIoServer} from "socket.io"

const setupSocket = (server) => {
    const io = new SocketIoServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods:['GET', 'POST'],
            credentials: true
        }
    });

    const userSocketMap = new Map()

    const disconnect = (socket) => {
        console.log(`Client Disconnected: ${socket.id}`);
        for(const [userId, socketId] of userSocketMap.entries()){
            if(socketId === socket.id){
                userSocketMap.delete(userId)
                break;
            }
        }
    }

    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId

        if(userId){
            userSocketMap.set(userId, socket.id)
            console.log(`User with user id: ${userId} is connected to socket with socket id: ${socket.id}`)
        }else {
            console.log("The connection experienced absence of userid")
        }
        
        socket.on("disconnect", () => disconnect(socket))
    });

}

export default setupSocket;
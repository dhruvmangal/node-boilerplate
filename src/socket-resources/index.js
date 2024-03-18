import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import redisClient from "../lib/redisClient"
import config from "../config/app.config";
import { verify } from "jsonwebtoken";
import authMiddlewareSocket from "./middlewares/auth.socketMiddleware";

const socketServerOptions = {
  cors: { origin: '*' },

}

const socketServer = new SocketServer(socketServerOptions)

socketServer.adapter(createAdapter(redisClient.publisherClient, redisClient.subscriberClient))

socketServer.use(authMiddlewareSocket);

socketServer.on("connection", async (socket, err) => {
  console.log("connected to the server")

  socket.on('joinRoom', (room) => {
    socket.join(room)
    socket.emit('message', "joined room successfully")
  })

  socket.on('chatMessage', ({ room, message }) => {
    socketServer.to(room).emit('chatMessage', { sender: socket.id, message });
  });

  socket.on('error', (err) => {
    socket.emit("error in connection")
  })
  socket.on("message", async (msg) => {
    console.log(msg)
    socketServer.emit('message', msg)
  })

})

export default socketServer
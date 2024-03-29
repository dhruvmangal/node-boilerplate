import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import redisClient from "./redisClient";
import config from "../config/app.config";
import { verify } from "jsonwebtoken";

const socketServerOptions = {
  cors: { origin: '*' },

}

const socketServer = new SocketServer(socketServerOptions)

socketServer.adapter(createAdapter(redisClient.publisherClient, redisClient.subscriberClient))

socketServer.on("connection", async (socket, err) => {
  console.log("connected to the server")
  socket.join("room")
  // socket.on('joinRoom', room => {
  //   console.log(`Client joined room ${room}`);
  //   socket.join(room); // Join the room
  // });

  socket.on('authentication', (token)=>{
    try{
      console.log(token)
      const verifiedData = verify(token, config.get('auth.jwt_secret'))
      console.log(verifiedData)
    }
    catch(e){
      console.log(e)
      socket.on('disconnect',)
    }

  })

  socket.on('error',(err)=>{
    socket.emit("error in connection")
  })
  socket.on("message", async (msg) => {
    console.log(msg)
    socketServer.emit('message', msg)
  })

})

const receiveMessages = (message) => {
  console.log(message)
}

export default socketServer
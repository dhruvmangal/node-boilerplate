import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import redisClient from "./redisClient";


const socketServerOptions = {
  cors: { origin: '*' },

}

const socketServer = new SocketServer(socketServerOptions)

socketServer.adapter(createAdapter(redisClient.publisherClient, redisClient.subscriberClient))

socketServer.on("connection", async(socket, err)=>{
  console.log("connected to the server")
  socket.on("message", async(msg)=>{
    console.log(msg)
  })

})

const receiveMessages = (message) =>{
  console.log(message)
}

export default socketServer
import app from './src/app.js'
import { createServer } from 'http'
import socketServer from './src/socket-resources/index.js'

const httpServer = createServer(app)
socketServer.attach(httpServer)

httpServer.listen({ port: 4000 }, () => {
  console.log( `the server has started on port 4000`)
})
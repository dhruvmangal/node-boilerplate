import { verify } from "jsonwebtoken";
import config from "../../config/app.config";
const authMiddlewareSocket = (socket, next)=>{
  const token = socket.handshake.headers.token;
  try{
    const data = verify(token, config.get('auth.jwt_secret'))
    next()
  }catch(e){
    next(new Error('Authentication failed'))
  }
}

export default authMiddlewareSocket
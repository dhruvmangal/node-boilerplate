import { StatusCodes } from "http-status-codes"

export default function responseMiddleware (){
  return async (req, res, next) => {
    const statusCode = res.statusCode ||  StatusCodes.OK
    res.status(statusCode).json({ ...res.payload })
  }
}
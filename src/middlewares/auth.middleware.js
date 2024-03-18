import { StatusCodes } from "http-status-codes"
import { verify } from "jsonwebtoken"
import config from "../config/app.config"

export default function authMiddleware(authType = null) {

  return (req, res, next) => {
    const token = req?.headers?.token

    if (!token) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        code: 'unauthorized',
        message: 'token is not present'
      })
    }

    try {
      const {
        id,
        userType
      } = verify(token, config.get('auth.jwt_secret'))

      if (userType !== authType && authType !== null) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          code: 'unauthorized',
          message: 'Not authorized fo this user'
        })
      } else {
        req.id = id
        next()
      }

    } catch (e) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        code: 'unauthorized',
        message: e.message
      })
    }
  }
}
import express from "express";
import UserController from "../controller/user.controller.js";
import responseMiddleware from "../middlewares/response.middleware.js";
import contextMiddleware from "../middlewares/context.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { AUTH_TYPES } from "../utils/constants.js";

const userRouter = express.Router();

/* GET users listing. */
userRouter.get(
  '/', 
  authMiddleware(),
  contextMiddleware(false),
  UserController.getUsers, 
  responseMiddleware()
);

userRouter.post(
  '/', 
  authMiddleware(AUTH_TYPES.ADMIN),
  contextMiddleware(false),
  UserController.createUser,
  responseMiddleware()
)

userRouter.post(
  '/login', 
  UserController.loginUser,
  contextMiddleware(false),
  UserController.loginUser,
  responseMiddleware()
)

userRouter.put (
  '/', 
  authMiddleware(),
  contextMiddleware(false),
  UserController.updateUser,
  responseMiddleware()
)
export default userRouter
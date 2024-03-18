import express from 'express';
import contextMiddleware from '../middlewares/context.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import responseMiddleware from '../middlewares/response.middleware.js';
import GroupController from '../controller/group.controller.js';

const groupRouter = express.Router();

groupRouter.post(
  '/',
  authMiddleware(),
  contextMiddleware(false),
  GroupController.createGroup,
  responseMiddleware()
)

groupRouter.get(
  '/',
  authMiddleware(),
  contextMiddleware(false),
  GroupController.getGroup,
  responseMiddleware()
)

groupRouter.post(
  '/add-members',
  authMiddleware(),
  contextMiddleware(false),
  GroupController.addMember,
  responseMiddleware()
)

groupRouter.post(
  '/remove-members',
  authMiddleware(),
  contextMiddleware(false),
  GroupController.removeMember,
  responseMiddleware()
)

export default groupRouter
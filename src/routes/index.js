import express from 'express';
import userRouter from './users.js';
import groupRouter from './groups.js';

var appRouter = express.Router();
/* GET home page. */
appRouter.post('/', function(req, res, next) {

});

appRouter.use('/group', groupRouter);
appRouter.use('/user', userRouter);

export default appRouter;

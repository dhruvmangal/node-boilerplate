import createHttpError from 'http-errors';
import express from 'express'
import path from 'path';
import appRouter from './routes/index.js'
import groupRouter from './routes/groups.js';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: 'error'});
});

export default app;

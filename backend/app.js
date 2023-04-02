require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const functions = require('firebase-functions');


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user-routes');
var imageRouter = require('./routes/image-routes');

var app = express();

// const port = process.env.PORT || 8080;

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/images', imageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// export express app to functions
exports.api = functions.https.onRequest(app);

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// for live updates
var bodyParser = require('body-parser'); // Added this line to use body-parser
var http = require('http'); // Added this line to create an HTTP server
var socketIo = require('socket.io'); // Added this line to use socket.io for WebSockets


var app = express();

// for live update
var server = http.createServer(app); // Create an HTTP server
var io = socketIo(server); // Attach socket.io to the server
app.set('io', io); // Store io instance in app

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// for live update
app.use(bodyParser.json()); // This middleware parses incoming JSON requests and makes the payload available under req.body


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// for live update
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// module.exports = app; --> this is changed to the following line for live update
module.exports = { app, server }; // Export the app and server instances

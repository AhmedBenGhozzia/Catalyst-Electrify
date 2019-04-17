var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const User = require('./routes/api/UserRoute');
const Notif = require('./routes/api/NotificationRoute');
const DataNotification = require('./routes/api/DataNotificationRoute');
const tenserNotif = require('./routes/api/TenserNotif');
const push = require('./routes/api/push');

const config = require('config');
var app = express();

/**
 * Mongo in Mlab
 */

const mongoose = require('mongoose') 

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoURI'), {
  useNewUrlParser: true,
  useCreateIndex: true
},function(err) {
    if (err)
        console.error(err);
    else
        console.log("Connected to DB");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/user',User);
app.use('/notif',Notif);
app.use('/DataNotification',DataNotification);
app.use('/n',tenserNotif);

app.use('/push',push);

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

module.exports = app;

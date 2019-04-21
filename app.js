var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const User = require('./routes/api/UserRoute');
const SmartHub = require('./routes/api/SmartHubRoutes');
const ProdCons = require('./routes/api/ProdConsRoutes');
const Notif = require('./routes/api/NotificationRoute');
const DataNotification = require('./routes/api/DataNotificationRoute');
const tenserNotif = require('./routes/api/TenserNotif');
const AlertNotif = require('./routes/api/TenserAlert');

const push = require('./routes/api/push');
const config = require('config');
var app = express();
var cors = require('cors')

/**
 * Mongo in Mlab
 */

const mongoose = require('mongoose') 

mongoose.connect("mongodb://habib:habib123@ds145780.mlab.com:45780/catalyst-electrify", {
  useNewUrlParser: true
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
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/user',User);
app.use('/api/SmartHub',SmartHub);
app.use('/api/ProdCons',ProdCons);
app.use('../Catalyst-Electrify/loop.js',setInterval);
app.use('/notif',Notif);
app.use('/DataNotification',DataNotification);
app.use('/VenteNotif',tenserNotif);
app.use('/AlertNotif',AlertNotif);

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

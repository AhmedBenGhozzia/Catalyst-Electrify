var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const User = require('./routes/api/UserRoute');
const predict = require('./routes/api/PredictRoute');
const SmartHub = require('./routes/api/SmartHubRoutes');
const ProdCons = require('./routes/api/ProdConsRoutes');
const Notif = require('./routes/api/NotificationRoute');
const DataNotification = require('./routes/api/DataNotificationRoute');
const tenserNotif = require('./routes/api/TenserNotif');
const push = require('./routes/api/push');
const config = require('config');
var app = express();
var cors = require('cors')

var http = require('http');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '766424',
  key: '1036a9abd7d298e83d48',
  secret: '360c2ce84c26c4389df1',
  cluster: 'eu',
  encrypted: true
});

const socketIo = require("socket.io");
const axios = require("axios");
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/ProdCons"
    );
    socket.emit("From db", res.data);
    console.log(res.data)
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(45780);
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
//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/user',User);
app.use('/api/predict',predict);
app.use('/api/SmartHub',SmartHub);
app.use('/api/ProdCons',ProdCons);
app.use('../Catalyst-Electrify/loop.js',setInterval);
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

app.listen(9000, function(){
  console.log('app listening on port 9000 for real time data!')
});

module.exports = app;

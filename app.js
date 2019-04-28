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
const AlertNotif = require('./routes/api/TenserAlert');
var cron = require('node-cron');
const axios = require('axios')
const ProdConsModel = require('./models/ProdCons');
var request = require('request');
var dateFormat = require('dateformat');

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

app.use('/api/user',User);
app.use('/api/predict',predict);
app.use('/api/SmartHub',SmartHub);
app.use('/api/ProdCons',ProdCons);
app.use('../Catalyst-Electrify/loop.js',setInterval);
app.use('/notif',Notif);
app.use('/DataNotification',DataNotification);
app.use('/VenteNotif',tenserNotif);
app.use('/AlertNotif',AlertNotif);
app.use('/n',tenserNotif);
app.use('/push',push);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/push',push);
var production_heure ={};
var consomation_heure ={};
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
var task = cron.schedule('*/1 * * * *', () =>  {
  Date.prototype.lesshour= function(){
    this.setHours(this.getHours()-1);
    return this;
}

  ProdConsModel.find(function(err, data){
    if(err){            
        console.log(err);
    }
    obj= data;
    var today = new Date();
today.setHours(today.getHours()-1 );
    var date3 =dateFormat(today,"UTC:yyyy-mm-dd'T'HH:MM:ss'Z") ;     
    function dateCompare(date1, date2){
      return new Date(date2) > new Date(date1);
  }
console.log(today),
    obj.forEach( function(data){  

     if (dateCompare(today,data.date)){
      production_heure=data.Prod_hourly;
      consomation_heure= data.Cons_hourly;
      request({
        url: "http://localhost:5000/DataNotification",
        method: "POST",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        json:true,
        headers: {
            'Content-Type' : 'application/json'
        },
        body: { 
          Consomation:Number(consomation_heure),Production:Number(production_heure),Prix:100,idUser:"5c94ffd05cdd3d504caf6e30"
        }
  });

}
    })
   
    console.log(production_heure) ;
    console.log(consomation_heure) ;






})  

  console.log('stoped task');
}, {
  scheduled: false
});
 
task.start()

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

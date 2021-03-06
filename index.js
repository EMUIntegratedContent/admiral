const path = require('path');
const express = require('express');
const socketio = require('socket.io')(server);
const http = require('http');
const router  = express.Router()

var app = express();
var port      = process.env.PORT || 3700
var mongoose  = require('mongoose')
var passport  = require('passport')
var flash     = require('connect-flash')
var nodemon   = require('gulp-nodemon');
var jwt       = require('jsonwebtoken'); // used to create, sign, and verify tokens

var morgan       = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var session      = require('express-session')
var nodemailer   = require('nodemailer')

var configDB = require('./config/database.js')

// configuration ===============================================================

// Attach Socket.io
var server = http.createServer(app);
var io = socketio.listen(server)
app.set('socketio', io) // bind socket to app
app.set('server', server) // optional

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: "MY_MAIL",
      pass: "MY_PASS"
  }
});

//app.listen(3000);
server.listen(3700) // <-- socket port

io.on('connection', function (socket) {
    //socket.emit('message', { message: 'welcome to the chat' })
    var IMail = require('./app/models/imail')
    socket.on('fetchIMail', function (data) {
        IMail.find({}, (err, imails) => {
          if (err) {
             io.sockets.emit('deliverIMail', {error: err});
          }
          io.sockets.emit('deliverIMail', {imail: imails});
        });
    });
    socket.on('fetchIMailCount', function (data) {
        IMail.count({}, (err, numImails) => {
          if (err) {
             io.sockets.emit('deliverIMailCount', {error: err});
          }
          io.sockets.emit('deliverIMailCount', {count: numImails});
        });
    });
});

mongoose.connect(configDB.url); // connect to our database
mongoose.connection.on('connected', function(test) {
	require('./authorization').init();
});

app.set('superSecret', 'ilovescotchscotchyscotchscotch'); // session secret
require('./config/passport')(app, passport, transporter, io, jwt); // pass passport for configuration

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
const routes = require('./app/routes')(app, router, passport, mongoose)
app.use('/', routes)

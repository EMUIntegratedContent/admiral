const path = require('path');
const express = require('express');
const expressVue = require('express-vue');
const socketio = require('socket.io')(server);
const http = require('http');

var app = express();
var port      = process.env.PORT || 3700
var mongoose  = require('mongoose')
var passport  = require('passport')
var flash     = require('connect-flash')
var nodemon   = require('gulp-nodemon');

var morgan       = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser')
var session      = require('express-session')
var nodemailer   = require('nodemailer')

var configDB = require('./config/database.js')

var acl = require('acl')

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
      user: "cpuzzuol@emich.edu",
      pass: "Madd13Z03yCP"
  }
});

var dbConn = mongoose.connect(configDB.url); // connect to our database


acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));
/*
acl.allow([
      {
        roles:['admin'],
        allows:[
            {resources:'/admin', permissions:'get'}
        ]
      }
  ],
  function(err){
    console.log("ALLOW")
    //console.log(err)
  }
);

acl.roleUsers('admin', function(err, users){
  console.log("Admins:")
  console.log(err)
})
*/
app.listen(3000);
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


require('./config/passport')(passport, transporter, acl); // pass passport for configuration

//app.set('views', __dirname + '/tpl');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); // set up ejs for templating

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
require('./app/routes.js')(app, passport, acl, mongoose); // load our routes and pass in our app and fully configured passport

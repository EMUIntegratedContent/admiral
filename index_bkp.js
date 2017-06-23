const path = require('path');
const express = require('express');
const expressVue = require('express-vue');
const app = express();

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

// launch ======================================================================
var io = require('socket.io').listen(app.listen(port));
io.on('connection', function (socket) {
    console.log("Socket connected on port " + port)

    socket.emit('message', { message: 'welcome to the chat' })
    socket.on('send', function (data) {
        console.log("WAFFLES")
        io.sockets.emit('message', data);
    });
});
console.log('The magic happens on port ' + port);

require('./config/passport')(passport, transporter, acl); // pass passport for configuration

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});
app.set('socketio', io);

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
require('./app/routes.js')(app, passport, acl, io); // load our routes and pass in our app and fully configured passport

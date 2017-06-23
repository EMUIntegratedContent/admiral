// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User            = require('../app/models/user');
var IMail           = require('../app/models/imail');
var MessageObserver = require('../app/MessageObserver')
var UserMail = require('../app/UserMail')

// load the auth variables
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport, transporter, acl){

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and de-serialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done){
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user)
    })
  })

  // =========================================================================
  // GOOGLE ==================================================================
  // =========================================================================
  passport.use(new GoogleStrategy({
    clientID    : configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL : configAuth.googleAuth.callbackURL,
  },
  function(token, refreshToken, profile, done){
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function(){
      // only allow emich logins!
      // try to find a user based on their google id
      User.findOne({ 'google.id' : profile.id }, function(err, user){
        if(err)
          return done(err)

        if(user){
          // if a user is found,
          // Set the user up with a series of event listeners throughout the session
          // Finally, log user in
          //io.sockets.emit('send', {message: 'buffalo'})
          return done(null, user)
        } else {

          // if the user isn't in our database, create a new user
          var newUser = new User({
            'google.id': profile.id,
            'google.token': token,
            'google.name': profile.displayName,
            'google.email': profile.emails[0].value,  //pull the first email
            'google.active': 0,
            'google.level': 0
          })

          // save the user

          newUser.save(function(err){
            if(err)
              throw err
            return done(null, newUser)
          })

          // Give the new user the role of 'inactive'
          acl.addUserRoles(newUser.id, 'inactive', function(err){})

          // Email a notice to the new user that they have to be accepted by an administrator.
          let mailOptions = {
              from: '"no-reply" <no-reply@admiral>', // sender address
              to: newUser.google.email, // list of receivers
              subject: 'Initial Admiral Login', // Subject line
              text: 'You have just signed into Admiral for the first time. Following administration approval, you will receive another email allowing you to access the system.', // plain text body
              html: '<h2>You have just signed into Admiral for the first time.</h2><p>Following administration approval, you will receive another email allowing you to access the system.</p>' // html body
          };
          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
          });
          /*
          // Send an email to all "admin-level" users to activate this user.
          acl.roleUsers('admin', function(err, users){
            // Loop through all admin users
            users.forEach(function(value){
              // Find each individual admin user by _id
              User.findOne({ '_id' : value }, function(err, user){
                if(err)
                  return done(err)
                // If a user has been found, send that admin an IMail
                // send the user an internal mail (IMail)
                var iMail = new IMail()
                iMail.body = newUser.google.name + ' needs approval.',

                // Send administrator a notification that a new user needs approval
                iMail.recipients.push(user.id)
                //user.registerNotificationOvserver()

                iMail.save(function(err){
                  if(err)
                    return err

                  var notification = new UserMail(user)
                  notification.sendMessage()

                  console.log("IMail was sent to notify admin " + user.google.name + " to approve " + newUser.google.name + " as a system user.")
                })
              })
            })
          })
          */
        }
      })
    })
  }))
}
